import api from '../api';

const GetAllContacts = async() => {
    return await api.get('Contact').then(res => res.data);
}

const GetContactById = async(id) => {
    return await api.get(`Contact?id=${id}`).then(res => res.data);
}

const AddContact = async(contact) => {
    return await api.post('Contact', contact).then(res => res.data);
}

const UpdateContact = async(id, contact) => {
    return await api.put(`Contact?id=${id}`, contact).then(res => res.data);
}

const DeleteContact = async(id) => {
    return await api.delete(`Contact?id=${id}`).then(res => res.data);
}

export {GetAllContacts, GetContactById, AddContact, UpdateContact, DeleteContact}