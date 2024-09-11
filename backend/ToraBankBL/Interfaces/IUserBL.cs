using ToraBankDAL.Models;
using ToraBankDTO.DTO;

namespace ToraBankBL.Interfaces
{
    public interface IUserBL
    {
        Task<UserDTO> AddUser(UserDTO userDTO);
        Task<List<UserDTO>> GetAllUsers();
        Task<UserDTO> UpdateUser(int id, UserDTO userDTO);
        Task<UserDTO> DeleteUser(int id);
        Task<UserDTO> GetUserById(int id);
        Task<UserDTO> Login(UserLoginDTO user);
        Task<List<UserDTO>> GetUsersByChavruta(int id);
        Task<List<UserDTO>> GetAllRabaies();

    }
}