using ToraBankDAL.Models;

namespace ToraBankDAL.Interfaces
{
    public interface IContactDL
    {
        Task<Contact> AddContact(Contact contact);
        Task<Contact> DeleteContact(int id);
        Task<List<Contact>> GetAllContacts();
        Task<Contact> GetContactById(int id);
        Task<Contact> UpdateContact(int id, Contact contact);
    }
}