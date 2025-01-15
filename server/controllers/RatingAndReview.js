

// create rating
import { Schema } from "mongoose";
import Course from "../models/Course.js";
import RatingAndReview from "../models/RatingAndReview.js";

export async function createRatingAndReview(req,res){
    try {
        const Userid = req.user.id;
        const {courseId,rating,review} = req.body;
        // check that user is in the course
        const enrolledUser = await Course.findOne({_id:courseId,
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
                                        course:courseId,
                                    })
        if(alreadyReview){
            return res.status(403).json({
                success:false,
                message:"User Already reviewed the course",
            })
        }
        // now create the rating and review
        const ratingAndReview = await RatingAndReview.create({
                                         user:Userid,
                                         course:courseId,
                                         rating,review
        })
        // add the review to course
        const updateCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                                                {$push:{ratingAndReview:ratingAndReview._id}},
                                                                {new:true});
        
        console.log(updateCourseDetails);
                                                                // return response
        return res.status(200).json({
            success:true,
            message:"Reviewed Successfull",
            ratingReview:ratingAndReview,
        })
    } catch (error) {
        console.log("Error in createRating : ",error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
        
    }
}
export async function getAverageRating(req,res){
    try {
        const {courseId}= req.body;

        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new  Schema.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"rating"},
                }
            }
        ]);
        if(result.lenght >0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        }
        return res.status(200).json({
            success:true,
            message:"Avg rating 0 not rating till now",
            averageRating:0,
        })
    } catch (error) {
        console.log("Error in getAverageRating : ",error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

export async function getAllRatings(req,res){
    try {
        const allRating = await RatingAndReview.find({})
                                                .populate({
                                                    path:"user",
                                                    select:"firstName lastName email image"
                                                })
                                                .populate({
                                                    path:"course",
                                                    select:"courseName courseDesc"
                                                })                                                
                                                .exec();
        return res.status(200).json({
            success:true,
            data:allRating,
            message:"All reviews fetched successfully",
        })
    } catch (error) {
        console.log("Error in getAllRAting : ",error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}