using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Backend.Models.Career> Careers { get; set; }
        public DbSet<Backend.Models.Company> Companies { get; set; }
        public DbSet<Backend.Models.Course> Courses { get; set; }
        public DbSet<Backend.Models.Goal> Goals { get; set; }
        public DbSet<Backend.Models.Industry> Industries { get; set; }
        public DbSet<Backend.Models.Instructor> Instructors { get; set; }
        public DbSet<Backend.Models.Lesson> Lessons { get; set; }
        public DbSet<Backend.Models.Roadmap> Roadmaps { get; set; }
        public DbSet<Backend.Models.Skill> Skills { get; set; }
        public DbSet<Backend.Models.Testimony> Testimonies { get; set; }
        public DbSet<Backend.Models.Review> Reviews { get; set; } //= default!;
        public DbSet<Backend.Models.ApplicationUserLesson> ApplicationUserLessons { get; set; } 
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ApplicationUser>()
                .HasMany(u => u.Lessons)
                .WithMany(l => l.ApplicationUsers)
                .UsingEntity<ApplicationUserLesson>();
            builder.Entity<ApplicationUserLesson>().HasKey(nameof(ApplicationUserLesson.ApplicationUserId), nameof(ApplicationUserLesson.LessonId));
        }
    }
}
