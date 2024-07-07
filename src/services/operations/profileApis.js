import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { setLoading } from "../../slices/authSlicer";
import { apiConnector } from "../apiconnnectors";
import { setUser } from "../../slices/profileSlicer";
import { resetCart } from "../../slices/cartSlicer";
import { logOut } from "./authApis";


const {
    GET_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DASHBOARD,
    GET_USER_DETAILS_API
} = profileEndpoints;

// GET user Details
export function getUserDetails(token,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try {
            const res = await apiConnector("GET",GET_USER_DETAILS_API,null,{
                Authorization :`Bearer ${token}`
            })
            if(!res.data.success){
                throw new Error(res.data.message)
            }
            console.log("API DATA : ",res.data)
            dispatch(setUser({...res.data.data}))
        } catch (error) {
            dispatch(logOut(navigate))
            console.log("Error ",error)
            toast.error("Could not get user Details")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}
// GET Enrolled Courses
export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading...")
    let result = [];
    try {
        const res = await apiConnector("GET",GET_ENROLLED_COURSES_API,null,{
            Authorization:`Bearer ${token}`
        })

        if(!res.data.success){
            throw new Error(res.data.message)
        }
        result = res.data.data;
    } catch (error) {
        console.log("Error calling Enrolled Courses ",error)
        toast.error("Could not Fetch Enrolled Courses")
    }
    toast.dismiss(toastId);
    return result;
}
// GET Instructor Dashboard
export async function getInstructorDashboardData(token){
    const toastId = toast.loading("Loading InstructorData...")
    let result = []
    try {
        const res  = await apiConnector("GET",GET_INSTRUCTOR_DASHBOARD,null,{
            Authorization:`Bearer ${token}`
        })
        if(!res.data.success){
            throw new Error(res.data.message)
        }
        result = res.data.courses;
    } catch (error) {
        console.log("Error ",error)
        toast.error("Could not Fetch Instrutor Data")

    }
    toast.dismiss(toastId);
    return result;
}   