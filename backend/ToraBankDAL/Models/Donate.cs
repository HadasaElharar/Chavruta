using System;
using System.Collections.Generic;

namespace ToraBankDAL.Models;

public partial class Donate
{
    public int DonateId { get; set; }

    public int UserId { get; set; }

    public int RavId { get; set; }

    public int Sum { get; set; }

    public DateOnly Date { get; set; }

    public string? File { get; set; }

    public virtual User Rav { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
