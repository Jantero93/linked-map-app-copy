using System.Data;
using MapServer.Data.Models;
using MicroOrm.Dapper.Repositories;

namespace MapServer.Data.Repositories;

public class CompanyRepository(IDbConnection dbConnection) : DapperRepository<Company>(dbConnection)
{
}
