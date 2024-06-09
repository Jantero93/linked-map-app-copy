using MapServer.ApiModels.Requests;
using MapServer.Data.DTOs;
using MapServer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MapServer.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CompanyController(
    ILogger<CompanyController> logger,
    ICompanyService companyService
) : SecurityBaseApiController
{
    [HttpPost]
    [Route("addCompany")]
    public async Task<ActionResult<CompanyDto>> PostNewCompany([FromBody] AddNewCompanyRequest req)
    {
        logger.LogInformation(
            "Adding new company {CompanyName} with address {Street} {Number}",
            req.CompanyName, req.StreetAddress, req.StreetNumber
        );

        var res = await companyService.AddNewCompany(req);

        var resLocation = $"company/{res.Id}";

        return Created(resLocation, res);
    }
}