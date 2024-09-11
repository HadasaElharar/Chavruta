using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToraBankDAL.Models;

namespace ToraBankDTO.DTO
{
    public class EventsCalendarDTO
    {
        public int Id { get; set; }
        public int EventChavrutaId { get; set; }

        public string Title { get; set; } = null!;

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public string BgColor { get; set; }

    }
}
