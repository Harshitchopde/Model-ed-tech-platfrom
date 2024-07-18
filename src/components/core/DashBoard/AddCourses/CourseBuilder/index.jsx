import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsApis';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlicer';
import toast from 'react-hot-toast';


const CourseBuilderForm= () => {
  //  form -> useForm
  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors},
  } = useForm();
  // import course ,token
  const { course} = useSelector(state=>state.course);
  const {token} = useSelector(state=>state.auth);

  // state loading editSectionName
  const [loading,setLoading] = useState(false)
  const [editSectionName,setEditSectionName] = useState(null)

  // dipatch
  const dispatch = useDispatch()
  // handle form Submit
  const onSubmit = async (data)=>{
    //data
    console.log("Data : ",data);
    setLoading(true);
    let result;
    if(editSectionName){
      // doubt in sectionId 
      result = await updateSection(
        {
          sectionName:data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )
      console.log("Edit : ",result)
    }else{
      result = await createSection(
        {
          sectionName:data.sectionName,
          courseId: course._id,
        },
        token
      )
    }
    if(result){
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName","")
    }
    setLoading(false)

  }
  // handle cancelEdit
  const cancelEdit  = ()=>{
    setEditSectionName(null);
    setValue("sectionName","");
  }
  // handle change Section name
  const handleChangeEditSectionName = (sectionId,sectionName)=>{
    if(editSectionName ===sectionId){
      cancelEdit()
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName)
  }
  // goToNext 2->3
  const goToNext = () =>{
    if(course.courseContent.length === 0){
       toast.error("Please add atLeast one section")
       return;
    }
    if(course.courseContent.some((section)=> section.subSection.length === 0)){
      toast.error("Please add atLeast one lecture in each section")
      return;
    }
    dispatch(setStep(3));
  }
  // gotBack 2->1
  const goToBack = () =>{
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }
  return (
    <div className=' border-[1px]   border-richblack-700 bg-richblack-800 p-6 space-y-8 rounded-md '>
      <p className=' text-2xl font-semibold text-richblack-5'>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className=' space-y-4'>
        <div className=" flex flex-col space-y-2">
          <label htmlFor='sectionName' className=' text-sm text-richblack-5'>Section Name <sup className='text-pink-200'>*</sup></label>
          <input className=' form-style w-full'
           id="sectionName"
           disabled={}/>
        </div>
      </form>
    </div>
  )
}

export default CourseBuilderForm
