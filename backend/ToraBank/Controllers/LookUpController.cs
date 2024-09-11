using Microsoft.AspNetCore.Mvc;
using ToraBankBL.Interfaces;
using ToraBankDTO.DTO;

using Microsoft.AspNetCore.Mvc;
using ToraBankBL.Interfaces;
using ToraBankDAL;
using ToraBankDAL.Models;
using ToraBankDTO.DTO;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ToraBank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookUpController : ControllerBase
    {
        ILookUpBL _lookUpBL;
        public LookUpController(ILookUpBL lookUpBL)
        {
            _lookUpBL = lookUpBL;
        }

        // GET: api/<UserController>
        [HttpGet]
        [Route("GetAllCategory")]
        public async Task<List<CategoryDTO>> GetAllCategory()
        {
            return await _lookUpBL.GetAllCategory();
        }
        [HttpGet]
        [Route("GetAllCity")]
        public async Task<List<CityDTO>> GetAllCity()
        {
            return await _lookUpBL.GetAllCity();
        }
        [HttpGet]
        [Route("GetCityById/{id}")]
        public async Task<CityDTO> GetCityById(int id)
        {
            return await _lookUpBL.GetCityById(id);
        }

        [HttpGet]
        [Route("GetAllDay")]
        public async Task<List<DayDTO>> GetAllDay()
        {
            return await _lookUpBL.GetAllDay();
        }
        [HttpGet]
        [Route("GetAllLevel")]
        public async Task<List<LevelDTO>> GetAllLevel()
        {
            return await _lookUpBL.GetAllLevel();
        }
        [HttpGet]
        [Route("GetAllType")]
        public async Task<List<TypeDTO>> GetAllType()
        {
            return await _lookUpBL.GetAllType();
        }

        
        [HttpPost("AddCity")]

        public async Task<CityDTO> AddCity([FromBody] CityDTO cityDTO)
        {
            CityDTO newCity = await _lookUpBL.AddCity(cityDTO);
            return newCity;
        }

        [HttpPut("UpdateCity/{id}")]
        public async Task<CityDTO> UpdateCity(int id, [FromBody] CityDTO cityDTO)
        {
            CityDTO isUpdate = await _lookUpBL.UpdateCity(id, cityDTO);
            return isUpdate;
        }


        [HttpPost("AddCategory")]

        public async Task<CategoryDTO> AddCategory([FromBody] CategoryDTO categoryDTO)
        {
            CategoryDTO newCategory = await _lookUpBL.AddCategory(categoryDTO);
            return newCategory;
        }

        [HttpPut("UpdateCategory/{id}")]
        public async Task<CategoryDTO> UpdateCategory(int id, [FromBody] CategoryDTO categoryDTO)
        {
            CategoryDTO isUpdate = await _lookUpBL.UpdateCategory(id, categoryDTO);
            return isUpdate;
        }


        [HttpPost("AddType")]

        public async Task<TypeDTO> AddType([FromBody] TypeDTO typeDTO)
        {
            TypeDTO newType = await _lookUpBL.AddType(typeDTO);
            return newType;
        }

        [HttpPut("UpdateType/{id}")]
        public async Task<TypeDTO> UpdateType(int id, [FromBody] TypeDTO typeDTO)
        {
            TypeDTO isUpdate = await _lookUpBL.UpdateType(id, typeDTO);
            return isUpdate;
        }

    }
}