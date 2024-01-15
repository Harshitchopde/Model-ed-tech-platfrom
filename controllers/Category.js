const Category = require("../models/Category");
const Course = require("../models/Course");


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

// getCategoryPageDetails 
exports.categoryPageDetails = async(req,res)=>{
    try {
        // get categoryId 
        const {categoryId} = req.body;
        // get course for particular categorys
        const getCategory = await Category.find(
                                   {_id:{$e:categoryId}}
                                   );
        // validate
        if(!getCategory){
            return res.status(404).json({
                success:false,
                message:"Category not Found!"
            })
        }
        // get Courses for different categorys course
        const diffCategory = await Category.find({_id:{$ne:categoryId}});
        if(!diffCategory){
            return res.status(404).json({
                success:false,
                message:"Other Category not Found!"
            })
        }
        // get top selling courses
        const topSellingCourse = await Course.find({}).sort({purchase:-1});
        // return response 
        return res.status(200).json({
            success:true,
            category:getCategory,
            differentCategory:diffCategory,
            topSellingCourse, 

        })
    } catch (error) {
        console.log("Error in category Page Details ",error.message);
        
        res.status(400).json({
            success:false,
            message:error.message,
        })
        
    }
}