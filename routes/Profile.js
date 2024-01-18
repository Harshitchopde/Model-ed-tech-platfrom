const express = require("express");
const { updateDisplayPicture, updateProfile, getUserDetails } = require("../controllers/Profile");
const { verifyAuth } = require("../middlewares/auth");

const routes = express.Router();
// updateDisplayPicture
routes.put("/updateDisplayPicture",verifyAuth,updateDisplayPicture)
routes.put("/updateProfile",verifyAuth,updateProfile)
routes.get("/getUserDetails",[verifyAuth,getUserDetails])
module.exports = routes;