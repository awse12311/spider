// Models/YunShinBasic.cs
namespace YunShinApp.Models
{
    public class YunShinBasic
    {
        public int Id { get; set; }
        public required string ID_Name { get; set; }
        public required string P_Type { get; set; }
        public required string FileName { get; set; }
        public required string FileRoute { get; set; }
        public int Page { get; set; }
        public DateTime DateC { get; set; }
        public DateTime DateM { get; set; }
        public Guid BatchID { get; set; }
    }
}
