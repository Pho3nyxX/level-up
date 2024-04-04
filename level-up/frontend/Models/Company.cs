using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [Display(Name = "Company Information")]
        public string CompanyInformation { get; set; }
    }
}
