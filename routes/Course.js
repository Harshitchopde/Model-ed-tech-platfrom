const express = require("express");
const { createCategory, showAllCategory, categoryPageDetails } = require("../controllers/Category");
const { verifyAuth, isAdmin, isInstructor } = require("../middlewares/auth");
const { createCourse, getCourseDetails} = require("../controllers/Courses");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");

const routes = express.Router();
routes.post("/createCategory",[verifyAuth,isAdmin,createCategory])
routes.get("/showAllCategories",showAllCategory)
routes.get("/categoryPageDetails",categoryPageDetails)
routes.post("/createCourse",verifyAuth,isInstructor,createCourse)
routes.post("/getCourseDetails",verifyAuth,isInstructor,getCourseDetails)
routes.post("/addSection",verifyAuth,isInstructor,createSection)
routes.post("/updateSection",verifyAuth,isInstructor,updateSection)
routes.post("/deleteSection",verifyAuth,isInstructor,deleteSection)

module.exports = routes;