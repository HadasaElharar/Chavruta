using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToraBankDTO.DTO
{
    public class LessonDTO
    {
        public int LessonId { get; set; }

        public string Description { get; set; } = null!;

        public int? UserRavId { get; set; }

        public DateOnly Date { get; set; }

        public bool? UploadByUser { get; set; }

        public bool? Status { get; set; }

        public string Link { get; set; } = null!;

        public int Type { get; set; }

        public int? CategoryId { get; set; }

        //public virtual CategoryDTO? Category { get; set; }

        //public virtual Type TypeNavigation { get; set; } = null!;

        //public virtual UserDTO? UserRav { get; set; }
    }
}
