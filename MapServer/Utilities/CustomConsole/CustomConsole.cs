namespace MapServer.Utilities.CustomConsole;

using System.Globalization;

public class CustomConsole : ILogger
{
    private readonly string _name;

    public CustomConsole(string name)
    {
        _name = name;
    }

    IDisposable ILogger.BeginScope<TState>(TState state) => default!;

    public bool IsEnabled(LogLevel logLevel) => true;

    public void Log<TState>(
        LogLevel logLevel,
        EventId eventId,
        TState state,
        Exception? exception,
        Func<TState, Exception?,
        string> formatter
    )
    {
        if (!IsEnabled(logLevel))
        {
            return;
        }

        lock (Console.Out)
        {
            var defaultMessageColor = ConsoleColor.Gray;

            Console.Write("[");

            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.Write($"{DateTime.Now.ToString("HH:mm:ss", CultureInfo.InvariantCulture)}");

            Console.ForegroundColor = defaultMessageColor;
            Console.Write("] ");

            Console.ForegroundColor = GetLogLevelColor(logLevel);
            Console.Write($"{ShortenLogLevel(logLevel)}: ");

            Console.ForegroundColor = defaultMessageColor;
            Console.WriteLine(formatter(state, exception));

            Console.Out.Flush();
        }
    }

    private static ConsoleColor GetLogLevelColor(LogLevel logLevel) =>
        logLevel switch
        {
            LogLevel.Critical => ConsoleColor.Red,
            LogLevel.Error => ConsoleColor.Red,
            LogLevel.Warning => ConsoleColor.Yellow,
            LogLevel.Information => ConsoleColor.Green,
            LogLevel.Debug => ConsoleColor.Blue,
            LogLevel.Trace => ConsoleColor.DarkBlue,
            LogLevel.None => ConsoleColor.Gray,
            _ => ConsoleColor.Gray
        };

    private static string ShortenLogLevel(LogLevel logLevel) =>
        logLevel switch
        {
            LogLevel.Information => "INF",
            LogLevel.Warning => "WARN",
            LogLevel.Debug => "DEBUG",
            LogLevel.Trace => "TRACE",
            LogLevel.Error => "ERR",
            LogLevel.Critical => "CRITICAL",
            LogLevel.None => string.Empty,
            _ => "NULL"
        };
}
