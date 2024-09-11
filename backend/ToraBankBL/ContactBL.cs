using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToraBankBL.Interfaces;
using ToraBankDAL;
using ToraBankDAL.Interfaces;
using ToraBankDAL.Models;
using ToraBankDTO.DTO;

namespace ToraBankBL
{
    public class ContactBL : IContactBL
    {
        public IMapper _mapper;
        IContactDL _contactDL;

        public ContactBL(IContactDL contactDL, IMapper mapper)
        {
            _mapper = mapper;
            _contactDL = contactDL;
        }

        public async Task<List<ContactDTO>> GetAllContacts()
        {
            try
            {
                List<Contact> contacts = await _contactDL.GetAllContacts();
                List<ContactDTO> contactDTOs = _mapper.Map<List<Contact>, List<ContactDTO>>(contacts);
                return contactDTOs;
            }
            catch (Exception ex)
            {
                // כאן ניתן להוסיף טיפול בשגיאה במידה וזה רלוונטי
                return null;
            }
        }

        public async Task<ContactDTO> AddContact(ContactDTO contactDTO)
        {
            Contact contact = _mapper.Map<Contact>(contactDTO);
            Contact newContact = await _contactDL.AddContact(contact);

            return _mapper.Map<ContactDTO>(newContact);
        }

        public async Task<ContactDTO> UpdateContact(int id, ContactDTO contactDTO)
        {
            Contact contact = _mapper.Map<Contact>(contactDTO);
            Contact updatedContact = await _contactDL.UpdateContact(id, contact);

            return _mapper.Map<ContactDTO>(updatedContact);
        }

        public async Task<ContactDTO> DeleteContact(int id)
        {
            Contact deletedContact = await _contactDL.DeleteContact(id);

            return _mapper.Map<ContactDTO>(deletedContact);
        }

        public async Task<ContactDTO> GetContactById(int id)
        {
            Contact contact = await _contactDL.GetContactById(id);
            return _mapper.Map<ContactDTO>(contact);
        }
    }
}
