using ToraBankDTO.DTO;

namespace ToraBankBL.Interfaces
{
    public interface ILessonBL
    {
        Task<LessonDTO> AddLesson(LessonDTO lessonDTO);
        Task<LessonDTO> DeleteLesson(int id);
        Task<List<LessonDTO>> GetAllLessons();
        Task<LessonDTO> GetLessonById(int id);
        Task<LessonDTO> UpdateLesson(int id, LessonDTO lessonDTO);
        Task<(List<LessonDTO>, bool)> GetLessonsByStatus(int page);
        Task<(List<LessonDTO>, bool)> GetLessonsByPage(int page);
        Task<(List<LessonDTO>, bool)> GetSearchLessonByPage(int page, string str);
        Task<(List<LessonDTO>, bool)> GetFilterLessonByPage(
            int page,
            int? categoryID = null,
            DateOnly? startDate = null,
            DateOnly? endDate = null,
            int? ravId = null,
             int? type = null);


    }
}