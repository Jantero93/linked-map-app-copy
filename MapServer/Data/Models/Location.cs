using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MicroOrm.Dapper.Repositories.Attributes;

namespace MapServer.Store.Models;

[Table("Location", Schema = "map")]
public record Location
{
    [Key]
    [Identity]
    public required Guid Id { get; init; }
    [Required]
    public required decimal Longitude { get; init; }
    [Required]
    public required decimal Latitude { get; init; }
    public string? Street { get; init; }
    public string? RoadNumber { get; init; }
    public string? Suburban { get; init; }
    public string? City { get; init; }
    public string? PostalCode { get; init; }
}
