namespace Backend.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Progress { get; set; }
        public bool Watched { get; set; }
        public string Text { get; set; }
        public string Notes { get; set; }
        public string Video { get; set; }
    }
}
