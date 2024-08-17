using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Backend.Data;

namespace Backend.Models
{
    public class Bookmark
    {
        public int Id { get; set; }

        [Display(Name = "Created At")]
        [Column(TypeName = "DateTime")]
        public DateTime CreatedAt { get; set; }

        public ApplicationUser ApplicationUser { get; set; }
        public Lesson Lesson { get; set; }

    }
}
