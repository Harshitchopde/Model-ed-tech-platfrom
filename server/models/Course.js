const mongoose = require("mongoose")
const courseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseDesc: {
        type: String,
        required: true,

    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requried: true,

    },
    whatYouWillLearn: {
        type: String,
        required: true,


    },
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"

    }],
    ratingAndReview: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        // required:true,
    },
    studentEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
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
    }
})
module.exports = mongoose.model("Course",courseSchema);