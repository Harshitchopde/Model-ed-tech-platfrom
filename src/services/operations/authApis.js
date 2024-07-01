import toast from "react-hot-toast";
import { authEndpoints } from "../apis";
import { setLoading } from "../../slices/authSlicer";
import { apiConnector } from "../apiconnnectors";


const {
 SEND_OTP_API,
 SIGNUP_API,
 LOGIN_API,
}= authEndpoints

export function sendOTP(email,navigate){
    console.log(SEND_OTP_API)
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

       try {
        const res = await apiConnector("POST",SEND_OTP_API,{
            email
        });
        console.log(res);
        toast.success("Send Otp successfully");
        navigate("/verify-email")
       } catch (error) {
            console.log("Error : ".error);
            toast.error("Could Not Send OTP")
       }
       toast.dismiss(toastId);
       dispatch(setLoading(false));
    }
}
export function signUp(
    firstName,
    accountType,
    lastName,
    email,
    password,
    conformPassword,
    navigate,
    otp
){
    return async(dispatch)=>{
        
    }
        

}