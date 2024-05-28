using Microsoft.EntityFrameworkCore;

namespace YunShinApp.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<YunShin_Basic> YunShin_Basics { get; set; }
        public DbSet<YunShin_Print> YunShin_Prints { get; set; }
        public DbSet<YunShin_PrintSub> YunShin_PrintSubs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<UserPass> UserPasses { get; set; }
        public DbSet<LoginLog> LoginLogs { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuring relationships for YunShin_Print and YunShin_PrintSub
            modelBuilder.Entity<YunShin_Print>()
                .HasMany(p => p.PrintSubs)
                .WithOne(ps => ps.Print)
                .HasForeignKey(ps => ps.Print_Id);

            // Configuring relationships for User, UserDetail, UserPass, and LoginLog
            modelBuilder.Entity<User>()
                .HasOne(u => u.UserDetail)
                .WithOne(d => d.User)
                .HasForeignKey<UserDetail>(d => d.UserId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.UserPasses)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.LoginLogs)
                .WithOne(l => l.User)
                .HasForeignKey(l => l.UserId);
        }
    }
}
