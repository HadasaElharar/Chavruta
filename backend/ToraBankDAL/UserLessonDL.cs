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
    public class UserLessonDL : IUserLessonDL
    {
        ToraBankContext _toraBankContext = new ToraBankContext();

        public async Task<List<UserLesson>> GetAllUserLessons()
        {
            List<UserLesson> userLessons = await _toraBankContext.UserLessons.ToListAsync();
            return userLessons;
        }

        public async Task<UserLesson> GetUserLessonById(int id)
        {
            return await _toraBankContext.UserLessons.FirstOrDefaultAsync(item => item.UserLessonsId == id);

        }

        public async Task<UserLesson> AddUserLesson(UserLesson userLesson)
        {
            try
            {
                UserLesson userLessonToAdd = await _toraBankContext.UserLessons
                    .SingleOrDefaultAsync(ul => ul.UserId == userLesson.UserId && ul.LessonId == userLesson.LessonId);
                if (userLessonToAdd != null)
                {
                    throw new Exception("השיעור כבר קיים ברשימת המועדפים של המשתמש.");

                }
                await _toraBankContext.UserLessons.AddAsync(userLesson);
                await _toraBankContext.SaveChangesAsync();

                return userLesson;
            }
            catch (Exception ex)
            {
                throw new Exception("שגיאה בהוספת השיעור למועדפים: " + ex.Message, ex);
            }
        }

        public async Task<UserLesson> DeleteUserLesson(int userLessonId)
        {
            try
            {
                UserLesson userLessonToDelete = await _toraBankContext.UserLessons
                    .SingleOrDefaultAsync(ul => ul.UserLessonsId == userLessonId);

                if (userLessonToDelete == null)
                {
                    throw new ArgumentException($"{userLessonId} is not found");
                }

                _toraBankContext.UserLessons.Remove(userLessonToDelete);
                await _toraBankContext.SaveChangesAsync();

                return userLessonToDelete;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<UserLesson> UpdateUserLesson(int userLessonId, UserLesson updatedUserLesson)
        {
            try
            {
                // Find the existing UserLesson
                UserLesson existingUserLesson = await _toraBankContext.UserLessons.FindAsync(userLessonId);

                if (existingUserLesson == null)
                {
                    throw new ArgumentException($"{userLessonId} is not found");
                }
                else
                {
                    // Update properties
                    existingUserLesson.UserId = updatedUserLesson.UserId;
                    existingUserLesson.LessonId = updatedUserLesson.LessonId;
                    // You might need to update the navigation properties (Lesson and User) as well, depending on your requirements

                    await _toraBankContext.SaveChangesAsync();
                    return existingUserLesson;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(List<UserLesson>, bool)> GetAllUserLessonForUserIdByPage(int userId,int skipCount, int pageSize)
        {
            try
            {
                //int skipCount = (pageSize - 1) * 10;
                List<UserLesson> userLessons = await _toraBankContext.UserLessons
                    .Include(d => d.Lesson)
                    .Where(userLesson => userLesson.UserId == userId && userLesson.Lesson.Status == true)

                    .OrderByDescending(userLesson => userLesson.UserLessonsId) 
                    .Skip(skipCount)
                    .Take(pageSize)
                    .ToListAsync();
                int totalCount = await _toraBankContext.UserLessons
                     .Where(userLesson => userLesson.Lesson.Status == true)

                .CountAsync();

                // Calculate if there are more lessons available based on pagination parameters and total count
                bool hasNext = skipCount + pageSize < totalCount;

                return (userLessons, hasNext);
            }
            catch (Exception ex)
            {
                // Handle exceptions or log them as needed
                Console.Write(ex.ToString(), "GetAllUserLessonForUserIdByPage in UserLessonDAL");
                return (null, false); // Propagate the exception to the BL layer for centralized error handling
            }
        }
        public async Task<List<UserLesson>> GetAllUserLessonForUserId(int userId)
        {
            try
            {
                List<UserLesson> userLessons = await _toraBankContext.UserLessons
                    .Include(d => d.Lesson)
                    .Where(userLesson => userLesson.UserId == userId && userLesson.Lesson.Status == true)
                    .OrderByDescending(userLesson => userLesson.UserLessonsId)
                    .ToListAsync();
               // int totalCount = await _toraBankContext.UserLessons


                // Calculate if there are more lessons available based on pagination parameters and total count

                return (userLessons);
            }
            catch (Exception ex)
            {
                // Handle exceptions or log them as needed
                Console.Write(ex.ToString(), "GetAllUserLessonForUserId in UserLessonDAL");
                return (null); // Propagate the exception to the BL layer for centralized error handling
            }
        }
        public async Task<(List<UserLesson>, bool)> GetSearchUserLessonByPage(int userId, int skipCount, int pageSize, string str)
        {
            try
            {
                // חיפוש לפי תיאור השיעור בתיאור השיעור המקושר
                List<UserLesson> userLessons = await _toraBankContext.UserLessons
                    .Include(d => d.Lesson)
                    .Where(userLesson => userLesson.UserId == userId&& userLesson.Lesson.Status == true)
                    .Where(userLesson => userLesson.Lesson.Description.Contains(str) && userLesson.Lesson.Status == true) // חיפוש בתיאור השיעור
                    .OrderByDescending(userLesson => userLesson.LessonId) // או כל מאפיין אחר שאתה רוצה לסדר לפיו
                    .Skip(skipCount)
                    .Take(pageSize)
                    .ToListAsync();

                int totalCount = await _toraBankContext.UserLessons
                    .Include(d => d.Lesson)
                    .Where(userLesson => userLesson.UserId == userId && userLesson.Lesson.Status == true)
                    .Where(userLesson => userLesson.Lesson.Description.Contains(str) && userLesson.Lesson.Status == true)
                    .CountAsync();

                // חישוב אם יש עוד שיעורים זמינים לפי הפרמטרים של הדפדוף והספירה הכוללת
                bool hasNext = skipCount + pageSize < totalCount;

                return (userLessons, hasNext);
            }
            catch (Exception ex)
            {
                // טיפול בשגיאות או לוג שלהם במידת הצורך
                Console.Write(ex.ToString(), "GetSearchUserLessonByPage in ToraBankContext");
                return (null, false); // הפצת השגיאה לשכבת ה-BL לטיפול מרכזי בשגיאות
            }
        }

    }
}