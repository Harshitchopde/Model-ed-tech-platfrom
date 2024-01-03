const mongoose = require("mongoose")

const subSectionSchema = mongoose.Schema({
   title:{
     type:String
   },
   timeDuration:{
    type:String
  },
  desc:{
    type:String
  },
  videoUrl:{
    type:String
  }

})
module.exports = mongoose.model("SubSection",subSectionSchema);