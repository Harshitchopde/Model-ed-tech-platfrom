
import Course from "../models/Course";
import Section from "../models/Section";

export const createSection =async (req,res)=>{
    try {
        // fetch data
         const {sectionName,courseId} = req.body;
        // validate data
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Some field is missing",
            })
        }
        // create section
        const newSection = await Section.create({sectionName})
        // update course 
        const courseDeatils = Course.findByIdAndUpdate(courseId,
                                                    {
                                                        courseContent:newSection._id
                                                    }
                                                    ,{new:true})
        // HW:to populate section as well as sub-section in courseDeatils
        // return  response
        return res.status(200).json({
            success:true,
            message:"Successfull created section ",
            Section:newSection
        })
    } catch (error) {
        console.log("Error in CreateSection :",error.message);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
        
    }
}
export const updateSection = async (req,res)=>{
    try {
        const {updatedName,courseId,sectionId} = req.body;
        if(!updatedName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Some field is missing",
            })
        }
        const updatedDetail  = await Section.findByIdAndUpdate(sectionId,
                                                                {
                                                                    sectionName:updatedName
                                                                },
                                                                {new:true});
        return res.status(200).json({
            success:true,
            message:"Successfull updated section ",
            Section:updatedDetail,
            
        })                                                        

        
    } catch (error) {
        console.log("Error in UpdateSection :",error.message);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
        
    }
}
export const deleteSection = async(req,res) =>{
    try {
        const {sectionId} = req.params;
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"SectionId is missing",
            })
        }
        //delete the section 
        const section = await Section.findByIdAndDelete(sectionId);
        return res.status(200).json({
            success:true,
            message:"Successfull deleted section ",
            Section:section,
            
        })    
    } catch (error) {
        console.log("Error in DeleteSection :",error.message);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
        
    }
}