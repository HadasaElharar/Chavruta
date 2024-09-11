using ToraBankDAL.Models;

namespace ToraBankDAL.Interfaces
{
    public interface IUserDL
    {
        Task<List<User>> GetAllUsers();
        Task<User> AddUser(User user);    
        Task<User> UpdateUser(int id, User user);   
        Task<User> DeleteUser(int id);   
        Task<User> GetUserById(int id);
        Task<User> Login(User user);
        Task<List<User>> GetUsersByChavruta(int id);
        Task<List<User>> GetAllRabaies();
    }
}