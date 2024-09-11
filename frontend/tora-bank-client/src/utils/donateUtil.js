import api from '../api';

const GetAllDonates = async () => {
    return await api.get('Donate').then(res => res.data);
}

const GetDonateByUserId = async (userId) => {
    return await api.get(`Donate/GetDonateByUserId/${userId}`).then(res => res.data);
}

const GetDonateById = async (id) => {
    return await api.get(`Donate?id=${id}`).then(res => res.data);
}

const AddDonate = async (donate) => {
    return await api.post('Donate', donate).then(res => res.data);
}

const UpdateDonate = async (id, donate) => {
    return await api.put(`Donate?id=${id}`, donate).then(res => res.data);
}

const DeleteDonate = async (id) => {
    return await api.delete(`Donate?id=${id}`).then(res => res.data);
}

export { GetAllDonates, GetDonateByUserId, GetDonateById, AddDonate, UpdateDonate, DeleteDonate }