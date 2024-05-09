using Backend.Data;

namespace Backend.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int Stars {  get; set; }
        public string Comment { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified {  get; set; }
        public ApplicationUser? User { get; set; }
        public Course? Course { get; set; }
    }
}
