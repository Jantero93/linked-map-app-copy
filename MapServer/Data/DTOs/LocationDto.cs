namespace MapServer.Data.DTOs;

public record LocationDto
{
    public required Guid Id { get; init; }
    public required double Longitude { get; init; }
    public required double Latitude { get; init; }
    public required string Street { get; init; }
    public required string RoadNumber { get; init; }
    public string? Suburban { get; init; }
    public string? City { get; init; }
    public string? PostalCode { get; init; }
}
