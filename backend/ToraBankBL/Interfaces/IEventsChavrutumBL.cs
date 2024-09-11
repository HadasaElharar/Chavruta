using ToraBankDAL.Models;
using ToraBankDTO.DTO;

namespace ToraBankBL.Interfaces
{
    public interface IEventsChavrutumBL
    {
        Task<EventsChavrutumDTO> AddEventsChavrutum(EventsChavrutumDTO EventsChavrutumDTO);
        Task<EventsChavrutumDTO> DeleteEventsChavrutum(int id);
        Task<List<EventsChavrutumDTO>> GetAllEventsChavruta();
        Task<EventsChavrutumDTO> GetEventsChavrutumById(int id);
        Task<EventsChavrutumDTO> UpdateEventsChavrutum(int id, EventsChavrutumDTO EventsChavrutumDTO);
        Task<List<EventsCalendarDTO>> GetEventsChavrutumByUserId(int userId);
    }
}