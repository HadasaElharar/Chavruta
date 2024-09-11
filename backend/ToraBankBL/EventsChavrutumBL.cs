using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToraBankBL.Interfaces;
using ToraBankDAL.Interfaces;
using ToraBankDAL.Models;
using ToraBankDTO.DTO;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;

namespace ToraBankBL
{
    public class EventsChavrutumBL : IEventsChavrutumBL
    {

        public IMapper _mapper;
        IEventsChavrutumDL _eventsChavrutumDL;
        public EventsChavrutumBL(IEventsChavrutumDL eventsChavrutumDL, IMapper mapper)
        {
            this._mapper = mapper;
            _eventsChavrutumDL = eventsChavrutumDL;
        }
        public async Task<List<EventsChavrutumDTO>> GetAllEventsChavruta()
        {
            try
            {
                List<EventsChavrutum> EventsChavrutum = await _eventsChavrutumDL.GetAllEventsChavruta();
                List<EventsChavrutumDTO> EventsChavrutumDTO = _mapper.Map<List<EventsChavrutum>, List<EventsChavrutumDTO>>(EventsChavrutum);
                return EventsChavrutumDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<EventsChavrutumDTO> AddEventsChavrutum(EventsChavrutumDTO EventsChavrutumDTO)
        {
            EventsChavrutum EventsChavrutum = _mapper.Map<EventsChavrutum>(EventsChavrutumDTO);
            EventsChavrutum newEventsChavrutum = await _eventsChavrutumDL.AddEventsChavrutum(EventsChavrutum);

            return _mapper.Map<EventsChavrutumDTO>(newEventsChavrutum);
        }
        public async Task<EventsChavrutumDTO> UpdateEventsChavrutum(int id, EventsChavrutumDTO EventsChavrutumDTO)
        {
            EventsChavrutum EventsChavrutum = _mapper.Map<EventsChavrutum>(EventsChavrutumDTO);
            EventsChavrutum updatedEventsChavrutum = await _eventsChavrutumDL.UpdateEventsChavrutum(id, EventsChavrutum);
            return _mapper.Map<EventsChavrutumDTO>(updatedEventsChavrutum);
        }
        public async Task<EventsChavrutumDTO> DeleteEventsChavrutum(int id)
        {
            int u = _mapper.Map<int>(id);
            EventsChavrutum updatedEventsChavrutum = await _eventsChavrutumDL.DeleteEventsChavrutum(id);

            return _mapper.Map<EventsChavrutumDTO>(updatedEventsChavrutum);
        }
        public async Task<EventsChavrutumDTO> GetEventsChavrutumById(int id)
        {
            EventsChavrutum EventsChavrutum = await _eventsChavrutumDL.GetEventsChavrutumById(id);
            return _mapper.Map<EventsChavrutumDTO>(EventsChavrutum);
        }
        private static string GetRandomColor()
        {
            Random random = new Random();
            int r = random.Next(256);
            int g = random.Next(256);
            int b = random.Next(256);
            return $"#{r:X2}{g:X2}{b:X2}";
        }



        public async Task<List<EventsCalendarDTO>> GetEventsChavrutumByUserId(int userId)
        {
            List<EventsChavrutum> eventsChavrutum = await _eventsChavrutumDL.GetEventsChavrutumByUserId(userId);
            List<EventsCalendarDTO> events = new List<EventsCalendarDTO>();

            int count = 0;
            foreach (var item in eventsChavrutum)
            {
                // השתמש בצבע מהמודל אם הוא קיים, אחרת השתמש בצבע רנדומלי
                string eventColor = string.IsNullOrEmpty(item.Color) ? GetRandomColor() : item.Color;

                DateOnly date = item.StartDate;
                while (date <= item.EndDate)
                {
                    if (item.UserDays.Select(x => x.Day.Id).Contains((int)date.DayOfWeek + 1))
                    {
                        EventsCalendarDTO itemEvent = new EventsCalendarDTO()
                        {
                            Id = count++,
                            EventChavrutaId = item.EventChavrutaId,
                            Title = item.Subject,
                            Start = date.ToDateTime(item.StartTime),
                            End = date.ToDateTime(item.EndTime),
                            BgColor = eventColor
                        };
                        events.Add(itemEvent);
                    }
                    date = date.AddDays(1);
                }
            }
            return events;
        }


    }


}
