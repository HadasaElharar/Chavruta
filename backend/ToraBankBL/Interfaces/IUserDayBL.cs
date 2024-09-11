using ToraBankDAL.Models;
using ToraBankDTO.DTO;

namespace ToraBankBL.Interfaces
{
    public interface IUserDayBL
    {
        Task<UserDayDTO> AddUserDay(UserDayDTO userDayDTO);
        Task<UserDayDTO> DeleteUserDay(int id);
        Task<List<UserDayDTO>> GetAllUserDays();
        Task<List<UserDayDTO>> GetUserDayByEventId(int id);
        Task<UserDayDTO> UpdateUserDay(int id, UserDayDTO userDayDTO);
    }
}