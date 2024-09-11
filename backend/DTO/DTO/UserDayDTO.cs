using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToraBankDAL.Models;

namespace ToraBankDTO.DTO
{
    public class UserDayDTO
    {
        public int UserDaysId { get; set; }

        public int DayId { get; set; }

        public int EventChavrutaId { get; set; }

        public virtual DayDTO ? Day { get; set; } = null!;

        //public virtual EventsChavrutum EventChavruta { get; set; } = null!;
    }
}
