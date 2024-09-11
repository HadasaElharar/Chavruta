using ToraBankDTO.DTO;

namespace ToraBankBL.Interfaces
{
    public interface IContactBL
    {
        Task<ContactDTO> AddContact(ContactDTO contactDTO);
        Task<ContactDTO> DeleteContact(int id);
        Task<List<ContactDTO>> GetAllContacts();
        Task<ContactDTO> GetContactById(int id);
        Task<ContactDTO> UpdateContact(int id, ContactDTO contactDTO);
    }
}