using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Instructor
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [Display(Name = "Instructor Job Title")]
        public string InstructorJobTitle { get; set; }
        public text Image { get; set; }
    }
}
