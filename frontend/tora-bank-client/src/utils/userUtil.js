import api from '../api';

const GetAllUsers = async() => {
    return await api.get('User').then(res => res.data);
   
}

const GetAllRabaies = async() => {
    return await api.get('User/GetAllRabaies').then(res => res.data);
   
}

const GetUserById = async(id) => {
    return await api.get(`User/${id}`).then(res => res.data);
}

const GetUsersByChavruta = async(id) => {
    return await api.get(`User/GetUsersByChavruta/${id}`).then(res => res.data);
}

const Login = async(user) => {
    return await api.post('User/Login', user).then(res => res.data);
}

const AddUser = async(user) => {
    return await api.post('User', user).then(res => res.data);
}

const UpdateUser = async(id, user) => {
    return await api.put(`User/${id}`, user).then(res => res);
}

const DeleteUser = async(id) => {
    return await api.delete(`User/${id}`).then(res => res.data);
}

export {GetAllUsers, GetAllRabaies,GetUserById, GetUsersByChavruta, Login, AddUser, UpdateUser, DeleteUser}