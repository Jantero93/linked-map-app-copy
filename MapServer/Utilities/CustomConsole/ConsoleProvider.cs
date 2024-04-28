namespace MapServer.Utilities.CustomConsole;

public class ConsoleProvider : ILoggerProvider
{
    public ILogger CreateLogger(string categoryName) => new CustomConsole(categoryName);
    public void Dispose() => GC.SuppressFinalize(this);
}
