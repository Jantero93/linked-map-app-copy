using System.Globalization;

namespace MapServer.Utilities.CustomConsole;


#pragma warning disable CS9113 // Parameter is unread.
public class CustomConsole(string name) : ILogger
#pragma warning restore CS9113 // Parameter is unread.
{
    IDisposable ILogger.BeginScope<TState>(TState state) => default!;

    //TODO: Remove debug, trace on test/production
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
            LogLevel.Trace => ConsoleColor.DarkGray,
            LogLevel.Debug => ConsoleColor.Blue,
            LogLevel.Information => ConsoleColor.Green,
            LogLevel.Warning => ConsoleColor.DarkYellow,
            LogLevel.Error => ConsoleColor.DarkRed,
            LogLevel.Critical => ConsoleColor.Red,
            LogLevel.None => ConsoleColor.Gray,
            _ => ConsoleColor.Gray
        };

    private static string ShortenLogLevel(LogLevel logLevel) =>
        logLevel switch
        {
            LogLevel.Trace => "TRACE",
            LogLevel.Debug => "DEBUG",
            LogLevel.Information => "INF",
            LogLevel.Warning => "WARN",
            LogLevel.Error => "ERR",
            LogLevel.Critical => "CRITICAL",
            LogLevel.None => string.Empty,
            _ => "UNDEFINED"
        };
}
