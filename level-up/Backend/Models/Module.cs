namespace Backend.Models
{
    public class Module
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Course Course { get; set; }
        public List<Lesson>? Lessons { get; set; }
    }
}
