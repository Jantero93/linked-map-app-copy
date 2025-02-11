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
            logger.LogError(ex, "Unhandled exception occurred in ErrorHandlingMiddleware: {@Exception}", ex);

            var result = JsonConvert.SerializeObject(new { Message = $"Uncaught internal server error, {ex.Message}" }, Formatting.Indented);


            context.Response.ContentType = MediaTypeNames.Application.Json;
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            await context.Response.WriteAsync(result);
        }
    }
}
