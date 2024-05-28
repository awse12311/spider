using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YunShinApp.Models
{
    public class UserPass
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        public required byte[] PasswordHash { get; set; }

        public DateTime DateC { get; set; } = DateTime.Now;
        public DateTime DateM { get; set; } = DateTime.Now;
        public Guid BatchID { get; set; } = Guid.NewGuid();

        public required User User { get; set; }
    }
}
