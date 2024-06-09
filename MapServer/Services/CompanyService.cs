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
    ICompanyStore companyRepository,
    ILocationStore locationRepository
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

        var location = await locationRepository.InsertLocation(companyLocation);

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

        var company = await companyRepository.InsertCompany(newCompany);

        logger.LogInformation("Added to db new Company with Id: {Id}", company.Id);

        var dto = CompanyMapper.MapLocationAndCompanyToDto(location, company);

        logger.LogInformation("Returning new CompanyDto: {@CompanyDto}", dto);

        return dto;
    }
}
