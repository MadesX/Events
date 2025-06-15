using DATA.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA.Repository
{
    public class UsersRepository
    {
        private EventsContext db = new EventsContext();

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
