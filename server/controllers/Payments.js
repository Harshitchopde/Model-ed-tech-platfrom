import { default as mongoose } from "mongoose";
import Course from "../models/Course.js";
import User from "../models/User.js";
import { instance } from "../configs/razorpay.js";
import mailSender from "../utils/mailSender.js";
import { courseEnrollementEmail } from "../mails/templates/courseEnrollementEmail.js";


export async function capturePayment(req,res){
     // get course_ID and UserId
     const {courseId} = req.body;
     const userId = req.user.id;
    try {
       
        // validate
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid User"
            })
        } 
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"Invalid Course id"
            })
        } 
        // user Already paid the course
        let uid = mongoose.Types.ObjectId(userId);// converting the userid string to object id
        if(course.studentEnrolled?.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student Is already enrolled in this course"
            })
        }
          // create order
    const amount = course.price;
    const currency = "INR";
    // options 
    const options = {
        amount:amount*100,
        currency,
        receipt :Math.random(new Date.now()).toString(),
        notes:{
            courseId,
            userId
        }
    }
    try {
        //initialise the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        res.status(200).json({
            success:true,
            message:"Payment initialise SuccessFully",
            courseName:course.courseName,
            courseDescription:course.courseDesc,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            status:paymentResponse.status,
            currency:paymentResponse.currency,

        })
        
    } catch (error) {
        
    }
    } catch (error) {
        console.log("Error in capturePayment : ",error.message);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
        
    }

  
}

//verify Payment Signature
export async function verifySignature(req,res){
    const webHookSecret = "riueryewi4";
    const signature = req.headers["x-razorpay-signature"];

    const shaSum = crypto.createHmac("sha2",webHookSecret);
    shaSum.update(JSON.stringify(req.body))
    const digest = shaSum.digest("hex");
    if(signature === digest){
        console.log("Payment is Authorised");
        const {courseId,userId} = req.body.payload.payment.entity.notes;
        try {
            // action to fullfiled
            // add the userid to enrolledStudent in course
            const enrollUser = await Course.findOneAndUpdate(
                                                            {_id:courseId},
                                                            {$push:{studentEnrolled:userId}},
                                                            {new:true}
            )
            if(!enrollUser){
                return res.status(500).json({
                    success:false,
                    message:"Could not Find 1",
                })
            }
            // add the courseid to student enrolled list
            const enrollCourse = await User.findOneAndUpdate(
                                                            {_id:userId},
                                                            {$push:{courses:courseId}},
                                                            {new:true}
            )
            if(!enrollCourse){
                return res.status(500).json({
                    success:false,
                    message:"Could not Find 2",
                })
            }
            // send mail to user
            const emailRespose = await mailSender(  enrollCourse.email,
                                                    "Enrolled in Course SuccessFully",
                                                    "Congratulation to enrolled in this course"
            );
            console.log("Email Response : ",emailRespose);
            
            return res.status(200).json({
                success:true,
                message:"Signature Verified and Course Added ",
            })
            
        } catch (error) {
            console.log("Error in verifySignature : ",error.message);
            return res.status(400).json({
                success:false,
                message:error.message,
            })
        }
        
    }
    else{
        
        return res.status(400).json({
            success:false,
            message:"Invalid Request",
        })
    }
}