using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public int? Progress { get; set; }

        public string Level { get; set; }

        [Display(Name = "Created By")]
        public string? CreatedBy { get; set; }

        public string? Language { get; set; }

        public string? Topics { get; set; }

        public string? Syllabus { get; set; }
        //public List<Lesson>? Lessons { get; set; }
        public List<Module> Modules {  get; set; } 
        public List<Instructor> Instructors { get; set; } = new List<Instructor>(); 
    }
}
