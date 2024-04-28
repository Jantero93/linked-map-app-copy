namespace MapServer.ApiModels.Requests;

public record RegisterRequest
{
    public string Username { get; init; } = default!;
    public string Password { get; init; } = default!;
}
