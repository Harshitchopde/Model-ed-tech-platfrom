import { Schema, model } from "mongoose";
const courseSchema = Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseDesc: {
        type: String,
        required: true,

    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requried: true,

    },
    whatYouWillLearn: {
        type: String,
        required: true,


    },
    courseContent: [{
        type: Schema.Types.ObjectId,
        ref: "Section"

    }],
    ratingAndReview: {
        type: Schema.Types.ObjectId,
        ref: "RatingAndReview"
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    thumbnail: {
        type: String,

    },
    tag:{
        type:[String],
        required:true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        // required:true,
    },
    studentEnrolled: [
        {
            type: Schema.Types.ObjectId,
            ref: "User" 
        }
    ],
    instructions:{
        type:[String],
    },
    purchase:{
        type:Number,
        required:true,
        default:0
    },
    status:{
        type:String,
        enum:["Draft","Published"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
export default model("Course",courseSchema);