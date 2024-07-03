import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlicer"
import profileReducer from "../slices/profileSlicer"
import cartReducer from "../slices/cartSlicer"
import courseReducer from "../slices/courseSlicer";
export const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
})