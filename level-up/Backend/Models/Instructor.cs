using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Instructor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        [Display(Name = "Instructor Job Title")]
        public string InstructorJobTitle { get; set; }
        public string? Image { get; set; }
        public List<Course> Courses { get; set; } = new List<Course>();
    }
}
