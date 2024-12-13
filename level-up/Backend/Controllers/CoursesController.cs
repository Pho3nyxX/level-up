using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using System.Drawing.Printing;
using Microsoft.CodeAnalysis.Elfie.Diagnostics;

namespace Backend.Controllers
{
    public class CoursesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public CoursesController(ApplicationDbContext context,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        // GET: Courses
        public async Task<IActionResult> Index(string SearchTerm, int page, int pageSize)
        {
            if(_context.Courses == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Courses'  is null.");
            }
            if (page < 1) 
            {
                page = 1;
            }
            if (pageSize < 9)
            {
                pageSize = 9;
            }

            var position = (page - 1) * pageSize;
            var count = await _context.Courses.CountAsync();
            var lastPageNumber = count % pageSize == 0 ? count / pageSize : count / pageSize + 1;
            if (page > lastPageNumber )
            {
                return RedirectPermanent("~/Courses/");
            }
            var courses = from c in _context.Courses
                     .OrderBy(c => c.Id)
                     .Include(c => c.Instructors)
                     .Skip(position)
                     .Take(pageSize)
                      select c;

            if (!(String.IsNullOrEmpty(SearchTerm)))
            {
                courses = courses.Where(c => 
                (c.Title!.ToLower().Contains(SearchTerm.ToLower())) 
                || c.Description!.ToLower().Contains(SearchTerm));
            }
            var courseList = await courses.ToListAsync();
            ViewBag.PageNumber = page;
            ViewBag.SearchTerm = SearchTerm;
            ViewBag.LastPageNumber = lastPageNumber;
            //courses.Include(c => c.Instructors);
            return View(courseList);
        }


        // GET: Courses/Details/5
        public async Task<IActionResult> Details(int? id, int reviewSize)
        {
            if (id == null)
            {
                return NotFound();
            }

            reviewSize = 4;

            var course = await _context.Courses
                .Include(c => c.Modules)
                .ThenInclude(m => m.Lessons)
                .Include(c => c.Instructors)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (course == null)
            {
                return NotFound();
            }

            var count = await _context.Reviews
                .Where(r => r.Course.Id == id)
                .CountAsync();

            var reviews = await _context.Reviews
                 .Include(u => u.User)
                 .Where(r => r.Course.Id == id)
                 .Take(reviewSize)
                 .ToListAsync();
                          
            ViewBag.Count = count;
            ViewBag.Reviews = reviews;
            return View(course);
        }


        // GET: Courses/Create
        public IActionResult Create()
        {
            return View();
        }


        // POST: Courses/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,Description,Duration,Progress,Level,CreatedBy,Language,Topics,Syllabus")] Course course)
        {
            if (ModelState.IsValid)
            {
                _context.Add(course);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(course);
        }


        // GET: Courses/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }
            return View(course);
        }


        // POST: Courses/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title,Description,Duration,Progress,Level,CreatedBy,Language,Topics,Syllabus")] Course course)
        {
            if (id != course.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(course);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CourseExists(course.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(course);
        }


        // GET: Courses/Instructor/5
        public async Task<IActionResult> Instructor(int? id, int page, int pageSize)
        {
            
            if (id == null)
            {
                return NotFound();
            }
            if (page < 1)
            {
                page = 1;
            }
            if (pageSize < 9)
            {
                pageSize = 9;
            }
            var position = (page - 1) * pageSize;
            //counting the courses associated with the instructor
            var count = await _context.Instructors
                .Where(i => i.Id == id)
                .Include(i => i.Courses)
                .SelectMany(i => i.Courses)
                .CountAsync();

            var lastPageNumber = count % pageSize == 0 ? count / pageSize : count / pageSize + 1;
            if (page > lastPageNumber)
            {
                return RedirectPermanent("~/Instructors/");
            }

            var instructor = await _context.Instructors
                //.Include(c => c.Courses)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (instructor == null)
            {
                return NotFound();
            }

            var courses = await _context.Instructors
               .Where(u => u.Id == id)
               .Include(u => u.Courses)
               .SelectMany(u => u.Courses.Skip(position).Take(pageSize))
               .ToListAsync();

            ViewBag.PageNumber = page;
            ViewBag.LastPageNumber = lastPageNumber;
            ViewBag.Courses = courses;
            return View(instructor);
        }


        // GET: Courses/MyCourses/5
        public async Task<IActionResult> MyCourses(int page, int pageSize)
        {
            if (page < 1)
            {
                page = 1;
            }
            if (pageSize < 4)
            {
                pageSize = 4;
            }

            // get the id of the currently logged in user
            var userId = _userManager.GetUserId(User);
            var position = (page - 1) * pageSize;

            var count = await _context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.Courses)
                .SelectMany(u => u.Courses)
                .CountAsync();

            var lastPageNumber = count % pageSize == 0 ? count / pageSize : count / pageSize + 1;
            if (page > lastPageNumber)
            {
                return RedirectPermanent("~/MyCourses/");
            }

            //get the user with their courses
            var courses = await _context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.Courses)
                .SelectMany(u => u.Courses.Skip(position).Take(pageSize))
                .ToListAsync();

            ViewBag.PageNumber = page;
            ViewBag.LastPageNumber = lastPageNumber;
            return View(courses);
        }


        // POST: Courses/Review/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Review(int id, [Bind("Stars,Comment")] Review review)
        {
            var userId = _userManager.GetUserId(User);
            var user = await _context.Users
                .Include(u => u.Courses)
                .Where(u => u.Id == userId)
                .FirstOrDefaultAsync();

            var course = await _context.Courses
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();

            if (course == null)
            {
                return NotFound();
            }

            review.User = user;
            review.Course = course;
            review.DateCreated = DateTime.Now;
            //ModelState.Clear();
            //TryValidateModel(review);
            if (ModelState.IsValid)
            {
                _context.Add(review);
                await _context.SaveChangesAsync();        
                return RedirectToAction(nameof(Index));
            }

            //TODO: verify that user is registered for course
            return View(user.Courses);
        }


        // GET: Courses/CourseReview/5
        public async Task<IActionResult> CourseReview(int? id, string SearchTerm)
        {
            if (id == null)
            {
                return NotFound();
            }

            var review =  _context.Reviews
                .Include(r => r.User)
                .Where(c => c.Course.Id == id);                

            var course = await _context.Courses
               .Include(i => i.Instructors)
               .FirstOrDefaultAsync(c => c.Id == id);
            ViewData["course"] = course;

            if (review == null)
            {
                return NotFound();
            }

            if (!(String.IsNullOrEmpty(SearchTerm)))
            {
                review = review.Where(r => r.Comment!.ToLower().Contains(SearchTerm));
            }
        
            return View(await review.ToListAsync());
        }


        // GET: Courses/Lesson/5
        public async Task<IActionResult> Lesson(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var userId = _userManager.GetUserId(User);

            var course = await _context.Courses
                .Include(c => c.Modules)
                .ThenInclude(l => l.Lessons)
                .FirstOrDefaultAsync(m => m.Id == 1);

            var lesson = await _context.Lessons
                .Include(l => l.Module)
                .ThenInclude(c => c.Course)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (course == null || lesson == null)
            {
                return NotFound();
            }

            var applicationUserLesson = await _context.ApplicationUserLessons
                .Where(au => au.ApplicationUserId == userId)
                .Where(au=> au.LessonId == lesson.Id)
                .FirstOrDefaultAsync();

            if (applicationUserLesson == null)
            {
                applicationUserLesson = new ApplicationUserLesson();
                applicationUserLesson.ApplicationUserId = userId;
                applicationUserLesson.LessonId = lesson.Id;
                applicationUserLesson.Watched = false;

                _context.Add(applicationUserLesson);
                _context.SaveChanges();
            }

            ViewData["Modules"] = course;
            ViewData["courseId"] = course.Id;
            ViewData["PageName"] = "Lesson";

            return View(lesson);
        }

        // POST: Courses/MarkLessonAsWatched/5
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> MarkLessonAsWatched(int id)
        {

            var userId = _userManager.GetUserId(User);

            var applicationUserLesson = await _context.ApplicationUserLessons
                .Where(au => au.ApplicationUserId == userId)
                .Where(au => au.LessonId == id)
                .FirstOrDefaultAsync();

            if (applicationUserLesson != null)
            {
                applicationUserLesson.Watched = true;

                //_context.Add(applicationUserLesson);
                _context.SaveChanges();
            }
            var message = new
            {
                Status = "success"
            };

            return Ok(message);
        }


        // POST: Courses/SaveBookmark/5
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveBookmark(int id, int? lessonId)
        {
            var userId = _userManager.GetUserId(User);

            var user = await _context.Users
                .Where(u => u.Id == userId)
                .FirstOrDefaultAsync();

            DateTime currentTime = DateTime.Now;

            var message = new
            {
                Status = "failed"
            };

            var lesson = await _context.Lessons
                .Where(l => l.Id == lessonId)
                .FirstOrDefaultAsync();

            if (lesson != null) { 
                Bookmark bookmark = new Bookmark();

                bookmark.ApplicationUser = user;
                bookmark.CreatedAt = currentTime;
                bookmark.Lesson = lesson;

                _context.Add(bookmark);
                _context.SaveChanges();

                message = new
                {
                    Status = "success"
                };
            }
            return Ok(message);
        }


        // GET: Courses/Register/5
        public async Task<IActionResult> Register(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var course = await _context.Courses
                .FirstOrDefaultAsync(c => c.Id == id);

            // get the id of the currently logged in user
            var userId = _userManager.GetUserId(User);
            //get the user with their courses
            var user = _context.Users
                .Include(u => u.Courses)
                .Where(u => u.Id == userId)
                .FirstOrDefault();

            if (user == null || course == null)
            {
                //return NotFound();
            }
            else
            {
                user.Courses.Add(course);
            }

            await _context.SaveChangesAsync();
            //ViewBag.Message = "Successfully registered for " + course.Title;
            return RedirectToAction(nameof(Details), "Courses", new {id = course.Id});
        }


        // GET: Courses/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var course = await _context.Courses
                .FirstOrDefaultAsync(m => m.Id == id);
            if (course == null)
            {
                return NotFound();
            }

            return View(course);
        }


        // POST: Courses/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course != null)
            {
                _context.Courses.Remove(course);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CourseExists(int id)
        {
            return _context.Courses.Any(e => e.Id == id);
        }
        
        
        //public bool CheckUserRegistration(int userId, int courseId)
        //{
        //    var userCourse = _context.User
        //        .Include(u => u.Courses)
        //        .Where(u => u.Id == userId)
        //        .FirstOrDefault();
        //    if (userId)
        //}
    }
}
