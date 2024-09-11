using System;
using System.Collections.Generic;

namespace ToraBankDAL.Models;

public partial class User
{
    private int? _cityId;
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public int? CityId
    {
        get => _cityId;
        set => _cityId = value == 0 ? null : value;
    }
    public int? BirthdayYear { get; set; }

    public string? Comment { get; set; }

    public string? Subject { get; set; }

    public bool? Chavruta { get; set; }

    public int LevelId { get; set; }

    public bool Status { get; set; } = true;

    public virtual ICollection<Chavrutum> ChavrutumUserId1Navigations { get; set; } = new List<Chavrutum>();

    public virtual ICollection<Chavrutum> ChavrutumUserId2Navigations { get; set; } = new List<Chavrutum>();

    public virtual City? City { get; set; }

    public virtual ICollection<Donate> DonateRavs { get; set; } = new List<Donate>();

    public virtual ICollection<Donate> DonateUsers { get; set; } = new List<Donate>();

    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();

    public virtual Level Level { get; set; } = null!;

    public virtual ICollection<Qa> QaRavs { get; set; } = new List<Qa>();

    public virtual ICollection<Qa> QaUsers { get; set; } = new List<Qa>();

    public virtual ICollection<UserLesson> UserLessons { get; set; } = new List<UserLesson>();
}
