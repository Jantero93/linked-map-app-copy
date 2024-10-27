using MapServer.Data;
using MapServer.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OpenIddict.Abstractions;
using OpenIddict.Validation.AspNetCore;

namespace MapServer.OpenIddict;

public static class OpenIddictInitializer
{
    public static void SetOpenIddictIdentityConfiguration(IServiceCollection services)
    {
        services.AddDbContext<ApplicationContext>(options =>
        {
            options.UseSqlServer(ApplicationSettings.ConnectionString);
            options.UseOpenIddict<Guid>();
        });

        services.AddIdentity<ApplicationUser, IdentityRole<Guid>>(options =>
        {
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequiredLength = 1;
        })
          .AddEntityFrameworkStores<ApplicationContext>()
          .AddDefaultTokenProviders();

        services.AddOpenIddict()
          .AddCore(options =>
          {
              options.UseEntityFrameworkCore()
              .UseDbContext<ApplicationContext>()
              .ReplaceDefaultEntities<Guid>();
          })
          .AddServer(options =>
          {
              options.SetTokenEndpointUris("/connect/token");

              options.AllowPasswordFlow();
              options.AllowRefreshTokenFlow();

              var tokenLifetime = TimeSpan.FromMinutes(ApplicationSettings.OpenIddictTokenLifetime);
              options.SetAccessTokenLifetime(tokenLifetime);
              options.AddDevelopmentEncryptionCertificate().AddDevelopmentSigningCertificate();

              options.UseAspNetCore()
              .EnableTokenEndpointPassthrough()
              .EnableAuthorizationEndpointPassthrough()
              .DisableTransportSecurityRequirement();
          })
          .AddValidation(options =>
          {
              options.UseLocalServer();
              options.UseAspNetCore();
              options.EnableTokenEntryValidation();
          });

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
        });
    }

    public static async Task RegisterOpenIddictClientsAsync(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var manager = scope.ServiceProvider.GetRequiredService<IOpenIddictApplicationManager>();

        var client = await manager.FindByClientIdAsync(ApplicationSettings.OpenIddictClientId);

        if (client is null)
        {
            // If the client doesn't exist, create it
            var descriptor = new OpenIddictApplicationDescriptor
            {
                ClientId = ApplicationSettings.OpenIddictClientId,
                ClientType = OpenIddictConstants.ClientTypes.Public,
                Permissions =
                {
                    OpenIddictConstants.Permissions.Endpoints.Token,
                    OpenIddictConstants.Permissions.GrantTypes.Password,
                    OpenIddictConstants.Permissions.GrantTypes.RefreshToken
                }
            };

            await manager.CreateAsync(descriptor);
        }
    }
}
