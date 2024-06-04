using MapServer.Store.Models;

namespace MapServer.Data.Interfaces;

public interface ILocationStore
{
    Task<Location> InsertLocation(Location location);
}
