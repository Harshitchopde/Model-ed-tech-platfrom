import React, { useEffect, useState } from 'react'
import Upload from '../Upload'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsApis'
import { setCourse, setStep } from '../../../../../slices/courseSlicer'
import toast from 'react-hot-toast'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { HiOutlineCurrencyRupee} from "react-icons/hi"
import ChipInput from './ChipInput'
import Requirements from './Requirements'
import IconBtn from '../../../../common/IconBtn'
import { MdNavigateNext } from 'react-icons/md'
const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{ errors},
  } = useForm()
  
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth)
  const { step, course,editCourse} = useSelector(state=>state.course)
  const [loading,setLoading] = useState(false);
  const [courseCategories,setCourseCategories] = useState([])
  
  console.log("Step : ",step)
  //  console.log("Categories ",courseCategories)
  useEffect(()=>{
    const getCategories = async ()=>{
      setLoading(true);
      const categories = await fetchCourseCategories();
      // console.log("categories res ",categories)
      if(categories?.length >0 ){
        // console.log("d")
        setCourseCategories(categories)
      }
      setLoading(false);
    }
    getCategories();
    // if form is in edit mode
    if(editCourse){
      console.log("Data populated : ",editCourse)
       setValue("courseTitle",course.courseName);
       setValue("courseShortDesc",course.courseDesc);
       setValue("coursePrice",course.price);
       setValue("courseTags",course.tags);
       setValue("courseBenefits",course.whatYouWillLearn);
       setValue("courseCategory",course.category);
       setValue("courseRequirements",course.instructions);
       setValue("courseImage",course.thumbnail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  },[])

  // check for any changes
  const isFormUpdated = ()=>{
    const currValues = getValues();
    console.log("After changes : ",currValues)
    console.log("Before changes : ",course)
    if(
      currValues.courseTitle !== course.courseName ||
      currValues.courseShortDesc !== course.courseDesc ||
      currValues.coursePrice !== course.price ||
      currValues.courseTags.toString() !== course.tags.toString() ||
      currValues.courseBenefits !== course.whatYouWillLearn ||
      currValues.courseCategory._id !== course.categories._id ||
      currValues.courseRequirements.toString() !== course.instructions.toString() ||
      currValues?.courseImage !== course?.thumbnail
    ){
      return true;
    }
    return false;
  }

  // handld next button 
  const onSubmit = async (data) =>{
    console.log("Data ",data);
    console.log("EditCourse ",editCourse);
    if(editCourse){
      if(isFormUpdated()){
        const currValues = getValues();
        console.log("Curr ",currValues)
        const formData = new FormData()
        formData.append("courseId",course._id)
        if (currValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDesc", data.courseShortDesc)
        }
        if (currValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currValues.courseTags.toString() !== course.tags.toString()) {
          formData.append("tags", JSON.stringify(data.courseTags))
        }
        if (currValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if(currValues.courseRequirements.toString() !== course.instructions.toString()){
          formData.append("instructions", JSON.stringify(data.courseRequirements))
        }
        if(currValues.courseImage !==course.thumbnail){
          formData.append("thumbnailImage",data.courseImage)
        }
        setLoading(true);
        const result = await editCourseDetails(formData,token)
        setLoading(false);

        if(result){
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }else{
           toast.error("No changes made to the form")
        }

      }
    }

    // ususal
    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDesc", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tags", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result  = await addCourseDetails(formData,token);

    console.log("Result : ",result)
    if(result){
      console.log("Result2 : ",result)
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }
  return (
    <div>
      <form 
       onSubmit={handleSubmit(onSubmit)}
       className=' space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
        {/* Course title */}
        <div className=" flex flex-col space-y-2">
          <label htmlFor="courseTitle"
            className=' text-sm text-richblack-5'>
              Course Title <sup className=' text-pink-200'>*</sup>
            </label>
            <input id='courseTitle'
            placeholder='Enter Course Title'
            {...register("courseTitle",{required:true})}
            className=' form-style w-full'/>
            {errors.courseTitle && (
              <span className=' mt-2 text-xs tracking-wide text-pink-200'>Course title is required</span>
            )}
        </div>
        {/* Course Short Desc */}
        <div className=" flex flex-col space-y-2">
          <label htmlFor="courseShortDesc"
            className=' text-sm text-richblack-5'>
              Course Short Description <sup className=' text-pink-200'>*</sup>
            </label>
            <textarea id='courseShortDesc'
            placeholder='Enter Description'
            {...register("courseShortDesc",{required:true})}
            className=' form-style  resize-x-none min-h-[130px] w-full'/>
            {errors.courseDesc && (
              <span className=' mt-2 text-xs tracking-wide text-pink-200'>Course Description is required</span>
            )}
        </div>
        {/* Course Price */}
        <div className=" flex flex-col space-y-2">
          <label htmlFor="coursePrice"
            className=' text-sm text-richblack-5'>
              Course Price <sup className=' text-pink-200'>*</sup>
            </label>
            <div className=" relative">
              <input id='coursePrice'
              placeholder='Enter Course Price'
              {...register("coursePrice",{
                required:true,
                valueAsNumber:true,
                pattern:{
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                }
                })}
              className=' form-style !pl-12 w-full'
              />
              <HiOutlineCurrencyRupee className=' absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400 '/>
            </div>
            {errors.coursePrice && (
              <span className=' mt-2 text-xs tracking-wide text-pink-200'>Course price is required</span>
            )}
        </div>
        {/* Course Category */}
        <div className=" flex flex-col space-y-2">
          <label htmlFor="courseCategory"
            className=' text-sm text-richblack-5'>
              Course Category <sup className=' text-pink-200'>*</sup>
            </label>
            <select id='courseCategory'
             defaultValue=""
            {...register("courseCategory",{required:true})}
            className=' form-style w-full'>
              <option value="" disabled>
                Choose a Category 
              </option>
              {!loading && courseCategories?.map((category,idx)=>(
                <option key={idx} value={category?._id}>
                  {category?.name}
                </option>
              ))}
            </select>
            {errors.courseCategory && (
              <span className=' mt-2 text-xs tracking-wide text-pink-200'>Course Category is required</span>
            )}
        </div>
        {/* Course Tags */}
        <ChipInput
         label="Tags"
         name="courseTags"
         placeholder="Enter tags and press Enter"
         register={register}
         errors={errors}
         setValue={setValue}
         getValues={getValues}
        />

        {/* Course Thumbnail Image */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse? course?.thumbnail : null}
         />
        {/* Benefits of the course */}
        <div className=" flex flex-col space-y-2">
          <label htmlFor="courseBenefits" className='  text-sm text-richblack-5 '> Benefits of the Course <sup className=' text-pink-300'>*</sup></label>
          <textarea id='courseBenefits'
           {...register("courseBenefits",{required:true})}
           className=' form-style resize-x-none min-h-[130px]'
           placeholder='Enter the benefits of Course'/>
           {
            errors.courseBenefits && (
              <span className=' ml-2 text-xs tracking-wide text-pink-200 '>
                *Require
              </span>
            )
           }
        </div>
        {/*  Requirements / Instructions */}
        <Requirements
         name="courseRequirements"
         label="Requirements/Instructions"
         register={register}
         setValue={setValue}
         errors={errors}
         getValues={getValues}
        />
        {/*  Next Button */}
        <div className=" flex justify-end gap-x-2">
          {
            editCourse && (
              <button onClick={()=>dispatch(setStep(2))}
               dispatch={loading}
                className={` flex cursor-pointer items-center gap-x-2
                   rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900  `}>
                    Continue WithOut Saving
              </button>

            )
          }
          <IconBtn  disabled={loading}
            text={!editCourse ? "Next" : "Save Changes"}>
              <MdNavigateNext/>
            </IconBtn>
        </div>
       </form>
    </div>
  )
}

export default CourseInformationForm
