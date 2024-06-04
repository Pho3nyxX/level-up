using Backend.Data;

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
        public string? Video { get; set; }
        //public Course Course { get; set; }
        public Module? Module { get; set; }
        public int Duration { get; set; }
        public List<ApplicationUser> ApplicationUsers { get; set; } = new List<ApplicationUser>();
    }
}
