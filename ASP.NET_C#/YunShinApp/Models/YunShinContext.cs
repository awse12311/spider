// Models/YunShinContext.cs
using Microsoft.EntityFrameworkCore; // Add this line
namespace YunShinApp.Models
{
    public class YunShinContext : DbContext
    {
        public YunShinContext(DbContextOptions<YunShinContext> options) : base(options) { }

        public DbSet<YunShinBasic> YunShinBasic { get; set; }
        public DbSet<YunShinPrint> YunShinPrint { get; set; }
        public DbSet<YunShinPrintSub> YunShinPrintSub { get; set; }
    }

}
