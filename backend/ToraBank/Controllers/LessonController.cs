using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToraBankBL.Interfaces;
using ToraBankDTO.DTO;

namespace ToraBank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        ILessonBL _lessonBL;

        public LessonController(ILessonBL lessonBL)
        {
            _lessonBL = lessonBL;
        }

        // GET: api/Lesson
        [HttpGet]
        public async Task<List<LessonDTO>> GetAllLessons()
        {
            return await _lessonBL.GetAllLessons();
        }


        [HttpGet("GetLessonsByStatus/{page}")]
        public async Task<List<LessonDTO>> GetLessonsByStatus(int page)
        {
            try
            {
                (List<LessonDTO> lessons, bool hasNext) = await _lessonBL.GetLessonsByStatus(page);
                if (!hasNext)
                {
                    lessons.Add(null);
                }

                return lessons;
            }
            catch (Exception ex)
            {

                Console.Write(ex.ToString(), "GetLessonsByStatus Controller");
                return null;
            }
        }

        [HttpGet("GetLessonsByPage/{page}")]
        public async Task<List<LessonDTO>> GetLessonsByPage(int page)
        {
            try
            {
                (List<LessonDTO> lessons, bool hasNext) = await _lessonBL.GetLessonsByPage(page);
                if (!hasNext)
                {
                    lessons.Add(null);
                }

                return lessons;
            }
            catch (Exception ex)
            {

                Console.Write(ex.ToString(), "GetLessonsByPage Controller");
                return null;
            }
        }



        // GET: api/Lesson/5
        [HttpGet("{id}")]
        public async Task<LessonDTO> GetLessonById(int id)
        {
            return await _lessonBL.GetLessonById(id);
        }

        // POST: api/Lesson
        [HttpPost]
        public async Task<LessonDTO> AddLesson([FromBody] LessonDTO lessonDTO)
        {
            LessonDTO newLesson = await _lessonBL.AddLesson(lessonDTO);
            return newLesson;
        }

        // PUT: api/Lesson/5
        [HttpPut("{id}")]
        public async Task<LessonDTO> UpdateLesson(int id, [FromBody] LessonDTO lessonDTO)
        {
            LessonDTO isUpdate = await _lessonBL.UpdateLesson(id, lessonDTO);
            return isUpdate;
        }

        // DELETE: api/Lesson/5
        [HttpDelete("{id}")]
        public async Task<LessonDTO> DeleteLesson(int id)
        {
            LessonDTO isDelete = await _lessonBL.DeleteLesson(id);
            return isDelete;
        }
      

        [HttpGet("GetSearchLessonByPage")]
        public async Task<List<LessonDTO>> GetSearchLessonByPage([FromQuery] int page, [FromQuery] string str)
        {
            try
            {
                (List<LessonDTO> lessons, bool hasNext) = await _lessonBL.GetSearchLessonByPage(page, str);
                if (!hasNext)
                {
                    lessons.Add(null);
                }
                return lessons;
            }
            catch (Exception ex)
            {

                Console.Write(ex.ToString(), "GetSearchLessonByPage Controller");
                return null;
            }
        }
        [HttpGet("GetFilterLessonByPage")]
        public async Task<List<LessonDTO>> GetFilterLessonByPage([FromQuery] int page, [FromQuery] int? categoryID = null, [FromQuery]  DateOnly? startDate = null
            , [FromQuery] DateOnly? endDate = null, [FromQuery] int ? ravId = null, [FromQuery] int? type = null)
        {
            try
            {
                // Call the BL layer function to retrieve filtered books
                (List<LessonDTO> filteredLessons, bool hasNext) = await _lessonBL.GetFilterLessonByPage(page, categoryID, startDate, endDate, ravId, type);

                // Add a null lesson at the end if hasNext is false
                if (!hasNext)
                {
                    filteredLessons.Add(null);
                }
                return filteredLessons;
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString(), "GetFilterLessonByPage Controller");
                return null;
            }
        }
    }
}

