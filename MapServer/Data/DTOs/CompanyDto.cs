namespace MapServer.Data.DTOs;

public record CompanyDto
{
    public required Guid Id { get; init; }
    public required string CompanyName { get; init; }
    public required DateTime EstablishmentDate { get; init; }
    public DateTime? ClosureDate { get; init; }
    public LocationDto? Location { get; init; }
}
