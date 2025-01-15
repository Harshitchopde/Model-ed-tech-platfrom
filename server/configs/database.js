import mongoose from "mongoose"

export const connect = async()=>{
    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("Connected to MONGO DB")
    })
    .catch((err)=>{
        console.log("Error on connecting MongoDb , ",err);
    })
}
