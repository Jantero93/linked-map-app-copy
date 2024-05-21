using System.Security.Claims;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using MapServer.ApiModels.Requests;
using MapServer.OpenIddict;
using MapServer.Utilities.Extensions;
using Microsoft.EntityFrameworkCore;
using MapServer.ApiModels.Responses;
using System.Net.Mime;

namespace MapServer.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces(MediaTypeNames.Application.Json)]
[ProducesErrorResponseType(typeof(RequestFailedResponse))]
public class AuthenticationController(
    UserManager<ApplicationUser> userManager,
    IOpenIddictTokenManager tokenManager,
    ILogger<AuthenticationController> logger
    ) : ControllerBase
{
    [HttpPost("~/connect/token")]
    [AllowAnonymous]
    public async Task<IActionResult> Login()
    {
        logger.LogInformation("OpenIddict Login endpoint");
        var request = HttpContext.GetOpenIddictServerRequest();
        if (request is null)
        {
            logger.LogCritical("OpenIddictServerRequest null");

            return StatusCode(StatusCodes.Status500InternalServerError, new RequestFailedResponse
            {
                Message = "OpenIddict request cannot be retrieved"
            });
        }

        var reqUsername = request.Username;
        var reqPassword = request.Password;

        if (string.IsNullOrEmpty(reqUsername) || string.IsNullOrEmpty(reqPassword))
        {
            logger.LogError("Username or password was empty or null");
            return BadRequest(new RequestFailedResponse
            {
                Message = "The username or password was null or empty"
            });
        }

        var user = await userManager.FindByNameAsync(reqUsername);
        if (user?.UserName is null || !await userManager.CheckPasswordAsync(user, reqPassword))
        {
            logger.LogWarning("Wrong credentials on login, username: {Username}", reqUsername);
            return BadRequest(new RequestFailedResponse
            {
                Message = "The username or password is incorrect."
            });
        }

        var claims = new List<Claim>
        {
            new(OpenIddictConstants.Claims.Subject, user.Id.ToString()),
            new(ClaimsIdentity.DefaultNameClaimType, user.UserName)
        };

        var identity = new ClaimsIdentity(claims, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        var scopes = new[] { "profile", "email", "openid", "api" };

        var principal = new ClaimsPrincipal(identity);
        principal.SetScopes(scopes);

        return SignIn(principal, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] RegisterRequest req)
    {
        var userExists = await userManager.FindByNameAsync(req.Username);

        if (userExists is not null)
        {
            logger.LogError("Tried register with existing username: {Username}", req.Username);
            return BadRequest(new RequestFailedResponse { Message = "Username exists already" });
        }

        var user = new ApplicationUser { UserName = req.Username };
        var result = await userManager.CreateAsync(user, req.Password);

        if (result.Succeeded)
        {
            logger.LogInformation("Successfully registered user {UserName}", req.Username);
            return Ok(new { Message = "Registered successfully" });
        }

        logger.LogError("Registration failed for user: {UserName}", req.Username);
        return BadRequest(new RequestFailedResponse { Message = "Registration failed" });
    }

    [HttpPost("logout")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Logout()
    {
        var userId = User.GetUserIdAsString();
        logger.LogInformation("Signing out user {UserId}", userId);

        if (string.IsNullOrEmpty(userId))
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new RequestFailedResponse
            {
                Message = "Logout failed"
            });
        }

        var tokens = await tokenManager.FindBySubjectAsync(userId).ToListAsync();

        foreach (var token in tokens)
        {
            var result = await tokenManager.TryRevokeAsync(token);
            if (!result)
            {
                logger.LogWarning("Failed to revoke token {@Token}", token.ToString());
            }
        }

        logger.LogInformation("Logged successfully and revoked tokens from user id {UserId}", userId);

        return NoContent();
    }
}
