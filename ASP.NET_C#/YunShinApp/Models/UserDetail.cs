using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YunShinApp.Models
{
    public class UserDetail
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        [StringLength(200)]
        public required string FullName { get; set; }

        [StringLength(200)]
        public required string Email { get; set; }

        [StringLength(20)]
        public required string Phone { get; set; }

        [StringLength(500)]
        public required string Address { get; set; }

        public DateTime DateC { get; set; } = DateTime.Now;
        public DateTime DateM { get; set; } = DateTime.Now;
        public Guid BatchID { get; set; } = Guid.NewGuid();

        public required User User { get; set; }
    }
}
