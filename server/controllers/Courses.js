const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { imageUploadToCloudinary } = require("../utils/imgeUploader");
const { populate } = require("dotenv");
const CourseProgress = require("../models/CourseProgress");
const { convertSecToDuration } = require("../utils/secToDur");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");


exports.createCourse = async (req, res) => {
    try {
        //fetch req body data 
        console.log("Create Course ", req.body)
        const { courseName,
            courseDesc,
            whatYouWillLearn,
            status,
            tag: _tag,
            instructions: _instructions,
            price, category } = req.body;
        // get thumbnail file
        const thumbnail = req.files.thumbnailImage;

        // convert the stringify tag and instruction to array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions);
        console.log("Tag ", tag)
        console.log("Instructions ", instructions)

        // validation 
        if (!courseName ||
            !courseDesc ||
            !whatYouWillLearn ||
            !price ||
            !category ||
            !tag ||
            !instructions.length ||
            !thumbnail) {
            return res.status(400).json({
                success: false,
                body: req.body,

                message: "All field is require",
            })

        }
        //  status check
        if (!status || status === undefined) {
            status = "Draft"
        }
        // check for instructor
        const instructorId = req.user.id;
        const checkInstructor = await User.findById(instructorId,
            {
                accountType: "Instructor",
            }
        );
        if (!checkInstructor) {
            return res.status(404).json({
                success: false,
                message: "Could not find Instructor",
            })
        }
        // check Category
        const CategoryDetails = await Category.findById(category);
        if (!CategoryDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid Category",
            })
        }

        // Upload Image to Cloudinary
        const imageUpload = imageUploadToCloudinary(thumbnail, process.env.FOLDER_NAME);
        console.log("Upload : ", imageUpload)
        //  Create a new course with the given details
        const newCourse = await Course.create({
            courseName,
            courseDesc,
            instructor: checkInstructor._id,
            whatYouWillLearn,
            price,
            tag,
            status,
            instructions,
            thumbnail: imageUpload.secure_url,
            category: CategoryDetails._id,
        })
        // add the couse to the instructor user
        await User.findByIdAndUpdate({ _id: checkInstructor._id },
            {
                $push: {
                    courses: newCourse._id
                },

            }, { new: true })
        // upate the Category schema  
        await Category.findByIdAndUpdate({ _id: CategoryDetails._id },
            {
                $push: {
                    courses: newCourse._id
                }
            },
            { new: true })
        return res.status(200).json({
            status: true,
            message: "Course created successfully",
            Course: newCourse,
        })
    } catch (error) {
        console.log(error);

        return res.status(400).json({
            status: false,
            message: "Fail to create the course",
            error: error.message,
        })
    }
}

// edit courses 
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const updates = req.body;

        const course = await Course.findById({ _id: courseId });
        if (!course) {
            // console.log("Eror  : ",)
            return req.status(404).json({
                success: false,
                error: error.message,
                message: "Course not found!"
            })
        }

        // if thumbnail update
        if (req.files) {
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await imageUploadToCloudinary(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;

        }

        // update the other field if present
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key]);
                } else {
                    course[key] = updates[key];
                }
            }
        }

        //  now save the changes
        await course.save();

        const updatedCourse = await Course.findOne({
            _id: courseId
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReview")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            }).exec();

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        console.log("Error in edit Course ", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
}
exports.getAllCourse = async (req, res) => {
    try {
        const allCourses = await Course.find({
            status: "Published"
        }, {
            courseName: true,
            courseDesc: true,
            instructor: true,
            whatYouWillLearn: true,
            price: true,
            thumbnail: true,
            tag: true,
        }).populate("instructor").exec();
        // populate will replace the instructor field with actual instructor document
        return res.status(200).json({
            success: true,
            message: "All Course fetch successfully",
            data: allCourses
        })
    } catch (error) {
        console.log("Error in show all courses : ", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        // find the courseDetails
        const courseDetails = await Course.findById(courseId)
            .populate(
                {
                    path: "instructor",
                    populate: {
                        path: "additionalDetails"
                    }
                }
            )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                    select: "-videoUrl"
                }
            })
            .populate("ratingAndReview")
            .populate("category")
            .exec();
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Course Not Found! with courseID ${courseId}`
            })
        }
        // return response
        return res.status(200).json({
            success: true,
            message: "Course Detail fetch successfully",
            data: courseDetails,
        })
    } catch (error) {
        console.log("Error in getCourseDetails : ", error.message);
        return res.status(400).json({
            success: false,
            message: error.message,
        })

    }
}

exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id
        // course detail
        const courseDetails = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        const courseProgress = await CourseProgress.findOne({
            courseId,
            userId,
        })
        console.log("Course Progress : ", courseProgress)

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with id ${courseId}`
            })
        }

        // ----------------Draft course
        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }

        // calculate the total time
        let totalDurationInSecond = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSecond = parseInt(subSection.timeDuration)
                totalDurationInSecond += timeDurationInSecond;
            })
        })

        const totalDuration = convertSecToDuration(totalDurationInSecond);
        return res.status(200).json({
            success: true,
            message: "Successfully fetch info",
            data: {
                courseDetails,
                totalDuration,
                completedVideo: courseProgress?.completedVideos
                    ? courseProgress.completedVideo
                    : [],
            }
        })
    } catch (error) {
        console.log("Error in getFull course detail\n", error)
        return res.status(500).json({
            success: false,
            message: "Server error " + error.message,
        })
    }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourse = async (req, res) => {
    try {
        const instructorId = req.user.id;

        // find all the course belonging to the instructor
        const InstructorCourse = await Course.find({ instructor: instructorId }).sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            data: InstructorCourse
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}
// Delete the Course

exports.deleteCourse = async (req,res)=>{
    try {
        const {courseId} = req.body;

        // find the course
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({
                success:false,
                message:`Could not find the Course with ${courseId}`
            })
        }

        // unenroll student for the course
        let studentEnrolled = course.studentEnrolled;
        for(const studentId of studentEnrolled){
            await User.findByIdAndUpdate(studentId,{
                $pull:{courses:courseId},
            })
        }

        // delete the section and subsections
        let courseSections = course.courseContent;
        for(const sectionId of courseSections){
            // delete subSections of the Section
            const section = await Section.findById(sectionId)
            if(section){
                const subSections = section.subSection;
                for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
            // Delete section
            await Section.findByIdAndDelete(sectionId)
        }
        // Delete the course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success:true,
            message:"Successfully deleted the course"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: error.message,
        })
    }
}