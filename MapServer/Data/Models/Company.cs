using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MicroOrm.Dapper.Repositories.Attributes;

namespace MapServer.Data.Models;

[Table("Workplace", Schema = "work")]
public record Company
{
    [Key]
    [Identity]
    public required Guid Id { get; init; }

    public required string CompanyName { get; init; }

    public required DateTime EstablishmentDate { get; init; }

    public DateTime? ClosureDate { get; init; }

    public required Guid LocationId { get; init; }
}
