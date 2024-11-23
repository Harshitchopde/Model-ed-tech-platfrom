const express = require("express");
const {
  createCourse,
  editCourse,
  getAllCourse,
  getCourseDetails,
  getFullCourseDetails,
  getInstructorCourse,
  deleteCourse
} = require("../controllers/Courses")

const {
    categoryPageDetails,
    createCategory,
    showAllCategory
} = require("../controllers/Category")

const {
 createSection,
 updateSection,
 deleteSection,
} = require("../controllers/Section")

const {
    createSubSection,
    deleteSubSection,
    updateSubSection
} = require("../controllers/SubSection")

const {
    createRatingAndReview,
    getAllRatings,
    getAverageRating,
} = require("../controllers/RatingAndReview")

const {
    updateCourseProgress
} = require("../controllers/CourseProgress");
const { isStudent, isInstructor, verifyAuth, isAdmin } = require("../middlewares/auth");
const routes = express.Router();

// *******************************************************************************************
//                                      Course Routes
// *******************************************************************************************

// createcourse
routes.post("/createCourse",verifyAuth,isInstructor,createCourse)
// section routes
routes.post("/addSection",verifyAuth,isInstructor,createSection)
routes.post("/updateSection",verifyAuth,isInstructor,updateSection)
routes.post("/deleteSection",verifyAuth,isInstructor,deleteSection)
routes.get("/getCourseDetails",getCourseDetails)


// subSection routes
routes.post("/addSubSection",verifyAuth,isInstructor,createSubSection)
routes.post("/updateSubSection",verifyAuth,isInstructor,updateSubSection)
routes.post("/deleteSubSection",verifyAuth,isInstructor,deleteSubSection)
routes.post("/addSubSection",verifyAuth,createSubSection);

//Get All Registered Courses
routes.get("/getAllCourses",getAllCourse)
//Get Details for a Specific Courses
routes.post("/getCourseDetails",getCourseDetails)
// Get Details for a 
routes.post("/getFullCourseDetails",verifyAuth,getFullCourseDetails);
// EDIT Course routes
routes.post("/editCourse",verifyAuth,isInstructor,editCourse);
// GET all Courses Under a Specific Instructor
routes.get("/getInstructorCourse",verifyAuth,isInstructor,getInstructorCourse);
// Delete a Course
routes.post("/updateCourseProgress",verifyAuth,isStudent)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Only for Admin
routes.post("/createCategory",verifyAuth,isAdmin,createCategory);
routes.get("/showAllCategories",showAllCategory)
routes.post("/getCategoryPageDetails",categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

routes.post("/createRating",verifyAuth,isStudent,createRatingAndReview)
routes.get("/getAverageRating",getAverageRating)
routes.get("/getReviews",getAllRatings);
module.exports = routes;