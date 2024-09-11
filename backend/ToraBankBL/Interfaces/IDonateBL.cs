using ToraBankDTO.DTO;

namespace ToraBankBL.Interfaces
{
    public interface IDonateBL
    {
        Task<DonateDTO> AddDonate(DonateDTO donateDTO);
        Task<DonateDTO> DeleteDonate(int id);
        Task<List<DonateDTO>> GetAllDonates();
        Task<DonateDTO> GetDonateById(int id);
        Task<List<DonateDTO>> GetDonateByUserId(int userId);
        Task<DonateDTO> UpdateDonate(int id, DonateDTO donateDTO);
    }
}