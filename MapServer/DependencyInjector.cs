using System.Data;
using System.Data.SqlClient;
using MapServer.Data.Interfaces;
using MapServer.Data.Repositories;
using MapServer.Data.Stores;
using MapServer.Services;
using MapServer.Services.Interfaces;

namespace MapServer;

public static class DependencyInjector
{
    public static void RegisterDependencyInjectionServices(IServiceCollection services)
    {
        // Generic
        services.AddScoped<IDbConnection>(provider => new SqlConnection(provider.GetRequiredService<IConfiguration>().GetConnectionString("MapApplication")));

        // Repositories
        services.AddScoped<ICompanyStore, CompanyStore>();
        services.AddScoped<ILocationStore, LocationStore>();

        // Services
        services.AddScoped<ICompanyService, CompanyService>();
    }
}
