namespace MapServer.Data.Models;

public record WorkExperience
{
    public required Guid Id { get; init; }
    public required string Position { get; init; }
    public string? Description { get; init; }
    public required DateTime StartDate { get; init; }
    public DateTime? EndDate { get; init; }
    public required bool PartTime { get; init; }
    public required Guid CompanyId { get; init; }
    public required Guid UserId { get; init; }
}
