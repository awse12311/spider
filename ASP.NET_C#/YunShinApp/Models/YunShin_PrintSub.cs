using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YunShinApp.Models
{
    public class YunShin_PrintSub
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(5)]
        public string P_Type { get; set; }

        [Required]
        [StringLength(200)]
        public string FileName { get; set; }

        [Required]
        [StringLength(200)]
        public string FileRoute { get; set; }

        [Required]
        [StringLength(200)]
        public string ID_Name { get; set; }

        [Required]
        public int StartPage { get; set; }

        [Required]
        public int EndPage { get; set; }

        public DateTime DateC { get; set; } = DateTime.Now;
        public DateTime DateM { get; set; } = DateTime.Now;
        public Guid BatchID { get; set; } = Guid.NewGuid();

        [ForeignKey("YunShin_Print")]
        public int Print_Id { get; set; }
        public YunShin_Print Print { get; set; }
    }
}
