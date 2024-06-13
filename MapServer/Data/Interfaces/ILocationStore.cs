using MapServer.Store.Models;

namespace MapServer.Data.Interfaces;

public interface ILocationStore
{
    Task<List<Location>> GetAllLocations();
    Task<Location> InsertLocation(Location location);
}
