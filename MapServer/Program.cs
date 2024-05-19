using MapServer;
using MapServer.Middlewares;
using MapServer.Utilities;
using MapServer.Utilities.CustomConsole;

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

OpenIddictInitializer.SetOpenIddictIdentityConfiguration(builder.Services);
DependencyInjector.RegisterDependencyInjectionServices(builder.Services);

var app = builder.Build();

await OpenIddictInitializer.RegisterOpenIddictClientsAsync(app);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
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
    ApplicationSettings.Environment = GetRequiredConfiguration<string>(configuration, "ASPNETCORE_ENVIRONMENT");

    ApplicationSettings.ConnectionString = GetRequiredConfiguration<string>(
        configuration, "ConnectionStrings:MapApplication"
    );
    ApplicationSettings.OpenIddictTokenLifetime = GetRequiredConfiguration<int>(configuration, "OpenIddictTokenLifetime");
    ApplicationSettings.OpenIddictClientId = GetRequiredConfiguration<string>(configuration, "OpenIddictClientId");
}

static T GetRequiredConfiguration<T>(IConfiguration configuration, string key)
{
    var value = configuration[key] ?? throw new ArgumentNullException($"No value found for key: {key}");
    return configuration.GetValue<T>(key)!;
}

