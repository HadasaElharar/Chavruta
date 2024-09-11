import { createSlice } from "@reduxjs/toolkit";

const savedLessonSlice = createSlice({
  name: 'savedLesson',
  initialState: {
    savedLessons: [],
    savedLessonsByPage:[],
  },
  reducers: {
    setSavedLessons(state, action) {
      state.savedLessons = action.payload;
    },
    setSavedLessonsByPage(state, action) {
      state.savedLessonsByPage = action.payload;
    },
    addSavedLesson(state, action) {
      let _savedLessons=[...state.savedLessons]
      const newLesson = action.payload;
      // Check if the lessonId already exists in savedLessons
      if (!state.savedLessons.some(lesson => lesson.lessonId === newLesson.lessonId)) {
        // Add the new lesson if it's not already in the list
        _savedLessons.push(newLesson);
        state.savedLessons=_savedLessons;
      }
      let _savedLessonsByPage=[...state.savedLessonsByPage]
      // Check if the lessonId already exists in savedLessons
      if (!state.savedLessonsByPage.some(lesson => lesson.lessonId === newLesson.lessonId)) {
        // Add the new lesson if it's not already in the list
        _savedLessonsByPage.push(newLesson);
        state.savedLessonsByPage=_savedLessonsByPage;
      }
    },
    removeSavedLesson(state, action) {
      const userLessonsId = action.payload;
      state.savedLessons = state.savedLessons.filter(lesson => lesson.userLessonsId !== userLessonsId);
      state.savedLessonsByPage = state.savedLessonsByPage.filter(lesson => lesson.userLessonsId !== userLessonsId);
    },
  },
});

export const { setSavedLessons, addSavedLesson, removeSavedLesson,setSavedLessonsByPage } = savedLessonSlice.actions;

export default savedLessonSlice.reducer;
