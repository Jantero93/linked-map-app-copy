namespace MapServer.Data.Models;

public record Company
{
    public Guid Id { get; set; }

    public required string Name { get; init; }

    public required DateTime EstablishmentDate { get; init; }

    public DateTime? ClosureDate { get; init; }

    public Guid LocationId { get; init; }
}
