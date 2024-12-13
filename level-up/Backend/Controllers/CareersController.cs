using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    public class CareersController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CareersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Careers
        public async Task<IActionResult> Index(string SearchTerm, int page, int pageSize)
        {
            if (_context.Careers == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Courses' is null.");
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
            if (page > lastPageNumber)
            {
                return RedirectPermanent("~/Careers/");
            }
            var careers = from c in _context.Careers
                     .OrderBy(c => c.Id)
                     .Skip(position)
                     .Take(pageSize)
                      select c;

            if (!String.IsNullOrEmpty(SearchTerm))
            {
                careers = careers.Where(c =>
                (c.PathName!.ToLower().Contains(SearchTerm.ToLower()))
                || c.ShortDescription!.Contains(SearchTerm));
            }
            var careerList = await careers.ToListAsync();
            ViewBag.PageNumber = page;
            ViewBag.SearchTerm = SearchTerm;
            ViewBag.LastPageNumber = lastPageNumber;
            return View(careerList);
        }

        // GET: Careers/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var career = await _context.Careers
                .Include(c => c.Companies)
                .Include(c => c.Industries)
                .Include(c => c.Testimonies)
                .Include(c => c.Skills)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (career == null)
            {
                return NotFound();
            }

            return View(career);
        }

        // GET: Careers/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Careers/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,PathName,Description,AverageSalary,Knowledge,Duties,Abilities")] Career career)
        {
            if (ModelState.IsValid)
            {
                _context.Add(career);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(career);
        }

        // GET: Careers/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var career = await _context.Careers.FindAsync(id);
            if (career == null)
            {
                return NotFound();
            }
            return View(career);
        }

        // POST: Careers/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,PathName,Description,AverageSalary,Knowledge,Duties,Abilities")] Career career)
        {
            if (id != career.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(career);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CareerExists(career.Id))
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
            return View(career);
        }


        // GET: Careers/Details/5
        public async Task<IActionResult> Roadmap(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var roadmap = await _context.Roadmaps
                .FirstOrDefaultAsync(m => m.Id == id);

            if (roadmap == null)
            {
                return NotFound();
            }

            return View(roadmap);
        }

        // GET: Careers/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var career = await _context.Careers
                .FirstOrDefaultAsync(m => m.Id == id);
            if (career == null)
            {
                return NotFound();
            }

            return View(career);
        }

        // POST: Careers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var career = await _context.Careers.FindAsync(id);
            if (career != null)
            {
                _context.Careers.Remove(career);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CareerExists(int id)
        {
            return _context.Careers.Any(e => e.Id == id);
        }
    }
}
