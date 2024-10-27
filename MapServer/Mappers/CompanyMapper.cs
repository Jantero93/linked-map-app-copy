using MapServer.Data.DTOs;
using MapServer.Data.Models;

namespace MapServer.Mappers;

public static class CompanyMapper
{
    public static CompanyDto MapLocationAndCompanyToDto(Company c) => new()
    {
        Id = c.Id,
        Name = c.Name,
        EstablishmentDate = c.EstablishmentDate,
        ClosureDate = c.ClosureDate,
        Location = new LocationDto
        {
            Id = c.Location.Id,
            City = c.Location.City,
            Latitude = c.Location.Latitude,
            Longitude = c.Location.Longitude,
            RoadNumber = c.Location.StreetNumber,
            Street = c.Location.Street,
            PostalCode = c.Location.PostalCode,
            Suburban = c.Location.Suburb
        }
    };
}
