import { apiConnector } from "../apiconnnectors";
import { courseEndPoints } from "../apis";
import { toast} from "react-hot-toast"
const {
        GET_ALL_COURSE_API,
        GET_ALL_INSTRUCTOR_COURSES_API,
        GET_FULL_COURSE_DETAILS_AUTHENTICATED,
        COURSE_CATEGORIES_API,
        COURSE_DETAILS_API,
        CREATE_COURSE_API,
        CREATE_RATING_API,
        CREATE_SECTION_API,
        CREATE_SUBSECTION_API,
        UPDATE_SECTION_API,
        UPDATE_SUBSECTION_API,
        DELETE_COURSE_API,
        DELETE_SECTION_API,
        DELETE_SUBSECTION_API,
        EDIT_COURSE_API,
        LECTURE_COMPLETION_API
} = courseEndPoints;

export const getAllCourses = async ()=>{
        const toastId =toast.loading("Loading...")

        let result = [];
        try {
                const response = await apiConnector("GET",GET_ALL_COURSE_API);

                if(!response?.data?.success){
                        console.log("Error in response ");
                        throw new Error("Error in response")
                }
                result = response.data.data;

        } catch (error) {
                console.log("GET ALL COURSE ERROR -------------")
                toast.error(error.message);
        }
        toast.dismiss(toastId)
        return result;
}

export const fetchCourseDetails = async(courseId)=>{
        const toastId = toast.loading("Loading ...")
        let result = null;
        try {
                const response = await apiConnector("GET",COURSE_DETAILS_API,{
                        courseId
                })
                if(!response.data.success){
                        throw new Error(response.data.message);
                }
                result = response.data;
        } catch (error) {
                console.log("COURSE DETAIS API ERROR",error.message);
                console.log("COURSE DETAIS API ERROR .. ",error.response.data.message);
                result = error.response.data;
        }
        toast.dismiss(toastId);
        return result;
}

export const fetchCourseCategories = async()=>{
        const toastId = toast.loading("Loading ...")
        let result = null;
        try {
                const response = await apiConnector("GET",COURSE_CATEGORIES_API);
                console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
                if(!response.data.success){
                        throw new Error(response.data.message);
                }
                result = response.data.data;
        } catch (error) {
                console.log("COURSE_CATEGORIES_API DETAIS API ERROR",error.message);
                console.log("COURSE_CATEGORIES_API DETAIS API ERROR .. ",error.response.data.message);
                toast.error(error.message);
        }
        toast.dismiss(toastId);
        return result;
}
// add the course details

