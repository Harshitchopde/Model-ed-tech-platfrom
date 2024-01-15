const User = require("../models/User")
const mailSender = require("./utils/mailSender.js")
const bcrypt = require("bcrypt")
//resetPasswordToken -> mail send work it do
exports.resetPasswordToken = async(req,res)=>{
    try {
        // get email of the user
        const {email} = req.body;
        // check user for email in User model email validate
        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.status(400).json({
                status:false,
                message:"Email is not register with us",
            })
        }
        // generate token
        const token  = crypto.randomUUID()
        // update user by adding token and expires time
        const updateDetail = await User.findOneAndUpdate({email},
                                        {
                                            token:token,
                                            resetPasswordExpires:Date.now()+5*60*1000
                                        },
                                        {new:true});
        
        // create url 
        const url = `http://localhost:3000/update-password/${token}`
        console.log("URL RESET link : ",url);
        
        // send mail containing the url
        await mailSender(email,"Password reset Link",
                                `Password reset link -> ${url}`)
        return res.status(200).json({
            status:true,
            message:"Password reset link has been successfully send to your email",
            updateDetail,
        })

    } catch (error) { 
        console.log("Error :",error.message);
        return res.status(500).json({
            status:false,
            message:error.message,
        })
    }
}

// resetPassword  -> Db mai password update 
exports.resetPassword =async (req,res)=>{
    try {
        // get req data
        const {password ,conformPassword, token} = req.body;
        // validation 
        if(!password || !conformPassword || !token){
            return res.status(400).json({
                status:false,
                message:"All field is required"
            })
        }
        if(conformPassword!==password){
            return res.status(400).json({
                status:false,
                message:"password does not match with conform Password"
            })
        }
        // get userDetail using token
        const checkUser = await User.findone({token});
        if(!checkUser){
            return res.status(400).json({
                status:false,
                message:"Invalid Token"
            })
        }
        // token time check
        if(checkUser.resetPasswordExpires<Date.now()){
            return res.status(400).json({
                status:false,
                message:"Token expire, Try again"
            })
        }
        // hash password
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password,salt);
        // update the pasword in Db 
        const userUpdate = await findOneAndUpdate({token},
                                                    {
                                                        password:hash
                                                    },
                                                    {new:true})
        return res.status(200).json({
            status:true,
            message:"SuccessFully reset the password"
        })                                            
    } catch (error) {
        console.log("Error in reserPassword : ",error.message);
        return res.status(400).json({
            status:false,
            message:error.message,
        })
    }
}