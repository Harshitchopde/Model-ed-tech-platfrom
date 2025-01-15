import { Schema, model } from "mongoose";

const profileSchema = Schema({
    gender:{
        // required:true,
        type:String,
        enum:["Male","Female","Other",null]
    },
    dateOfBirth:{
        // required:true,
        type:String,
     
    },
    about:{
        // required:true,
        type:String,
        
    },
    contactNumber:{
        // required:true,
        type:String,
       
    },

})
export default model("Profile",profileSchema);