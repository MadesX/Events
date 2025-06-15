using DATA.Models;
using DATA.Repository;
using WebApplication1.DTO;

namespace WebApplication1.Service
{
    public class UsersService
    {
        private readonly UsersRepository _usersRepository;
        public UsersService(UsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public List<User> RetrieveUsers()
        {
            return _usersRepository.FetchUsers();
        }

        public void UpdateUser(int userID, UserDTO body)
        {
            var existingUser = _usersRepository.FetchUserById(userID);

            if (!string.IsNullOrEmpty(body.Name))
                existingUser.Name = (string)body.Name;

            if (body.dob.HasValue)
                existingUser.DateOfBirth = DateOnly.FromDateTime(body.dob.Value);

            _usersRepository.UpdateUser(existingUser);
        }

        public List<Event> RetrieveUserEvents(int userID)
        {
            return _usersRepository.FetchUserEvents(userID);
        }
    }
}
