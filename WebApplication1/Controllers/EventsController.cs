using DATA.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using WebApplication1.DTO;
using WebApplication1.Service;

namespace WebApplication1.Controllers
{
    [EnableCors()]
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventsService _eventsService;
        private readonly IMemoryCache _memoryCache;

        public EventsController(EventsService eventsService, IMemoryCache memoryCache)
        {
            _eventsService = eventsService;
            _memoryCache = memoryCache;

        }

        [HttpPost]
        public ActionResult CreateEvent([FromBody] EventDTO body)
        {
            try
            {
                var newEvent = new Event();
                newEvent.Name = (String)body.EventName;
                newEvent.StartDate = (DateTime)body.StartDate;
                newEvent.EndDate = (DateTime)body.EndDate;
                newEvent.MaxRegistrations = (int)body.MaxRegistrations;
                newEvent.Location = (String)body.Location;

                _eventsService.CreateEvent(newEvent);
                return Ok(new { message = "Event created successfully" });
            }
            catch (Exception e)
            {
                return BadRequest("Error creating event: " + e.Message);
            }
        }

        [HttpGet]
        [Route("{eventID}/registration")]
        public ActionResult<User> GetEventUsersById(int eventID)
        {
            try
            {
                return Ok(_eventsService.RetrieveEventUsersById(eventID));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Route("{eventID}/registration")]
        public ActionResult RegisterUserToEvent([FromBody] User newUser, int eventID)
        {
            try
            {
                _eventsService.RegisterUserToEvent(eventID, newUser);
                return Ok(new { message = "User registered successfully for the event" }); 
            }
            catch (Exception e)
            {
                return BadRequest("Error registering user to event: " + e.Message);
            }
        }

        [HttpGet]
        [Route("{eventID}")]
        public ActionResult<Event> GetEventById(int eventID)
        {
            try
            {
                return Ok(_eventsService.RetrieveEventById(eventID));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("{eventID}")]
        public ActionResult UpdateEvent(int eventID, [FromBody] EventDTO body)
        {
            try
            {
                _eventsService.UpdateEvent(eventID, body);
                return Ok(new { message = "Event updated successfully" });
            }
            catch (Exception e)
            {
                return BadRequest("Error updating event: " + e.Message);
            }
        }

        [HttpDelete]
        [Route("{eventID}")]
        public ActionResult DeleteEvent(int eventID)
        {
            try
            {
                _eventsService.DeleteEvent(eventID);
                return Ok(new { message = "Event deleted successfully" });
            }
            catch (Exception e)
            {
                return BadRequest("Error deleting event: " + e.Message);
            }
        }

        [HttpGet]
        [Route("schedule")]
        public ActionResult<Event> GetSchedule([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            try
            {
                return Ok(_eventsService.RetrieveEventsByDates(startDate, endDate));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("{eventID}/weather")]
        public ActionResult GetEventWeather(int eventID)
        {
            try
            {
                EventWeatherDTO cacheData = _memoryCache.Get<EventWeatherDTO>($"event{eventID}-weather-cache");
                if (cacheData != null)
                {
                    return Ok(cacheData);
                }

                var eventWeather = _eventsService.GetEventWeather(eventID);

                var expirationTime = DateTimeOffset.Now.AddMinutes(5);
                _memoryCache.Set($"event{eventID}-weather-cache", eventWeather, expirationTime);

                return Ok(eventWeather);
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }

        [HttpGet]
        [Route("users")]
        public ActionResult<List<User>> GetUsers()
        {
            try
            {
                return Ok(_eventsService.RetrieveUsers());
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
                _eventsService.UpdateUser(userID, body);
                return Ok(new { message = "User updated successfully" });
            }
            catch (Exception e)
            {
                return BadRequest("Error updating user: " + e.Message);
            }
        }
    }
}
