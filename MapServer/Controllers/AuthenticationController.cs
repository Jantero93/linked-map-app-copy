using System.Security.Claims;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using MapServer.ApiModels.Requests;
using MapServer.OpenIddict;

namespace MapServer.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController(
    UserManager<ApplicationUser> userManager,
    ILogger<AuthenticationController> logger
    ) : ControllerBase
{
    [HttpPost("~/connect/token")]
    [AllowAnonymous]
    public async Task<IActionResult> Register()
    {
        logger.LogInformation("OpenIddict Register endpoint");
        var req = HttpContext.GetOpenIddictServerRequest();

        if (req is null)
        {
            logger.LogError("OpenIddictServerRequest null");
            return BadRequest(new OpenIddictResponse
            {
                Error = OpenIddictConstants.Errors.InvalidRequest,
                ErrorDescription = "The OpenID Connect request cannot be retrieved."
            });
        }

        var reqUsername = req.Username;
        var reqPassword = req.Password;

        if (!req.IsPasswordGrantType())
        {
            logger.LogError("No password grant type for username: {Username}", reqUsername);
            return BadRequest(new OpenIddictResponse
            {
                Error = OpenIddictConstants.Errors.UnsupportedGrantType,
                ErrorDescription = "The specified grant type is not supported."
            });
        }

        if (string.IsNullOrEmpty(reqUsername) || string.IsNullOrEmpty(reqPassword))
        {
            logger.LogError("No password or username on login attempt");
            return BadRequest(new OpenIddictResponse
            {
                Error = OpenIddictConstants.Errors.InvalidRequest,
                ErrorDescription = "Username or password cannot be empty"
            });
        }

        var user = await userManager.FindByNameAsync(reqUsername);

        if (user?.UserName is null)
        {
            return BadRequest($"Not found user with username: {reqUsername}");
        }

        if (!await userManager.CheckPasswordAsync(user, reqUsername))
        {
            logger.LogWarning("Wrong credentials or user does not exists for username: {@Username}", reqUsername);
            return BadRequest(new OpenIddictResponse
            {
                Error = OpenIddictConstants.Errors.InvalidGrant,
                ErrorDescription = "The username or password is incorrect."
            });
        }

        // Create the identity and principal for the token response
        var claims = new List<Claim>
        {
           new(OpenIddictConstants.Claims.Subject, user.Id.ToString()),
           new(ClaimsIdentity.DefaultNameClaimType, user.UserName)
        };

        var identity = new ClaimsIdentity(claims, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        principal.SetScopes(new[] { "profile", "email", "openid", "api", "websocket" });

        logger.LogInformation("Trying sign in with user: {Username}", user.UserName);
        return SignIn(principal, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterRequest req)
    {
        var userExists = await userManager.FindByNameAsync(req.Username);

        if (userExists is not null)
        {
            logger.LogError("Tried register with existing username: {Username}", req.Username);
            return BadRequest(new { Message = "Username exists already" });
        }

        var user = new ApplicationUser { UserName = req.Username };
        var result = await userManager.CreateAsync(user, req.Password);

        if (result.Succeeded)
        {
            logger.LogInformation("Successfully registered user {UserName}", req.Username);
            return Ok(new { Message = "Registered successfully" });
        }

        logger.LogError("Registration failed for user: {UserName}", req.Username);
        return BadRequest(new { Message = "Registration failed" });
    }
}
