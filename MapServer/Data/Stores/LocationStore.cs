using System.Data;
using Dapper;
using MapServer.Data.Interfaces;
using MapServer.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace MapServer.Data.Stores;

public class LocationStore(ApplicationContext ctx, ILogger<ILocationStore> logger) : ILocationStore
{
    public async Task<List<Location>> GetAllLocations() => await ctx.Locations.ToListAsync();

    public async Task<Location> InsertLocation(Location location)
    {
        ctx.Locations.Add(location);
        await ctx.SaveChangesAsync();

        logger.LogInformation("Inserted location with ID {LocationId}", location.Id);

        return location;
    }
}
