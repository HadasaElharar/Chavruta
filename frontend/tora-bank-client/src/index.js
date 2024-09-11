import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import userSlice from './redux/userSlice';
import theme from './theme';
import lessonSlice from './redux/lessonSlice';
import {thunk} from 'redux-thunk';
import savedLessonSlice from './redux/savedLessonSlice';
// import unApproveLessonSlice from './redux/unApproveLessonSlice';


// הגדרת ה-store
const store = configureStore({
  reducer: {
    user: userSlice,
    lesson: lessonSlice,
    savedLesson: savedLessonSlice,
    // unApprovelesson:unApproveLessonSlice

  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(thunk),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default store;
