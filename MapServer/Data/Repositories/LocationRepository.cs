using System.Data;
using MapServer.Store.Models;
using MicroOrm.Dapper.Repositories;

namespace MapServer.Store.Repositories;

public class LocationRepository(IDbConnection dbConnection) : DapperRepository<Location>(dbConnection)
{
}
