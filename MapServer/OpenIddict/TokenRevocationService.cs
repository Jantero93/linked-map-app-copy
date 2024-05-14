using OpenIddict.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace MapServer.OpenIddict;

public class TokenRevocationService(ILogger<TokenRevocationService> logger, ApplicationDbContext context) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            logger.LogInformation("Attempting to delete revoked tokens from database");

            await RevokeExpiredTokens(stoppingToken);
            await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
        }
    }

    private async Task RevokeExpiredTokens(CancellationToken cancellationToken)
    {
        try
        {
            var revokedTokens = await context.OpenIddictTokens
             .AsNoTracking()
             .Where(x => x.Status == OpenIddictConstants.Statuses.Revoked)
             .ToListAsync(cancellationToken);

            logger.LogDebug("Deleting count of {Count} of revoked tokens", revokedTokens.Count);

            context.RemoveRange(revokedTokens);

            await context.SaveChangesAsync(cancellationToken);

            logger.LogInformation("Successfully removed tokens with 'Revoked' status");
        }
        catch
        {
            logger.LogCritical("Failed to remove revoked tokens");
        }
    }

    public override async Task StartAsync(CancellationToken cancellationToken)
    {
        logger.LogInformation("Token Revocation Service is starting.");
        await ExecuteAsync(cancellationToken);
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        logger.LogInformation("Token Revocation Service is stopping.");
        await base.StopAsync(cancellationToken);
    }
}
