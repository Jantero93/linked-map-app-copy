using MapServer.ApiModels.Requests;
using MapServer.Data.DTOs;

namespace MapServer.Services.Interfaces;

public interface ICompanyService
{
    Task<CompanyDto> AddNewCompany(AddNewCompanyRequest request);
    Task<List<CompanyDto>> GetCompanyDtos();
}

