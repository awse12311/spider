// Models/YunShinPrint.cs
namespace YunShinApp.Models
{
    public class YunShinPrint
    {
        public int Id { get; set; }
        public required string CustNumber { get; set; }
        public required string SammonsNumber { get; set; }
        public required string OrderNumber { get; set; }
        public required string DeliveryNumber { get; set; }
        public required string InvNumber { get; set; }
        public bool P3_F090 { get; set; }
        public DateTime Date { get; set; }
        public bool IsPrint { get; set; }
        public DateTime DateC { get; set; }
        public DateTime DateM { get; set; }
        public Guid BatchID { get; set; }
    }
}
