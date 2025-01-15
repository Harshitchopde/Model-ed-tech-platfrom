import express, { json } from "express";


import courseRoutes from "./routes/Course.js";
import paymentRoutes from "./routes/Payements.js";
import profileRoutes from "./routes/Profile.js";
import usersRoutes from "./routes/Users.js";
import { connect } from './configs/database.js';
import { cloudinaryConnect } from './configs/cloudinary.js';

import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { config } from "dotenv";
const app = express();
config();
const PORT = process.env.PORT || 4000;

app.use(json())
app.use(cookieParser())
app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true,
    }
))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))
// set-up
//database
connect();
// cloudinary
cloudinaryConnect();

app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payments",paymentRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/auth",usersRoutes)

// default routes
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Backend is running",
    })
})

app.listen(PORT,()=>{
    // let i =1;
    console.log(`Server is Running... at ${PORT}`);
    
    // setInterval(()=>{
    //     if(i===3){
    //         i=1;
    //         console.log("Server is running...");
    //     }else if(i===2){
    //         i++;
    //         console.log("Server is running..");
    //     }else{
    //         i++;
    //         console.log("Server is running.");

    //     }

    // },1000)
    
})