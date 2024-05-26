using System.Data;
using MapServer.Data.Models;
using MicroOrm.Dapper.Repositories;

namespace MapServer.Store.Repositories;

public class WorkExperienceRepository(IDbConnection dbConnection)
    : DapperRepository<WorkExperience>(dbConnection)
{
}
