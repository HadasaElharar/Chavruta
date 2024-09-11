import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import SignIn from './components/SignIn';
// import Users from './components/Users';
import CreateContact from './components/CreateContact';
import Donates from './components/Donates';
import SignUp from './components/SignUp';
import PrivateArea from './components/PrivateArea';
import Setting from './components/Setting';
import Chavruta from './components/Chavruta';
import Donation from './components/Donation';
//import { setLoggedUser } from './redux/userSlice';
import Lessons from './components/Lessons';
import SavedLessons from './components/SavedLessons';
import AboutUs from './components/AboutUs';
import Ask from './components/Ask';
import MyChavrutaStatus from './components/MyChavrutaStatus'
import MyCalendar from './components/MyCalendar';
import MyQuestions from './components/MyQuestions';
import UploadLesson from './components/UploadLesson';
import Management from './components/Management';
import Permissions from './components/Permissions';
import Contacts from "./components/Contacts";
import UnApproveLessons from "./components/UnApproveLessons";
import LookUpTables from "./components/LookUpTables";
import AnswerHistory from './components/AnswerHistory';


//לסדר את הקוד - alt + shift + f
//
//לבחור את כל המימושים של שם של אובייקט - ctrl + d
function App() {
  const loggedUser = useSelector(state => state.user.loggedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (

    <Routes>
      <Route path="/" element={<Nav />}>
        <Route path="/" element={<AboutUs />}></Route>
        <Route path="savedLessons" element={<SavedLessons />}></Route>
        <Route path="lessons" element={<Lessons />}></Route>
        <Route path="createContact" element={<CreateContact />}></Route>
        <Route path="privateArea/donation" element={<Donation />}></Route>
        <Route path="privateArea/ask" element={<Ask />}></Route>
        <Route path="privateArea/MyQuestions" element={<MyQuestions />}></Route>
        <Route path="privateArea" element={<PrivateArea />}></Route>
        <Route path='privateArea/donates' element={<Donates />}></Route>
        <Route path='privateArea/myChavrutaStatus/chavruta' element={<Chavruta />}></Route>
        <Route path='privateArea/myChavrutaStatus' element={<MyChavrutaStatus />}></Route>
        <Route path='privateArea/savedLessons' element={<SavedLessons />}></Route>
        <Route path="myCalendar" element={<MyCalendar />}></Route>
        <Route path='privateArea/myCalendar' element={<MyCalendar />}></Route>
        <Route path='privateArea/uploadLesson' element={<UploadLesson />}></Route>
        <Route path="management" element={<Management />}></Route>
        <Route path="management/permissions" element={<Permissions />}></Route>
        <Route path="management/uploadLesson" element={<UploadLesson />}></Route>
        <Route path="management/contacts" element={<Contacts />}></Route>
        <Route path="management/unApproveLessons" element={<UnApproveLessons />}></Route>
        <Route path="management/lookUpTables" element={<LookUpTables />}></Route> 
        <Route path='privateArea/answerHistory' element={<AnswerHistory />}></Route>
        <Route path="setting" element={<Setting />}></Route>
        <Route path="notFound" element={<h1>לא נמצא הדף המבוקש</h1>}></Route>
      </Route>
      <Route path="/signIn" element={<SignIn />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>

    </Routes>
  );
}

export default App;
