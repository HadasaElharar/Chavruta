using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToraBankDTO.DTO
{
    public class ContactDTO
    {
        public int ContactId { get; set; }

        public string Subject { get; set; } = null!;

        public string Message { get; set; } = null!;

        public string Phone { get; set; }

        public string Email { get; set; } = null!;
    }
}
