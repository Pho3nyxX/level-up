namespace Backend.Models
{
    public class Roadmap
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? Order { get; set; }
        public string? Group { get; set; }

    }
}
