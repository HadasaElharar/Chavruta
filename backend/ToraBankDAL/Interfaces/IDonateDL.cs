using ToraBankDAL.Models;

namespace ToraBankDAL.Interfaces
{
    public interface IDonateDL
    {
        Task<Donate> AddDonate(Donate donate);
        Task<Donate> DeleteDonate(int id);
        Task<List<Donate>> GetAllDonates();
        Task<Donate> GetDonateById(int id);
        Task<List<Donate>> GetDonateByUserId(int userId);
        Task<Donate> UpdateDonate(int id, Donate donate);
    }
}