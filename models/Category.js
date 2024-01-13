const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
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
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",

        
    },],
  

})
module.exports = mongoose.model("Category",categorySchema);