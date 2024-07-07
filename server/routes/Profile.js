const express = require("express");
const { updateDisplayPicture, updateProfile, getUserDetails, getEnrolledCourses, instructorDashboard } = require("../controllers/Profile");
const { verifyAuth, isInstructor } = require("../middlewares/auth");

const routes = express.Router();
// updateDisplayPicture
routes.put("/updateDisplayPicture",verifyAuth,updateDisplayPicture)
routes.put("/updateProfile",verifyAuth,updateProfile)
routes.get("/getUserDetails",[verifyAuth,getUserDetails])

// routes.delete("/deleteProfile",verifyAuth)

// for profile section to show different 
routes.get("/getEnrolledCourses",verifyAuth,getEnrolledCourses)
routes.get("/instructorDashboard",verifyAuth,isInstructor,instructorDashboard)
module.exports = routes;