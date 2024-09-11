using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToraBankDAL.Models;

namespace ToraBankDTO.DTO
{
    public class ChavrutumDTO
    {
        public int ChavrutaId { get; set; }

        public int UserId1 { get; set; }

        public int UserId2 { get; set; }

        public bool Approved { get; set; }

        public virtual UserDTO? UserId1Navigation { get; set; } = null!;

        public virtual UserDTO? UserId2Navigation { get; set; } = null!;

        public virtual ICollection<EventsChavrutumDTO>? EventsChavruta { get; set; } = new List<EventsChavrutumDTO>();

    }
}
