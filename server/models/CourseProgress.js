import { Schema, model } from "mongoose"

const courseProgressSchema = Schema({
    courseId:{
       
        type:Schema.Types.ObjectId,
        ref:"Course"
      
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    completedVideos:[
        {
            type:Schema.Types.ObjectId,
            ref:"SubSection"
        }
    ]

})
export default model("CourseProgress",courseProgressSchema)