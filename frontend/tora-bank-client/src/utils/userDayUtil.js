import api from '../api';

const GetAllUserDays = async() => {
    return await api.get('UserDay').then(res => res.data);
}

const GetUserDayByEventId = async(id) => {
    return await api.get(`UserDay?id=${id}`).then(res => res.data);
}

const AddUserDay = async(userDay) => {
    return await api.post('UserDay', userDay).then(res => res.data);
}

const UpdateUserDay= async(id, userDay) => {
    return await api.put(`UserDay?id=${id}`, userDay).then(res => res.data);
}

const DeleteLUserDay = async(id) => {
    return await api.delete(`UserDay?id=${id}`).then(res => res.data);
}

export {GetAllUserDays, GetUserDayByEventId, AddUserDay, UpdateUserDay, DeleteLUserDay}