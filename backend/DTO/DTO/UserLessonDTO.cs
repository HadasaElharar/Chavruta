using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToraBankDTO.DTO
{
    public class UserLessonDTO
    {
        public int UserLessonsId { get; set; }

        public int UserId { get; set; }

        public int LessonId { get; set; }

        public virtual LessonDTO? Lesson { get; set; } = null!;

        //public virtual UserDTO User { get; set; } = null!;
    }
}
