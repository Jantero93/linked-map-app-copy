using MapServer.Data.DTOs;
using MapServer.Data.Models;
using MapServer.Store.Models;

namespace MapServer.Mappers;

public static class CompanyMapper
{
    public static CompanyDto MapLocationAndCompanyToDto(Location l, Company c) => new()
    {
        Id = c.Id,
        Name = c.Name,
        EstablishmentDate = c.EstablishmentDate,
        ClosureDate = c.ClosureDate,
        Location = new LocationDto()
        {
            Id = l.Id,
            City = l.City,
            Latitude = l.Latitude,
            Longitude = l.Longitude,
            RoadNumber = l.StreetNumber,
            Street = l.Street,
            PostalCode = l.PostalCode,
            Suburban = l.Suburb
        }
    };
}
