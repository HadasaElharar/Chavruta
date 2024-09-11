import api from '../api';

const GetAllCategory = async() => {
    return await api.get('LookUp/GetAllCategory').then(res => res.data);
}

const GetAllCity = async() => {
    return await api.get('LookUp/GetAllCity').then(res => res.data);
}
const GetCityById = async(id) => {
    return await api.get(`LookUp/GetCityById${id}`).then(res => res.data);
}
const GetAllDay = async() => {
    return await api.get('LookUp/GetAllDay').then(res => res.data);
}
const GetAllLevel = async() => {
    return await api.get('LookUp/GetAllLevel').then(res => res.data);
}
const GetAllType = async() => {
    return await api.get('LookUp/GetAllType').then(res => res.data);
}

const AddCity = async(city) => {
    return await api.post('LookUp/AddCity', city).then(res => res.data);
}

const UpdateCity= async(id, city) => {
    return await api.put(`LookUp/UpdateCity/${id}`, city).then(res => res.data);
}

const AddCategory = async(category) => {
    return await api.post('LookUp/AddCategory', category).then(res => res.data);
}

const UpdateCategory= async(id, category) => {
    return await api.put(`LookUp/UpdateCategory/${id}`, category).then(res => res.data);
}

const AddType = async(type) => {
    return await api.post('LookUp/AddType', type).then(res => res.data);
}

const UpdateType= async(id, type) => {
    return await api.put(`LookUp/UpdateType/${id}`, type).then(res => res.data);
}

export {GetAllCategory, GetAllCity,GetCityById,GetAllDay, GetAllLevel, GetAllType, AddCity, UpdateCity,AddCategory,UpdateCategory, AddType, UpdateType}