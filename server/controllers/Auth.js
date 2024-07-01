const OTP = require("../models/OTP.js");
const Profile = require("../models/Profile.js");
const User = require("../models/User.js");
const bcrypt = require('bcrypt');
const otpGenerator = require("otp-generator")
const jwt = require('jsonwebtoken');

// send otp
exports.sendOTP = async (req, res) => {
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
        let otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        })
     
        let result = await OTP.findOne({ otp });
        // inefficient process
        while (result) {
            otp = otpGenerator.generate(6, {
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
exports.signUp = async (req, res) => {
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
                status: false,
                message: "Some Parameter are missing"
            })
        }
        // check password and conformpassword
        if (password !== conformPassword) {
            res.status(400).json({
                status: false,
                message: "Password and conform password value does not match , please try again"
            })
        }

        // check user already exist 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                status: false,
                message: "User aleady exist , try with different name"
            })
        }
        // find most rescent otp stored for user
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOTP.lenght === 0) {
            return res.status(400).json({
                status: false,
                message: "No OTP found"
            })
        }
        else if (otp !== recentOTP[0].otp) {
            // console.log("Recent otp : ",recentOTP);
            
            return res.status(400).json({
                status: false,
                message: "Invaid OTP",
                otp:otp,
                recentOTP,
                recentOTP:recentOTP[0].otp,
            })
        }
        //hash password
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
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
            status:true,
            message:"User has been created successfully",
            user
        })


    } catch (error) {
 console.log(error);
 res.status(500).json({
    status:false,
    message:"User can not be created",
   
})
 
    }
}


// login
exports.login = async(req,res)=>{
    // get data form req body
    const {email,password} = req.body;
    // validate user
    const checkUser = await User.findOne({email}).populate("additionalDetails");
    //user check existance
    if(!checkUser){
        return res.status(400).json({
            status:false,
            message:"User Not Found"
        })
    }
    // check [password]
    const match = await bcrypt.compare(password, checkUser.password);
    if(!match){
        return res.status(400).json({
            status:false,
            message:"Password is Incorrect!"
        })
    }
    // create JWT token
    const token =jwt.sign({ id:checkUser._id,accountType: checkUser.accountType ,password:checkUser.password,email:checkUser.email }, process.env.JWT_SECRET_key,{
        expiresIn:"2h"
    });
    checkUser.token = token
    // create cookies
    const options = {
        httpOnly:true,
        expires:new Date(Date.now() +3*24*60*60*1000)
    }
    res.cookie("access_token",token,options).status(200).json({
        status:true,
        message:"Login SuccessFull",
        checkUser
    })
    
   
}

//changePassword
exports.changePassword = (req,res)=>{
    
}