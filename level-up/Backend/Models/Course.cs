using Backend.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        [Display(Name = "Short Description")]
        [Column(TypeName = "nvarchar(100)")]
        public string? ShortDescription { get; set; }

        public int Duration { get; set; }
        //public int? Progress { get; set; }

        public string Level { get; set; }

        [Display(Name = "Created By")]
        public string? CreatedBy { get; set; }

        public string? Language { get; set; }

        public string? Topics { get; set; }

        public string? Syllabus { get; set; }
        //public List<Lesson>? Lessons { get; set; }
        public List<Module> Modules {  get; set; } 
        public List<Instructor> Instructors { get; set; } = new List<Instructor>(); 

        public List<ApplicationUser> ApplicationUsers { get; set; } = new List<ApplicationUser>();

        public List<Review> Reviews { get; set; }

        public static string SecondsToString(int seconds)
        {
            TimeSpan timeSpan = TimeSpan.FromSeconds(seconds);
            string result = string.Format("{0:D2}:{1:D2}:{2:D2}",
            timeSpan.Hours,
            timeSpan.Minutes,
            timeSpan.Seconds,
            timeSpan.Milliseconds);
            return result;
        }
    }

}
