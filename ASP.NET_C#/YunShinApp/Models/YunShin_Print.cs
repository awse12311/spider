using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YunShinApp.Models
{
    public class YunShin_Print
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string CustNumber { get; set; }

        [Required]
        [StringLength(100)]
        public string SammonsNumber { get; set; }

        [Required]
        [StringLength(100)]
        public string OrderNumber { get; set; }

        [Required]
        [StringLength(100)]
        public string DeliveryNumber { get; set; }

        [Required]
        [StringLength(100)]
        public string InvNumber { get; set; }

        [Required]
        public bool P3_F090 { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public bool IsPrint { get; set; }

        public DateTime DateC { get; set; } = DateTime.Now;
        public DateTime DateM { get; set; } = DateTime.Now;
        public Guid BatchID { get; set; } = Guid.NewGuid();

        public ICollection<YunShin_PrintSub> PrintSubs { get; set; } = new List<YunShin_PrintSub>();
    }
}
