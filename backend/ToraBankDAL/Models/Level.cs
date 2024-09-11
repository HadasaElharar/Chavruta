using System;
using System.Collections.Generic;

namespace ToraBankDAL.Models;

public partial class Level
{
    public int Id { get; set; }

    public string Desc { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
