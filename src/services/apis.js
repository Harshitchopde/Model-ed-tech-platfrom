
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
