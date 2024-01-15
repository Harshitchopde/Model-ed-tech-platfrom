const express = require("express");
const { signUp,login ,changePassword, sendOTP} = require("../controllers/auth");

const routes = express.Router();

routes.post("/login",login)
routes.post("/signup",signUp)
routes.post("/changePassword",changePassword)
routes.post("/sendOTP",sendOTP)
module.exports = routes;