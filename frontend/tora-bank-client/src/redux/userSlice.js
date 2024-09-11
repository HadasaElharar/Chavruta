
import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    loggedUser : sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')): null,
    // loggedUser : JSON.parse(sessionStorage['loggedUser'])
}

const userSlice = createSlice({
    name:"user",
    initialState:initialValue,
    reducers:{
        setLoggedUser:(state,action)=>{
            state.loggedUser = action.payload;
            sessionStorage.setItem('user', JSON.stringify(action.payload));
        },
        setUnLoggedUser:(state,action)=>{
            state.loggedUser = action.payload;
            sessionStorage.removeItem('user');
        },
        


    }
})
export const {setLoggedUser, setUnLoggedUser,setAddSavedLesson,setRemoveSavedLesson} = userSlice.actions;
export default userSlice.reducer;
