import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
    signUpData:null,
    loading:false,
}
export const authSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken(state,action){
            state.token = action.payload
        },
        setSignUpData(state,action){
            state.signUpData = action.payload
        },
        setLoading(state,action){
            state.loading =action.payload
        }
    }
})
export const {setToken,setLoading,setSignUpData} = authSlice.actions;
export default authSlice.reducer;