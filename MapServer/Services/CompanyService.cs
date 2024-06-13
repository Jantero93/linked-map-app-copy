using MapServer.ApiModels.Requests;
using MapServer.Data.DTOs;
using MapServer.Data.Interfaces;
using MapServer.Data.Models;
using MapServer.Mappers;
using MapServer.Services.Interfaces;
using MapServer.Store.Models;

namespace MapServer.Services;

public class CompanyService(
    ILogger<ICompanyService> logger,
    ICompanyStore companyStore,
    ILocationStore locationStore
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

        var location = await locationStore.InsertLocation(companyLocation);

        logger.LogInformation("Added to db new Location with Id: {Id}", location.Id);

        // Reset Datetime 
        var establishmentDate = request.EstablishmentDate.ToUniversalTime().Date;

        Company newCompany = new()
        {
            CompanyName = request.CompanyName,
            EstablishmentDate = establishmentDate,
            ClosureDate = null,
            LocationId = location.Id
        };

        var company = await companyStore.InsertCompany(newCompany);

        logger.LogInformation("Added to db new Company with Id: {Id}", company.Id);

        var dto = CompanyMapper.MapLocationAndCompanyToDto(location, company);

        logger.LogInformation("Returning new CompanyDto: {@CompanyDto}", dto);

        return dto;
    }

    public async Task<List<CompanyDto>> GetCompanyDtos()
    {
        logger.LogInformation("Getting all company dtos");

        var companies = await companyStore.GetAllCompanies();
        var location = await locationStore.GetAllLocations();

        var dtos = companies.Join(location,
            c => c.LocationId,
            l => l.Id,
            (c, l) => CompanyMapper.MapLocationAndCompanyToDto(l, c)
            ).ToList();

        logger.LogInformation("Found {Count} company dtos", dtos.Count);

        return dtos;
    }
}
