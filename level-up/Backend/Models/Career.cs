using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Career
    {
        public int Id { get; set; }
        public string PathName { get; set; }
        public string Description { get; set; }

        [Display(Name = "Short Description")]
        [Column(TypeName = "nvarchar(100)")]
        public string? ShortDescription { get; set; }


        [Display(Name = "Average Salary")]
        public double AverageSalary { get; set; }

        public string Knowledge { get; set; }
        public string Duties { get; set; }
        public string Abilities { get; set; }
        public List<Company> Companies { get; set; } = new List<Company>();
        public List<Industry> Industries { get; set; } = new List<Industry>();
        public List<Testimony> Testimonies { get; set; } = new List<Testimony>();
        public List<Skill> Skills { get; set; } = new List<Skill>();
    }
}
