using MapServer.Data.Models;
using MapServer.OpenIddict;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OpenIddict.EntityFrameworkCore.Models;

namespace MapServer.Data;

public class ApplicationContext(DbContextOptions<ApplicationContext> options)
    : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>(options)
{
    public DbSet<OpenIddictEntityFrameworkCoreToken<Guid>> OpenIddictTokens { get; init; }
    public DbSet<Company> Companies { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<WorkExperience> WorkExperiences { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.UseCollation("Finnish_Swedish_CI_AS");
        builder.HasDefaultSchema("openiddict");
        builder.UseOpenIddict<Guid>();

        builder.Entity<Company>()
            .HasOne(c => c.Location)
            .WithMany(l => l.Companies)
            .HasForeignKey(c => c.LocationId);

        builder.Entity<WorkExperience>()
            .HasOne(w => w.User)
            .WithMany(u => u.WorkExperiences) // Assuming User has ICollection<WorkExperience>
            .HasForeignKey(w => w.UserId);

        base.OnModelCreating(builder);
    }
}
