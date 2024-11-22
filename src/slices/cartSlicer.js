import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState ={
    totalItems: localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0,
    cart: localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
    total: localStorage.getItem("total")?JSON.parse(localStorage.getItem("total")):0
}
const cartSilce = createSlice({
    name:"cart",
    initialState,
    reducers:{
       addToCart:(state,action)=>{
        const course = action.payload;
        const index = state.cart.findIndex(item=> item._id ===course._id);

        if(index>=0){
            // already added
            toast.error("Course already in cart");
            return;
        }
        // add course to cart
        state.cart.push(course);
        // total quantity and price update
        state.total +=course.price;
        state.totalItems++;
        // update local storage
        localStorage.setItem("cart",JSON.stringify(state.cart));
        localStorage.setItem("total",JSON.stringify(state.total));
        localStorage.setItem("totalItems",JSON.stringify(state.totalItems));

        toast.success("Course added to cart");
       },
       removeFromCart: (state, action) => {
        const courseId = action.payload
        const index = state.cart.findIndex((item) => item._id === courseId)
  
        if (index >= 0) {
          // If the course is found in the cart, remove it
          state.totalItems--
          state.total -= state.cart[index].price
          state.cart.splice(index, 1)
          // Update to localstorage
          localStorage.setItem("cart", JSON.stringify(state.cart))
          localStorage.setItem("total", JSON.stringify(state.total))
          localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
          // show toast
          toast.success("Course removed from cart")
        }
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

export const {addToCart,removeFromCart,resetCart} = cartSilce.actions;
export default cartSilce.reducer;