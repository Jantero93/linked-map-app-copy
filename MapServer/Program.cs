using MapServer.Middlewares;
using MapServer.OpenIddict;
using MapServer.Utilities;
using MapServer.Utilities.CustomConsole;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OpenIddict.Abstractions;
using OpenIddict.Validation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

/* Add custom logging */
builder.Logging.ClearProviders();
builder.Logging.AddProvider(new ConsoleProvider());

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var configuration = builder.Configuration;
ConfigureAppSettings(configuration);

SetOpenIddictIdentityConfiguration(builder.Services);
InjectDependencies(builder.Services);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

await RegisterOpenIddictClientsAsync(app);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseMiddleware<SecurityHeaderMiddleware>();
app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseRouting();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

static void ConfigureAppSettings(ConfigurationManager configuration)
{
    ApplicationSettings.ConnectionString = configuration.GetConnectionString("MapApplication")
    ?? throw new ArgumentNullException("No database connection string in appSettings");

    ApplicationSettings.OpenIddictTokenLifetime = int.Parse(
        configuration["OpenIddictTokenLifetime"] ?? throw new ArgumentNullException("No OpenIddictTokenLifetime in appSettings")
    );

    ApplicationSettings.OpenIddictClientId = configuration["OpenIddictClientId"]
        ?? throw new ArgumentNullException("No OpenIddictClientId");
}
static void SetOpenIddictIdentityConfiguration(IServiceCollection services)
{
    // Only for OpenIddict
    services.AddDbContext<ApplicationDbContext>(options =>
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
      .AddEntityFrameworkStores<ApplicationDbContext>()
      .AddDefaultTokenProviders();

    services.AddAuthentication(
        options => options.DefaultScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme
    );

    services.AddOpenIddict()
      .AddCore(options =>
      {
          options.UseEntityFrameworkCore()
          .UseDbContext<ApplicationDbContext>()
          .ReplaceDefaultEntities<Guid>();
      })
      .AddServer(options =>
      {
          options.SetTokenEndpointUris("/connect/token");
          options.UseAspNetCore().EnableTokenEndpointPassthrough().DisableTransportSecurityRequirement();
          options.AllowPasswordFlow();
          options.AllowRefreshTokenFlow();
          options.AddDevelopmentEncryptionCertificate().AddDevelopmentSigningCertificate();

          var tokenLifetime = TimeSpan.FromMinutes(ApplicationSettings.OpenIddictTokenLifetime);
          options.SetAccessTokenLifetime(tokenLifetime);
      })
      .AddValidation(options =>
      {
          options.UseLocalServer();
          options.UseAspNetCore();
      });
}
static void InjectDependencies(IServiceCollection services)
{
    // Generic
    services.AddAutoMapper(typeof(Program));
    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
}

static async Task RegisterOpenIddictClientsAsync(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var manager = scope.ServiceProvider.GetRequiredService<IOpenIddictApplicationManager>();

    var clientId = ApplicationSettings.OpenIddictClientId;
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
