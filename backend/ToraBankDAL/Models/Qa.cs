using System;
using System.Collections.Generic;

namespace ToraBankDAL.Models;

public partial class Qa
{
    public int QaId { get; set; }

    public string Subject { get; set; } = null!;

    public string Message { get; set; } = null!;

    public int UserId { get; set; }

    public int RavId { get; set; }

    public string? Response { get; set; }

    public bool? Status { get; set; }

    public DateOnly? CreateDate { get; set; }

    public virtual User Rav { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
