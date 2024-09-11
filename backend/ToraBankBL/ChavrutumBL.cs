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
    public class ChavrutumBL : IChavrutumBL
    {
        public IMapper _mapper;
        IChavrutumDL _chavrutumDL;

        public ChavrutumBL(IChavrutumDL chavrutumDL, IMapper mapper)
        {
            _mapper = mapper;
            _chavrutumDL = chavrutumDL;
        }

        public async Task<List<ChavrutumDTO>> GetAllChavrutum()
        {
            try
            {
                List<Chavrutum> chavrutum = await _chavrutumDL.GetAllChavrutum();
                List<ChavrutumDTO> chavrutumDTO = _mapper.Map<List<Chavrutum>, List<ChavrutumDTO>>(chavrutum);
                return chavrutumDTO;
            }
            catch (Exception ex)
            {
                // כאן ניתן להוסיף טיפול בשגיאה במידה וזה רלוונטי
                return null;
            }
        }

        public async Task<ChavrutumDTO> AddChavrutum(ChavrutumDTO chavrutumDTO)
        {
            try {
            Chavrutum chavrutum = _mapper.Map<Chavrutum>(chavrutumDTO);
            Chavrutum newChavrutum = await _chavrutumDL.AddChavrutum(chavrutum);
                return _mapper.Map<ChavrutumDTO>(newChavrutum);
            }
            catch(Exception ex)
            {

                return null;
            }

          
        }

        public async Task<ChavrutumDTO> UpdateChavrutum(int id, ChavrutumDTO chavrutumDTO)
        {
            Chavrutum chavrutum = _mapper.Map<Chavrutum>(chavrutumDTO);
            Chavrutum updatedChavrutum = await _chavrutumDL.UpdateChavrutum(id, chavrutum);

            return _mapper.Map<ChavrutumDTO>(updatedChavrutum);
        }

        public async Task<ChavrutumDTO> DeleteChavrutum(int id)
        {
            Chavrutum deletedChavrutum = await _chavrutumDL.DeleteChavrutum(id);

            return _mapper.Map<ChavrutumDTO>(deletedChavrutum);
        }

        public async Task<ChavrutumDTO> GetChavrutumById(int id)
        {
            Chavrutum chavrutum = await _chavrutumDL.GetChavrutumById(id);
            return _mapper.Map<ChavrutumDTO>(chavrutum);
        }

        public async Task<List<ChavrutumDTO>> GetChavrutumByUserId(int userId)
        {
            List<Chavrutum> chavrutum = await _chavrutumDL.GetChavrutumByUserId(userId);
            return _mapper.Map<List<ChavrutumDTO>>(chavrutum);
        }

        public async Task<List<ChavrutumDTO>> GetChavrutumByUserId2(int userId)
        {
            List<Chavrutum> chavrutum = await _chavrutumDL.GetChavrutumByUserId2(userId);
            return _mapper.Map<List<ChavrutumDTO>>(chavrutum);
        }
    }
}

