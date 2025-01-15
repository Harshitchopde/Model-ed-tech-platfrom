import { Schema, model } from "mongoose";

const userSchema = Schema({
    firstName:{
        required:true,
        type:String,
        trim:true,
    },
    lastName:{
        required:true,
        type:String,
        trim:true,
    },
    password:{
        required:true,
        type:String,
      
    },
    email:{
        required:true,
        type:String,
        trim:true,
    },
    contactNumber:{
        type:String,

    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true,
    },
    additionalDetails:{
        type:Schema.Types.ObjectId,
        ref:"Profile",
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date,
    },
    courses:[
        {
            type:Schema.Types.ObjectId,
            ref:"Course",
        }
    ],
    courseProgress:[
        {
            type:Schema.Types.ObjectId,
            ref:"CourseProgress"
        }
    ],
})
export default model("User",userSchema);
