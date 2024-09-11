using iText.Kernel.Geom;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToraBankDAL.Interfaces;
using ToraBankDAL.Models;

namespace ToraBankDAL
{
    public class LessonDL : ILessonDL
    {
        ToraBankContext _toraBankContext = new ToraBankContext();

        public async Task<List<Lesson>> GetAllLessons()
        {
            List<Lesson> lessons = await _toraBankContext.Lessons.ToListAsync();
            return lessons;
        }

        public async Task<Lesson> AddLesson(Lesson lesson)
        {
            try
            {
                lesson.Link = FormatYouTubeLink(lesson.Link);
                bool linkExists = await _toraBankContext.Lessons.AnyAsync(l => l.Link == lesson.Link);
                if (linkExists)
                {
                    throw new Exception("Link already exists in the database.");
                }

                _toraBankContext.Lessons.AddAsync(lesson);
                await _toraBankContext.SaveChangesAsync();
                Lesson newLesson = await _toraBankContext.Lessons.OrderByDescending(item => item.LessonId).FirstOrDefaultAsync();
                return newLesson;
            }
            catch (Exception ex)
            {
                // טיפול בשגיאה אם נדרש
                throw ex;
            }
        }

        public async Task<Lesson> UpdateLesson(int id, Lesson lesson)
        {
            try
            {
                Lesson currentLessonToUpdate = await _toraBankContext.Lessons.Where(item => item.LessonId == id).FirstOrDefaultAsync();
                if (currentLessonToUpdate == null)
                    throw new ArgumentException($"{id} is not found");

                currentLessonToUpdate.Link = FormatYouTubeLink(lesson.Link);
                bool linkExists = await _toraBankContext.Lessons.AnyAsync(l => l.Link == lesson.Link && l.LessonId != lesson.LessonId);
                if (linkExists)
                {
                    throw new Exception("Link already exists in the database.");
                }
                currentLessonToUpdate.Description = lesson.Description;
                currentLessonToUpdate.UserRavId = lesson.UserRavId;
                currentLessonToUpdate.Date = lesson.Date;
                currentLessonToUpdate.UploadByUser = lesson.UploadByUser;
                currentLessonToUpdate.Status = lesson.Status;
                currentLessonToUpdate.Type = lesson.Type;
                currentLessonToUpdate.CategoryId = lesson.CategoryId;

                await _toraBankContext.SaveChangesAsync();
                return currentLessonToUpdate;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<Lesson> DeleteLesson(int id)
        {
            try
            {
                Lesson currentLessonToDelete = await _toraBankContext.Lessons
                    .Include(l => l.UserLessons)
                    .SingleOrDefaultAsync(item => item.LessonId == id);

                if (currentLessonToDelete == null)
                {
                    throw new ArgumentException($"{id} is not found");
                }

                // מחיקת רשומות מטבלת UserLesson
                foreach (var userLesson in currentLessonToDelete.UserLessons)
                {
                    _toraBankContext.UserLessons.Remove(userLesson);
                }

                // מחיקת השיעור עצמו
                _toraBankContext.Lessons.Remove(currentLessonToDelete);
                await _toraBankContext.SaveChangesAsync();

                return currentLessonToDelete;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Lesson> GetLessonById(int id)
        {
            return await _toraBankContext.Lessons.FirstOrDefaultAsync(item => item.LessonId == id);
        }
     
        //public async Task<(List<Lesson>, bool)> GetLessonsByStatus(int skipCount, int pageSize)
        //{
        //    try
        //    {
        //        List<Lesson> lessons = await _toraBankContext.Lessons
        //             .Where(lesson => lesson.Status == false)
        //            .OrderByDescending(lessons => lessons.Date) // or any other property you want to order by
        //            .Skip(skipCount)
        //            .Take(pageSize)
        //            .ToListAsync();
        //        int totalCount = await _toraBankContext.Lessons
        //        .CountAsync();

        //        bool hasNext = skipCount + pageSize < totalCount;

        //        return (lessons, hasNext);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle exceptions or log them as needed
        //        Console.Write(ex.ToString(), "GetLessonsByStatus in LessonDAL");
        //        return (null, false); // Propagate the exception to the BL layer for centralized error handling
        //    }
        //}

        public async Task<(List<Lesson>, bool)> GetLessonsByStatus(int skipCount, int pageSize)
        {
            try
            {
                List<Lesson> lessons = await _toraBankContext.Lessons
                     .Where(lesson => lesson.Status == false)
                    .OrderByDescending(lessons => lessons.Date) // or any other property you want to order by
                    .Skip(skipCount)
                    .Take(pageSize)
                    .ToListAsync();
                int totalCount = await _toraBankContext.Lessons
                    .Where(lesson => lesson.Status == false)
                .CountAsync();

                bool hasNext = skipCount + pageSize < totalCount;

                return (lessons, hasNext);
            }
            catch (Exception ex)
            {
                // Handle exceptions or log them as needed
                Console.Write(ex.ToString(), "GetLessonsByStatus in LessonDAL");
                return (null, false); // Propagate the exception to the BL layer for centralized error handling
            }
        }



        public async Task<(List<Lesson>, bool)> GetLessonsByPage(int skipCount, int pageSize)
        {
            try
            {
                List<Lesson> lessons = await _toraBankContext.Lessons
                     .Where(lesson => lesson.Status == true)
                    .OrderByDescending(lessons => lessons.Date) // or any other property you want to order by
                    .Skip(skipCount)
                    .Take(pageSize)
                    .ToListAsync();
                int totalCount = await _toraBankContext.Lessons
                    .Where(lesson => lesson.Status == true)
                .CountAsync();

                bool hasNext = skipCount + pageSize < totalCount;

                return (lessons, hasNext);
            }
            catch (Exception ex)
            {
                // Handle exceptions or log them as needed
                Console.Write(ex.ToString(), "GetLessonsByPage in LessonDAL");
                return (null, false); // Propagate the exception to the BL layer for centralized error handling
            }
        }
        public async Task<(List<Lesson>, bool)> GetSearchLessonByPage(int skipCount, int pageSize, string str)
        {
            try
            {
                // Use your DbContext to query the database for lesson based on skipCount and pageSize
                List<Lesson> lessons = await _toraBankContext.Lessons
                    .Where(lesson => lesson.Description.Contains(str) && lesson.Status == true) // search for books based on the bookname property
                    .OrderByDescending(lesson => lesson.Date) // or any other property you want to order by
                    .Skip(skipCount)
                    .Take(pageSize)
                    .ToListAsync();
                int totalCount = await _toraBankContext.Lessons
                   .Where(lesson => lesson.Description.Contains(str))
                   .CountAsync();

                // Calculate if there are more lessons available based on pagination parameters and total count
                bool hasNext = skipCount + pageSize < totalCount;

                return (lessons, hasNext);

                return (lessons, hasNext);
            }
            catch (Exception ex)
            {
                // Handle exceptions or log them as needed
                Console.Write(ex.ToString(), "GetSearchLessonsByPage in BookDAL");
                return (null, false); // Propagate the exception to the BL layer for centralized error handling
            }
        }
        public async Task<(List<Lesson>, bool)> GetFilterLessonByPage(
            int skipCount,
            int pageSize,
            int? categoryID = null,
            DateOnly? startDate = null,
            DateOnly? endDate = null,
            int? ravId = null,
            int? type = null)

        {
            try
            {
                // בניית שאילתה בסיסית
                var query = _toraBankContext.Lessons.AsQueryable().Where(lesson => lesson.Status == true);

                // סינון לפי קטגוריה אם סופק
                if (categoryID.HasValue)
                {
                    query = query.Where(lesson => lesson.CategoryId == categoryID.Value);
                }

                // סינון לפי רב אם סופק
                if (ravId.HasValue)
                {
                    query = query.Where(lesson => lesson.UserRavId == ravId.Value);
                }

                // סינון לפי טווח תאריכים אם סופק
                if (startDate.HasValue && endDate.HasValue)
                {
                    query = query.Where(lesson => lesson.Date >= startDate.Value && lesson.Date <= endDate.Value);
                }
                if (type.HasValue)
                {
                    query = query.Where(lesson => lesson.Type == type.Value);
                }

                // שליפת שיעורים מסוננים לפי פרמטרי עמוד
                List<Lesson> lessons = await query
                    .OrderByDescending(lesson => lesson.Date) // או כל פרופרטי אחר שתרצה למיין לפיו
                    .Skip(skipCount)
                    .Take(pageSize)
                    .ToListAsync();

                // חישוב סך כל השיעורים לפי הקריטריונים המסוננים
                int totalCount = await query.CountAsync();

                // חישוב אם קיימים עוד שיעורים לפי פרמטרי עמוד והסך הכללי
                bool hasNext = skipCount + pageSize < totalCount;

                return (lessons, hasNext);
            }
            catch (Exception ex)
            {
                // טיפול בשגיאות או לוג שלהם לפי הצורך
                Console.Write(ex.ToString(), "GetFilterLessonByPage in LessonDAL");
                return (null, false); // החזרת ברירת מחדל במקרה של שגיאה
            }
        }

        public string FormatYouTubeLink(string link)
        {
            if (link.Contains("watch?v="))
            {
                link = link.Replace("watch?v=", "embed/");
            }
            if (link.Contains("&list"))
            {
                int index = link.IndexOf("&list");
                if (index != -1)
                {
                    return link.Substring(0, index);

                }

            }
            return link;
        }



    }
}

