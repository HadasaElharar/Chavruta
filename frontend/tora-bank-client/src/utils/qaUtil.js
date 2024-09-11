import api from '../api';

const GetAllQas = async() => {
    return await api.get('Qa').then(res => res.data);
}

const GetQaById = async(id) => {
    return await api.get(`Qa?id=${id}`).then(res => res.data);
}
const GetQaByUserId = async (userId) => {
    return await api.get(`Qa/GetQaByUserId/${userId}`).then(res => res.data);
}
const GetQaByRavId = async (ravId) => {
    return await api.get(`Qa/GetQaByRavId/${ravId}`).then(res => res.data);
}

const AddQa = async(qa) => {
    return await api.post('Qa', qa).then(res => res.data);
}

const UpdateQa= async(id, qa) => {
    return await api.put(`Qa/${id}`, qa).then(res => res.data);
}

const DeleteLQa = async(id) => {
    return await api.delete(`Qa?id=${id}`).then(res => res.data);
}

export {GetAllQas, GetQaById,GetQaByUserId,GetQaByRavId, AddQa, UpdateQa, DeleteLQa}