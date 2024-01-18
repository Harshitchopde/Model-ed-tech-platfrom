const express = require("express");
const { createCategory, showAllCategory, categoryPageDetails } = require("../controllers/Category");
const { verifyAuth, isAdmin, isInstructor } = require("../middlewares/auth");
const { createCourse, getCourseDetails} = require("../controllers/Courses");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const { createSubSection } = require("../controllers/SubSection");

const routes = express.Router();
routes.post("/createCategory",[verifyAuth,isAdmin,createCategory])
routes.get("/showAllCategories",showAllCategory)
routes.get("/categoryPageDetails",categoryPageDetails)
routes.post("/createCourse",verifyAuth,isInstructor,createCourse)
routes.post("/getCourseDetails",verifyAuth,isInstructor,getCourseDetails)
routes.post("/addSection",verifyAuth,isInstructor,createSection)
routes.post("/updateSection",verifyAuth,isInstructor,updateSection)
routes.post("/deleteSection",verifyAuth,isInstructor,deleteSection)
routes.post("/addSubSection",verifyAuth,isInstructor,createSubSection)

// not-> Completed
// routes.post("/updateSubSection",verifyAuth,isInstructor,update)
// routes.post("/deleteSubSection",verifyAuth,isInstructor,del)

module.exports = routes;