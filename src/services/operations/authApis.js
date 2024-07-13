import toast from "react-hot-toast";
import { authEndpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlicer";
import { apiConnector } from "../apiconnnectors";
import { setUser } from "../../slices/profileSlicer";
import { resetCart } from "../../slices/cartSlicer";


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
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",SIGNUP_API,{
                firstName,lastName,password,conformPassword,email,accountType,otp
            })
            console.log("API response of signup ",response)
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            toast.dismiss(toastId);
            navigate("/login");
        } catch (error) {
            console.log("Error in ",error);
            toast.error(error);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        
    }
}
export function login(
    email,
    password,
    navigate,
){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",LOGIN_API,{
                email,password
            })
            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }
            console.log(response.data)
            toast.success("Login successfull")
            console.log("LOgin data ",response)
            dispatch(setToken(response.data.token))
            const image= response.data.user.image
            ?response.data.user.image
            :`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.firstName} ${response.data.lastName}`
            // setUser
            dispatch(setUser({...response.data.user,image:image}))
            // token
            localStorage.setItem("token",JSON.stringify(response.data.user.token))
            // user
            localStorage.setItem("user",JSON.stringify(response.data.user))
            // navigate to /dashboard/my-profile
            navigate("/dashboard/my-profile")

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error : ",error)
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export function logOut(navigate){
    return (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        // remove from local storeage
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}