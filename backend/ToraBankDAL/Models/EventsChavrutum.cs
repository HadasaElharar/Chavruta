using System;
using System.Collections.Generic;

namespace ToraBankDAL.Models;

public partial class EventsChavrutum
{
    public int EventChavrutaId { get; set; }

    public string Subject { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public int ChavrutaId { get; set; }

    public string ?Color { get; set; } = null!;

    public virtual Chavrutum Chavruta { get; set; } = null!;

    public virtual ICollection<UserDay> UserDays { get; set; } = new List<UserDay>();
}
