import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlicer"

export const rootReducer = combineReducers({
    auth:authReducer,
})