using System.ComponentModel.DataAnnotations;

namespace MapServer.Data.Models;

public class Location
{
    public Guid Id { get; init; }
    [MaxLength(255)] public string Street { get; init; } = string.Empty;
    [MaxLength(255)] public string StreetNumber { get; init; } = string.Empty;
    [MaxLength(255)] public string City { get; init; } = string.Empty;
    public double Longitude { get; init; }
    public double Latitude { get; init; }
    [MaxLength(255)] public string? Suburb { get; init; }
    [MaxLength(255)] public string? PostalCode { get; init; }

    // Navigation properties
    public ICollection<Company> Companies { get; init; } = [];
}
