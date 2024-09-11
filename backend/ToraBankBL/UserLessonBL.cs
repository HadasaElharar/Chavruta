using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToraBankBL.Interfaces;
using ToraBankDAL;
using ToraBankDAL.Interfaces;
using ToraBankDAL.Models;
using ToraBankDTO.DTO;

namespace ToraBankBL
{
    public class UserLessonBL : IUserLessonBL
    {
        public IMapper _mapper;
        IUserLessonDL _userLessonDL;

        public UserLessonBL(IUserLessonDL userLessonDL, IMapper mapper)
        {
            _userLessonDL = userLessonDL;
            this._mapper = mapper;
        }

        public async Task<List<UserLessonDTO>> GetAllUserLessons()
        {
            try
            {
                List<UserLesson> userLessons = await _userLessonDL.GetAllUserLessons();
                List<UserLessonDTO> userLessonDTOs = _mapper.Map<List<UserLessonDTO>>(userLessons);
                return userLessonDTOs;
            }
            catch (Exception ex)
            {
                // Handle exception
                return null;
            }
        }

        public async Task<UserLessonDTO> AddUserLesson(UserLessonDTO userLessonDTO)
        {
            UserLesson userLesson = _mapper.Map<UserLesson>(userLessonDTO);
            UserLesson newUserLesson = await _userLessonDL.AddUserLesson(userLesson);

            return _mapper.Map<UserLessonDTO>(newUserLesson);
        }

        public async Task<UserLessonDTO> UpdateUserLesson(int userLessonId, UserLessonDTO userLessonDTO)
        {
            UserLesson userLesson = _mapper.Map<UserLesson>(userLessonDTO);
            UserLesson updatedUserLesson = await _userLessonDL.UpdateUserLesson(userLessonId, userLesson);

            return _mapper.Map<UserLessonDTO>(updatedUserLesson);
        }

        public async Task<UserLessonDTO> DeleteUserLesson(int userLessonId)
        {
            UserLesson deletedUserLesson = await _userLessonDL.DeleteUserLesson(userLessonId);

            return _mapper.Map<UserLessonDTO>(deletedUserLesson);
        }
        public async Task<UserLessonDTO> GetUserLessonById(int id)
        {
            UserLesson userLesson = await _userLessonDL.GetUserLessonById(id);
            return _mapper.Map<UserLessonDTO>(userLesson);
        }

        public async Task<(List<UserLessonDTO>, bool)> GetAllUserLessonForUserIdByPage(int userId, int page)
        {
            try
            {
                int pageSize = 18;
                int skipCount = (page - 1) * pageSize;
                (List<UserLesson> userLessons,bool hasNext) = await _userLessonDL.GetAllUserLessonForUserIdByPage(userId, skipCount, pageSize);
                List<UserLessonDTO> userLessonDTOs = _mapper.Map<List<UserLessonDTO>>(userLessons);
                return (userLessonDTOs, hasNext);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                // Handle exception
                return (null, false);
            }
        }
        public async Task<List<UserLessonDTO>> GetAllUserLessonForUserId(int userId)
        {
            try
            {
               
                List<UserLesson> userLessons = await _userLessonDL.GetAllUserLessonForUserId(userId);
                List<UserLessonDTO> userLessonDTOs = _mapper.Map<List<UserLessonDTO>>(userLessons);
                return (userLessonDTOs);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                // Handle exception
                return (null);
            }
        }
        public async Task<(List<UserLessonDTO>, bool)> GetSearchUserLessonByPage(int userId, int page, string str)
        {
            try
            {
                //int pageSize = 16;
                int pageSize = 18;
                int skipCount = (page - 1) * pageSize;
                // Retrieve books from the repository based on skipCount and pageSize
                (List<UserLesson> userLesson, bool hasNext) = await _userLessonDL.GetSearchUserLessonByPage(userId, skipCount, pageSize, str);

                List<UserLessonDTO> userLessonDTOs = _mapper.Map<List<UserLessonDTO>>(userLesson);

                return (userLessonDTOs, hasNext);
            }
            catch (Exception ex)
            {
                // Handle exceptions or log them as needed
                Console.Write(ex.ToString(), "GetSearchUserLessonByPage in UserLessonBL");
                return (null, false); // Propagate the exception to the controller for centralized error handling
            }
        }
    }
}