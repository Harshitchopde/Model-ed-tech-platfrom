import { Router } from "express";
import { signUp, login, changePassword, sendOTP } from "../controllers/auth.js";
import { resetPasswordToken, resetPassword } from "../controllers/resetPassword.js";
import { deleteAccount } from "../controllers/Profile.js";
import { verifyAuth } from "../middlewares/auth.js";

const routes = Router();

routes.post("/login",login)
routes.post("/signup",signUp)
routes.post("/changePassword",verifyAuth, changePassword)
routes.post("/sendOTP",sendOTP)
routes.post("/reset-password-token",resetPasswordToken)
routes.post("/reset-password",resetPassword)
routes.post("/deleteProfile",deleteAccount)
export default routes;