import OTP from "../models/OTP.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { genSaltSync, hashSync, compare, hash as _hash } from 'bcrypt';
import { generate } from "otp-generator";
import pkg from 'jsonwebtoken';
import { passwordUpdated } from "../mails/templates/passwordUpdate.js";
import mailSender from "../utils/mailSender.js";
const { sign} = pkg
// send otp
export async function sendOTP(req, res) {
    try {
        const { email } = req.body;
        // check if user already exist in db
        const isPresent = await User.findOne({ email });
        if (isPresent) {
            return res.status(401).json({
                success: false,
                message: "User already exist"
            })
        }

        // generate otp
        let otp = generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        })
     
        let result = await OTP.findOne({ otp });
        // inefficient process
        while (result) {
            otp = generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            })
            result = await OTP.findOne({ otp });

        }
        // store the otp in db
        const otpPayload = { email, otp };
        const savedOTP = await OTP.create(otpPayload);
        console.log(savedOTP);
        res.status(200).json({
            success: true,
            message: `OTP has been send to ${email}`,
            savedOTP
        })

    } catch (error) {
        console.log("Error in sendOTP : ", error.message);
        throw error;


    }
}
// sigin up
export async function signUp(req, res) {
    try {
        // get request para 
        const { firstName,
            lastName,
            password,
            conformPassword,
            email,
            contactNumber,
            accountType,
            otp
        } = req.body;
        // console.log(req.body);
        
        // check if they are empty
        if (!firstName || !lastName || !password || !conformPassword || !email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Some Parameter are missing"
            })
        }
        // check password and conformpassword
        if (password !== conformPassword) {
            res.status(400).json({
                success: false,
                message: "Password and conform password value does not match , please try again"
            })
        }

        // check user already exist 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User aleady exist , try with different name"
            })
        }
        // find most rescent otp stored for user
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOTP.lenght === 0) {
            return res.status(400).json({
                success: false,
                message: "No OTP found"
            })
        }
        else if (otp !== recentOTP[0].otp) {
            // console.log("Recent otp : ",recentOTP);
            
            return res.status(400).json({
                success: false,
                message: "Invaid OTP",
                otp:otp,
                recentOTP,
                recentOTP:recentOTP[0].otp,
            })
        }
        //hash password
        const saltRounds = 10;
        const salt = genSaltSync(saltRounds);
        const hash = hashSync(password, salt);
        // create the user profile
        const profileOfUser =await Profile.create({
           
            dob:null,
            about:null,
            contactNumber,
        })
        const user = await User.create({
            firstName,
            lastName,
            password:hash,
            email,
            contactNumber,
            accountType,
            additionalDetails:profileOfUser._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })
        
        res.status(200).json({
            success:true,
            message:"User has been created successfully",
            user
        })


    } catch (error) {
 console.log(error);
 res.status(500).json({
    success:false,
    message:"User can not be created",
   
})
 
    }
}


// login
export async function login(req,res){
   try {
     // get data form req body
     const {email,password} = req.body;
     // validate user
     const checkUser = await User.findOne({email}).populate("additionalDetails");
     //user check existance
     if(!checkUser){
         return res.status(400).json({
             success:false,
             message:"User Not Found"
         })
     }
     // check [password]
     const match = await compare(password, checkUser.password);
     if(!match){
         return res.status(400).json({
             success:false,
             message:"Password is Incorrect!"
         })
     }
     // create JWT token
     const token =sign({ id:checkUser._id,accountType: checkUser.accountType ,password:checkUser.password,email:checkUser.email }, process.env.JWT_SECRET_key,
        {
            expiresIn:"24h",
        }
     );
     checkUser.token = token
     // create cookies
     const options = {
         httpOnly:true,
         expires:new Date(Date.now() +3*24*60*60*1000)
     }
     res.cookie("access_token",token,options).status(200).json({
         success:true,
         message:"Login SuccessFull",
         user:checkUser,
         token
     })
     
   } catch (error) {
    console.log("Error ",error);
    res.status(400).json({
        success:false,
        message:error
    })
    
   }
}

//changePassword
export async function changePassword(req,res){
    console.log("CHANGE PASSWORD RUN...")
    try {
        // Get user data from req.user
        console.log("CHnage userID ",req.user)
        const userDetails = await User.findById(req.user.id)
    
        // Get old password, new password, and confirm new password from req.body
        const { oldPassword, newPassword } = req.body
    
        // Validate old password
        const isPasswordMatch = await compare(
          oldPassword,
          userDetails.password
        )
        if (!isPasswordMatch) {
            console.log("1")
            // If old password does not match, return a 401 (Unauthorized) error
            return res
            .status(401)
            .json({ success: false, message: "The password is incorrect" })
        }
        console.log("2")
    
        // Update password
        const encryptedPassword = await _hash(newPassword, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
          req.user.id,
          { password: encryptedPassword },
          { new: true }
        )
    
        // Send notification email
        try {
          const emailResponse = await mailSender(
            updatedUserDetails.email,
            "Password for your account has been updated",
            passwordUpdated(
              updatedUserDetails.email,
              `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            )
          )
          console.log("Email sent successfully:", emailResponse.response)
        } catch (error) {
          // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
          console.error("Error occurred while sending email:", error)
          return res.status(500).json({
            success: false,
            message: "Error occurred while sending email",
            error: error.message,
          })
        }
    
        // Return success response
        return res
          .status(200)
          .json({ success: true, message: "Password updated successfully" })
      } 
      catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while updating password:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while updating password",
          error: error.message,
        })
      }
}