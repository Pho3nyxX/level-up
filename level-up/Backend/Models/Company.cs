using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [Display(Name = "Company Information")]
        public string CompanyInformation { get; set; }
        public List<Career> Careers { get; set; } = new List<Career>();
    }
}
