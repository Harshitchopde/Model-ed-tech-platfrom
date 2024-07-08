
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
    CATEGORIES_API: BASE_URL+"/courses/showAllCategories",
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