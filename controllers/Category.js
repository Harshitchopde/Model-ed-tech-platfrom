const Category = require("../models/Category");


exports.createCategory = async(req,res)=>{
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
        const tagEntry = await Category.create({
            name:name,
            desc:desc,
        })
        return res.status(200).json({
            status:true,
            message:"Successfull Created Category",
            tagEntry
        })

    } catch (error) {
        console.log("Error in createCategory : ",error.message);
        return res.status(400).json({
            status:false,
            message:error.message,
        })
        
    }
}
exports.showAllCategory =async (req,res)=>{
    try {
        const getAllTags = await Category.find({},{name:true,desc:true});// make sure name and desc is comming
        return res.status(200).json({
            success:true,
            message:"All Category successfully fetched",
        })
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:error.message,
        })
    }
}