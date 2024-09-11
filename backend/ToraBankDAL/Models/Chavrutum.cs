using System;
using System.Collections.Generic;

namespace ToraBankDAL.Models;

public partial class Chavrutum
{
    public int ChavrutaId { get; set; }

    public int UserId1 { get; set; }

    public int UserId2 { get; set; }

    public bool Approved { get; set; }

    public virtual ICollection<EventsChavrutum> EventsChavruta { get; set; } = new List<EventsChavrutum>();

    public virtual User UserId1Navigation { get; set; } = null!;

    public virtual User UserId2Navigation { get; set; } = null!;
}
