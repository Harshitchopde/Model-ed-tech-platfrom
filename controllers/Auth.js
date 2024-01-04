import OTP from "../models/OTP";
import User from "../models/User";

const otpGenerator = require("otp-generator")


// send otp
export const sendOTP = async(req,res)=>{
    try {
        const {email} = req.body;
        // check if user already exist in db
        const isPresent = await User.findOne({email});
        if(isPresent){
            return res.status(401).json({
                status:401,
                message:"User already exist"
            })
        }

        // generate otp
        let otp = otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false,
        })
        let result = await OTP.findOne({otp});
        while(result){
            otp = otpGenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false,
            })
            result = await OTP.findOne({otp});

        }
        // store the otp in db
        const otpPayload = {email,otp};
        const savedOTP = await OTP.create(otpPayload);
        console.log(savedOTP);
        res.status(200).json({
            status:200,
            message:`OTP has been send to ${email}`
        })
        
    } catch (error) {
        console.log("Error in sendOTP : ",error.message);
        throw error;
        
        
    }
}
// sigin up


// login


//changePassword