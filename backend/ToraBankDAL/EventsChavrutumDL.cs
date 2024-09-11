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
    public class EventsChavrutumDL : IEventsChavrutumDL
    {
        ToraBankContext _toraBankContext = new ToraBankContext();
        public async Task<List<EventsChavrutum>> GetAllEventsChavruta()
        {
            List<EventsChavrutum> EventsChavruta = await _toraBankContext.EventsChavruta.ToListAsync();
            return EventsChavruta;

        }
        public async Task<EventsChavrutum> AddEventsChavrutum(EventsChavrutum EventsChavrutum)
        {
            try
            {
                _toraBankContext.EventsChavruta.AddAsync(EventsChavrutum);
                _toraBankContext.SaveChanges();
                EventsChavrutum newEventsChavrutum = await _toraBankContext.EventsChavruta.OrderByDescending(item => item.EventChavrutaId).FirstOrDefaultAsync();
                return newEventsChavrutum;
            }
            catch (Exception ex)
            {
                throw ex;
                return null;
            }

        }

        public async Task<EventsChavrutum> UpdateEventsChavrutum(int id, EventsChavrutum updatedEventChavruta)
        {
            try
            {
                // Fetch the existing event
                EventsChavrutum currentEventChavruta = await _toraBankContext.EventsChavruta
                    .Include(e => e.UserDays)
                         .ThenInclude(ud => ud.Day)
                    .FirstOrDefaultAsync(item => item.EventChavrutaId == id);

                if (currentEventChavruta == null)
                {
                    throw new ArgumentException($"{id} is not found");
                }

                // Update the event details
                currentEventChavruta.Subject = updatedEventChavruta.Subject;
                currentEventChavruta.StartDate = updatedEventChavruta.StartDate;
                currentEventChavruta.EndDate = updatedEventChavruta.EndDate;
                currentEventChavruta.StartTime = updatedEventChavruta.StartTime;
                currentEventChavruta.EndTime = updatedEventChavruta.EndTime;
                currentEventChavruta.ChavrutaId = updatedEventChavruta.ChavrutaId;
                currentEventChavruta.Chavruta = updatedEventChavruta.Chavruta;
                currentEventChavruta.Color = updatedEventChavruta.Color;

                // Remove all existing UserDays related to this event
                var existingUserDays = await _toraBankContext.UserDays
                    .Where(ud => ud.EventChavrutaId == id)
                    .ToListAsync();

                _toraBankContext.UserDays.RemoveRange(existingUserDays);

                if (updatedEventChavruta.UserDays != null)
                {
                    foreach (var userDay in updatedEventChavruta.UserDays)
                    {
                        if (userDay.DayId <= 0)
                        {
                            throw new ArgumentException("Invalid DayId");
                        }

                        userDay.EventChavrutaId = id; // Ensure the correct EventChavrutaId is set
                        _toraBankContext.UserDays.Add(userDay);
                    }
                }

                // Save changes to the database
                await _toraBankContext.SaveChangesAsync();
                return currentEventChavruta;
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                throw; // Re-throw the exception to be handled by the calling code
            }
        }



        public async Task<EventsChavrutum> DeleteEventsChavrutum(int id)
        {
            try
            {
                EventsChavrutum currentEventsChavrutumToDelete = await _toraBankContext.EventsChavruta
                    .Include(e => e.UserDays)
                         .ThenInclude(ud => ud.Day)
                         .SingleOrDefaultAsync(item => item.EventChavrutaId == id);
                if (currentEventsChavrutumToDelete == null)
                    throw new ArgumentException($"{id} is not found");
                _toraBankContext.UserDays.RemoveRange(currentEventsChavrutumToDelete.UserDays);

                _toraBankContext.EventsChavruta.Remove(currentEventsChavrutumToDelete);

                _toraBankContext.SaveChangesAsync();
                return currentEventsChavrutumToDelete;
                //hththt\
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<EventsChavrutum> GetEventsChavrutumById(int id)
        {
            return await _toraBankContext.EventsChavruta
                .Include(e => e.UserDays)
                         .ThenInclude(ud => ud.Day)
                .FirstOrDefaultAsync(item => item.EventChavrutaId == id);

        }


        public async Task<List<EventsChavrutum>> GetEventsChavrutumByUserId(int userId)
        {
            return await _toraBankContext.EventsChavruta.Where(item => item.Chavruta.UserId1 == userId || item.Chavruta.UserId2 == userId).Include(x => x.UserDays).ThenInclude(u => u.Day).ToListAsync();

        }
    }
}
