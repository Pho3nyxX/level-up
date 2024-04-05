using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        [DataType(DataType.Date)]
        public DateTime Duration { get; set; }
        public int Progress { get; set; }
    }
}
