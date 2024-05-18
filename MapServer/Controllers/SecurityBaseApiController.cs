using System.Net.Mime;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;

namespace MapServer.Controllers;

[ApiController]
[Produces(MediaTypeNames.Application.Json)]
[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
public class SecurityBaseApiController : ControllerBase
{
}
