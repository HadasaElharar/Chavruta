using ToraBankDAL.Models;
using ToraBankDTO.DTO;

namespace ToraBankBL.Interfaces
{
    public interface IUserLessonBL
    {
        Task<UserLessonDTO> AddUserLesson(UserLessonDTO userLessonDTO);
        Task<UserLessonDTO> DeleteUserLesson(int userLessonId);
        Task<List<UserLessonDTO>> GetAllUserLessons();
        Task<UserLessonDTO> GetUserLessonById(int id);
        Task<(List<UserLessonDTO>, bool)> GetAllUserLessonForUserIdByPage(int userId, int page);
        Task<UserLessonDTO> UpdateUserLesson(int userLessonId, UserLessonDTO userLessonDTO);
        Task<(List<UserLessonDTO>, bool)> GetSearchUserLessonByPage(int userId, int page, string str);
        Task<List<UserLessonDTO>> GetAllUserLessonForUserId(int userId);
    }
}