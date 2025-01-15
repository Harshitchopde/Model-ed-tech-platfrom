import { populate } from "dotenv";
import Category from "../models/Category.js";
import Course from "../models/Course.js";
import { getRandomInt } from "../utils/getRandomInt.js";


export async function createCategory(req, res) {
    try {
        const { name, desc } = req.body;
        // validation 
        if (!name || !desc) {
            return res.status(400).json({
                success: false,
                message: "Some field is missing name or desc",
            })
        }
        // create entry in db 
        const tagEntry = await Category.create({
            name: name,
            desc: desc,
        })
        return res.status(200).json({
            success: true,
            message: "Successfull Created Category",
            tagEntry
        })

    } catch (error) {
        console.log("Error in createCategory : ", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}
export async function showAllCategory(req, res) {
    try {
        const getAllCategory = await Category.find({}, { name: true, desc: true ,courses:true});// make sure name and desc is comming
        console.log("Show All CAtegory ")
        return res.status(200).json({
            success: true,
            message: "All Category successfully fetched",
            data:getAllCategory
        })
    } catch (error) {
        console.log("Error ShowAllCategory ",error.message)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// getCategoryPageDetails 
export async function categoryPageDetails(req, res) {
    try {
        // get categoryId 
        const { categoryId } = req.body;
        console.log("Category Id ",categoryId)
        // get course for particular categorys
        const sc = await Category.findById(categoryId)
        console.log("SC : ",sc)
        const selectedCategory = await Category.findById(categoryId).populate({
            path:"courses",
            match:{status:"Published"},
            populate:"ratingAndReview"
        }).exec();
        // validate
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not Found!"
            })
        }
        // Handle the case in which their is not course
        console.log("selected cata ",selectedCategory)
        if(selectedCategory.courses.length ===0){
            console.log("NO course found for this category.")
            return res.status(404).json({
                success:false,
                message:"Not course for this category"
            })
        }
        // get Courses for different categorys course
        const categoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } }).populate("courses").exec();
        const exceptSelectedRandom = await  getRandomInt(categoriesExceptSelected.length)
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[exceptSelectedRandom]
              ?._id
          ).populate({
            path:"courses",
            match:{status:"Published"},
          })
          .exec();
          // Get top-selling courses across all categories
        const allCategory = await Category.find({}).sort({ purchase: -1 })
        .populate({
            path:"courses",
            match:{status:"Published"},
            populate:{
                path:"instructor"
            }
        }).exec();
        const allCourses = allCategory.flatMap((category)=>category.courses);
        // console.log("All ",allCourses)
        // console.log("Diff ",differentCategory)
        // console.log("sele ",selectedCategory)
        const mostSellingCourses = allCourses
        .sort((a,b)=> b.sold -a.sold)
        .slice(0,10);

        console.log("Most selling courses ",mostSellingCourses);

        // return response 
        return res.status(200).json({
            success: true,
            data: {
               selectedCategory,
                differentCategory,
                mostSellingCourses,
            }

        })
    } catch (error) {
        console.log("Error in category Page Details ", error.message);

        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}