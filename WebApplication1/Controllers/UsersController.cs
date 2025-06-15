using DATA.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using WebApplication1.DTO;
using WebApplication1.Service;

namespace WebApplication1.Controllers
{
    [EnableCors()]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly UsersService _usersService;
        private readonly IMemoryCache _memoryCache;

        public UsersController(UsersService usersService, IMemoryCache memoryCache)
        {
            _usersService = usersService;
            _memoryCache = memoryCache;
        }

        [HttpGet]
        public ActionResult<List<User>> GetUsers()
        {
            try
            {
                return Ok(_usersService.RetrieveUsers());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("updateuser/{userID}")]
        public ActionResult UpdateUser(int userID, [FromBody] UserDTO body)
        {
            try
            {
                _usersService.UpdateUser(userID, body);
                return Ok(new { message = "User updated successfully" });
            }
            catch (Exception e)
            {
                return BadRequest("Error updating user: " + e.Message);
            }
        }

        [HttpGet]
        [Route("events/{userID}")]
        public ActionResult<Event> GetUserEvents(int userID)
        {
            try
            {
                return Ok(_usersService.RetrieveUserEvents(userID));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
