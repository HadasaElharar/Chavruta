using AutoMapper;
using System.Reflection.Metadata;
using ToraBankDAL.Models;
using ToraBankDTO.DTO;
using Type = ToraBankDAL.Models.Type;

namespace ToraBankDTO
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UserLoginDTO>().ReverseMap();
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<Chavrutum, ChavrutumDTO>().ReverseMap();
            CreateMap<City,CityDTO>().ReverseMap();
            CreateMap<Contact, ContactDTO>().ReverseMap();
            CreateMap<Day, DayDTO>().ReverseMap();
            CreateMap<Donate, DonateDTO>().ReverseMap();
            CreateMap<Lesson, LessonDTO>().ReverseMap();
            CreateMap<Level, LevelDTO>().ReverseMap();
            CreateMap<Qa, QaDTO>().ReverseMap();
            CreateMap<Type, TypeDTO>().ReverseMap();
            CreateMap<UserDay, UserDayDTO>().ReverseMap();
            CreateMap<UserLesson, UserLessonDTO>().ReverseMap();
            CreateMap<EventsChavrutum, EventsChavrutumDTO>().ReverseMap();


        }

    }
}
