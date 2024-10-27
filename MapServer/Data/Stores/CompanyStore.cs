using System.Data;
using Dapper;
using MapServer.Data.Interfaces;
using MapServer.Data.Models;

namespace MapServer.Data.Stores;

public class CompanyStore(IDbConnection dbConnection) : ICompanyStore
{
    public async Task<List<Company>> GetAllCompanies()
    {
        var companies = await dbConnection.QueryAsync<Company>("""
                                                               SELECT [Id]
                                                                   ,[Name]
                                                                   ,[EstablishmentDate]
                                                                   ,[ClosureDate]
                                                                   ,[LocationId]
                                                               FROM [MapApplication].[work].[Company]
                                                               """);

        return companies.ToList();
    }

    public async Task<Company> InsertCompany(Company company)
    {
        var newGuid = await dbConnection.QuerySingleOrDefaultAsync<Guid>("""
                                                                         INSERT INTO [work].[Company] (
                                                                          [Name]
                                                                         ,[EstablishmentDate]
                                                                         ,[ClosureDate]
                                                                         ,[LocationId])
                                                                          OUTPUT INSERTED.[Id]
                                                                          VALUES (@Name, @EstablishmentDate, @ClosureDate, @LocationId)
                                                                         """,
            new { company.Name, company.EstablishmentDate, company.ClosureDate, company.LocationId });

        return company with { Id = newGuid };
    }
}
