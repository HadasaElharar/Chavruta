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
    public class UserLessonController : ControllerBase
    {
        IUserLessonBL _userLessonBL;
        public UserLessonController(IUserLessonBL userLessonBL)
        {
            _userLessonBL = userLessonBL;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<List<UserLessonDTO>> GetAllUserLessons()
        {
            return await _userLessonBL.GetAllUserLessons();
        }


        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<UserLessonDTO> GetUserLessonById(int id)
        {
            return await _userLessonBL.GetUserLessonById(id);
        }

        // GET api/<UserController>/5
        [HttpGet("GetAllUserLessonForUserIdByPage")]
        public async Task<List<UserLessonDTO>> GetAllUserLessonForUserIdByPage(int userId, int page)
        {
            (List<UserLessonDTO> userLessonDTOs, bool hasNext) = await _userLessonBL.GetAllUserLessonForUserIdByPage(userId, page);

            if (!hasNext)
            {
                userLessonDTOs.Add(null);
            }
            return userLessonDTOs;
        }
        [HttpGet("GetAllUserLessonForUserId")]
        public async Task<List<UserLessonDTO>> GetAllUserLessonForUserId(int userId)
        {
            List<UserLessonDTO> userLessonDTOs = await _userLessonBL.GetAllUserLessonForUserId(userId);
           
            return userLessonDTOs;
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<UserLessonDTO> AddUserLesson([FromBody] UserLessonDTO userLessonDTO)
        {
            UserLessonDTO newUserLesson = await _userLessonBL.AddUserLesson(userLessonDTO);
            return newUserLesson;
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<UserLessonDTO> UpdateUserLesson(int id, [FromBody] UserLessonDTO userLessonDTO)
        {
            UserLessonDTO isUpdate = await _userLessonBL.UpdateUserLesson(id, userLessonDTO);
            return isUpdate;
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<UserLessonDTO> DeleteUserLesson(int id)
        {
            UserLessonDTO isDelete = await _userLessonBL.DeleteUserLesson(id);
            return isDelete;
        }


        [HttpGet("GetSearchUserLessonByPage")]
        public async Task<List<UserLessonDTO>> GetSearchUserLessonByPage([FromQuery] int userId, [FromQuery] int page, [FromQuery] string str)
        {
            try
            {
                (List<UserLessonDTO> userLessonDTOs, bool hasNext) = await _userLessonBL.GetSearchUserLessonByPage(userId, page, str);
                if (!hasNext)
                {
                    userLessonDTOs.Add(null);
                }
                return userLessonDTOs;
            }
            catch (Exception ex)
            {

                Console.Write(ex.ToString(), "GetSearchUserLessonByPage Controller");
                return null;
            }
        }

    }
}
