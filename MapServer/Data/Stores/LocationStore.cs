using System.Data;
using Dapper;
using MapServer.Data.Interfaces;
using MapServer.Store.Models;

namespace MapServer.Store.Repositories;

public class LocationStore(IDbConnection dbConnection) : ILocationStore
{
    public async Task<Location> InsertLocation(Location location)
    {
        // Check if the location already exists
        var existingLocationId = await dbConnection.QuerySingleOrDefaultAsync<Guid?>(@"
            SELECT [Id]
            FROM [map].[Location]
            WHERE [Street] = @Street AND [StreetNumber] = @StreetNumber",
            new
            {
                location.Street,
                location.StreetNumber,
            });

        if (existingLocationId.HasValue)
        {
            return location with { Id = existingLocationId.Value };
        }

        // If the location does not exist, insert it
        var newGuid = await dbConnection.QuerySingleAsync<Guid>(@"
            INSERT INTO [map].[Location] (
                [Street],
                [StreetNumber],
                [City],
                [Longitude],
                [Latitude],
                [Suburb],
                [PostalCode])
            OUTPUT INSERTED.[Id]
            VALUES (@Street, @StreetNumber, @City, @Longitude, @Latitude, @Suburb, @PostalCode)",
            new
            {
                location.Street,
                location.StreetNumber,
                location.City,
                location.Longitude,
                location.Latitude,
                location.Suburb,
                location.PostalCode
            });

        return location with { Id = newGuid };
    }
}
