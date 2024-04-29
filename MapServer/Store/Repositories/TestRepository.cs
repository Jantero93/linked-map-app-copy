using System.Data;
using MapServer.Store.Models;
using MicroOrm.Dapper.Repositories;

namespace MapServer.Store.Repositories;

public class TestRepository(IDbConnection dbConnection) : DapperRepository<TestModel>(dbConnection)
{

}
