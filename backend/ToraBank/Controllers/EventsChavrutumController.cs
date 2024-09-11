using Microsoft.AspNetCore.Mvc;
using ToraBankBL.Interfaces;
using ToraBankDTO.DTO;

namespace ToraBank.Controllers
{
   
        [Route("api/[controller]")]
        [ApiController]
        
    public class EventsChavrutumController : Controller
    {
        IEventsChavrutumBL _eventsChavrutumBL;
        public EventsChavrutumController(IEventsChavrutumBL eventsChavrutumBL)
        {
            _eventsChavrutumBL = eventsChavrutumBL;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<List<EventsChavrutumDTO>> GetAllEventsChavruta()
        {
            return await _eventsChavrutumBL.GetAllEventsChavruta();
        }


        // GET api/<UserController>/5
        [HttpGet("GetEventsChavrutumById/{id}")]
        public async Task<EventsChavrutumDTO> GetEventsChavrutumById(int id)
        {
            return await _eventsChavrutumBL.GetEventsChavrutumById(id);
        }

        [HttpGet("GetEventsChavrutumByUserId/{userId}")]
        public async Task<List<EventsCalendarDTO>> GetEventsChavrutumByUserId(int userId)
        {
            return await _eventsChavrutumBL.GetEventsChavrutumByUserId(userId);
        }


        // POST api/<UserController>
        [HttpPost]
        public async Task<EventsChavrutumDTO> AddEventsChavrutum([FromBody] EventsChavrutumDTO EventsChavrutumDTO)
        {
            EventsChavrutumDTO newEventsChavrutum = await _eventsChavrutumBL.AddEventsChavrutum(EventsChavrutumDTO);
            return newEventsChavrutum;
        }

        
        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<EventsChavrutumDTO>> UpdateEventsChavrutum(int id, [FromBody] EventsChavrutumDTO EventsChavrutumDTO)
        {
            EventsChavrutumDTO isUpdate = await _eventsChavrutumBL.UpdateEventsChavrutum(id, EventsChavrutumDTO);
            if (isUpdate != null)
            {
                return Ok(isUpdate);
            }
            return StatusCode(204, "update user failed: user is null");
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<EventsChavrutumDTO> DeleteEventsChavrutum(int id)
        {
            EventsChavrutumDTO isDelete = await _eventsChavrutumBL.DeleteEventsChavrutum(id);
            return isDelete;
        }
    }
}
