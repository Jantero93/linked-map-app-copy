using System.Data;
using System.Data.SqlClient;
using MapServer.Store.Repositories;

namespace MapServer;

public static class DependencyInjector
{
    public static void RegisterDependencyInjectionServices(IServiceCollection services)
    {
        // Generic
        services.AddScoped<IDbConnection>(provider => new SqlConnection(provider.GetRequiredService<IConfiguration>().GetConnectionString("MapApplication")));
        services.AddAutoMapper(typeof(Program));
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        // Store
        services.AddScoped<TestRepository>();
        services.AddScoped<LocationRepository>();
    }
}
