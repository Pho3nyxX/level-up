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
            if (page == null || page < 1) {
                page = 1;
            }
            if (pageSize == null || pageSize < 3)
            {
                pageSize = 3;
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
            ViewData["pageNumber"] = page;
            ViewData["lastPageNumber"] = lastPageNumber;
            //courses.Include(c => c.Instructors);
            return View(courseList);
        }


        // GET: Courses/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var course = await _context.Courses
                .Include(c => c.Modules)
                .ThenInclude(m => m.Lessons)
                .Include(c => c.Instructors)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (course == null)
            {
                return NotFound();
            }

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

        // GET: Courses/Details/5
        public async Task<IActionResult> Instructor(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var instructor = await _context.Instructors
                .Include(c => c.Courses)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (instructor == null)
            {
                return NotFound();
            }

            return View(instructor);
        }

        // GET: Courses/MyCourses/5
        public async Task<IActionResult> MyCourses()
        {
            // get the id of the currently logged in user
            var userId = _userManager.GetUserId(User);
            //get the user with their courses
            var user = await _context.Users
                .Include(u => u.Courses)
                .Where(u => u.Id == userId)
                .FirstOrDefaultAsync();

            return View(user.Courses);
        }


        // GET: Courses/Review/5
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


        // GET: Courses/Review/5
        public async Task<IActionResult> CourseReview(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var review = await _context.Reviews
                .Include(r => r.User)
                .Where(c => c.Course.Id == id).ToListAsync();                

            if (review == null)
            {
                return NotFound();
            }

            return View(review);
        }


        // GET: Courses/Lesson/5
        public async Task<IActionResult> Lesson(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var course = await _context.Courses
                .Include(c => c.Modules)
                .ThenInclude(l => l.Lessons)
                .FirstOrDefaultAsync(m => m.Id == 1);

            var lesson = await _context.Lessons
                .Include(l => l.Module)
                .ThenInclude(c => c.Course)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (course == null)
            {
                return NotFound();
            }
            ViewData["Modules"] = course;
            ViewData["courseId"] = course.Id;

            return View(lesson);
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
    }
}
