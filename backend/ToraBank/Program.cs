using ToraBankBL;
using ToraBankDAL;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using ToraBankDTO;
using ToraBankDAL.Interfaces;
using ToraBankBL.Interfaces;
using Microsoft.OpenApi.Models;
using ToraBankDTO.DTO;
using Microsoft.OpenApi.Any;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// הוספת שירותים ל-JSON עם תמיכה ב-TimeOnly
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new TimeOnlyJsonConverter());
    }
);
builder.Services.AddCors();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.MapType<DateOnly>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "date",
        Example = new OpenApiString("yyyy-MM-dd")
    });
    options.MapType<TimeOnly>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "time",
        Example = new OpenApiString("HH:mm") // דוגמה לפורמט שעה ודקות בלבד
    });
});





builder.Services.AddAutoMapper(typeof(AutoMapping));

builder.Services.AddScoped<IUserBL, UserBL>();
builder.Services.AddScoped<IUserDL, UserDL>();
builder.Services.AddScoped<IChavrutumBL, ChavrutumBL>();
builder.Services.AddScoped<IChavrutumDL, ChavrutumDL>();
builder.Services.AddScoped<IContactBL, ContactBL>();
builder.Services.AddScoped<IContactDL, ContactDL>();
builder.Services.AddScoped<IDonateBL, DonateBL>();
builder.Services.AddScoped<IDonateDL, DonateDL>();
builder.Services.AddScoped<ILessonBL, LessonBL>();
builder.Services.AddScoped<ILessonDL, LessonDL>();
builder.Services.AddScoped<ILookUpDL, LookUpDL>();
builder.Services.AddScoped<ILookUpBL, LookUpBL>();


builder.Services.AddScoped<IUserLessonBL, UserLessonBL>();
builder.Services.AddScoped<IUserLessonDL, UserLessonDL>();
builder.Services.AddScoped<IQaBL, QaBL>();
builder.Services.AddScoped<IQaDL, QaDL>();

builder.Services.AddScoped<IUserDayBL, UserDayBL>();
builder.Services.AddScoped<IUserDayDL, UserDayDL>();

builder.Services.AddScoped<IEventsChavrutumBL, EventsChavrutumBL>();
builder.Services.AddScoped<IEventsChavrutumDL, EventsChavrutumDL>();

builder.Services.AddScoped<ILookUpBL, LookUpBL>();
builder.Services.AddScoped<ILookUpDL, LookUpDL>();
var app = builder.Build();
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();



