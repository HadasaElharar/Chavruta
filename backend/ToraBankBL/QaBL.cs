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
    public class QaBL : IQaBL
    {
        public IMapper _mapper;
        IQaDL _qaDL;
        public QaBL(IQaDL qaDL, IMapper mapper)
        {
            this._mapper = mapper;
            _qaDL = qaDL;
        }
        public async Task<List<QaDTO>> GetAllQas()
        {
            try
            {
                List<Qa> qa = await _qaDL.GetAllQas();
                List<QaDTO> QaDTO = _mapper.Map<List<Qa>, List<QaDTO>>(qa);
                return QaDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<QaDTO> AddQa(QaDTO qaDTO)
        {
            Qa qa = _mapper.Map<Qa>(qaDTO);
            Qa newQa = await _qaDL.AddQa(qa);

            return _mapper.Map<QaDTO>(newQa);
        }
        public async Task<QaDTO> UpdateQa(int id, QaDTO qaDTO)
        {
            Qa qa = _mapper.Map<Qa>(qaDTO);
            Qa updatedQa = await _qaDL.UpdateQa(id, qa);
            return _mapper.Map<QaDTO>(updatedQa);
        }
        public async Task<QaDTO> DeleteQa(int id)
        {
            int qa = _mapper.Map<int>(id);
            Qa updatedQa = await _qaDL.DeleteQa(id);

            return _mapper.Map<QaDTO>(updatedQa);
        }
        public async Task<QaDTO> GetQaById(int id)
        {
            Qa qa = await _qaDL.GetQaById(id);
            return _mapper.Map<QaDTO>(qa);
        }
        public async Task<List<QaDTO>> GetQaByUserId(int userId)
        {
            try
            {
                List<Qa> qasById = await _qaDL.GetQaByUserId(userId);
                List<QaDTO> qasByIdDTOs = _mapper.Map<List<Qa>, List<QaDTO>>(qasById);
                return qasByIdDTOs;
            }
            catch (Exception ex)
            {
                // כאן ניתן להוסיף טיפול בשגיאה במידה וזה רלוונטי
                return null;
            }
        }
        public async Task<List<QaDTO>> GetQaByRavId(int ravId)
        {
            try
            {
                List<Qa> qasByRavId = await _qaDL.GetQaByRavId(ravId);
                List<QaDTO> qasByRavIdDTOs = _mapper.Map<List<Qa>, List<QaDTO>>(qasByRavId);
                return qasByRavIdDTOs;
            }
            catch (Exception ex)
            {
                // כאן ניתן להוסיף טיפול בשגיאה במידה וזה רלוונטי
                return null;
            }
        }




    }
}

