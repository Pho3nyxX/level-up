namespace Backend.Models
{
    public class Industry
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Career> Careers { get; set; } = new List<Career>();
    }
}
