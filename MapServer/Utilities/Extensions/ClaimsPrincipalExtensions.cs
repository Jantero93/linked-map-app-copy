using System.Security.Claims;
using OpenIddict.Abstractions;

namespace MapServer.Utilities.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static Guid? GetUserId(this ClaimsPrincipal user)
    {
        var idString = user.FindFirst(OpenIddictConstants.Claims.Subject)?.Value;
        return Guid.TryParse(idString, out var idGuid) ? idGuid : null;
    }

    public static string? GetUserIdAsString(this ClaimsPrincipal user) =>
        user.FindFirst(OpenIddictConstants.Claims.Subject)?.Value;
}
