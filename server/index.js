require('dotenv').config()
const express = require("express")
const app = express();

const courseRoutes = require("./routes/Course")
const paymentRoutes = require("./routes/Payements")
const profileRoutes = require("./routes/Profile")
const usersRoutes = require("./routes/Users");
const { connect } = require('./configs/database');
const { cloudinaryConnect } = require('./configs/cloudinary');

const cookieParser = require("cookie-parser")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json())
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

app.use("/api/v1/courses",courseRoutes)
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