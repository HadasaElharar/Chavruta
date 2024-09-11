using ToraBankDAL.Models;

namespace ToraBankDAL.Interfaces
{
    public interface ILookUpDL
    {
        Task<List<Category>> GetAllCategory();
        Task<List<City>> GetAllCity();
        Task<List<Day>> GetAllDay();
        Task<List<Level>> GetAllLevel();
        Task<List<Models.Type>> GetAllType();
        Task<City> GetCityById(int id);
        Task<City> AddCity(City city);
        Task<City> UpdateCity(int id, City city);
        Task<Category> AddCategory(Category category);
        Task<Category> UpdateCategory(int id, Category category);
        Task<Models.Type> AddType(Models.Type type);
        Task<Models.Type> UpdateType(int id, Models.Type type);








    }
}