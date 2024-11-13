using System.ComponentModel.DataAnnotations;
using MapServer.OpenIddict;

namespace MapServer.Data.Models;

public class WorkExperience
{
    public required Guid Id { get; init; }
    [MaxLength(255)] public required string Position { get; init; }
    [MaxLength(255)] public string? Description { get; init; }
    public required DateTime StartDate { get; init; }
    public DateTime? EndDate { get; init; }
    public required bool PartTime { get; init; }
    public required Guid CompanyId { get; init; }
    public required Guid UserId { get; init; }

    // Navigation properties
    public Company Company { get; init; } = new();
    public ApplicationUser User { get; init; } = new();
}
