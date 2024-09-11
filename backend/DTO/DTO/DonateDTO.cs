using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToraBankDTO.DTO
{
    public class DonateDTO
    {
        public int DonateId { get; set; }

        public int UserId { get; set; }

        public int RavId { get; set; }

        public int Sum { get; set; }

        public DateOnly Date { get; set; }

        public string? File { get; set; } = null!;

        public virtual UserDTO? Rav { get; set; } = null!;

        //public virtual UserDTO User { get; set; } = null!;
    }
}
