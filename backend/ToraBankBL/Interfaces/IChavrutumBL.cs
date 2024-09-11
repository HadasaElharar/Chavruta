using ToraBankDAL.Models;
using ToraBankDTO.DTO;

namespace ToraBankBL.Interfaces
{
    public interface IChavrutumBL
    {
        Task<ChavrutumDTO> AddChavrutum(ChavrutumDTO chavrutumDTO);
        Task<ChavrutumDTO> DeleteChavrutum(int id);
        Task<List<ChavrutumDTO>> GetAllChavrutum();
        Task<ChavrutumDTO> GetChavrutumById(int id);
        Task<List<ChavrutumDTO>> GetChavrutumByUserId(int userId);
        Task<ChavrutumDTO> UpdateChavrutum(int id, ChavrutumDTO chavrutumDTO);
        Task<List<ChavrutumDTO>> GetChavrutumByUserId2(int userId);
    }
}