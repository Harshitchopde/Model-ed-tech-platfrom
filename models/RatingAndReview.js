const mongoose = require("mongoose")
const RatingAndReviewSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
    }
   
})
module.exports = mongoose.model("RatingAndReview",RatingAndReviewSchema);