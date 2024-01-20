const express = require("express");
const { signUp,login ,changePassword, sendOTP} = require("../controllers/auth");
const { resetPasswordToken, resetPassword } = require("../controllers/resetPassword");
const { deleteAccount } = require("../controllers/Profile");

const routes = express.Router();

routes.post("/login",login)
routes.post("/signup",signUp)
routes.post("/changePassword",changePassword)
routes.post("/sendOTP",sendOTP)
routes.post("/reset-password-token",resetPasswordToken)
routes.post("/reset-password",resetPassword)
routes.post("/deleteProfile",deleteAccount)
module.exports = routes;