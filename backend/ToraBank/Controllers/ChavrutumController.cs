using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToraBankBL.Interfaces;
using ToraBankDTO.DTO;

namespace ToraBank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChavrutumController : ControllerBase
    {

        IChavrutumBL _chavrutumBL;
        public ChavrutumController(IChavrutumBL chavrutumBL)
        {
            _chavrutumBL = chavrutumBL;
        }

        // GET: api/<ChavrutumController>
        [HttpGet]
        public async Task<List<ChavrutumDTO>> GetAllChavrutum()
        {
            return await _chavrutumBL.GetAllChavrutum();
        }

        // GET api/<ChavrutumController>/5
        [HttpGet("GetChavrutumById/{id}")]
        public async Task<ChavrutumDTO> GetChavrutumById(int id)
        {
            return await _chavrutumBL.GetChavrutumById(id);
        }

        // GET api/<ChavrutumController>/5
        [HttpGet("GetChavrutumByUserId")]
        public async Task<List<ChavrutumDTO>> GetChavrutumByUserId(int userId)
        {
            
                return  await _chavrutumBL.GetChavrutumByUserId(userId);
        }
        // GET api/<ChavrutumController>/5
        [HttpGet("GetChavrutumByUserId2")]
        public async Task<List<ChavrutumDTO>> GetChavrutumByUserId2(int userId)
        {

            return await _chavrutumBL.GetChavrutumByUserId2(userId);
        }

        // POST api/<ChavrutumController>
        [HttpPost]
        public async Task<ChavrutumDTO> AddChavrutum([FromBody] ChavrutumDTO chavrutumDTO)
        {
            ChavrutumDTO newChavrutum = await _chavrutumBL.AddChavrutum(chavrutumDTO);
            return newChavrutum;
        }

        // PUT api/<ChavrutumController>/5
        [HttpPut("{id}")]
        public async Task<ChavrutumDTO> UpdateChavrutum(int id, [FromBody] ChavrutumDTO chavrutumDTO)
        {
            ChavrutumDTO isUpdate = await _chavrutumBL.UpdateChavrutum(id, chavrutumDTO);
            return isUpdate;
        }

        // DELETE api/<ChavrutumController>/5
        [HttpDelete("{id}")]
        public async Task<ChavrutumDTO> DeleteChavrutum(int id)
        {
            ChavrutumDTO isDelete = await _chavrutumBL.DeleteChavrutum(id);
            return isDelete;
        }
    }
}

