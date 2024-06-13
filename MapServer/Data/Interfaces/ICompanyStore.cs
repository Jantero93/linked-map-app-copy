using MapServer.Data.Models;

namespace MapServer.Data.Interfaces;

public interface ICompanyStore
{
    Task<List<Company>> GetAllCompanies();
    Task<Company> InsertCompany(Company company);
}
