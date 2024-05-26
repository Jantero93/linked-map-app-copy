using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MicroOrm.Dapper.Repositories.Attributes;

namespace MapServer.Data.Models;

[Table("WorkExperience", Schema = "work")]
public record WorkExperience
{
    [Key]
    [Identity]
    public required Guid Id { get; init; }

    public required string Position { get; init; }

    public string? Description { get; init; }

    public required DateTime StartDate { get; init; }

    public DateTime? EndDate { get; init; }

    public required bool PartTime { get; init; }

    [ForeignKey("FK_WorkExperience_Company")]
    public required Guid CompanyId { get; init; }

    [ForeignKey("FK_WorkExperience_AspNetUsers")]
    public required Guid UserId { get; init; }

}
