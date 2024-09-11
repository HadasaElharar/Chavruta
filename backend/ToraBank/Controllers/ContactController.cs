using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToraBankBL.Interfaces;
using ToraBankDTO.DTO;

namespace ToraBank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        IContactBL _contactBL;

        public ContactController(IContactBL contactBL)
        {
            _contactBL = contactBL;
        }

        // GET: api/<ContactController>
        [HttpGet]
        public async Task<List<ContactDTO>> GetAllContacts()
        {
            return await _contactBL.GetAllContacts();
        }

        // GET api/<ContactController>/5
        [HttpGet("{id}")]
        public async Task<ContactDTO> GetContactById(int id)
        {
            return await _contactBL.GetContactById(id);
        }

        // POST api/<ContactController>
        [HttpPost]
        public async Task<ContactDTO> AddContact([FromBody] ContactDTO contactDTO)
        {
            ContactDTO newContact = await _contactBL.AddContact(contactDTO);
            return newContact;
        }

        // PUT api/<ContactController>/5
        [HttpPut("{id}")]
        public async Task<ContactDTO> UpdateContact(int id, [FromBody] ContactDTO contactDTO)
        {
            ContactDTO isUpdate = await _contactBL.UpdateContact(id, contactDTO);
            return isUpdate;
        }

        // DELETE api/<ContactController>/5
        [HttpDelete("{id}")]
        public async Task<ContactDTO> DeleteContact(int id)
        {
            ContactDTO isDelete = await _contactBL.DeleteContact(id);
            return isDelete;
        }
    }
}

