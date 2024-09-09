import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsApis'
import { setCourse } from '../../../../../slices/courseSlicer'
import toast from 'react-hot-toast'
import { RxCross2 } from "react-icons/rx"
import Upload from '../Upload'
import IconBtn from '../../../../common/IconBtn'
const SubSectionModel = ({
    modelData,
    setModelData,
    add=false,
    view=false,
    edit=false,
}) => {
    // useForm
    const { register,handleSubmit,getValues,setValue,formState:{errors}} = useForm()
    // dispatch 
    const dispatch = useDispatch();
    // loading state
    const [loading,setLoading] = useState(false)
    // token and course
    const {course} = useSelector(state=>state.course);
    const { token} = useSelector((state)=>state.auth);
    // useEffect -> setvalue lectureTitle,lectureDesc,lectureVideo if view | edit
    useEffect(()=>{
        if(view || edit){
            console.log("Model data ",modelData);
            setValue("lectureTitle",modelData.title)
            setValue("lectureDesc",modelData.desc)
            setValue("lectureVideo",modelData.videoUrl)
        }
    },[])
 console.log("Model Data ",modelData)
    // detect wheather form is updated or not
    const isFormUpdated = () => {
        const currValues = getValues();
        console.log("Curr Values ",currValues);
        if(
            currValues.lectureTitle !== modelData.title ||
            currValues.lectureDesc !== modelData.desc ||
            currValues.lectureVideo !== modelData.videoUrl
        ){
            return true;
        }
        return false;
    }
    // handle the editing of subsection
    const handleEditSubSection = async ()=>{
        const currValues = getValues();
        console.log("Curr Edit ",currValues);
        const formData = new FormData();
        formData.append("sectionId",modelData.sectionId)
        formData.append("subSectionId",modelData._id)
        if(currValues.lectureTitle !== modelData.title){
            formData.append("title",currValues.lectureTitle);
        }
        if(currValues.lectureDesc !== modelData.desc){
            formData.append("desc",currValues.lectureDesc)
        }
        if(currValues.lectureVideo !== modelData.videoUrl){
            formData.append("video",currValues.lectureVideo)
        }
        setLoading(true);
        const result = await updateSubSection(formData,token)
        if(result){
            // 
            console.log("Res ESS ",result);
            const updatedCourseContent = course.courseContent.map((section)=> section._id ===modelData.sectionId ? result : section)
            const updatedCourse = {...course,courseContent: updatedCourseContent}

            dispatch(setCourse(updatedCourse))
        }
        setModelData(null)
        setLoading(false)
    }
    // onSubmit
    const onSubmit = async (data)=>{
        console.log("Data : ",data);

        if(view)return;

        if(edit){
            if(!isFormUpdated){
                toast.error("No Changes made in Form");
            }
            else{
                handleEditSubSection()
            }
            return;
        }
        // create now copy data to FormData
        const formData = new FormData();
        formData.append("sectionId",modelData);
        formData.append("title",data.lectureTitle);
        formData.append("desc",data.lectureDesc);
        formData.append("video",data.lectureVideo);
        setLoading(true);
        const result = await createSubSection(formData, token);
        if(result){
            // update the structure of Course
            const updatedCourseContent = course.courseContent.map((section)=> section._id ===modelData.sectionId ? result :section)
            const updatedCourse = {...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setModelData(null)
        setLoading(false);

    }
  return (
    <div className=' fixed inset-0 z-[100] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className=" my-10  w-11/12 max-w-[700px] rounded-lg border border-richblack-400   bg-richblack-800">
      {/* Model Heading */}
      <div className=" flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
        <p className=' text-xl font-semibold text-richblack-5 '>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
        <button onClick={()=>(!loading ? setModelData(null):{})}>
            <RxCross2 className=' text-2xl text-richblack-5'/>
        </button>

      </div>
      {/* Model Form */}
      <form onSubmit={handleSubmit(onSubmit)}
       className=' space-y-8 px-8 py-10'>
        {/* Lecture Video Upload */}
        <Upload
         name="lectureVideo" 
           label="Lecture Video"
           register={register}
           setValue={setValue}
           errors={errors}
           video={true}
           editData={edit ? modelData.videoUrl : null}
           viewData={view ? modelData.videoUrl:null}
           />
        {/* Lecture Title */}
        <div className="flex flex-col space-y-3">
            <label htmlFor="lectureTitle" className=' text-sm text-richblack-5'>
                Lecture Title {!view && <sup className=' text-pink-200'>*</sup>}
            </label>
            <input
                  disabled={view || loading}
                  id='lectureTitle'
                  placeholder='Enter Lecture Title'
                  {...register('lectureTitle',{required:true})}
                  className=' form-style w-full'
                  />
                  {
                    errors.lectureTitle && (
                        <span className=' ml-2 text-xs tracking-wide text-pink-200'>
                            Lecture title is required
                        </span>
                    )
                  }
        </div>
        {/* Lecture Desc */}
        <div className=" flex flex-col space-y-3">
            <label htmlFor="lectureDesc" className=' text-sm text-richblack-5 '>
                Lecture Desc{" "} {!view && <sup className=' text-pink-200'>*</sup>}
            </label>
            <textarea disabled={view || loading}
             id='lectureDesc' placeholder=' Enter Lecture DESC'
             {...register('lectureDesc',{required:true})}
             className=' form-style w-full  resize-x-none min-h-[100px]'
            />
            {
                errors.lectureDesc && (
                    <span className=' ml-2 text-sm tracking-wide text-pink-200'>
                        Lecture Description is required
                    </span>
                )
            }
        </div>
        {/* Save */}
        {!view && (
            <div className=' flex justify-end '>
                <IconBtn disabled={loading}
                 text={loading ? "Loading...": edit ? "Save Changes ":"Save"}/>
            </div>
        )}
      </form>
        </div>
    </div>
  )
}

export default SubSectionModel
