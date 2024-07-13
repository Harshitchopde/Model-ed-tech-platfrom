const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { imageUploadToCloudinary } = require("../utils/imgeUploader");
const { populate } = require("dotenv");


exports.createCourse = async(req,res)=>{
    try {
        //fetch req body data 
        console.log("Create Course ",req.body)
        const {courseName,
            courseDesc,
            whatYouWillLearn,
            status,
            tag:_tag,
            instructions: _instructions,
            price ,category} = req.body;
        // get thumbnail file
        const thumbnail = req.files.thumbnailImage;

        // convert the stringify tag and instruction to array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions);
        console.log("Tag ",tag)
        console.log("Instructions ",instructions)

        // validation 
        if(!courseName ||
            !courseDesc || 
            !whatYouWillLearn ||
            !price ||
            !category ||
            !tag || 
            !instructions.length ||
            !thumbnail){
                return res.status(400).json({
                    success:false,
                    body:req.body,

                    message:"All field is require",
                })

        }
        //  status check
        if(!status || status ===undefined){
            status = "Draft"
        }
        // check for instructor
        const instructorId = req.user.id;
        const checkInstructor = await User.findById(instructorId,
            {
                accountType:"Instructor",
            }
        );
        if(!checkInstructor){
            return res.status(404).json({
                success:false,
                message:"Could not find Instructor",
            })
        }
        // check Category
        const CategoryDetails = await Category.findById(category);
        if(!CategoryDetails){
            return res.status(400).json({
                success:false,
                message:"Invalid Category",
            })
        }

        // Upload Image to Cloudinary
        const imageUpload = imageUploadToCloudinary(thumbnail,process.env.FOLDER_NAME);
        console.log("Upload : ",imageUpload)
        //  Create a new course with the given details
        const newCourse = await Course.create({
            courseName,
            courseDesc,
            instructor:checkInstructor._id,
            whatYouWillLearn,
            price,
            tag,
            status,
            instructions,
            thumbnail:imageUpload.secure_url,
            category:CategoryDetails._id,
        })
        // add the couse to the instructor user
        await User.findByIdAndUpdate({ _id:checkInstructor._id},
                                        {
                                            $push:{
                                                courses:newCourse._id
                                            },
                                           
                                        }, {new:true})
        // upate the Category schema  
        await Category.findByIdAndUpdate({_id:CategoryDetails._id},
                                        {
                                            $push:{
                                                courses:newCourse._id
                                            }
                                        },
                                        {new:true})
        return res.status(200).json({
            status:true,
            message:"Course created successfully",
            Course:newCourse,
        })
    } catch (error) {
        console.log(error);
        
        return res.status(400).json({
            status:false,
            message:"Fail to create the course",
            error:error.message,
        })
    }
}

// edit courses 
exports.editCourse = async (req,res)=>{
    try {
        const {courseId} = req.body;
        const updates = req.body;

        const course = await Course.findById({_id:courseId});
        if(!course){
            // console.log("Eror  : ",)
            return req.status(404).json({
                success:false,
                error:error.message,
                message:"Course not found!"
            })
        }

        // if thumbnail update
        if(req.files){
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await imageUploadToCloudinary(thumbnail,process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;

        }

        // update the other field if present
        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key==="tag" || key === "instructions"){
                    course[key] = JSON.parse(updates[key]);
                }else{
                    course[key] = updates[key];
                }
            }
        }

        //  now save the changes
        await course.save();

        const updatedCourse = await Course.findOne({
            _id:courseId
        })
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
          })
    } catch (error) {
        console.log("Error in edit Course ",error.message);
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}
exports.getAllCourse = async (req,res)=>{
    try {
        const allCourses = await Course.find({
            status: "Published"
        },{
            courseName:true,
            courseDesc:true,
            instructor:true,
            whatYouWillLearn:true,
            price:true,
            thumbnail:true,
            tag:true,   
        }).populate("instructor").exec();
         // populate will replace the instructor field with actual instructor document
         return res.status(200).json({
            status:true,
            message:"All Course fetch successfully",
            data:allCourses
        })
    } catch (error) {
        console.log("Error in show all courses : ",error);
        
        return res.status(400).json({
            status:false,
            message:error.message,
        }) 
    }
}

// getCourseDetails
exports.getCourseDetails = async(req,res)=>{
    try {
        const {courseId} = req.body;
        // find the courseDetails
        const courseDetails = await Course.findById(courseId)
                                            .populate(
                                                {
                                                    path:"instructor",
                                                    populate:{
                                                        path:"additionalDetails"
                                                    }
                                                }
                                            )
                                            .populate({
                                                path:"courseContent",
                                                // populate:"subSection"
                                            })
                                            // .populate("ratingAndReview")
                                            .populate("category")
                                            .populate("studentEnrolled")
                                            .exec();
    if(!courseDetails){
        return res.status(400).json({
            success:false,
            message:"Course Not Found!"
        })
    }
    // return response
    return res.status(200).json({
        success:true,
        message:"Course Detail fetch successfully",
        data:courseDetails,
    })
    } catch (error) {
        console.log("Error in getCourseDetails : ",error.message);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
        
    }
} 