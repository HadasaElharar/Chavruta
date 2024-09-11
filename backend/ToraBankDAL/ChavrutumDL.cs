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
    public class ChavrutumDL : IChavrutumDL
    {
        ToraBankContext _toraBankContext = new ToraBankContext();

        public async Task<List<Chavrutum>> GetAllChavrutum()
        {
            List<Chavrutum> chavrutumList = await _toraBankContext.Chavruta.ToListAsync();
            return chavrutumList;
        }





        public async Task<Chavrutum> AddChavrutum(Chavrutum chavrutum)
        {
            try
            {
                await _toraBankContext.Chavruta.AddAsync(chavrutum);
                await _toraBankContext.SaveChangesAsync();

                Chavrutum newChavrutum = await _toraBankContext.Chavruta.OrderByDescending(item => item.ChavrutaId).FirstOrDefaultAsync();
                return newChavrutum;
            }
            catch (Exception ex)
            {
                throw ex;
                return null;
            }
        }

        public async Task<Chavrutum> UpdateChavrutum(int id, Chavrutum chavrutum)
        {
            try
            {
                Chavrutum currentChavrutumToUpdate = await _toraBankContext.Chavruta.Where(item => item.ChavrutaId == id).FirstOrDefaultAsync();

                if (currentChavrutumToUpdate == null)
                    throw new ArgumentException($"{id} is not found");

                currentChavrutumToUpdate.UserId1 = chavrutum.UserId1;
                currentChavrutumToUpdate.UserId2 = chavrutum.UserId2;
                currentChavrutumToUpdate.Approved = chavrutum.Approved;

                await _toraBankContext.SaveChangesAsync();

                return currentChavrutumToUpdate;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<Chavrutum> DeleteChavrutum(int id)
        {
            try
            {
                // מציאת החברותא למחיקה כולל האובייקטים המקושרים
                Chavrutum currentChavrutumToDelete = await _toraBankContext.Chavruta
                    .Include(c => c.EventsChavruta)
                    .ThenInclude(e => e.UserDays) // הכללת ה-UserDays המקושרים
                    .SingleOrDefaultAsync(item => item.ChavrutaId == id);

                if (currentChavrutumToDelete == null)
                    throw new ArgumentException($"{id} is not found");

                // מחיקת כל ה-UserDays המקושרים
                foreach (var eventChavruta in currentChavrutumToDelete.EventsChavruta)
                {
                    _toraBankContext.UserDays.RemoveRange(eventChavruta.UserDays);
                }

                // מחיקת כל ה-EventsChavruta המקושרים
                _toraBankContext.EventsChavruta.RemoveRange(currentChavrutumToDelete.EventsChavruta);

                // מחיקת ה-Chavrutum
                _toraBankContext.Chavruta.Remove(currentChavrutumToDelete);

                await _toraBankContext.SaveChangesAsync();

                return currentChavrutumToDelete;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<Chavrutum> GetChavrutumById(int id)
        {
            return await _toraBankContext.Chavruta
                .Include(chavruta => chavruta.UserId1Navigation)
                .Include(chavruta=>chavruta.UserId2Navigation)
                .FirstOrDefaultAsync(item => item.ChavrutaId == id);
        }

        public async Task<List<Chavrutum>> GetChavrutumByUserId(int userId)
        {
            return await _toraBankContext.Chavruta.Where(item => (item.UserId1 == userId || item.UserId2 == userId) && item.Approved).Include(chavruta => chavruta.UserId1Navigation).Include(chavruta => chavruta.UserId2Navigation).ToListAsync();
        }
        public async Task<List<Chavrutum>> GetChavrutumByUserId2(int userId)
        {
            return await _toraBankContext.Chavruta.Where(item => item.UserId2 == userId && !item.Approved).Include(chavruta => chavruta.UserId1Navigation).Include(chavruta => chavruta.UserId2Navigation).ToListAsync();
        }
    }
}
