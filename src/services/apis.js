
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const authEndpoints = {
    LOGIN_API:BASE_URL+"/auth/login",
    SIGNUP_API:BASE_URL+"/auth/signup",
    CHANGE_PASSWORD_API:BASE_URL+"/auth/changePassword",
    SEND_OTP_API:BASE_URL+"/auth/sendOTP",
    RESET_PASSWORD_API:BASE_URL+"/auth/reset-password",
    RESET_PASSWORD_TOKEN_API:BASE_URL+"/auth/reset-password-token",
    // DELETEPROFILE_API:BASE_URL+"/auth/deleteProfile",
}
export const categoriesEndpoints ={
    CATEGORIES_API: BASE_URL+"/course/showAllCategories",
}
// CATALOG PAGE DATA
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
  }

export const profileEndpoints = {
    GET_USER_DETAILS_API:BASE_URL+"/profile/getUserDetails",
    GET_ENROLLED_COURSES_API:BASE_URL+"/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DASHBOARD:BASE_URL+"/profile/instructorDashboard",
}
export const settingEndpoints = {
    UPDATE_DISPLAY_PICTURE_API : BASE_URL+"/profile/updateDisplayPicture",
    UPDATE_PROFILE_API : BASE_URL+"/profile/updateProfile",
    UPDATE_PASSWORD_API : BASE_URL+"/auth/changePassword",
    DELETE_PROFILE_API : BASE_URL+"/profile/deleteProfile"
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  }
  
export const courseEndPoints = {
    GET_ALL_COURSE_API:BASE_URL+"/course/getAllCourses",
    COURSE_DETAILS_API:BASE_URL+"/course/getCourseDetils",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:
      BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
}