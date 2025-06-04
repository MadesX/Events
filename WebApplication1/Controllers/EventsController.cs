using DATA.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using WebApplication1.DTO;
using WebApplication1.Service;

namespace WebApplication1.Controllers
{
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
                newEvent.Name = body.EventName;
                newEvent.StartDate = body.StartDate;
                newEvent.EndDate = body.EndDate;
                newEvent.MaxRegistrations = body.MaxRegistrations;
                newEvent.Location = body.Location;

                _eventsService.CreateEvent(newEvent);
                return Ok("Event created successfully");
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
                return Ok("User registered successfully for the event"); 
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
                var newEvent = new Event();
                newEvent.Name = body.EventName;
                newEvent.StartDate = body.StartDate;
                newEvent.EndDate = body.EndDate;
                newEvent.MaxRegistrations = body.MaxRegistrations;
                newEvent.Location = body.Location;

                _eventsService.UpdateEvent(eventID, newEvent);
                return Ok("Event updated successfully");
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
                return Ok("Event deleted successfully");
            }
            catch (Exception e)
            {
                return BadRequest("Error deleting event: " + e.Message);
            }
        }

        [HttpGet]
        [Route("schedule")]
        public ActionResult<Event> GetSchedule([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
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
        [Route("event/{eventID}/weather")]
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

    }
}
