using System;

namespace TacoTuesday.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Summary { get; set; }
        public string Body { get; set; }
        public int Stars { get; set; }
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        // Review belongs to one user, adds the db col for associated user
        public int UserId { get; set; }
        // Review belongs to one restaurant
        public int RestaurantId { get; set; }
        // The actual associated object
        public User User { get; set; }
        // Same here, the actual associated object
        public Restaurant Restaurant { get; set; }
    }
}