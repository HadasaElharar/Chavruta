import api from '../api';

const GetAllLessons = async() => {
    return await api.get('Lesson').then(res => res.data);
}

const GetLessonsByStatus = async(page) => {
    
    return await api.get(`Lesson/GetLessonsByStatus/${page}`).then(res => res.data);
}

const GetLessonById = async(id) => {
    return await api.get(`Lesson?id=${id}`).then(res => res.data);
}

const AddLesson = async(lesson) => {
    return await api.post('Lesson', lesson).then(res => res.data);
}

const UpdateLesson= async(id, lesson) => {
    return await api.put(`Lesson/${id}`, lesson).then(res => res.data);
}

const DeleteLesson = async(id) => {
    return await api.delete(`Lesson/${id}`).then(res => res.data);
}
const GetLessonsByPage = async(page) => {
    
    return await api.get(`Lesson/getLessonsByPage/${page}`).then(res => res.data);
}
const GetSearchLessonByPage = async(str, page) => {
    return await api.get(`Lesson/getSearchLessonByPage?str=${str}&page=${page}`).then(res => res.data);
}
const GetFilterLessonByPage = async (page, filterParams) => {
    let query = `Lesson/getFilterLessonByPage?page=${page}`;

    // Dynamically add query parameters if they exist
    Object.keys(filterParams).forEach(key => {
        if (filterParams[key] !== null && filterParams[key] !== undefined) {
            const value = encodeURIComponent(filterParams[key]);
            query += `&${key}=${value}`;
        }
    });

    try {
        return await api.get(query).then(res => res.data);
    } catch (error) {
        console.error('Failed to fetch filtered lessons:', error);
        // Handle errors appropriately in your application context
        throw error;
    }
}



export {GetAllLessons, GetLessonsByStatus,GetLessonsByPage,GetSearchLessonByPage,GetFilterLessonByPage,GetLessonById, AddLesson, UpdateLesson, DeleteLesson}