const mongoose = require("mongoose")

const profileSchema = mongoose.Schema({
    gender:{
        // required:true,
        type:String,
        enum:["Male","Female","Other",null]
    },
    dob:{
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
module.exports = mongoose.model("Profile",profileSchema);