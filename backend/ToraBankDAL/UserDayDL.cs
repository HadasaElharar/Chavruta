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
    public class UserDayDL : IUserDayDL
    {
        ToraBankContext _toraBankContext = new ToraBankContext();
        public async Task<List<UserDay>> GetAllUserDays()
        {
            List<UserDay> userDays = await _toraBankContext.UserDays.ToListAsync();
            return userDays;

        }
        public async Task<UserDay> AddUserDay(UserDay userDay)
        {
            try
            {
                _toraBankContext.UserDays.AddAsync(userDay);
                _toraBankContext.SaveChanges();
                UserDay newUserDay = await _toraBankContext.UserDays.OrderByDescending(item => item.UserDaysId).FirstOrDefaultAsync();
                return newUserDay;
            }
            catch (Exception ex)
            {
                throw ex;
                return null;
            }

        }
        public async Task<UserDay> UpdateUserDay(int id, UserDay userDay)
        {
            try
            {
                UserDay currentUserDayToUpdate = _toraBankContext.UserDays.Where(item => item.UserDaysId == id).FirstOrDefault();
                if (currentUserDayToUpdate == null)
                    throw new ArgumentException($"{id}isnot found");
                //currentUserToUpdate.UserId = user.UserId;
                else
                {
                    currentUserDayToUpdate.DayId = userDay.DayId;
                    currentUserDayToUpdate.EventChavrutaId = userDay.EventChavrutaId;
                    currentUserDayToUpdate.Day = userDay.Day;


                    await _toraBankContext.SaveChangesAsync();
                    return currentUserDayToUpdate;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<UserDay> DeleteUserDay(int id)
        {
            try
            {
                UserDay currentUserDayToDelete = await _toraBankContext.UserDays.SingleOrDefaultAsync(item => item.UserDaysId == id);
                if (currentUserDayToDelete == null)
                    throw new ArgumentException($"{id} is not found");
                _toraBankContext.UserDays.Remove(currentUserDayToDelete);
                _toraBankContext.SaveChanges();
                return currentUserDayToDelete;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<UserDay>> GetUserDayByEventId(int id)
        {
            return await _toraBankContext.UserDays
                  .Include(ud => ud.Day)
       .Where(item => item.EventChavrutaId == id)
       .ToListAsync();
        }

    


    }
}
