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
    public class UserController : ControllerBase
    {
        IUserBL _userBL;
        public UserController(IUserBL userBL)
        {
            _userBL = userBL;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task< List<UserDTO>> GetAllUsers()
        {
            return await _userBL.GetAllUsers();
        }

        // GET: api/<UserController>
        [HttpGet("GetAllRabaies")]
        public async Task<List<UserDTO>> GetAllRabaies()
        {
            return await _userBL.GetAllRabaies();
        }



        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<UserDTO> GetUserById(int id)
        {
            return await _userBL.GetUserById(id);
        }

        

        // GET api/<UserController>/5
        [HttpGet("GetUsersByChavruta/{id}")]
        public async Task<List<UserDTO>> GetUsersByChavruta(int id)
        {
            return await _userBL.GetUsersByChavruta(id);
        }

        // POST api/<UserController>
        [HttpPost]
        public  async Task <UserDTO> AddUser([FromBody] UserDTO userDTO)
        {
            UserDTO newUser=await _userBL.AddUser(userDTO); 
            return newUser;   
        }

        // POST api/<UserController>
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO userLogin)
        {
            try
            {
                // ניסיון להיכנס עם פרטי המשתמש
                UserDTO user = await _userBL.Login(userLogin);
                return Ok(user); // החזרת משתמש עם סטטוס 200
            }
            catch (Exception ex)
            {
                // החזרת שגיאה כפי שהיא מהשכבה העסקית (BL)
                return BadRequest(new { message = ex.Message }); // החזרת סטטוס 400 עם הודעת השגיאה
            }
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDTO>> UpdateUser(int id, [FromBody] UserDTO userDTO)
        {
            UserDTO isUpdate = await _userBL.UpdateUser(id, userDTO);
            if(isUpdate != null)
            {
                return Ok(isUpdate);
            }
            return StatusCode(204, "update user failed: user is null");
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<UserDTO> DeleteUser(int id)
        {
            UserDTO isDelete =await _userBL.DeleteUser(id);
            return isDelete;
        }
       
    }
}
