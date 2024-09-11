using System;
using System.Collections.Generic;

namespace ToraBankDAL.Models;

public partial class Lesson
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

    public virtual Category? Category { get; set; }

    public virtual Type TypeNavigation { get; set; } = null!;

    public virtual ICollection<UserLesson> UserLessons { get; set; } = new List<UserLesson>();

    public virtual User? UserRav { get; set; }
}
