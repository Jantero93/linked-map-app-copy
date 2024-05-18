namespace MapServer.ApiModels.Responses;

public record RequestFailedResponse
{
    public required string Message { get; init; }
}
