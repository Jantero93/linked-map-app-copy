using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MicroOrm.Dapper.Repositories.Attributes;

namespace MapServer.Data.Models;

[Table("Workplace", Schema = "work")]
public class Company
{
    [Key]
    [Identity]
    public required Guid Id { get; init; }

    [Required]
    public required string CompanyName { get; init; }

    [Required]
    public required DateTime EstablishmentDate { get; init; }

    public DateTime ClosureDate { get; init; }

    [Required]
    public required Guid LocationId { get; init; }
}
