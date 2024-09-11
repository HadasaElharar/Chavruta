import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  lessons: [],

  dataFilter:{
    categories: [],
    startDate: null,
    endDate: null,
    rabbaies: [],
    types: []
  }
}

const lessonSlice = createSlice({
  name: "lesson",
  initialState: initialValue,
  reducers: {
    setLesson: (state, action) => {
      state.lessons = action.payload;
    },
    removeLesson: (state, action) => {
      const { key, value } = action.payload;
      if (Array.isArray(state.lessons[key])) {
        state.lessons[key] = state.lessons[key].filter(item => item !== value);
      } else {
        state.lessons[key] = null;
      }
    },
    removeLesson: (state, action) => {
      const lessonIdToRemove = action.payload; // ה-ID של השיעור למחוק
      state.lessons = state.lessons.filter(lesson => lesson.lesssonId !== lessonIdToRemove);
    },
    
    setDataFilter: (state, action) => {
      state.dataFilter = { ...state.dataFilter, ...action.payload };
    },
    clearFilterParams: (state) => {
      state.filterParams = initialValue.filterParams;
    },
    addFilterParam: (state, action) => {
      const { key, value } = action.payload;
      if (Array.isArray(state.filterParams[key])) {
        state.filterParams[key].push(value);
      } else {
        state.filterParams[key] = value;
      }
    },
    removeFilterParam: (state, action) => {
      const { key, value } = action.payload;
      if (Array.isArray(state.filterParams[key])) {
        state.filterParams[key] = state.filterParams[key].filter(item => item !== value);
      } else {
        state.filterParams[key] = null;
      }
    }
  }
});

export const { setLesson, setDataFilter, clearFilterParams, addFilterParam, removeFilterParam,removeLesson } = lessonSlice.actions;

export default lessonSlice.reducer;
