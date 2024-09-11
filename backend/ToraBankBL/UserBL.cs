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




namespace ToraBankBL
{
    public class UserBL : IUserBL
    {
        public IMapper _mapper;
        IUserDL _userDL;
        public UserBL(IUserDL userDL, IMapper mapper)
        {
            this._mapper = mapper;
            _userDL = userDL;
        }
        public async Task<List<UserDTO>> GetAllUsers()
        {
            try
            {
                List<User> user = await _userDL.GetAllUsers();
                List<UserDTO> userDTO = _mapper.Map<List<User>, List<UserDTO>>(user);
                return userDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<List<UserDTO>> GetAllRabaies()
        {
            try
            {
                List<User> rabaies = await _userDL.GetAllRabaies();
                List<UserDTO> userDTO = _mapper.Map<List<User>, List<UserDTO>>(rabaies);
                return userDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<UserDTO> AddUser(UserDTO userDTO)
        {
            User user = _mapper.Map<User>(userDTO);
            User newUser = await _userDL.AddUser(user);

            return _mapper.Map<UserDTO>(newUser);
        }
        public async Task<UserDTO> UpdateUser(int id, UserDTO userDTO)
        {
            User user = _mapper.Map<User>(userDTO);
            User updatedUser = await _userDL.UpdateUser(id, user);
            return _mapper.Map<UserDTO>(updatedUser);
        }
        public async Task<UserDTO> DeleteUser(int id)
        {
            int u = _mapper.Map<int>(id);
            User updatedUser = await _userDL.DeleteUser(id);

            return _mapper.Map<UserDTO>(updatedUser);
        }
        public async Task<UserDTO> GetUserById(int id)
        {
            User user = await _userDL.GetUserById(id);
            return _mapper.Map<UserDTO>(user);
        }


        public async Task<UserDTO> Login(UserLoginDTO user)
        {
            User _user = _mapper.Map<User>(user);

            User _userEntity = await _userDL.Login(_user);

            // בדיקה אם הסטטוס של המשתמש הוא false
            if (_userEntity == null || !_userEntity.Status)
            {
                throw new InvalidOperationException("Access denied: User is inactive or not found.");
            }

            return _mapper.Map<UserDTO>(_userEntity);
        }



        public async Task<List<UserDTO>> GetUsersByChavruta(int id)
        {
            List<User> users = await _userDL.GetUsersByChavruta(id);

            var usersDTO = _mapper.Map<List<UserDTO>>(users);

            foreach (var userDTO in usersDTO)
            {
                // בדיקה אם יש למשתמש Chavrutum שאינו מאושר
                bool hasUnapprovedChavrutum = users
                    .Any(u => u.UserId == userDTO.UserId &&
                              (u.ChavrutumUserId1Navigations.Any(c => !c.Approved) ||
                               u.ChavrutumUserId2Navigations.Any(c => !c.Approved)));

                // עדכון הערך של הפרמטר HasUnapprovedChavrutum ב-UserDTO
                userDTO.HasUnapprovedChavrutum = hasUnapprovedChavrutum;
            }

            return usersDTO;
        }
    }
}



