using Microsoft.Net.Http.Headers;

namespace MapServer.Middlewares;

public class RequestLoggerMiddleware(RequestDelegate next, ILogger<RequestLoggerMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var method = context.Request.Method;
        var path = context.Request.Path;

        logger.LogDebug("Request Method: {RequestMethod}, Request Path: {RequestPath}", method, path);

        var queryParamsDict = context.Request.Query.ToDictionary(q => q.Key, q => q.Value.ToString());
        if (queryParamsDict.Count > 0)
        {
            logger.LogDebug("Query Params: {@QueryParams}", queryParamsDict);
        }

        var headersDict = context.Request.Headers.ToDictionary(h => h.Key, h => h.Value.ToString());
        if (headersDict.ContainsKey(HeaderNames.Authorization))
        {
            headersDict[HeaderNames.Authorization] = "[redacted]";
        }

        if (headersDict.Count > 0)
        {
            logger.LogDebug("Headers: {@Headers}", headersDict);
        }

        await next(context);
    }
}
