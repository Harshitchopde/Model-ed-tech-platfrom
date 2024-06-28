import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    totalItems: localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0
}
const cartSilce = createSlice({
    name:"cart",
    initialState,
    reducers:{
        setTotalItems:(state,value)=>{
            state.totalItems=value.payload
        }
    }
})

export const {setTotalItems} = cartSilce.actions;
export default cartSilce.reducer;