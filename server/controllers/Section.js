
import Course from "../models/Course.js";
import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";



export async function createSection(req,res){
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
        // update course  || Error on solving because i forgot the await
        const courseDeatils =await Course.findByIdAndUpdate(courseId,
                                                    {
                                                       $push:{ courseContent:newSection._id}
                                                    }
                                                    ,{new:true})
                                                    .populate({
                                                        path:"courseContent",
                                                        populate:{
                                                            path:"subSection"
                                                        }
                                                    })
        // HW:to populate section as well as sub-section in courseDeatils -> done
        // return  response
        return res.status(200).json({
            success:true,
            message:"Successfull created section ",
            updatedCourse:courseDeatils
        })
    } catch (error) {
        console.log("Error in CreateSection :",error.message);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
        
    }
}
export async function updateSection(req,res){
    try {
        const {sectionName, sectionId,courseId} = req.body;
        // const {sectionId} = req.params;
        if(!sectionName || !sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"Some field is missing",
            })
        }
        const updatedDetail  = await Section.findByIdAndUpdate(sectionId,
                                                                {
                                                                    sectionName
                                                                },
                                                                {new:true});
        const course = await Course.findById(courseId)
        .populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
        .exec();

        return res.status(200).json({
            success:true,
            message:updatedDetail,
            data:course,
            
        })                                                        

        
    } catch (error) {
        console.log("Error in UpdateSection :",error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}
export async function deleteSection(req,res){
    try {
       
        const {courseId ,sectionId} = req.body;
        if(!sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"SectionId is missing",
            })
        }
        // pull out the sectionId from course
        await Course.findByIdAndUpdate(courseId,
                                              {
                                                 $pull:{courseContent:sectionId}
                                               }
                                                 ,{new:true});
        
        const section = await Section.findById(sectionId);
        console.log("Section and Course ",sectionId,courseId);
        if(!section){
            return res.status(404).json({
                success:false,
                message:"Section Not found!"
            })
        }
        // first delete subSection
        await SubSection.deleteMany({_id:{$in :section.SubSection}});
        // delete Section
        await Section.findByIdAndDelete(sectionId)
        // find the updated course and return
        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
        return res.status(200).json({
            success:true,
            message:"Successfull deleted section ",
            data:course
            
        })    
    } catch (error) {
        console.log("Error in DeleteSection :",error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}