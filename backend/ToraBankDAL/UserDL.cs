using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToraBankDAL.Interfaces;
using ToraBankDAL.Models;

namespace ToraBankDAL
{
    public class UserDL : IUserDL
    {
        ToraBankContext _toraBankContext = new ToraBankContext();
        public async Task<List<User>> GetAllUsers()
        {
            List<User> users = await _toraBankContext.Users
                .OrderBy(user => user.LevelId).ToListAsync();
            return users;

        }
        public async Task<User> AddUser(User user)
        {
            try
            {
                // בדיקת האם יש משתמש עם אותו מייל
                var existingUser = await _toraBankContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
                if (existingUser != null)
                {
                    throw new Exception("User with this email already exists.");
                }

                if (user.CityId == -1)
                {
                    user.CityId = null;
                }

                await _toraBankContext.Users.AddAsync(user);
                await _toraBankContext.SaveChangesAsync();

                User newUser = await _toraBankContext.Users.OrderByDescending(item => item.UserId).FirstOrDefaultAsync();
                return newUser;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<User> UpdateUser(int id, User user)
        {
            try
            {
                // בדיקת האם יש משתמש עם אותו מייל שאינו המשתמש הנוכחי
                var existingUser = await _toraBankContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email && u.UserId != id);
                if (existingUser != null)
                {
                    throw new Exception("User with this email already exists.");
                }

                // מציאת המשתמש הנוכחי לעדכון
                User currentUserToUpdate = await _toraBankContext.Users.FirstOrDefaultAsync(item => item.UserId == id);
                if (currentUserToUpdate == null)
                {
                    throw new ArgumentException($"{id} is not found");
                }

                // עדכון פרטי המשתמש
                currentUserToUpdate.Name = user.Name;
                currentUserToUpdate.Email = user.Email;
                currentUserToUpdate.Password = user.Password;
                currentUserToUpdate.Phone = user.Phone;
                currentUserToUpdate.CityId = user.CityId;
                currentUserToUpdate.BirthdayYear = user.BirthdayYear;
                currentUserToUpdate.Comment = user.Comment;
                currentUserToUpdate.Subject = user.Subject;
                currentUserToUpdate.Chavruta = user.Chavruta;
                currentUserToUpdate.Status = user.Status;

                // אם currentUserToUpdate.LevelId אינו 3, עדכן את ה-LevelId
                if (currentUserToUpdate.LevelId != 3)
                {
                    currentUserToUpdate.LevelId = user.LevelId;
                }

                await _toraBankContext.SaveChangesAsync();

                return currentUserToUpdate;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<User> DeleteUser(int id)
        {
            try
            {
                User currentUserToDelete = await _toraBankContext.Users.SingleOrDefaultAsync(item => item.UserId == id);
                if (currentUserToDelete == null)
                    throw new ArgumentException($"{id} is not found");
                _toraBankContext.Users.Remove(currentUserToDelete);
                _toraBankContext.SaveChangesAsync();
                return currentUserToDelete;
                //hththt\
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<User> GetUserById(int id)
        {
            return await _toraBankContext.Users.FirstOrDefaultAsync(item => item.UserId == id);

        }



        public async Task<User> Login(User user)
        {
            User _user = await _toraBankContext.Users
                .FirstOrDefaultAsync(u => u.Email.Equals(user.Email) && u.Password.Equals(user.Password));

            // אם המשתמש נמצא, בדוק את הסטטוס שלו
            if (_user != null)
            {
                if (_user.Status) 
                {
                    return _user;
                }
                else
                {
                    // החזר הודעה מתאימה אם הסטטוס הוא false
                    throw new UnauthorizedAccessException("גישה נחסמה. חשבונך אינו פעיל.");
                }
            }
            else
            {
                throw new UnauthorizedAccessException("Invalid email or password.");
            }
        }

        public async Task<List<User>> GetAllRabaies()
        {
            List<User> rabaies = await _toraBankContext.Users.Where(user => user.LevelId == 3).ToListAsync();
            return rabaies;

        }

        public async Task<List<User>> GetUsersByChavruta(int id)
        {
            List<User> users = await _toraBankContext.Users.Where(user => user.Chavruta == true && user.UserId != id)
                .Include(u => u.ChavrutumUserId2Navigations)
                .Include(u => u.ChavrutumUserId1Navigations)
                .ToListAsync();
            // מכל רשימה של חברותות 
            foreach (var user in users)
            {
                user.ChavrutumUserId1Navigations = user.ChavrutumUserId1Navigations
                    .Where(c => c.UserId2 == id)
                    .ToList();

                user.ChavrutumUserId2Navigations = user.ChavrutumUserId2Navigations
                    .Where(c => c.UserId1 == id)
                    .ToList();
            }

            //פילטרנו מי שיש לנו איתו חברותא מאושרת
            var filteredUsers = users
                .Where(user => !user.ChavrutumUserId1Navigations.Any(c => c.Approved) && !user.ChavrutumUserId2Navigations.Any(c => c.Approved))
                .ToList();

            return filteredUsers;
        }
    }
}
