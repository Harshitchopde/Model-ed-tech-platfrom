import { Schema, model } from "mongoose";

const subSectionSchema = Schema({
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
export default model("SubSection",subSectionSchema);