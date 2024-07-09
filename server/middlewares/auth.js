const jwt = require("jsonwebtoken")
// auth
exports.verifyAuth =async (req,res,next)=>{
    try {
        // extract token 

        // console.log("REQ : ",req);
        // console.log("REQCOOKIE : ",req.cookie);
        
        
        const token = req.cookies.access_token ||
                      req.body.token ||
                      req.header("Authorization").replace("Bearer ","");
        // check token is not empty
        console.log("Token : ",token);
        
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
            
        } catch (error) {
            console.log("Error : auth ",error)
            return res.status(401).json({
                success:false,
                message:"token is invalid!"+error
            })
        }
        
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