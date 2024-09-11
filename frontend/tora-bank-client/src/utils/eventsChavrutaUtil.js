import api from '../api';

const GetAllEventsChavrutums = async() => {
    return await api.get('EventsChavrutum').then(res => res.data);
   
}

const GetEventsChavrutumById = async(id) => {
    return await api.get(`EventsChavrutum/GetEventsChavrutumById/${id}`).then(res => res.data);
}

const GetEventsChavrutumByUserId = async(userId) => {
    return await api.get(`EventsChavrutum/GetEventsChavrutumByUserId/${userId}`).then(res => res.data); 
}

const AddEventsChavrutum = async(EventsChavrutum) => {
    return await api.post('EventsChavrutum', EventsChavrutum).then(res => res.data);
}

const UpdateEventsChavrutum = async(id, EventsChavrutum) => {
    return await api.put(`EventsChavrutum/${id}`, EventsChavrutum).then(res => res);
}

const DeleteEventsChavrutum = async(id) => {
    return await api.delete(`EventsChavrutum/${id}`).then(res => res.data);
}

export {GetAllEventsChavrutums,GetEventsChavrutumById,GetEventsChavrutumByUserId, AddEventsChavrutum, UpdateEventsChavrutum, DeleteEventsChavrutum}