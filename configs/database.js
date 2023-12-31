const mongoose = require("mongoose")

exports.connect = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("Connected to Mongodb ")
    })
    .catch((err)=>{
        console.log("Error Occure : ",err);
        
    })
}