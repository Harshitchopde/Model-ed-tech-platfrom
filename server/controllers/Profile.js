const { populate } = require("dotenv");
const Course = require("../models/Course")
const Profile = require("../models/Profile");
const User = require("../models/User");
const { imageUploadToCloudinary } = require("../utils/imgeUploader");
const { convertSecToDuration } = require("../utils/secToDur");
const CourseProgress = require("../models/CourseProgress");
const { default: mongoose } = require("mongoose");
exports.updateDisplayPicture = async(req,res)=>{
    try {
        const img = req.files.displayPicture;
        const userId = req.user.id;
        // console.log(img);
        const disPicCloudinary  = await imageUploadToCloudinary(img,process.env.FOLDER_NAME);
        // console.log(disPicCloudinary);
        
        const user = await User.findByIdAndUpdate({_id:userId},
                                              { $set:{image:disPicCloudinary.secure_url}},
                                              {new:true})
        return res.status(200).json({
            success:true,
            message:"displayPicture Update SuccessFully",
            user,

        })                                      
    } catch (error) {
        console.log("Error : ",error);
        
        return res.status(400).json({
            success:false,
            message:error.message,
            noSucc:"no"
        })
    }
}
exports.updateProfile = async (req,res)=>{
    try {
        // get data 
        const {gender,dob="",about="",contactNumber}= req.body;
        // get userid
        const userId = req.user.id;
        // validation 
        if(!gender || !dob || !about || !contactNumber || !userId){
            return res.status(400).json({
                success:false,
                message:"All field is required",
            })
        }
        // find and update
        const user = await User.findById(userId); 
        //METHOD 1
        const profile = await Profile.findByIdAndUpdate(user.additionalDetails,
                                                                {
                                                                    gender,dob,about,contactNumber
                                                                }
                                                                ,{new:true});

        //METHOD 2 --> Error :  TypeError: Cannot set properties of null (setting 'dob')
    //    { const profile = await Profile.findById(userId.additionalDetails);
    //     profile.gender = gender;
    //     profile.dob = dob;
    //     profile.about = about;
       
    //     profile.contactNumber= contactNumber;
    //     // saved the changes
    //     await profile.save();}
        return res.status(200).json({
            success:true,
            message:"Profile Update SuccessFully",
            profile,
        })
        // return response
    } catch (error) {
        console.log("Error : ",error);
        
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}
exports.deleteAccount = async(req,res)=>{
    try {
        //get id
        const userId = req.user.id;
        if(!userId)return res.status(400).json({
            success:false,
            message:"UserId Required"
        })
        // validate that user exist
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found!",
            })
        }
        // delete the profile
        // const profile = await Profile.findByIdAndDelete(user.additionalDetails);
        // or 
        await Profile.findByIdAndDelete({
            _id:new mongoose.Types.ObjectId(user.additionalDetails),
        })
        //HW: unenrolled user from all the courses 
        for(const courseId of user.courses){
            await Course.findByIdAndUpdate(courseId,{
                    $pull : { studentEnrolled :userId},
                
                }, {new :true}
            )
        }
        // Hw: how to schadule the task for delete the account

        // delete the account(user)
        await User.findByIdAndDelete({_id:userId})
        // remove from the Course Progress
        await CourseProgress.deleteMany({userId:userId})
        const delUser = await User.findByIdAndDelete(user._id);
        
        return res.status(200).json({
            success:true,
            message:"Account Deleted SuccessFully",
        })
    } catch (error) {
        console.log("Error : ",error);
        
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}
exports.getUserDetails = async(req,res)=>{
    try {
        const userId = req.user.id;
        if(!userId)return res.status(400).json({
            success:false,
            message:"UserId Required"
        })
        // validate that user exist
        const user = await User.findById(userId).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:"Success",
            user,
        })
        

    } catch (error) {
        console.log("Error : ",error);
        
        return res.status(400).json({
            success:false,
            message:error.message,
        })      
    }
}
exports.getEnrolledCourses = async(req,res)=>{
    try {
        const userId = req.user.id;
        console.log("USERID" ,userId)
        let userDetails = await User.findOne({_id:userId
        }).populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        }).exec()

        // check user
        if (!userDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${userDetails}`,
            })
          }
        userDetails = userDetails.toObject();       
        let SubSectionLenght = 0;
        for(let i = 0;i<userDetails.courses.length;i++){
            let totalDurationInSecond = 0;
            SubSectionLenght = 0;
            for(let j=0;j<userDetails.courses[i].courseContent.length;j++){
                totalDurationInSecond+=userDetails.courses[i].courseContent[j]
                .subSection.reduce((acc,curr)=> acc+parseInt(curr.timeDuration),0)
                userDetails.courses[i].totalDuration = convertSecToDuration(totalDurationInSecond)
                SubSectionLenght+=
                 userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                userId:userId,
                courseId:userDetails.courses[i]._id
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if(SubSectionLenght===0){
                userDetails.courses[i].progressPercentage = 100
            }else{
                const multiplier = Math.pow(10,2);
                userDetails.courses[i].progressPercentage = Math.round((courseProgressCount/SubSectionLenght)*100*multiplier)/multiplier
            }
        }

        return res.status(200).json({
            success:true,
            data:userDetails.courses,
        })


    } catch (error) {
        console.log("Error in GetEnrolled courses",error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.instructorDashboard = async(req,res)=>{
    try {
        const courseDetails = await Course.find({instructor:req.user.id})
        const courseData = courseDetails.map((course)=>{
            const totalStudentEnrolled = course.studentEnrolled.length;
            const totalRevenueGenerated = totalStudentEnrolled*course.price;

            const courseDetailWithStats={
                _id:course._id,
                courseName:course.courseName,
                courseDesc:course.courseDesc,
                totalStudentEnrolled,
                totalRevenueGenerated,
            }
            return courseDetailWithStats;
        })

        return res.status(200).json({
            success:true,
            courses:courseData
        })
        
    } catch (error) {
        console.log("Error in Instructor ",error)
        return res.status(500).json({
            success:false,
           message:error
        })
    }
}