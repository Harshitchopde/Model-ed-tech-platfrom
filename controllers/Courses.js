const Course = require("../models/Course");
const Tags = require("../models/Tags");
const User = require("../models/User");
const { imageUploadToCloudinary } = require("../utils/imgeUploader");


exports.createCourse = async(req,res)=>{
    try {
        //fetch req body data 
        const {courseName,
            courseDesc,
            whatYouWillLearn,
            price ,tag} = req.body;
        // get thumbnail file
        const thumbnail = req.files.thumbnailImage;
        // validation 
        if(!courseName ||
            !courseDesc || 
            !whatYouWillLearn ||
            !price || !tag ||
            !thumbnail){
                return res.status(400).json({
                    status:false,
                    message:"All field is require",
                })

        }
        // check for instructor
        const instructorId = req.user.id;
        const checkInstructor = await User.findOne({id:instructorId});
        if(!checkInstructor){
            return res.status(404).json({
                status:false,
                message:"Could not find Instructor",
            })
        }
        // check Tags
        const tagsDetails = await Tags.findById(tag);
        if(!tagsDetails){
            return res.status(400).json({
                status:false,
                message:"Invalid tags",
            })
        }

        // Upload Image to Cloudinary
        const imageUpload = imageUploadToCloudinary(thumbnail,process.env.FOLDER_NAME);
        // create entry in db
        const newCourse = await Course.create({
            courseName,
            courseDesc,
            instructor:checkInstructor._id,
            whatYouWillLearn,
            price,
            thumbnail:imageUpload.secure_url,
            tag:tagsDetails._id,   
        })
        // add the couse to the instructor user
        await User.findByIdAndUpdate(checkInstructor._id,
                                        {
                                            $push:{
                                                courses:newCourse._id
                                            },
                                           
                                        }, {new:true})
        // upate the tags schema  
        await Tags.findByIdAndUpdate({_id:tagsDetails._id},
                                        {
                                            $push:{
                                                courses:newCourse._id
                                            }
                                        },
                                        {new:true})
        return res.status(200).json({
            status:true,
            message:"Course created successfully",
            createEntry
        })
    } catch (error) {
        console.log(error);
        
        return res.status(400).json({
            status:false,
            message:error.message,
        })
    }
}
export const showAllCourse = async (req,res)=>{
    try {
        const allCourses = await Course.find({},{
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
            allCourses
        })
    } catch (error) {
        console.log("Error in show all courses : ",error);
        
        return res.status(400).json({
            status:false,
            message:error.message,
        }) 
    }
}