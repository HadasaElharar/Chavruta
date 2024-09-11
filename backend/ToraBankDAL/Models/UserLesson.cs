using System;
using System.Collections.Generic;

namespace ToraBankDAL.Models;

public partial class UserLesson
{
    public int UserLessonsId { get; set; }

    public int UserId { get; set; }

    public int LessonId { get; set; }

    public virtual Lesson Lesson { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
