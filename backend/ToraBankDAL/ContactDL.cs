using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToraBankDAL.Interfaces;
using ToraBankDAL.Models;

namespace ToraBankDAL
{
    public class ContactDL : IContactDL
    {
        ToraBankContext _toraBankContext = new ToraBankContext();

        public async Task<List<Contact>> GetAllContacts()
        {
            List<Contact> contacts = await _toraBankContext.Contacts
                .OrderByDescending(contacts => contacts.ContactId).
                ToListAsync();
            return contacts;
        }

        public async Task<Contact> AddContact(Contact contact)
        {
            try
            {
                _toraBankContext.Contacts.AddAsync(contact);
                _toraBankContext.SaveChanges();
                Contact newContact = await _toraBankContext.Contacts.OrderByDescending(item => item.ContactId).FirstOrDefaultAsync();
                return newContact;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Contact> UpdateContact(int id, Contact contact)
        {
            try
            {
                Contact currentContactToUpdate = _toraBankContext.Contacts.Where(item => item.ContactId == id).FirstOrDefault();
                if (currentContactToUpdate == null)
                    throw new ArgumentException($"{id} is not found");

                currentContactToUpdate.Subject = contact.Subject;
                currentContactToUpdate.Message = contact.Message;
                currentContactToUpdate.Phone = contact.Phone;
                currentContactToUpdate.Email = contact.Email;

                await _toraBankContext.SaveChangesAsync();
                return currentContactToUpdate;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Contact> DeleteContact(int id)
        {
            try
            {
                Contact currentContactToDelete = await _toraBankContext.Contacts.SingleOrDefaultAsync(item => item.ContactId == id);
                if (currentContactToDelete == null)
                    throw new ArgumentException($"{id} is not found");

                _toraBankContext.Contacts.Remove(currentContactToDelete);
                await _toraBankContext.SaveChangesAsync();
                return currentContactToDelete;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Contact> GetContactById(int id)
        {
            return await _toraBankContext.Contacts.FirstOrDefaultAsync(item => item.ContactId == id);
        }
    }
}

