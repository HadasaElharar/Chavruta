using ToraBankDAL.Models;

namespace ToraBankDAL
{
    public interface IChavrutumDL
    {
        Task<Chavrutum> AddChavrutum(Chavrutum chavrutum);
        Task<Chavrutum> DeleteChavrutum(int id);
        Task<List<Chavrutum>> GetAllChavrutum();
        Task<Chavrutum> GetChavrutumById(int id);
        Task<List<Chavrutum>> GetChavrutumByUserId(int userId);
        Task<List<Chavrutum>> GetChavrutumByUserId2(int userId);
        Task<Chavrutum> UpdateChavrutum(int id, Chavrutum chavrutum);
    }
}