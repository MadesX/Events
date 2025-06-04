using DATA.Models;
using DATA.Repository;
using System.Text.Json;
using WebApplication1.DTO;

namespace WebApplication1.Service
{
    public class EventsService
    {
        private readonly EventsRepository _eventsRepository;
        public EventsService(EventsRepository eventsRepository)
        {
            _eventsRepository = eventsRepository;
        }

        public void CreateEvent(Event newEvent)
        {
            _eventsRepository.CreateEvent(newEvent);
        }

        public List<User> RetrieveEventUsersById(int eventID)
        {
            return _eventsRepository.FetchEventUsersById(eventID);
        }

        public void RegisterUserToEvent(int eventID, User newUser)
        {
            _eventsRepository.RegisterUserToEvent(eventID, newUser);
        }

        public Event RetrieveEventById(int eventID)
        {
            return _eventsRepository.FetchEventById(eventID);
        }

        public void UpdateEvent(int eventID, Event newEvent)
        {
            _eventsRepository.UpdateEvent(eventID, newEvent);
        }

        public void DeleteEvent(int eventID)
        {
            _eventsRepository.DeleteEvent(eventID);
        }

        public List<Event> RetrieveEventsByDates(DateTime StartDate, DateTime EndDate)
        {
            return _eventsRepository.FetchEventsByDates(StartDate, EndDate);
        }

        public EventWeatherDTO GetEventWeather(int eventID)
        {
            var existingEvent = _eventsRepository.FetchEventById(eventID);

            string location = existingEvent.Location;
            string apiKey = "e3b8e34de5224d80a54210614250306";
            string url = $"https://api.weatherapi.com/v1/current.json?key={apiKey}&q={location}";

            using (var client = new HttpClient())
            {
                var response = client.GetAsync(url).Result;
                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception("Failed to fetch weather data");
                }

                string json = response.Content.ReadAsStringAsync().Result;

                using (JsonDocument doc = JsonDocument.Parse(json))
                {
                    var root = doc.RootElement;
                    string weatherText = root.GetProperty("current").GetProperty("condition").GetProperty("text").GetString();

                    return new EventWeatherDTO { Location = location, Weather = weatherText };
                }
            }
        }

    }
}
