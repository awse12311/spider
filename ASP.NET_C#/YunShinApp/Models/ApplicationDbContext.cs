using Microsoft.EntityFrameworkCore;

namespace YunShinApp.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<UserPass> UserPasses { get; set; }
        public DbSet<LoginLog> LoginLogs { get; set; }
        public DbSet<YunShinBasic> YunShinBasic { get; set; }
        public DbSet<YunShinPrint> YunShinPrint { get; set; }
        public DbSet<YunShinPrintSub> YunShinPrintSub { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserPass>()
                .Property(u => u.PasswordHash)
                .HasColumnType("varbinary(128)");
        }
    }
}
