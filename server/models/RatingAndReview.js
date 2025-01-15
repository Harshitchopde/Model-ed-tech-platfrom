import { Schema, model } from "mongoose";
const RatingAndReviewSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
    },
    course:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Course"
    }
    
   
})
export default model("RatingAndReview",RatingAndReviewSchema);