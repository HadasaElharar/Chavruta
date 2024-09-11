using ToraBankDAL.Models;

namespace ToraBankDAL.Interfaces
{
    public interface IUserLessonDL
    {
        Task<UserLesson> AddUserLesson(UserLesson userLesson);
        Task<UserLesson> DeleteUserLesson(int userLessonId);
        Task<List<UserLesson>> GetAllUserLessons();
        Task<UserLesson> GetUserLessonById(int id);
        Task<(List<UserLesson>, bool)> GetAllUserLessonForUserIdByPage(int userId, int skipCount, int pageSize);
        Task<UserLesson> UpdateUserLesson(int userLessonId, UserLesson updatedUserLesson);
        Task<(List<UserLesson>, bool)> GetSearchUserLessonByPage(int userId, int skipCount, int pageSize, string str);
        Task<List<UserLesson>> GetAllUserLessonForUserId(int userId);
    }
}