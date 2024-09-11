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
    public class UserDayController : ControllerBase
    {
        IUserDayBL _userDayBL;
        public UserDayController(IUserDayBL userDayBL)
        {
            _userDayBL = userDayBL;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<List<UserDayDTO>> GetAllUserDays()
        {
            return await _userDayBL.GetAllUserDays();
        }


        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<List<UserDayDTO>> GetUserDayByEventId(int id)
        {
            return await _userDayBL.GetUserDayByEventId(id);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<UserDayDTO> AddUser([FromBody] UserDayDTO userDayDTO)
        {
            UserDayDTO newUserDay = await _userDayBL.AddUserDay(userDayDTO);
            return newUserDay;
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<UserDayDTO> UpdateUserDay(int id, [FromBody] UserDayDTO userDayDTO)
        {
            UserDayDTO isUpdate = await _userDayBL.UpdateUserDay(id, userDayDTO);
            return isUpdate;
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<UserDayDTO> DeleteUserDay(int id)
        {
            UserDayDTO isDelete = await _userDayBL.DeleteUserDay(id);
            return isDelete;
        }

    }
}
