using Newtonsoft.Json;
using System.Net.Mime;

namespace MapServer.Middlewares;

public class ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError("Unhandled exception occurred Exception: {@Exception}", ex);
            var result = JsonConvert.SerializeObject(new { Message = "Uncaught internal server error" });

            context.Response.ContentType = MediaTypeNames.Application.Json;
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            await context.Response.WriteAsync(result);
        }
    }
}
