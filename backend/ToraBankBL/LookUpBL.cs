using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToraBankBL.Interfaces;
using ToraBankDAL;
using ToraBankDAL.Interfaces;
using ToraBankDAL.Models;
using ToraBankDTO.DTO;
using Type = ToraBankDAL.Models.Type;

namespace ToraBankBL
{
    public class LookUpBL : ILookUpBL
    {
        public IMapper _mapper;
        ILookUpDL _lookUpDL;
        public LookUpBL(ILookUpDL lookUpDL, IMapper mapper)
        {
            this._mapper = mapper;
            _lookUpDL = lookUpDL;
        }
        public async Task<List<CategoryDTO>> GetAllCategory()
        {
            try
            {
                List<Category> category = await _lookUpDL.GetAllCategory();
                List<CategoryDTO> categoryDTO = _mapper.Map<List<Category>, List<CategoryDTO>>(category);
                return categoryDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<CityDTO>> GetAllCity()
        {
            try
            {
                List<City> city = await _lookUpDL.GetAllCity();
                List<CityDTO> cityDTO = _mapper.Map<List<City>, List<CityDTO>>(city);
                return cityDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<CityDTO> GetCityById(int id)
        {
            City city = await _lookUpDL.GetCityById(id);
            return _mapper.Map<CityDTO>(city);
        }

        public async Task<List<DayDTO>> GetAllDay()
        {
            try
            {
                List<Day> day = await _lookUpDL.GetAllDay();
                List<DayDTO> dayDTO = _mapper.Map<List<Day>, List<DayDTO>>(day);
                return dayDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<LevelDTO>> GetAllLevel()
        {
            try
            {
                List<Level> day = await _lookUpDL.GetAllLevel();
                List<LevelDTO> levelDTO = _mapper.Map<List<Level>, List<LevelDTO>>(day);
                return levelDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<TypeDTO>> GetAllType()
        {
            try
            {
                List<Type> type = await _lookUpDL.GetAllType();
                List<TypeDTO> typelDTO = _mapper.Map<List<Type>, List<TypeDTO>>(type);
                return typelDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<CityDTO> AddCity(CityDTO cityDTO)
        {
            City city = _mapper.Map<City>(cityDTO);
            City newCity = await _lookUpDL.AddCity(city);

            return _mapper.Map<CityDTO>(newCity);
        }
        public async Task<CityDTO> UpdateCity(int id, CityDTO cityDTO)
        {
            City city = _mapper.Map<City>(cityDTO);
            City updatedCity = await _lookUpDL.UpdateCity(id, city);
            return _mapper.Map<CityDTO>(updatedCity);
        }


        public async Task<CategoryDTO> AddCategory(CategoryDTO categoryDTO)
        {
            Category category = _mapper.Map<Category>(categoryDTO);
            Category newCategory = await _lookUpDL.AddCategory(category);

            return _mapper.Map<CategoryDTO>(newCategory);
        }
        public async Task<CategoryDTO> UpdateCategory(int id, CategoryDTO categoryDTO)
        {
            Category category = _mapper.Map<Category>(categoryDTO);
            Category updatedCategory = await _lookUpDL.UpdateCategory(id, category);
            return _mapper.Map<CategoryDTO>(updatedCategory);
        }


        public async Task<TypeDTO> AddType(TypeDTO typeDTO)
        {
            Type type = _mapper.Map<Type>(typeDTO);
            Type newType = await _lookUpDL.AddType(type);

            return _mapper.Map<TypeDTO>(newType);
        }
        public async Task<TypeDTO> UpdateType(int id, TypeDTO typeDTO)
        {
            Type type = _mapper.Map<Type>(typeDTO);
            Type updatedType = await _lookUpDL.UpdateType(id, type);
            return _mapper.Map<TypeDTO>(updatedType);
        }





    }
}
