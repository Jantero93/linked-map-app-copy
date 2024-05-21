using MapServer.Store.Models;
using MapServer.Store.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MapServer.Controllers;
[Route("api/[controller]")]
public class TestController(TestRepository testRepository) : SecurityBaseApiController
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
}
