const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")

const otpSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:5*60,
    }
})

//
async function sendVerifiactionEmail(email,otp){
    try {
        const mailResponse = await mailSender(email,"Verification of Email",otp);
        console.log("Mail Response : ",mailResponse);
        
    } catch (error) {
        console.log("Error will send Verification email : ",error.message);
        throw error;
        
    }
}

otpSchema.pre("save",async function(next){
    await sendVerifiactionEmail(this.email,this.otp);
    next();

})
module.exports = mongoose.model("OTP",otpSchema)