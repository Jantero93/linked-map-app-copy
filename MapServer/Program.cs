using System.Data;
using MapServer.Middlewares;
using MapServer.OpenIddict;
using MapServer.Store.Repositories;
using MapServer.Utilities;
using MapServer.Utilities.CustomConsole;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using OpenIddict.Abstractions;
using OpenIddict.Validation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

/* Add custom logging */
builder.Logging.ClearProviders();
builder.Logging.AddProvider(new ConsoleProvider());

var configuration = builder.Configuration;
ConfigureAppSettings(configuration);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

app.UseMiddleware<RequestLoggerMiddleware>();
app.UseMiddleware<SecurityHeaderMiddleware>();
app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseRouting();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

using var scope = app.Services.CreateScope();

var tokenRevocationService = scope.ServiceProvider.GetRequiredService<TokenRevocationService>();
await tokenRevocationService.StartAsync(CancellationToken.None);

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
static void InjectDependencies(IServiceCollection services)
{
    // Generic
    services.AddScoped<IDbConnection>(provider => new SqlConnection(provider.GetRequiredService<IConfiguration>().GetConnectionString("MapApplication")));
    services.AddAutoMapper(typeof(Program));
    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    services.AddScoped<TokenRevocationService>();

    // Store
    services.AddScoped<TestRepository>();
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
