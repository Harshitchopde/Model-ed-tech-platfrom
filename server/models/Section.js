const mongoose = require("mongoose")

const sectionSchema = mongoose.Schema({
    sectionName:{
        required:true,
        type:String,
      
    },
    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            // required:true,
            ref:"SubSection"
        }
    ]
})
module.exports = mongoose.model("Section",sectionSchema);