using System;
using System.Collections.Generic;

namespace ToraBankDAL.Models;

public partial class Day
{
    public int Id { get; set; }

    public string Desc { get; set; } = null!;

    public virtual ICollection<UserDay> UserDays { get; set; } = new List<UserDay>();
}
