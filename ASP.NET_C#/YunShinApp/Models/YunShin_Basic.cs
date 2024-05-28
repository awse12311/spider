using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YunShinApp.Models
{
    public class YunShin_Basic
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string ID_Name { get; set; }

        [Required]
        [StringLength(10)]
        public string P_Type { get; set; }

        [Required]
        [StringLength(200)]
        public string FileName { get; set; }

        [Required]
        [StringLength(400)]
        public string FileRoute { get; set; }

        [Required]
        public int Page { get; set; }

        public DateTime DateC { get; set; } = DateTime.Now;
        public DateTime DateM { get; set; } = DateTime.Now;
        public Guid BatchID { get; set; } = Guid.NewGuid();
    }
}
