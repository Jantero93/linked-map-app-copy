namespace MapServer.Data.DTOs;

public record LocationDto
{
    public required Guid Id { get; init; }
    public required decimal Longitude { get; init; }
    public required decimal Latitude { get; init; }
    public string? Street { get; init; }
    public string? RoadNumber { get; init; }
    public string? Suburban { get; init; }
    public string? City { get; init; }
    public string? PostalCode { get; init; }
}
