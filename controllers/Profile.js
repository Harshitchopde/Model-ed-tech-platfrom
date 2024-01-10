import Profile from "../models/Profile";
import User from "../models/User";

export const updateProfile = async (req,res)=>{
    try {
        // get data 
        const {gender,dob,about,contactNumber}= req.body;
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
        // const profile = await Profile.findByIdAndUpdate(user.additionalDetails,
        //                                                         {
        //                                                             gender,dob,about,contactNumber
        //                                                         }
        //                                                         ,{new:true});

        //METHOD 2
        const profile = await Profile.findById(userId.additionalDetails);
        profile.gender = gender;
        profile.dob = dob;
        profile.about = about;
        profile.contactNumber= contactNumber;
        // saved the changes
        await profile.save();
        return res.status(200).json({
            success:true,
            message:"Profile Update SuccessFully",
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