using ToraBankDAL.Models;

namespace ToraBankDAL.Interfaces
{
    public interface ILessonDL
    {
        Task<Lesson> AddLesson(Lesson lesson);
        Task<Lesson> DeleteLesson(int id);
        Task<List<Lesson>> GetAllLessons();
        Task<Lesson> GetLessonById(int id);
        Task<Lesson> UpdateLesson(int id, Lesson lesson);
        Task<(List<Lesson>, bool)> GetLessonsByStatus(int skipCount, int pageSize);
        Task<(List<Lesson>, bool)> GetLessonsByPage(int skipCount, int pageSize);
        Task<(List<Lesson>, bool)> GetSearchLessonByPage(int skipCount, int pageSize, string str);
        Task<(List<Lesson>, bool)> GetFilterLessonByPage(
            int skipCount,
            int pageSize,
            int? categoryID = null,
            DateOnly? startDate = null,
            DateOnly? endDate = null,
            int? ravId = null,
            int?type = null);

    }
}