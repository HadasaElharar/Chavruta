import api from '../api';

const GetAllUserLessons = async() => {
    return await api.get('UserLesson').then(res => res.data);
}

const GetUserLessonById = async(id) => {
    return await api.get(`UserLesson?id=${id}`).then(res => res.data);
}

const GetAllUserLessonForUserIdByPage = async(userId, page) => {
    return await api.get(`UserLesson/GetAllUserLessonForUserIdByPage?userId=${userId}&page=${page}`).then(res => res.data);
}
const GetAllUserLessonForUserId = async(userId, page) => {
    return await api.get(`UserLesson/GetAllUserLessonForUserId?userId=${userId}`).then(res => res.data);
}

const GetSearchUserLessonByPage = async (userId, str, page) => {
    return await api.get(`UserLesson/GetSearchUserLessonByPage?userId=${userId}&str=${str}&page=${page}`)
        .then(res => res.data);
}

const AddUserLesson = async(userLesson) => {
    return await api.post('UserLesson', userLesson).then(res => res.data);
}

const UpdateUserLesson= async(id, userLesson) => {
    return await api.put(`UserLesson?id=${id}`, userLesson).then(res => res.data);
}

const DeleteUserLesson = async(id) => {
    return await api.delete(`UserLesson/${id}`).then(res => res.data);
}

export {GetAllUserLessons, GetUserLessonById,GetAllUserLessonForUserIdByPage, GetSearchUserLessonByPage, GetAllUserLessonForUserId,AddUserLesson, UpdateUserLesson, DeleteUserLesson}