using MapServer.ApiModels.Requests;
using MapServer.Data.DTOs;
using MapServer.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MapServer.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CompanyController(
    ILogger<CompanyController> logger,
    ICompanyService companyService
) : SecurityBaseApiController
{
    [HttpGet]
    [AllowAnonymous]
    [Route("getCompanies")]
    [ProducesResponseType(typeof(List<CompanyDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<CompanyDto>>> GetALlCompanies()
    {
        logger.LogInformation("Getting all companies endpoint");

        var companiesList = await companyService.GetCompanyDtos();

        return Ok(companiesList);
    }

    [HttpPost]
    [Route("addCompany")]
    [ProducesResponseType(typeof(CompanyDto), StatusCodes.Status201Created)]
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
