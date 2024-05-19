using System.Globalization;
using System.Text.RegularExpressions;

namespace MapServer.Utilities.CustomConsole;

public partial class CustomConsole(string name) : ILogger
{
    public string Name { get; init; } = name;
    private const ConsoleColor ObjectMessageColor = ConsoleColor.Cyan;
    private const ConsoleColor TimeStampColor = ConsoleColor.Green;
    private const ConsoleColor DefaultLogMessageColor = ConsoleColor.Gray;

    IDisposable ILogger.BeginScope<TState>(TState state) => default!;

    public bool IsEnabled(LogLevel logLevel) => true;

    public void Log<TState>(
        LogLevel logLevel,
        EventId eventId,
        TState state,
        Exception? exception,
        Func<TState, Exception?, string> formatter
    )
    {
        if (!IsEnabled(logLevel))
        {
            return;
        }

        lock (Console.Out)
        {
            Console.Write('[');

            Console.ForegroundColor = TimeStampColor;
            Console.Write($"{DateTime.Now.ToString("HH:mm:ss", CultureInfo.InvariantCulture)}");

            Console.ForegroundColor = DefaultLogMessageColor;
            Console.Write("] ");

            Console.ForegroundColor = GetLogLevelColor(logLevel);
            Console.Write($"{ShortenLogLevel(logLevel)}: ");

            Console.ForegroundColor = DefaultLogMessageColor;

            var message = formatter(state, exception);
            WriteColoredMessage(message);

            Console.Out.Flush();
        }
    }

    private static void WriteColoredMessage(string message)
    {
        var regex = ObjectAndArrayFinderRegex();
        var matches = regex.Matches(message);
        var lastIndex = 0;

        foreach (var match in matches.Cast<Match>())
        {
            Console.ForegroundColor = DefaultLogMessageColor;
            Console.Write(message[lastIndex..match.Index]);

            Console.ForegroundColor = ObjectMessageColor;
            Console.Write(match.Value);

            lastIndex = match.Index + match.Length;
        }

        Console.ForegroundColor = DefaultLogMessageColor;
        if (lastIndex < message.Length)
        {
            Console.Write(message[lastIndex..]);
        }

        Console.WriteLine();
    }

    private static ConsoleColor GetLogLevelColor(LogLevel logLevel) =>
        logLevel switch
        {
            LogLevel.Trace => ConsoleColor.DarkGray,
            LogLevel.Debug => ConsoleColor.Blue,
            LogLevel.Information => ConsoleColor.Cyan,
            LogLevel.Warning => ConsoleColor.Yellow,
            LogLevel.Error => ConsoleColor.Red,
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



    [GeneratedRegex(@"{[^{}]*}|\[[^\[\]]*\]")]
    private static partial Regex ObjectAndArrayFinderRegex();
}
