using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToraBankBL.Interfaces;
using ToraBankDAL;
using ToraBankDAL.Interfaces;
using ToraBankDAL.Models;
using ToraBankDTO.DTO;

namespace ToraBankBL
{
    public class LessonBL :ILessonBL
    {
        public IMapper _mapper;
        ILessonDL _lessonDL;
        public LessonBL(ILessonDL lessonDL, IMapper mapper)
        {
            this._mapper = mapper;
            _lessonDL = lessonDL;
        }


        public async Task<List<LessonDTO>> GetAllLessons()
        {
            try
            {
                List<Lesson> lessons = await _lessonDL.GetAllLessons();
                List<LessonDTO> lessonDTOs = _mapper.Map<List<Lesson>, List<LessonDTO>>(lessons);
                return lessonDTOs;
            }
            catch (Exception ex)
            {
                // טיפול בשגיאה אם נדרש
                return null;
            }
        }

        public async Task<LessonDTO> AddLesson(LessonDTO lessonDTO)
        {
            Lesson lesson = _mapper.Map<Lesson>(lessonDTO);
            Lesson newLesson = await _lessonDL.AddLesson(lesson);
            return _mapper.Map<LessonDTO>(newLesson);
        }

        public async Task<LessonDTO> UpdateLesson(int id, LessonDTO lessonDTO)
        {
            Lesson lesson = _mapper.Map<Lesson>(lessonDTO);
            Lesson updatedLesson = await _lessonDL.UpdateLesson(id, lesson);
            return _mapper.Map<LessonDTO>(updatedLesson);
        }

        public async Task<LessonDTO> DeleteLesson(int id)
        {
            Lesson deletedLesson = await _lessonDL.DeleteLesson(id);
            return _mapper.Map<LessonDTO>(deletedLesson);
        }

        public async Task<LessonDTO> GetLessonById(int id)
        {
            Lesson lesson = await _lessonDL.GetLessonById(id);
            return _mapper.Map<LessonDTO>(lesson);
        }

        public async Task<(List<LessonDTO>, bool)> GetLessonsByStatus(int page)
        {
            try
            {
                int pageSize = 18;
                int skipCount = (page - 1) * pageSize;
                // Retrieve books from the repository based on skipCount and pageSize
                (List<Lesson> lessons, bool hasNext) = await _lessonDL.GetLessonsByStatus(skipCount, pageSize);

                List<LessonDTO> lessonDTOs = _mapper.Map<List<LessonDTO>>(lessons);

                return (lessonDTOs, hasNext);
            }
            catch (Exception ex)
            {
                // Handle exceptions or log them as needed
                Console.Write(ex.ToString(), "GetLessonsByStatus in LessonBL");
                return (null, false); // Propagate the exception to the controller for centralized error handling
            }
        }

        public async Task<(List<LessonDTO>, bool)> GetLessonsByPage(int page)
        {
            try
            {
                int pageSize = 18;
                int skipCount = (page - 1) * pageSize;
                // Retrieve books from the repository based on skipCount and pageSize
                (List<Lesson> lessons, bool hasNext) = await _lessonDL.GetLessonsByPage(skipCount, pageSize);

                List<LessonDTO> lessonDTOs = _mapper.Map<List<LessonDTO>>(lessons);

                return (lessonDTOs, hasNext);
            }
            catch (Exception ex)
            {
                // Handle exceptions or log them as needed
                Console.Write(ex.ToString(), "GetLessonsByPage in LessonBL");
                return (null, false); // Propagate the exception to the controller for centralized error handling
            }
        }
        public async Task<(List<LessonDTO>, bool)> GetSearchLessonByPage(int page, string str)
        {
            try
            {
                int pageSize = 18;
                int skipCount = (page - 1) * pageSize;
                // Retrieve books from the repository based on skipCount and pageSize
                (List<Lesson> lesson, bool hasNext) = await _lessonDL.GetSearchLessonByPage(skipCount, pageSize, str);

                List<LessonDTO> lessonDTOs = _mapper.Map<List<LessonDTO>>(lesson);

                return (lessonDTOs, hasNext);
            }
            catch (Exception ex)
            {
                // Handle exceptions or log them as needed
                Console.Write(ex.ToString(), "GetSearchLessonByPage in LessonBL");
                return (null, false); // Propagate the exception to the controller for centralized error handling
            }
        }
        public async Task<(List<LessonDTO>, bool)> GetFilterLessonByPage(
            int page,
            int? categoryID = null,
            DateOnly? startDate = null,
            DateOnly? endDate = null,
            int? ravId = null,
             int? type = null)
        {
            try
            {
                int pageSize = 18;
                int skipCount = (page - 1) * pageSize;

                // Retrieve filtered lessons from the DAL layer along with the hasNext flag
                (List<Lesson> filteredLessons, bool hasNext) = await _lessonDL.GetFilterLessonByPage(skipCount, pageSize, categoryID, startDate, endDate, ravId, type);

                // Map filtered books to DTOs
                List<LessonDTO> lessonDTOs = _mapper.Map<List<LessonDTO>>(filteredLessons);

                return (lessonDTOs, hasNext);
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString(), "GetFilterLessonByPage in LessonBL");
                return (null, false); // Propagate the exception to the controller for centralized error handling
            }
        }

    }
}

