using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MicroOrm.Dapper.Repositories.Attributes;

namespace MapServer.Store.Models;

[Table("TestTable", Schema = "test")]
public record TestModel
{
    [Key]
    [Identity]
    public required Guid Id { get; init; }

    public int? NumberValue { get; init; }

    public string? StringValue { get; init; }
}
