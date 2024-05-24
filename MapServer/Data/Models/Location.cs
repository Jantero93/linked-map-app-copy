using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MapServer.Store.Models;

[Table("Location", Schema = "map")]
public record Location
{
    [Key]
    public required string Street { get; init; }

    [Key]
    public required string StreetNumber { get; init; }

    [Required]
    public required decimal Longitude { get; init; }

    [Required]
    public required decimal Latitude { get; init; }

    public string? Suburban { get; init; }
    public string? City { get; init; }
    public string? PostalCode { get; init; }
}
