using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToraBankDAL.Models;

namespace ToraBankDTO.DTO
{
    public class EventsChavrutumDTO
    {
        public int EventChavrutaId { get; set; }

        public string Subject { get; set; } = null!;

        public DateOnly StartDate { get; set; }

        public DateOnly EndDate { get; set; }

        public TimeOnly StartTime { get; set; }

        public TimeOnly EndTime { get; set; }

        public int ChavrutaId { get; set; }

        public string? Color { get; set; } = null!;

        //public virtual Chavrutum Chavruta { get; set; } = null!;

        public virtual ICollection<UserDayDTO> ?UserDays { get; set; } = new List<UserDayDTO>();
    }
}