export const addCourseDetails = async(data,token)=>{
        const toastId = toast.loading("Loading...")
        // console.log("Token ",token)
        let result = null;
        try {
                const response = await apiConnector("POST",CREATE_COURSE_API,data,{
                        "Content-Type":"multipart/form-data",
                        Authorization:`Bearer ${token}`,
                });
                console.log("CREATE COURSE API RESPOSE------------",response.data);
                if(!response?.data?.success){
                        throw new Error(response.data.message);
                }
                toast.success("Created Details added successfully")
                result = response?.data?.data;

        } catch (error) {
                console.log("Error in AddCourseDetails ",error.message);
                toast.error(error.message)
        }
        toast.dismiss(toastId);
        return result;
}
// edit the course details
export const editCourseDetails = async(data,token)=>{
        const toastId = toast.loading("Loading...")
        let result = null;
        try {
                const response = await apiConnector("POST",EDIT_COURSE_API,data,{
                        "Content-Type":"multipart/form-data",
                        Authorization:`Bearer ${token}`,
                });
                console.log("EDIT COURSE API RESPOSE------------",response.data);
                if(!response?.data?.success){
                        throw new Error(response.data.message);
                }
                toast.success("Updated Course successfully")
                result = response?.data?.data;

        } catch (error) {
                console.log("Error in EditCourseDetails ",error.message);
                toast.error(error.message)
        }
        toast.dismiss(toastId);
        return result;
}
// create a section
export const createSection = async(data,token)=>{
        const toastId  = toast.loading("Loaing...")
        const result = null;
        try {
                const response = await apiConnector("POST",CREATE_SECTION_API,data,{
                        Authorization:`Bearer ${token}`
                })
                console.log("CREATE SECTION RESPONSE .......",response.data);
                if(!response.data.success){
                        throw new Error("Error in response createSection")
                }
                result = response.data.updatedCourse;
                toast.success("Created Section Successfully")
        } catch (error) {
                console.log("Error in Section ",error.message)
                toast.error(error.message);
                
        }
        toast.dismiss(toastId)
        return result;
}
// create a subsection
export const createSubSection = async(data,token)=>{
        const toastId  = toast.loading("Loaing...")
        const result = null;
        try {
                const response = await apiConnector("POST",CREATE_SUBSECTION_API,data,{
                        Authorization:`Bearer ${token}`
                })
                console.log("CREATE SUBSECTION RESPONSE .......",response.data);
                if(!response?.data?.success){
                        throw new Error("Could not add Lecture")
                }
                result = response?.data?.data;
                toast.success("Lecture Added Successfully")
        } catch (error) {
                console.log("Error in SubSection ",error.message)
                toast.error(error.message);
                
        }
        toast.dismiss(toastId)
        return result;
}
// update a section
export const updateSection = async (data,token)=>{
        const toastId = toast.loading("Loading...")
        const result = null;
        try {
                const response = await apiConnector("POST",UPDATE_SECTION_API,data,{
                        Authorization:`Bearer ${token}`
                })
                console.log("UPDATE SECTION RESPONSE API ............",response.data);
                if(!response?.data?.success){
                        throw new Error("Could Not Update Section");
                }
                toast.success("Updated Course Section")
                result = response?.data?.data
        } catch (error) {
                console.log("Error in updateSection ",error.message)
                toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result;
}
// update a subsection
export const updateSubSection = async (data,token)=>{
        const toastId = toast.loading("Loading...")
        const result = null;
        try {
                const response = await apiConnector("POST",UPDATE_SUBSECTION_API,data,{
                        Authorization:`Bearer ${token}`
                })
                console.log("UPDATE SUB-SECTION RESPONSE API ............",response.data);
                if(!response?.data?.success){
                        throw new Error("Could Not Update Subsection Lecture");
                }
                toast.success("Lecture Updated")
                result = response?.data?.data
        } catch (error) {
                console.log("Error in updateSub-Section ",error.message)
                toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result;
}
// delete a section
export const deleteSection = async (data,token)=>{
        const toastId = toast.loading("Loading...")
        const result = null;
        try {
                const response = await apiConnector("POST",DELETE_SECTION_API,data,{
                        Authorization:`Bearer ${token}`
                })
                console.log("DELETE SECTION RESPONSE API ............",response.data);
                if(!response?.data?.success){
                        throw new Error("Could Not DELETE Section");
                }
                toast.success("Deleted Course Section")
                result = response?.data?.data
        } catch (error) {
                console.log("Error in deleteSection ",error.message)
                toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result;
}
// delete a subsection
export const deleteSubSection = async (data,token)=>{
        const toastId = toast.loading("Loading...")
        const result = null;
        try {
                const response = await apiConnector("POST",DELETE_SUBSECTION_API,data,{
                        Authorization:`Bearer ${token}`
                })
                console.log("DELETE SECTION RESPONSE API ............",response.data);
                if(!response?.data?.success){
                        throw new Error("Could Not DELETE Lecture");
                }
                toast.success("Deleted Lecture")
                result = response?.data?.data
        } catch (error) {
                console.log("Error in deleteSubSection ",error.message)
                toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result;
}
 // fetch all course under a specific instructor
 export const fetchInstructorsCourses = async (data,token)=>{
        const toastId = toast.loading("Loading...")
        let result = [];
        try {
                const response = await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,data,{
                        Authorization:`Bearer ${token}`
                })
                console.log("FETCH INSTRUCTOR COURSES API ..........",response.data);
                if(!response?.data?.success){
                        throw new Error("Could not Fetch Instructor Course");
                }
                result = response?.data?.data; 
                toast.success("Successfully fetch Instructor course")

        } catch (error) {
              console.log("Error in fetchInstructorCourses ",error.message);
              toast.error(error.message);  
        }
        toast.dismiss(toastId);
        return result;
 }
 // delete a course
 export const deleteCourse = async (data,token)=>{
        const toastId = toast.loading("Loading...")
        try {
                const response = await apiConnector("DELETE",DELETE_COURSE_API,data,{
                        Authorization: `Bearer ${token}`,
                })
                console.log("DELETE COURSE API ",response.data)
                if(!response?.data?.success){
                        throw new Error("Could Not Delete Course");
                }
                toast.success("Course Deleted")
        } catch (error) {
                console.log("Error in Delete Course ",error.message)
                toast.error(error.message)
        }
        toast.dismiss(toastId);
 }
 // get full detail of a course
 export const getFullDetailsOfCourses = async (courseId,token)=>{
        const toastId = toast.loading("Loading...")
        let result = null;
        try {
                const response = await apiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{
                        courseId
                },{
                        Authorization: `Bearer ${token}`,
                })
                console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response.data)
                if(!response?.data?.success){
                        throw new Error(response.data.message);
                }
                result = response?.data?.data;
                toast.success("Course Full Details ")
        } catch (error) {
                console.log("Error in Full Details of Course ",error.message)
                toast.error(error.message)
        }
        toast.dismiss(toastId);
        return result;
 }
 // mark letcture as complete

 export const markLectureAsComplete = async (data,token)=>{
        let result = null;
        const toastId = toast.loading("Loading...")
        try {
                const response = await apiConnector("POST",LECTURE_COMPLETION_API,data,{
                        Authorization:`Bearer ${token}`,
                })
                console.log("MARK LECTURE AS COMPLETE API RESPONSE -------------------",response);
                if(!response?.data?.success){
                        throw new Error(response?.data.message);
                }
                toast.success("Lecture Completed")
                result = true;
        } catch (error) {
                result = false;
                console.log("Error in marksLectureAs Complete ",error);
        }
        toast.dismiss(toastId);
        return result;
 }

 // create a rating for a course
export const createRating = async (data,token)=>{
        const toastId = toast.loading("Loading...")
        let success = false;
        try {
                const response = await apiConnector("POST",CREATE_RATING_API,data,{
                        Authorization:`Bearer ${token}`,
                })
                console.log("CREATE RATING RESPONSE API ------------ ",response?.data)
                if(!response?.data?.success){
                        throw new Error("Could not create Rating!")
                }
                success = true;
                toast.success("Rating Created")
        } catch (error) {
                success = false;
                console.log("Error in CreateRating ",error.message)
                toast.error(error.message)
        }
        toast.dismiss(toastId)
        return success;
}