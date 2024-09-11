using ToraBankDTO.DTO;

namespace ToraBankBL.Interfaces
{
    public interface IQaBL
    {
        Task<QaDTO> AddQa(QaDTO qaDTO);
        Task<QaDTO> DeleteQa(int id);
        Task<List<QaDTO>> GetAllQas();
        Task<List<QaDTO>> GetQaByUserId(int userId);
        Task<QaDTO> GetQaById(int id);
        Task<QaDTO> UpdateQa(int id, QaDTO qaDTO);
        Task<List<QaDTO>> GetQaByRavId(int ravId);
    }
}