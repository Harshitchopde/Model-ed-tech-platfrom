const Profile = require("../models/Profile");
const User = require("../models/User");
const { imageUploadToCloudinary } = require("../utils/imgeUploader");
exports.updateDisplayPicture = async(req,res)=>{
    try {
        const img = req.files.displayPicture;
        const userId = req.user.id;
        // console.log(img);
        const disPicCloudinary  = await imageUploadToCloudinary(img,process.env.FOLDER_NAME);
        // console.log(disPicCloudinary);
        
        const user = await User.findByIdAndUpdate({_id:userId},
                                              { $set:{image:disPicCloudinary.secure_url}},
                                              {new:true})
        return res.status(200).json({
            success:true,
            message:"displayPicture Update SuccessFully",
            user,

        })                                      
    } catch (error) {
        console.log("Error : ",error);
        
        return res.status(400).json({
            success:false,
            message:error.message,
            noSucc:"no"
        })
    }
}
exports.updateProfile = async (req,res)=>{
    try {
        // get data 
        const {gender,dob="",about="",contactNumber}= req.body;
        // get userid
        const userId = req.user.id;
        // validation 
        if(!gender || !dob || !about || !contactNumber || !userId){
            return res.status(400).json({
                success:false,
                message:"All field is required",
            })
        }
        // find and update
        const user = await User.findById(userId); 
        //METHOD 1
        const profile = await Profile.findByIdAndUpdate(user.additionalDetails,
                                                                {
                                                                    gender,dob,about,contactNumber
                                                                }
                                                                ,{new:true});

        //METHOD 2 --> Error :  TypeError: Cannot set properties of null (setting 'dob')
    //    { const profile = await Profile.findById(userId.additionalDetails);
    //     profile.gender = gender;
    //     profile.dob = dob;
    //     profile.about = about;
       
    //     profile.contactNumber= contactNumber;
    //     // saved the changes
    //     await profile.save();}
        return res.status(200).json({
            success:true,
            message:"Profile Update SuccessFully",
            profile,
        })
        // return response
    } catch (error) {
        console.log("Error : ",error);
        
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}
exports.deleteAccount = async(req,res)=>{
    try {
        //get id
        const userId = req.user.id;
        if(!userId)return res.status(400).json({
            status:false,
            message:"UserId Required"
        })
        // validate that user exist
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User  does not exist",
            })
        }
        // delete the profile
        const profile = await Profile.findByIdAndDelete(user.additionalDetails);
        //HW: unenrolled user from all the courses 
        // Hw: how to schadule the task for delete the account
        // delete the account(user)
        const delUser = await User.findByIdAndDelete(user._id);
        return res.status(200).json({
            success:true,
            message:"Account Deleted SuccessFully",
        })
    } catch (error) {
        console.log("Error : ",error);
        
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}
exports.getUserDetails = async(req,res)=>{
    try {
        const userId = req.user.id;
        if(!userId)return res.status(400).json({
            status:false,
            message:"UserId Required"
        })
        // validate that user exist
        const user = await User.findById(userId).populate("additionalDetails").exec();
        return res.status(200).json({
            success:false,
            message:"Success",
            user,
        })
        

    } catch (error) {
        console.log("Error : ",error);
        
        return res.status(400).json({
            success:false,
            message:error.message,
        })      
    }
}

