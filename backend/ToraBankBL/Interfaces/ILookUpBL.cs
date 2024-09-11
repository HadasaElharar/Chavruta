using ToraBankDTO.DTO;

namespace ToraBankBL.Interfaces
{
    public interface ILookUpBL
    {
        Task<List<CategoryDTO>> GetAllCategory();
        Task<List<CityDTO>> GetAllCity();
        Task<List<DayDTO>> GetAllDay();
        Task<List<LevelDTO>> GetAllLevel();
        Task<List<TypeDTO>> GetAllType();
        Task<CityDTO> GetCityById(int id);
        Task<CityDTO> AddCity(CityDTO cityDTO);
        Task<CityDTO> UpdateCity(int id, CityDTO cityDTO);
        Task<CategoryDTO> AddCategory(CategoryDTO categoryDTO);
        Task<CategoryDTO> UpdateCategory(int id, CategoryDTO categoryDTO);
        Task<TypeDTO> AddType(TypeDTO typeDTO);
        Task<TypeDTO> UpdateType(int id, TypeDTO typeDTO);






    }
}