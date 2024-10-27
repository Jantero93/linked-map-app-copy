using System.Data;
using Dapper;
using MapServer.Data.Interfaces;
using MapServer.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace MapServer.Data.Stores;

public class CompanyStore(ApplicationContext ctx, ILogger<CompanyStore> logger) : ICompanyStore
{
    public async Task<List<Company>> GetAllCompanies() =>
        await ctx.Companies
            .Include(c => c.Location)
            .ToListAsync();

    public async Task<Company> InsertCompany(Company company)
    {
        ctx.Companies.Add(company);
        await ctx.SaveChangesAsync();

        logger.LogInformation("Inserted company with ID {CompanyId}", company.Id);

        return company;
    }
}
