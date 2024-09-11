using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ToraBankDAL.Models;

public partial class ToraBankContext : DbContext
{
    public ToraBankContext()
    {
    }

    public ToraBankContext(DbContextOptions<ToraBankContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Chavrutum> Chavruta { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<Day> Days { get; set; }

    public virtual DbSet<Donate> Donates { get; set; }

    public virtual DbSet<EventsChavrutum> EventsChavruta { get; set; }

    public virtual DbSet<Lesson> Lessons { get; set; }

    public virtual DbSet<Level> Levels { get; set; }

    public virtual DbSet<Qa> Qas { get; set; }

    public virtual DbSet<Type> Types { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserDay> UserDays { get; set; }

    public virtual DbSet<UserLesson> UserLessons { get; set; }



    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
     => optionsBuilder.UseSqlServer("Server=DESKTOP-NGJCGRF" +
         ";Database= Tora-bank;Trusted_Connection=True; TrustServerCertificate=true");




    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Desc).HasMaxLength(50);
        });

        modelBuilder.Entity<Chavrutum>(entity =>
        {
            entity.HasKey(e => e.ChavrutaId);

            entity.Property(e => e.ChavrutaId).HasColumnName("ChavrutaID");
            entity.Property(e => e.UserId1).HasColumnName("UserID1");
            entity.Property(e => e.UserId2).HasColumnName("UserID2");

            entity.HasOne(d => d.UserId1Navigation).WithMany(p => p.ChavrutumUserId1Navigations)
                .HasForeignKey(d => d.UserId1)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Chavruta_User1");

            entity.HasOne(d => d.UserId2Navigation).WithMany(p => p.ChavrutumUserId2Navigations)
                .HasForeignKey(d => d.UserId2)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Chavruta_User2");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Desc)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.Property(e => e.ContactId).HasColumnName("ContactID");
            entity.Property(e => e.Email)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.Subject)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<Day>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Desc)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<Donate>(entity =>
        {
            entity.Property(e => e.DonateId).HasColumnName("DonateID");
            entity.Property(e => e.RavId).HasColumnName("RavID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Rav).WithMany(p => p.DonateRavs)
                .HasForeignKey(d => d.RavId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Donates__RavID__5BE2A6F2");

            entity.HasOne(d => d.User).WithMany(p => p.DonateUsers)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Donates__UserID__5AEE82B9");
        });

        modelBuilder.Entity<EventsChavrutum>(entity =>
        {
            entity.HasKey(e => e.EventChavrutaId);

            entity.Property(e => e.EventChavrutaId).HasColumnName("EventChavrutaID");
            entity.Property(e => e.ChavrutaId).HasColumnName("ChavrutaID");

            entity.HasOne(d => d.Chavruta).WithMany(p => p.EventsChavruta)
                .HasForeignKey(d => d.ChavrutaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EventsChavruta_Chavruta");
        });

        modelBuilder.Entity<Lesson>(entity =>
        {
            entity.Property(e => e.LessonId).HasColumnName("lessonID");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.UserRavId).HasColumnName("UserRavID");

            entity.HasOne(d => d.Category).WithMany(p => p.Lessons)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Lessons__Categor__59FA5E80");

            entity.HasOne(d => d.TypeNavigation).WithMany(p => p.Lessons)
                .HasForeignKey(d => d.Type)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Lessons___type__59063A47");

            entity.HasOne(d => d.UserRav).WithMany(p => p.Lessons)
                .HasForeignKey(d => d.UserRavId)
                .HasConstraintName("FK__Lessons__UserRav__5070F446");
        });

        modelBuilder.Entity<Level>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Desc)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<Qa>(entity =>
        {
            entity.ToTable("QA");

            entity.Property(e => e.QaId).HasColumnName("QaID");
            entity.Property(e => e.RavId).HasColumnName("RavID");
            entity.Property(e => e.Subject)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Rav).WithMany(p => p.QaRavs)
                .HasForeignKey(d => d.RavId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__QA__RavID__6383C8BA");

            entity.HasOne(d => d.User).WithMany(p => p.QaUsers)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__QA__UserID__628FA481");
        });

        modelBuilder.Entity<Type>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Desc)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.BirthdayYear).HasColumnName("Birthday_year");
            entity.Property(e => e.CityId).HasColumnName("CityID");
            entity.Property(e => e.Email)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.LevelId).HasColumnName("LevelID");
            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.Password)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsFixedLength();

            entity.HasOne(d => d.City).WithMany(p => p.Users)
                .HasForeignKey(d => d.CityId)
                .HasConstraintName("FK__Users__CityID__4E88ABD4");

            entity.HasOne(d => d.Level).WithMany(p => p.Users)
                .HasForeignKey(d => d.LevelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Users__LevelID__4F7CD00D");
        });

        modelBuilder.Entity<UserDay>(entity =>
        {
            entity.HasKey(e => e.UserDaysId);

            entity.Property(e => e.UserDaysId).HasColumnName("UserDaysID");
            entity.Property(e => e.DayId).HasColumnName("DayID");
            entity.Property(e => e.EventChavrutaId).HasColumnName("EventChavrutaID");

            entity.HasOne(d => d.Day).WithMany(p => p.UserDays)
                .HasForeignKey(d => d.DayId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserDays__DayID__5DCAEF64");

            entity.HasOne(d => d.EventChavruta).WithMany(p => p.UserDays)
                .HasForeignKey(d => d.EventChavrutaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserDays_EventChavruta");
        });

        modelBuilder.Entity<UserLesson>(entity =>
        {
            entity.HasKey(e => e.UserLessonsId);

            entity.Property(e => e.UserLessonsId).HasColumnName("UserLessonsID");
            entity.Property(e => e.LessonId).HasColumnName("LessonID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Lesson).WithMany(p => p.UserLessons)
                .HasForeignKey(d => d.LessonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserLesso__Lesso__5FB337D6");

            entity.HasOne(d => d.User).WithMany(p => p.UserLessons)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserLesso__UserI__5EBF139D");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
