import { Schema, model } from "mongoose";

const categorySchema = Schema({
    name:{
        required:true,
        type:String,
      
    },
    desc:{
        required:true,
        type:String,
     
    },
    courses:[{
        // required:true,
        type:Schema.Types.ObjectId,
        ref:"Course",

        
    },],
  

})
export default model("Category",categorySchema);