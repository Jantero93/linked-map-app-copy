namespace MapServer.Middlewares;

public class SecurityHeaderMiddleware(RequestDelegate next)
{
    public async Task Invoke(HttpContext context)
    {
        context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
        context.Response.Headers.Append("X-Frame-Options", "DENY");
        context.Response.Headers.Append("Content-Security-Policy", "default-src 'self'; script-src 'self'");
        context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");

        await next(context);
    }
}
