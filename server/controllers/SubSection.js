const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { imageUploadToCloudinary } = require("../utils/imgeUploader");


exports.createSubSection = async (req,res)=>{
    try {
        //fetch data from request body
        // extract file/video
        // upload video to cloudinary
        // create subsection
        // update section with this subsection id
        // return response
        const {title,timeDuration,desc,sectionId} = req.body;
        const videoFile = req.files.videoFile;
        if(!title || !timeDuration || !desc || !videoFile || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Some field is missing",
            })
        }
        const uploadToCloudinary= await imageUploadToCloudinary(videoFile,process.env.FOLDER_NAME);
        
        const subSection = await SubSection.create({
            title,timeDuration,desc,videoUrl:uploadToCloudinary.secure_url
        })
        const section = await Section.findByIdAndUpdate(sectionId,
                                                            {
                                                                $push:{subSection:subSection._id}
                                                            },
                                                            {new:true});
        return res.status(200).json({
            success:true,
            message:"Successfull created section ",
            subSection,
            
        })    
    } catch (error) {
        console.log("Error in CreateSubSection :",error.message);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
        
    }
}
// HW:Update
// HW:Delete 


// exports.updateSubSection = async(req,res)=>{
//     try {
//         const {subSectionId} = req.params;
//         const {title,timeDuration,desc} = req.body;
//         const videoFile = req.files.videoFile;
//     } catch (error) {
        
//     }
// }