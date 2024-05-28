// Models/YunShinPrintSub.cs
namespace YunShinApp.Models
{
    public class YunShinPrintSub
    {
        public int Id { get; set; }
        public string? P_type { get; set; }
        public string? FileName { get; set; }
        public string? FileRoute { get; set; }
        public string? ID_Name { get; set; }
        public int StartPage { get; set; }
        public int EndPage { get; set; }
        public DateTime DateC { get; set; }
        public DateTime DateM { get; set; }
        public Guid BatchID { get; set; }
        public int Print_id { get; set; }

        public YunShinPrint? Print { get; set; }
    }
}
