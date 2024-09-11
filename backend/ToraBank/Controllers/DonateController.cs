using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToraBankBL.Interfaces;
using ToraBankDTO.DTO;

namespace ToraBank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonateController : ControllerBase
    {
        IDonateBL _donateBL;

        public DonateController(IDonateBL donateBL)
        {
            _donateBL = donateBL;
        }

        // GET: api/<DonateController>
        [HttpGet]
        public async Task<List<DonateDTO>> GetAllDonates()
        {
            return await _donateBL.GetAllDonates();
        }

        // GET api/<DonateController>/5
        [HttpGet("GetDonateById/{id}")]
        public async Task<DonateDTO> GetDonateById(int id)
        {
            return await _donateBL.GetDonateById(id);
        }
        // GET: api/<DonateController>
        [HttpGet("GetDonateByUserId/{userId}")]
        public async Task<List<DonateDTO>> GetDonateByUserId(int userId)
        {
            return await _donateBL.GetDonateByUserId(userId);
        }



        // POST api/<DonateController>
        [HttpPost]
        public async Task<DonateDTO> AddDonate([FromBody] DonateDTO donateDTO)
        {
            DonateDTO newDonate = await _donateBL.AddDonate(donateDTO);
            return newDonate;
        }

        // PUT api/<DonateController>/5
        [HttpPut("{id}")]
        public async Task<DonateDTO> UpdateDonate(int id, [FromBody] DonateDTO donateDTO)
        {
            DonateDTO isUpdate = await _donateBL.UpdateDonate(id, donateDTO);
            return isUpdate;
        }

        // DELETE api/<DonateController>/5
        [HttpDelete("{id}")]
        public async Task<DonateDTO> DeleteDonate(int id)
        {
            DonateDTO isDelete = await _donateBL.DeleteDonate(id);
            return isDelete;
        }
    }
}

