using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToraBankDAL.Interfaces;
using ToraBankDAL.Models;
using Type = ToraBankDAL.Models.Type;

namespace ToraBankDAL
{
    public class LookUpDL : ILookUpDL
    {

        ToraBankContext _toraBankContext = new ToraBankContext();
        public async Task<List<Category>> GetAllCategory()
        {
            List<Category> category = await _toraBankContext.Categories
                .OrderBy(user => user.Desc).ToListAsync();
            return category;

        }

        public async Task<Category> AddCategory(Category category)
        {
            try
            {
                _toraBankContext.Categories.AddAsync(category);
                _toraBankContext.SaveChanges();
                Category newCategory = await _toraBankContext.Categories.OrderByDescending(item => item.Id).FirstOrDefaultAsync();
                return newCategory;
            }
            catch (Exception ex)
            {
                throw ex;
                return null;
            }

        }

        public async Task<Category> UpdateCategory(int id, Category category)
        {
            try
            {
                Category currentCategoryToUpdate = _toraBankContext.Categories.Where(item => item.Id == id).FirstOrDefault();
                if (currentCategoryToUpdate == null)
                    throw new ArgumentException($"{id}isnot found");
                else
                {
                    currentCategoryToUpdate.Id = category.Id;
                    currentCategoryToUpdate.Desc = category.Desc;

                    await _toraBankContext.SaveChangesAsync();
                    return currentCategoryToUpdate;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<City>> GetAllCity()
        {
            List<City> city = await _toraBankContext.Cities
                .OrderBy(city => city.Desc).ToListAsync();
            return city;

        }

        public async Task<City> AddCity(City city)
        {
            try
            {
                _toraBankContext.Cities.AddAsync(city);
                _toraBankContext.SaveChanges();
                City newCity = await _toraBankContext.Cities.OrderByDescending(item => item.Id).FirstOrDefaultAsync();
                return newCity;
            }
            catch (Exception ex)
            {
                throw ex;
                return null;
            }

        }

        public async Task<City> UpdateCity(int id, City city)
        {
            try
            {
                City currentCityToUpdate = _toraBankContext.Cities.Where(item => item.Id == id).FirstOrDefault();
                if (currentCityToUpdate == null)
                    throw new ArgumentException($"{id}isnot found");
                else
                {
                    currentCityToUpdate.Id = city.Id;
                    currentCityToUpdate.Desc= city.Desc;
                    
                    await _toraBankContext.SaveChangesAsync();
                    return currentCityToUpdate;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public async Task<City> GetCityById(int id)
        {
            return await _toraBankContext.Cities.FirstOrDefaultAsync(item => item.Id == id);

        }
        public async Task<List<Day>> GetAllDay()
        {
            List<Day> day = await _toraBankContext.Days.ToListAsync();
            return day;

        }

        public async Task<List<Level>> GetAllLevel()
        {
            List<Level> level = await _toraBankContext.Levels.ToListAsync();
            return level;

        }
        public async Task<List<Type>> GetAllType()
        {
            List<Type> type = await _toraBankContext.Types
                .OrderBy(type => type.Desc).ToListAsync();
            return type;

        }


        public async Task<Type> AddType(Type type)
        {
            try
            {
                _toraBankContext.Types.AddAsync(type);
                _toraBankContext.SaveChanges();
                Type newType = await _toraBankContext.Types.OrderByDescending(item => item.Id).FirstOrDefaultAsync();
                return newType;
            }
            catch (Exception ex)
            {
                throw ex;
                return null;
            }

        }

        public async Task<Type> UpdateType(int id, Type type)
        {
            try
            {
                Type currentTypeToUpdate = _toraBankContext.Types.Where(item => item.Id == id).FirstOrDefault();
                if (currentTypeToUpdate == null)
                    throw new ArgumentException($"{id}isnot found");
                else
                {
                    currentTypeToUpdate.Id = type.Id;
                    currentTypeToUpdate.Desc = type.Desc;

                    await _toraBankContext.SaveChangesAsync();
                    return currentTypeToUpdate;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
