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
        const videoFile = req.files.video;
        console.log("Video : ",videoFile)
        if(!title || !desc || !videoFile || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Some field is missing",
            })
        }
        const uploadToCloudinary= await imageUploadToCloudinary(videoFile,process.env.FOLDER_NAME);
        console.log("Video uploaded , ",uploadToCloudinary)
        const subSection = await SubSection.create({
            title,timeDuration:`${uploadToCloudinary.duration}`,desc,videoUrl:uploadToCloudinary.secure_url
        })
        const section = await Section.findByIdAndUpdate(sectionId,
                                                            {
                                                                $push:{subSection:subSection._id}
                                                            },
                                                            {new:true}).populate("subSection")
                                                            .exec();
        return res.status(200).json({
            success:true,
            message:"Successfull created section ",
            data:section,
            
        })    
    } catch (error) {
        console.log("Error in CreateSubSection :",error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}
// HW:Update
// HW:Delete 


exports.updateSubSection = async(req,res)=>{
    try {
        const { sectionId, subSectionId, title, desc} = req.body
        const subSection = await SubSection.findById(subSectionId)
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found",
            })
        }
        // check title
        if(title!==undefined){
            subSection.title = title;
        }
        // for desc
        if(desc!==undefined){
            subSection.desc = desc;
        }
        // for video url
        if(req.files && req.files.video !== undefined){
            const videFile = req.files.video;
            // now upload and save url to db
            const uploadeVideo = await imageUploadToCloudinary(videFile,process.env.FOLDER_NAME);
            subSection.videoUrl = uploadeVideo.secure_url;
            subSection.timeDuration = uploadeVideo.duration;
        }
        // save
        await subSection.save();

        // find the section and return it
        const updatedSection = await Section.findById(sectionId).populate("subSection").exec();

        console.log("UpdatedSection ",updatedSection);
        return res.status(200).json({
            success:true,
            message: "Section updated successfull",
            data:updatedSection,
        })

    } catch (error) {
        console.log("Error in updateSubSection :",error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
exports.deleteSubSection = async (req,res)=>{
    try {
        const { subSectionId, sectionId } = req.body
        await Section.findByIdAndUpdate({_id:sectionId},{
            $pull:{
                subSection:subSectionId
            }
        })

        const subSection = await SubSection.findByIdAndDelete(subSectionId);
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not Found!",
            })
        }
        // update Section
        const updateSection = await Section.findById(sectionId).populate("subSection");
        return res.status(200).json({
            success:true,
            message:"Deleted Successfully",
            data:updateSection,

        })
    } catch (error) {
        console.log("Error in DeleteSubSection ",error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}