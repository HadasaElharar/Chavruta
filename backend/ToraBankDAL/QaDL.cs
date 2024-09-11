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
    public class QaDL : IQaDL
    {
        ToraBankContext _toraBankContext = new ToraBankContext();
        public async Task<List<Qa>> GetAllQas()
        {
            List<Qa> qa = await _toraBankContext.Qas.ToListAsync();
            return qa;

        }

        public async Task<Qa> AddQa(Qa qa)
        {
            try
            {
                _toraBankContext.Qas.AddAsync(qa);
                _toraBankContext.SaveChanges();
                Qa newQa = await _toraBankContext.Qas.OrderByDescending(item => item.QaId).FirstOrDefaultAsync();
                return newQa;
            }
            catch (Exception ex)
            {
                throw ex;
                return null;
            }

        }
        public async Task<Qa> UpdateQa(int id, Qa qa)
        {
            try
            {
                Qa currentQaToUpdate = _toraBankContext.Qas.Where(item => item.QaId == id).FirstOrDefault();
                if (currentQaToUpdate == null)
                    throw new ArgumentException($"{id}isnot found");
                //currentUserToUpdate.UserId = user.UserId;
                else
                {
                    currentQaToUpdate.Subject = qa.Subject;
                    currentQaToUpdate.Message = qa.Message;
                    currentQaToUpdate.UserId = qa.UserId;
                    currentQaToUpdate.RavId = qa.RavId;
                    currentQaToUpdate.Response = qa.Response;
                    currentQaToUpdate.Status = qa.Status;

                    await _toraBankContext.SaveChangesAsync();
                    return currentQaToUpdate;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Qa> DeleteQa(int id)
        {
            try
            {
                Qa currentQaToDelete = await _toraBankContext.Qas.SingleOrDefaultAsync(item => item.QaId == id);
                if (currentQaToDelete == null)
                    throw new ArgumentException($"{id} is not found");
                _toraBankContext.Qas.Remove(currentQaToDelete);
                _toraBankContext.SaveChanges();
                return currentQaToDelete;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Qa> GetQaById(int id)
        {
            return await _toraBankContext.Qas.FirstOrDefaultAsync(item => item.QaId == id);

        }
        public async Task<List<Qa>> GetQaByUserId(int userId)
        {
            return await _toraBankContext.Qas
                .Include(d => d.User)
                .Where(d => d.UserId == userId).ToListAsync();
        }
        public async Task<List<Qa>> GetQaByRavId(int RavId)
        {
            return await _toraBankContext.Qas
                .Include(d => d.User)
                .Where(d => d.RavId == RavId).ToListAsync();
        }


    }
}
