using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OpenIddict.EntityFrameworkCore.Models;

namespace MapServer.OpenIddict;

public class OpenIddictContext(DbContextOptions<OpenIddictContext> options) : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>(options)
{
    public DbSet<OpenIddictEntityFrameworkCoreToken<Guid>> OpenIddictTokens { get; init; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.UseCollation("Finnish_Swedish_CI_AS");
        builder.HasDefaultSchema("openiddict");
        builder.UseOpenIddict<Guid>();
    }
}
