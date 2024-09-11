using System;
using System.Collections.Generic;

namespace ToraBankDAL.Models;

public partial class UserDay
{
    public int UserDaysId { get; set; }

    public int DayId { get; set; }

    public int EventChavrutaId { get; set; }

    public virtual Day Day { get; set; } = null!;

    public virtual EventsChavrutum EventChavruta { get; set; } = null!;
}
