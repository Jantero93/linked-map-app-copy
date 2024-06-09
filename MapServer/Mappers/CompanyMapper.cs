using MapServer.Data.DTOs;
using MapServer.Data.Models;
using MapServer.Store.Models;

namespace MapServer.Mappers;

public static class CompanyMapper
{
    public static CompanyDto MapLocationAndCompanyToDto(Location l, Company c) => new()
    {
        Id = c.Id,
        CompanyName = c.CompanyName,
        EstablishmentDate = c.EstablishmentDate,
        ClosureDate = c.ClosureDate,
        Location = new()
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
