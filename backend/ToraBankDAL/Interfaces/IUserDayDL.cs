using ToraBankDAL.Models;

namespace ToraBankDAL.Interfaces
{
    public interface IUserDayDL
    {
        Task<UserDay> AddUserDay(UserDay userDay);
        Task<UserDay> DeleteUserDay(int id);
        Task<List<UserDay>> GetAllUserDays();
        Task<List<UserDay>> GetUserDayByEventId(int id);

        Task<UserDay> UpdateUserDay(int id, UserDay userDay);
    }
}