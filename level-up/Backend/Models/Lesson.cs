using Backend.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        public string Title { get; set; }
        //public int? Progress { get; set; }
        //public bool Watched { get; set; }
        public string Text { get; set; }
        public string? Notes { get; set; }

        [Display(Name = "Video Url")]
        [Column(TypeName = "nvarchar(100)")]
        public string? VideoUrl { get; set; }

        [Display(Name = "Video Poster Url")]
        [Column(TypeName = "nvarchar(100)")]
        public string? VideoPosterUrl { get; set; }
        //public Course Course { get; set; }
        public Module? Module { get; set; }
        public int Duration { get; set; }
        public List<ApplicationUser> ApplicationUsers { get; set; } = new List<ApplicationUser>();
    }
}
