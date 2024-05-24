using AutoMapper;
using MapServer.Data.DTOs;
using MapServer.Store.Models;
using MapServer.Store.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MapServer.Controllers;
[Route("api/[controller]")]
public class TestController(
    TestRepository testRepository,
    LocationRepository locationRepository,
    IMapper mapper)
    : SecurityBaseApiController
{
    [HttpGet]
    [Route("getAll")]
    public async Task<ActionResult<List<TestModel>>> GetAllTestObjects()
    {
        try
        {
            var objects = await testRepository.FindAllAsync();
            return Ok(objects?.ToList() ?? []);

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("testLocations")]
    public async Task<ActionResult<List<LocationDto>>> GetAllTestLocations()
    {
        try
        {
            var allLocations = await locationRepository.FindAllAsync();
            var dtos = mapper.Map<List<LocationDto>>(allLocations);

            return Ok(dtos ?? []);

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

}
