using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CartwheelDemo.Web
{
    public partial class cartwheel_dbContext : DbContext
    {
        public cartwheel_dbContext()
        {
        }

        public cartwheel_dbContext(DbContextOptions<cartwheel_dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Isauthenticated> Isauthenticated { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Typically, this is put in the web.config and 
            // the config transforms sets the correct dev / prod values
            // on deploy
            optionsBuilder.UseNpgsql("Host=192.168.99.100;Database=cartwheel_db;Username=cartwheel_aluui;Password=cartwheel_t3st_p4ssw0rd");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Isauthenticated>(entity =>
            {
                entity.ToTable("isauthenticated");

                entity.Property(e => e.AuthToken)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Isauthenticated)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("isauthenticated_UserId_fkey");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Email)
                    .HasName("users_Email_key")
                    .IsUnique();

                entity.Property(e => e.CompanyName).HasMaxLength(255);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(355);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.Password).HasMaxLength(50);
            });
        }
    }
}
