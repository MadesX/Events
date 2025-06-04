using DATA.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA.Repository
{
    public class EventsRepository
    {
        private EventsContext db = new EventsContext();

        public void CreateEvent(Event newEvent)
        {
            db.Add(newEvent);
            db.SaveChanges();
        }

        public dynamic FetchEventUsersById(int eventID)
        {
            return db.EventUsers.Where(x => x.EventRef == eventID).Include(x => x.UserRefNavigation).Select(x => x.UserRefNavigation).ToList();
        }

        public void RegisterUserToEvent(int eventID, User newUser)
        {
            var user = db.Users.FirstOrDefault(x => x.Id == newUser.Id);
            if (user == null)
            {
                db.Users.Add(newUser);
                db.SaveChanges();
            }
            var eventUser = db.EventUsers.FirstOrDefault(x => x.EventRef == eventID && x.UserRef == newUser.Id);
            if (eventUser == null)
            {
                db.EventUsers.Add(new EventUser { EventRef = eventID, UserRef = newUser.Id, Creation = DateTime.Now });
                db.SaveChanges();
            }
            else
            {
                throw new Exception("User already registered for this event");
            }
        }

        public dynamic FetchEventById(int eventID)
        {
            var existingEvent = db.Events.SingleOrDefault(x => x.Id == eventID);
            if (existingEvent == null)
            {
                throw new Exception("Event not found");
            }
            return existingEvent;
        }

        public void UpdateEvent(int eventID, Event newEvent)
        {
            var existingEvent = db.Events.SingleOrDefault(e => e.Id == eventID);

            if (existingEvent != null)
            {
                existingEvent.Name = newEvent.Name;
                existingEvent.StartDate = newEvent.StartDate;
                existingEvent.EndDate = newEvent.EndDate;
                existingEvent.MaxRegistrations = newEvent.MaxRegistrations;
                existingEvent.Location = newEvent.Location;

                db.SaveChanges();
            } 
            else
            {
                throw new Exception("Event not found");
            }
        }

        public void DeleteEvent(int eventID)
        {
            var existingEvent = db.Events.SingleOrDefault(e => e.Id == eventID);

            if (existingEvent != null)
            {
                var eventUsers = db.EventUsers.Where(x => x.EventRef == eventID).ToList();
                foreach (var eu in eventUsers)
                {
                    db.EventUsers.Remove(eu);
                }
                db.Events.Remove(existingEvent);
                db.SaveChanges();
            }
            else
            {
                throw new Exception("Event not found");
            }
        }

        public dynamic FetchEventsByDates(DateTime StartDate, DateTime EndDate)
        {
            return db.Events.Where(x => x.StartDate >= StartDate && x.EndDate <= EndDate).ToList();
        }
    }
}
