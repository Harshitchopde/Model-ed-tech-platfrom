const jwt = require("jsonwebtoken")
// auth
export const verifyAuth =async (req,res,next)=>{
    try {
        // extract token 
        const token = req.cookie.access_token ||
                      req.body.token ||
                      req.header("Authorisation").replace("Bearer ","");
        // check token is not empty
        if(!token){
            return res.status(400).json({
                status:false,
                message:"Token is Empty"
            })
        }  
        // validate the token 
        jwt.verify(token,process.env.JWT_SECRET_key,(err,user)=>{
            if(err)  return res.status(400).json({
                status:false,
                message:"Token is Invalid"
            });
            req.user = user;
            console.log(decode);
    
        });
        next();
       
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status:false,
            message:error.message
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