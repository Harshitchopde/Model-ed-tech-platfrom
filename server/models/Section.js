import { Schema, model } from "mongoose";

const sectionSchema = Schema({
    sectionName:{
        required:true,
        type:String,
      
    },
    subSection:[
        {
            type:Schema.Types.ObjectId,
            // required:true,
            ref:"SubSection"
        }
    ]
})
export default model("Section",sectionSchema);