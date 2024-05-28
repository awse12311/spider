using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YunShinApp.Models
{
    public class LoginLog
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public DateTime LoginTime { get; set; } = DateTime.Now;

        [StringLength(50)]
        public required string IPAddress { get; set; }

        public required User User { get; set; }
    }
}
