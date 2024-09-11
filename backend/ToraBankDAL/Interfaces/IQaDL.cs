using ToraBankDAL.Models;

namespace ToraBankDAL.Interfaces
{
    public interface IQaDL
    {
        Task<Qa> AddQa(Qa qa);
        Task<Qa> DeleteQa(int id);
        Task<List<Qa>> GetAllQas();
        Task<Qa> GetQaById(int id);
        Task<List<Qa>> GetQaByRavId(int RavId);
        Task<List<Qa>> GetQaByUserId(int userId);
        Task<Qa> UpdateQa(int id, Qa qa);
    }
}