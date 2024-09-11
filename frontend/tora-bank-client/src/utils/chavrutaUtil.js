import api from '../api';

const GetAllChavrutum = async() => {
    return await api.get('Chavrutum').then(res => res.data);
}

const GetChavrutumById = async(id) => {
    return await api.get(`Chavrutum/GetChavrutumById/${id}`).then(res => res.data);
}

const GetChavrutumByUserId = async(userId) => {
    return await api.get(`Chavrutum/GetChavrutumByUserId?userId=${userId}`).then(res => res.data);
}
const GetChavrutumByUserId2 = async(userId) => {
    return await api.get(`Chavrutum/GetChavrutumByUserId2?userId=${userId}`).then(res => res.data);
}

const AddChavrutum = async(chavruta) => {
    return await api.post('Chavrutum', chavruta).then(res => res.data);
}

const UpdateChavrutum = async(id, chavruta) => {
    return await api.put(`Chavrutum/${id}`, chavruta).then(res => res.data);
}

const DeleteChavrutum = async(id) => {
    return await api.delete(`Chavrutum/${id}`).then(res => res.data);
}

export {GetAllChavrutum,GetChavrutumByUserId, GetChavrutumById, GetChavrutumByUserId2,AddChavrutum, UpdateChavrutum, DeleteChavrutum}