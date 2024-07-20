import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updateSubSection } from '../../../../../services/operations/courseDetailsApis'
import { setCourse } from '../../../../../slices/courseSlicer'

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
  return (
    <div>
      SubSection Model
    </div>
  )
}

export default SubSectionModel
