using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToraBankDTO.DTO
{
    public class UserDTO
    {
        public int UserId { get; set; }

        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Phone { get; set; }

        public int? CityId { get; set; }

        public int? BirthdayYear { get; set; }

        public string? Comment { get; set; }

        public string? Subject { get; set; }

        public bool? Chavruta { get; set; }

        public int LevelId { get; set; }

        public bool Status { get; set; } = true;

        public bool HasUnapprovedChavrutum { get; set; }

    }
}
