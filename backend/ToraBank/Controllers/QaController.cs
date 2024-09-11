using Microsoft.AspNetCore.Mvc;
using ToraBankBL.Interfaces;
using ToraBankDAL;
using ToraBankDAL.Models;
using ToraBankDTO.DTO;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ToraBank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QaController : ControllerBase
    {
        IQaBL _qaBL;
        public QaController(IQaBL qaBL)
        {
            _qaBL = qaBL;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<List<QaDTO>> GetAllQas()
        {
            return await _qaBL.GetAllQas();
        }


        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<QaDTO> GetQaById(int id)
        {
            return await _qaBL.GetQaById(id);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<QaDTO> AddQa([FromBody] QaDTO qaDTO)
        {
            QaDTO newQa = await _qaBL.AddQa(qaDTO);
            return newQa;
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<QaDTO> UpdateQa(int id, [FromBody] QaDTO qaDTO)
        {
            QaDTO isUpdate = await _qaBL.UpdateQa(id,qaDTO);
            return isUpdate;
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<QaDTO> DeleteQa(int id)
        {
            QaDTO isDelete = await _qaBL.DeleteQa(id);
            return isDelete;
        }
        [HttpGet("GetQaByUserId/{userId}")]
        public async Task<List<QaDTO>> GetQaByUserId(int userId)
        {
            return await _qaBL.GetQaByUserId(userId);
        }
        [HttpGet("GetQaByRavId/{ravId}")]
        public async Task<List<QaDTO>> GetQaByRavId(int ravId)
        {
            return await _qaBL.GetQaByRavId(ravId);
        }

    }
}