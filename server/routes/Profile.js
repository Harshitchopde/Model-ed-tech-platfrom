import { Router } from "express";
import { updateDisplayPicture, updateProfile, getUserDetails, getEnrolledCourses, instructorDashboard, deleteAccount } from "../controllers/Profile.js";
import { verifyAuth, isInstructor } from "../middlewares/auth.js";

const routes = Router();
// updateDisplayPicture
routes.put("/updateDisplayPicture",verifyAuth,updateDisplayPicture)
routes.put("/updateProfile",verifyAuth,updateProfile)
routes.get("/getUserDetails",[verifyAuth,getUserDetails])

routes.delete("/deleteProfile",verifyAuth,deleteAccount)

// for profile section to show different 
routes.get("/getEnrolledCourses",verifyAuth,getEnrolledCourses)
routes.get("/instructorDashboard",verifyAuth,isInstructor,instructorDashboard)
export default routes;