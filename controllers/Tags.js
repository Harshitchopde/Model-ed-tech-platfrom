const Tags = require("../models/Tags");


exports.createTag = async(req,res)=>{
    try {
        const {name ,desc} = req.body;
        // validation 
        if(!name || !desc){
            return res.status(400).json({
                status:false,
                message:"Some field is missing name or desc",
            })
        }
        // create entry in db 
        const tagEntry = await Tags.create({
            name:name,
            desc:desc,
        })
        return res.status(200).json({
            status:true,
            message:"Successfull Created Tags",
            tagEntry
        })

    } catch (error) {
        console.log("Error in createTag : ",error.message);
        return res.status(400).json({
            status:false,
            message:error.message,
        })
        
    }
}
exports.showAllTags =async (req,res)=>{
    try {
        const getAllTags = await Tags.find({},{name:true,desc:true});// make sure name and desc is comming
        return res.status(200).json({
            success:true,
            message:"All Tags successfully fetched",
        })
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:error.message,
        })
    }
}