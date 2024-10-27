using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MapServer.Data.Models;

[Table("Companies", Schema = "company")]
public class Company
{
    public Guid Id { get; init; }
    [MaxLength(255)] public string Name { get; init; } = string.Empty;
    public DateTime EstablishmentDate { get; init; }
    public DateTime? ClosureDate { get; init; }
    public Guid LocationId { get; init; }
    // Navigation properties
    public Location Location { get; init; } = new();
}
