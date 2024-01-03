const mongoose = require("mongoose")

const tagSchema = mongoose.Schema({
    name:{
        required:true,
        type:String,
      
    },
    desc:{
        required:true,
        type:String,
     
    },
    course:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",

        
    },
  

})
module.exports = mongoose.model("Tags",tagSchema);