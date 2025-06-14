using DATA.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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

        public void UpdateEvent(Event updatedEvent)
        {
            db.SaveChanges();
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

        public dynamic FetchEventsByDates(DateTime? startDate, DateTime? endDate)
        {
            if (startDate.HasValue && endDate.HasValue)
            {
                return db.Events.Where(x => x.StartDate >= startDate && x.EndDate <= endDate).ToList();
            }
            else if (startDate.HasValue && !endDate.HasValue)
            {
                return db.Events.Where(x => x.StartDate >= startDate).ToList();
            }
            else if (!startDate.HasValue && endDate.HasValue)
            {
                return db.Events.Where(x => x.EndDate <= endDate).ToList();
            }
            return db.Events.ToList();
        }

        public dynamic FetchUsers()
        {
            return db.Users.ToList();
        }

        public dynamic FetchUserById(int userID)
        {
            var existingUser = db.Users.SingleOrDefault(x => x.Id == userID);
            if (existingUser == null)
            {
                throw new Exception("User not found");
            }
            return existingUser;
        }

        public void UpdateUser(User updatedUser)
        {
            db.SaveChanges();
        }

        public dynamic FetchUserEvents(int userID)
        {
            return db.EventUsers.Where(x => x.UserRef == userID).Include(x => x.EventRefNavigation).Select(x => x.EventRefNavigation).ToList();
        }
    }
}
