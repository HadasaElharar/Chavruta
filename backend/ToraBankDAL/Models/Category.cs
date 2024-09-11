using System;
using System.Collections.Generic;

namespace ToraBankDAL.Models;

public partial class Category
{
    public int Id { get; set; }

    public string Desc { get; set; } = null!;

    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}
