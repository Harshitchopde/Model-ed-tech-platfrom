const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();
// auth
exports.verifyAuth =async (req,res,next)=>{
    try {
        // extract token 

        // console.log("REQ : ",req.body);
        // console.log("REQ : ",req.header("Authorization"));
        // console.log("REQCOOKIE : ",req.cookie);
        
        
        let token = req.cookies.access_token ||
                      req.header("Authorization")?.replace("Bearer ","");
        // check token is not empty
        console.log("T1 ",req.cookies.access_token)
        console.log("AUT:",req.header("Authorization"));
        console.log("Token : ",token);
     
        console.log("Tokan : ",token)
        if(!token){
            return res.status(400).json({
                status:false,
                message:"Token is Empty"
            })
        }  
        // validate the token 
        try {
            // console.log(process.env.)
            const decode = await jwt.verify(token,process.env.JWT_SECRET_key);
            console.log("Decode : ",decode);
            req.user = decode
            console.log("Fine")
        } catch (error) {
            console.log("Error : auth ",error.message)
            return res.status(401).json({
                success:false,
                message:error.message
            })
        }
        console.log("AUTH:USER : ",req.user)
       next();
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status:false,
            message:error.message,
            errorIn:"verifyAuth"
        })
        
        
    }
}

// isStudent
exports.isStudent = (req,res,next)=>{
    try {
        if(req.user.accountType !=="Student"){
            return res.status(400).json({
                status:false,
                message:"This is a protected routes for Student only"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error,
        })
    }
}

// isInstructor
exports.isInstructor = (req,res,next)=>{
    try {
        if(req.user.accountType !=="Instructor"){
            return res.status(400).json({
                status:false,
                message:"This is a protected routes for Instructor only"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error,
        })
    }
}

// isAdmin
exports.isAdmin = (req,res,next)=>{
    try {
        if(req.user.accountType !=="Admin"){
            return res.status(400).json({
                status:false,
                message:"This is a protected routes for Admin only"
            })
        }
        next()
    } catch (error) {
        
    }
}