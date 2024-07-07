import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    totalItems: localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0,
    cart: localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
    total: localStorage.getItem("total")?JSON.parse(localStorage.getItem("total")):0
}
const cartSilce = createSlice({
    name:"cart",
    initialState,
    reducers:{
        setTotalItems:(state,value)=>{
            state.totalItems=value.payload
        },
        resetCart:(state)=>{
            state.cart = []
            state.totalItems = 0
            state.total = 0;
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    }
})

export const {setTotalItems,resetCart} = cartSilce.actions;
export default cartSilce.reducer;