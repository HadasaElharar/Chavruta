using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToraBankBL.Interfaces;
using ToraBankDAL;
using ToraBankDAL.Interfaces;
using ToraBankDAL.Models;
using ToraBankDTO.DTO;

namespace ToraBankBL
{
    public class DonateBL : IDonateBL

    {
        public IMapper _mapper;
        IDonateDL _donateDL;

        public DonateBL(IDonateDL donateDL, IMapper mapper)
        {
            _mapper = mapper;
            _donateDL = donateDL;
        }

        public async Task<List<DonateDTO>> GetAllDonates()
        {
            try
            {
                List<Donate> donates = await _donateDL.GetAllDonates();
                List<DonateDTO> donateDTOs = _mapper.Map<List<Donate>, List<DonateDTO>>(donates);
                return donateDTOs;
            }
            catch (Exception ex)
            {
                // כאן ניתן להוסיף טיפול בשגיאה במידה וזה רלוונטי
                return null;
            }
        }
    


        public async Task<DonateDTO> AddDonate(DonateDTO donateDTO)
        {
            Donate donate = _mapper.Map<Donate>(donateDTO);
            Donate newDonate = await _donateDL.AddDonate(donate);

            return _mapper.Map<DonateDTO>(newDonate);
        }

        public async Task<DonateDTO> UpdateDonate(int id, DonateDTO donateDTO)
        {
            Donate donate = _mapper.Map<Donate>(donateDTO);
            Donate updatedDonate = await _donateDL.UpdateDonate(id, donate);

            return _mapper.Map<DonateDTO>(updatedDonate);
        }

        public async Task<DonateDTO> DeleteDonate(int id)
        {
            Donate deletedDonate = await _donateDL.DeleteDonate(id);

            return _mapper.Map<DonateDTO>(deletedDonate);
        }

        public async Task<DonateDTO> GetDonateById(int id)
        {
            Donate donate = await _donateDL.GetDonateById(id);
            return _mapper.Map<DonateDTO>(donate);
        }

        public async Task<List<DonateDTO>> GetDonateByUserId(int userId)
        {
            try
            {
                List<Donate> donatesById = await _donateDL.GetDonateByUserId(userId);
                List<DonateDTO> donateByIdDTOs = _mapper.Map<List<Donate>, List<DonateDTO>>(donatesById);
                return donateByIdDTOs;
            }
            catch (Exception ex)
            {
                // כאן ניתן להוסיף טיפול בשגיאה במידה וזה רלוונטי
                return null;
            }
        }
    }
}

