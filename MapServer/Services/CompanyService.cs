using MapServer.ApiModels.Requests;
using MapServer.Data.DTOs;
using MapServer.Data.Interfaces;
using MapServer.Data.Models;
using MapServer.Mappers;
using MapServer.Services.Interfaces;

namespace MapServer.Services;

public class CompanyService(
    ILogger<ICompanyService> logger,
    ICompanyStore companyStore
) : ICompanyService
{
    public async Task<CompanyDto> AddNewCompany(AddNewCompanyRequest request)
    {
        Location companyLocation = new()
        {
            City = request.City,
            Latitude = request.Latitude,
            Longitude = request.Longitude,
            Street = request.StreetAddress,
            StreetNumber = request.StreetNumber,
            PostalCode = request.PostalCode,
            Suburb = request.Suburb
        };

        // Reset Datetime
        var establishmentDate = request.EstablishmentDate.ToUniversalTime().Date;

        Company newCompany = new()
        {
            Name = request.CompanyName,
            EstablishmentDate = establishmentDate,
            ClosureDate = null,
            Location = companyLocation
        };

        var company = await companyStore.InsertCompany(newCompany);

        logger.LogInformation("Added to db new Company with Id: {Id}", company.Id);

        var dto = CompanyMapper.MapLocationAndCompanyToDto(company);
        return dto;
    }

    public async Task<List<CompanyDto>> GetCompanyDtos()
    {
        logger.LogInformation("Getting all company dtos with location");

        var companies = await companyStore.GetAllCompanies();

        var companiesDtos = companies.Select(CompanyMapper.MapLocationAndCompanyToDto).ToList();

        logger.LogInformation("Found {Count} company dtos", companiesDtos.Count);

        return companiesDtos;
    }
}
