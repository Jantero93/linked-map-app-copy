using System.Net.Mime;
using MapServer.ApiModels.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MapServer.Controllers;

[ApiController]
[Authorize]
[Produces(MediaTypeNames.Application.Json)]
[ProducesErrorResponseType(typeof(RequestFailedResponse))]
[ProducesResponseType(StatusCodes.Status200OK)]
public abstract class SecurityBaseApiController : ControllerBase;
