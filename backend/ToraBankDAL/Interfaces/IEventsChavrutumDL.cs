using ToraBankDAL.Models;

namespace ToraBankDAL.Interfaces
{
    public interface IEventsChavrutumDL
    {
        Task<EventsChavrutum> AddEventsChavrutum(EventsChavrutum EventsChavrutum);
        Task<EventsChavrutum> DeleteEventsChavrutum(int id);
        Task<List<EventsChavrutum>> GetAllEventsChavruta();
        Task<EventsChavrutum> GetEventsChavrutumById(int id);
        Task<EventsChavrutum> UpdateEventsChavrutum(int id, EventsChavrutum EventsChavrutum);
        Task<List<EventsChavrutum>> GetEventsChavrutumByUserId(int userId);
    }
}