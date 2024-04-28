namespace MapServer.Utilities;

public static class ApplicationSettings
{
    public static string ConnectionString { get; set; } = default!;
    public static int OpenIddictTokenLifetime { get; set; }
    public static string OpenIddictClientId { get; set; } = default!;
}
