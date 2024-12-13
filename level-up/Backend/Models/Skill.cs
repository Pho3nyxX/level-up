namespace Backend.Models
{
    public class Skill
    {   
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Career> Careers { get; set; } = new List<Career>();
    }
}
