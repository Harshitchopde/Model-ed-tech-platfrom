import toast from "react-hot-toast";
import { settingEndpoints } from "../apis";
import { apiConnector } from "../apiconnnectors";
import { setUser } from "../../slices/profileSlicer";
import { logOut } from "./authApis";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PASSWORD_API,
    UPDATE_PROFILE_API,
    DELETE_PROFILE_API
} = settingEndpoints;

export function updateDisplayPicture(token,formData){
    return async (dispatch)=>{
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                }
            )
            console.log("UPDATE DISPLAY PICTURE ",response)
            if(!response.data.success){
                toast.error(response.data.message)
                throw new Error(response.data.success)
            }
            toast.success("Updated Display Picture");
            dispatch(setUser(response.data.user))
        } catch (error) {
            toast.error("Could Not Update Picture")
            console.log("Error : ",error.message)
        }
        toast.dismiss(toastId);
    }
}

export function updateProfile(token,formData){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        try {
            console.log("Formdata : ",formData);
            
            const response = await apiConnector("PUT",UPDATE_PROFILE_API,
                formData,
                {
                  Authorization: `Bearer ${token}`,
                }
            )
            // console.log("UPDATE_PROFILE_API API RESPONSE............", response)
            
            if(!response.data.success){
                console.log("RES error : ",response.data)
                toast.error(response.data.message)
                throw new Error(response.data.success)
            }
            toast.success("Profile Updated SuccessFully");
            dispatch(setUser(response.data.user))
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error : ",error)
        }
        toast.dismiss(toastId);
    }
}


export async function changePassword(token,formData){
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("POST",UPDATE_PASSWORD_API,
                formData,
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            console.log("CHANGE PASSWORD API RESPONSE............", response)

            if(!response.data.success){
                // throw new Error(response.data.success)
            }
            toast.success("Password Change SuccessFully");
           
        } catch (error) {
       
            console.log("CHANGE_PASSWORD_API API ERROR............", error)
            toast.error(error.response.data.message)
          
        }
        toast.dismiss(toastId);
    
}


export function deleteProfile(token,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        try {
           
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
                Authorization: `Bearer ${token}`,
              })
            console.log("DELETE_PROFILE_API API RESPONSE............", response)

            if(!response.data.success){
                throw new Error(response.data.success)
            }
            toast.success("Profile Delete SuccessFully");
            dispatch(logOut(navigate))
        } catch (error) {
            toast.error("Could not delete profile")
            console.log("DELETE_PROFILE_API API ERROR............", error)
        }
        toast.dismiss(toastId);
    }
}