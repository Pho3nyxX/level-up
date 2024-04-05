using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Career
    {
        public int Id { get; set; }
        public string PathName { get; set; }
        public string Description { get; set; }

        [Display(Name = "Course Duration")]
        [DataType(DataType.Date)]
        public DateTime CourseDuration { get; set; }

        [Display(Name = "Total Number Accepted")]
        public int TotalNumberAccepted { get; set; }

        [Display(Name = "Average Salary")]
        public double AverageSalary { get; set; }

        public string Knowledge { get; set; }
        public string Duties { get; set; }
        public string Abilities { get; set; }
    }
}
