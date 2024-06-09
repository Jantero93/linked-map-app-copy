using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace MapServer.Store.Models;

public record Location
{
    public Guid Id { get; init; }
    public required string Street { get; init; }
    public required string StreetNumber { get; init; }
    public required string City { get; init; }
    public required double Longitude { get; init; }
    public required double Latitude { get; init; }
    public string? Suburb { get; init; }
    public string? PostalCode { get; init; }
}
