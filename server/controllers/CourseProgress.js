import SubSection from "../models/SubSection.js";
import CourseProgress from "../models/CourseProgress.js";

export async function updateCourseProgress(req,res){
    try {
        const { courseId, subsectionId } = req.body
        const userId = req.user.id;

        const subSection = await SubSection.findById(subsectionId);
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"Sub Section Not found!",
            })
        }

         // Find the course progress document for the user and course
        let courseProgress = await CourseProgress.findOne({
            courseId,
            userId,
        })

        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress Not found!"
            })
        }else{
            // if course progress exist and  check if the subSection already  completed
            if(courseProgress.completedVideos.includes(subsectionId)){
                return res.status(400).json({
                    success:false,
                    message:"SubSection already completed",
                })
            }
            courseProgress.completedVideos.push(subsectionId);
        }
        // save the update course progress
        await courseProgress.save();

        return res.status(200).json({
            success:true,
            message:"Course progress Updated"
        })
    } catch (error) {
        console.log("Error in course progress : ",error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}