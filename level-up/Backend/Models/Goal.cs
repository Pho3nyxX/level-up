using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Goal
    {
        public int Id { get; set; }
        public string Title { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        public string Description { get; set; }
        public bool isComplete { get; set; }

        [Display(Name = "Target Completion Date")]
        [DataType(DataType.Date)]
        public DateTime TargetCompletionDate { get; set; }

        [Display(Name = "Date Created")]
        public DateTime DateCreated { get; set; }

        [Display(Name = "Date Modified")]
        public DateTime DateModified { get; set; }



    }
}
