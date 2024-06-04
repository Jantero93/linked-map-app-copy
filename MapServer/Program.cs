using MapServer;
using MapServer.Middlewares;
using MapServer.OpenIddict;
using MapServer.Utilities;
using MapServer.Utilities.Constants;
using MapServer.Utilities.CustomConsole;

var builder = WebApplication.CreateBuilder(args);
var env = builder.Environment.EnvironmentName;

/* Add custom logging */
if (env is EnvironmentNames.Development)
{
    builder.Logging.ClearProviders();
    builder.Logging.AddProvider(new ConsoleProvider());
}
else
{
    builder.Logging.AddConsole();
}

var configuration = builder.Configuration;
ConfigureAppSettings(configuration);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

OpenIddictInitializer.SetOpenIddictIdentityConfiguration(builder.Services);
DependencyInjector.RegisterDependencyInjectionServices(builder.Services);

var app = builder.Build();

await OpenIddictInitializer.RegisterOpenIddictClientsAsync(app);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MapServer API v1"));
}

app.UseCors(options =>
{
    options.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyHeader();
});

app.UseMiddleware<RequestLoggerMiddleware>();
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
    ApplicationSettings.ConnectionString = GetRequiredConfiguration<string>(
        configuration, "ConnectionStrings:MapApplication"
    );
    ApplicationSettings.OpenIddictTokenLifetime = GetRequiredConfiguration<int>(configuration, "OpenIddictTokenLifetime");
    ApplicationSettings.OpenIddictClientId = GetRequiredConfiguration<string>(configuration, "OpenIddictClientId");
}

static T GetRequiredConfiguration<T>(IConfiguration configuration, string key)
{
    var value = configuration[key];
    ArgumentException.ThrowIfNullOrEmpty(value);
    return configuration.GetValue<T>(key)!;
}

