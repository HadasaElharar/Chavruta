using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToraBankBL.Interfaces;
using ToraBankDAL.Interfaces;
using ToraBankDAL.Models;
using ToraBankDTO.DTO;




namespace ToraBankBL
{
    public class UserDayBL : IUserDayBL
    {
        public IMapper _mapper;
        IUserDayDL _userDayDL;
        public UserDayBL(IUserDayDL userDayDL, IMapper mapper)
        {
            this._mapper = mapper;
            _userDayDL = userDayDL;
        }
        public async Task<List<UserDayDTO>> GetAllUserDays()
        {
            try
            {
                List<UserDay> userDay = await _userDayDL.GetAllUserDays();
                List<UserDayDTO> userDayDTO = _mapper.Map<List<UserDay>, List<UserDayDTO>>(userDay);
                return userDayDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<UserDayDTO> AddUserDay(UserDayDTO userDayDTO)
        {
            UserDay userDay = _mapper.Map<UserDay>(userDayDTO);
            UserDay newUserDay = await _userDayDL.AddUserDay(userDay);

            return _mapper.Map<UserDayDTO>(newUserDay);
        }
        public async Task<UserDayDTO> UpdateUserDay(int id, UserDayDTO userDayDTO)
        {
            UserDay userDay = _mapper.Map<UserDay>(userDayDTO);
            UserDay updatedUserDay = await _userDayDL.UpdateUserDay(id, userDay);
            return _mapper.Map<UserDayDTO>(updatedUserDay);
        }
        public async Task<UserDayDTO> DeleteUserDay(int id)
        {
            int u = _mapper.Map<int>(id);
            UserDay updatedUserDay = await _userDayDL.DeleteUserDay(id);

            return _mapper.Map<UserDayDTO>(updatedUserDay);
        }
        public async Task<List<UserDayDTO>> GetUserDayByEventId(int id)
        {
            List<UserDay> userDay = await _userDayDL.GetUserDayByEventId(id);
            List<UserDayDTO> userDayDTOs = _mapper.Map<List<UserDayDTO>>(userDay);
            return userDayDTOs;
        }



    }
}

