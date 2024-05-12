namespace MapServer.ApiModels.Responses;

public record RequestFailedResponse
{
    public string Message { get; init; } = default!;
}
