using System.Data;
using Dapper;
using MapServer.Data.Interfaces;
using MapServer.Data.Models;

namespace MapServer.Data.Repositories;

public class CompanyStore(IDbConnection dbConnection) : ICompanyStore
{
    public async Task<Company> InsertCompany(Company company)
    {
        var newGuid = await dbConnection.QuerySingleAsync<Guid>(@"
            INSERT INTO [work].[Company] (
            [Name]
           ,[EstablishmentDate]
           ,[ClosureDate]
           ,[LocationId])
            OUTPUT INSERTED.[Id]
            VALUES (@CompanyName, @EstablishmentDate, @ClosureDate, @LocationId)",
            new
            {
                company.CompanyName,
                company.EstablishmentDate,
                company.ClosureDate,
                company.LocationId
            });

        return company with { Id = newGuid };
    }
}
