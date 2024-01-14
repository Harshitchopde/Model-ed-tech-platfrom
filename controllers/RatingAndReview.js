

// create rating

import Course from "../models/Course";
import RatingAndReview from "../models/RatingAndReview";

export const createRatingAndReview = async(req,res)=>{
    try {
        const Userid = req.user.id;
        const {CourseId,rating,review} = req.body;
        // check that user is in the course
        const enrolledUser = await Course.findOne({_id:CourseId,
                                            studentEnrolled:{
                                                $elemMatch:{$eq:Userid},
                                            }})
        
        if(!enrolledUser){
            return res.status(400).json({
                success:false,
                message:"Student is not enrolled in this course so not to review"
            })
        }                                    
        // check if he already reviewed the course
        const alreadyReview = await RatingAndReview.findOne({
                                        user:Userid,
                                        course:CourseId,
                                    })
        if(alreadyReview){
            return res.status(200).json({
                success:false,
                message:"Already reviewed the course",
            })
        }
        // now create the rating and review
        const ratingAndReview = await RatingAndReview.create({
                                         user:Userid,
                                         course:CourseId,
                                         rating,review
        })
        // return response
        return res.status(200).json({
            success:true,
            message:"Reviewed Successfull",
            ratingAndReview,
        })
    } catch (error) {
        console.log("Error in createRating : ",error.message);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
        
        
    }
}