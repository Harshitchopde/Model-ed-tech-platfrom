import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsApis';
import { setCourse } from '../../../../../slices/courseSlicer';
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from 'react-icons/md';
import { AiFillCaretDown } from 'react-icons/ai'
import { FaPlug, FaPlus } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri';
import SubSectionModel from './SubSectionModel';
import ConformationModel from '../../../../common/ConformationModel';
const NestedView = ({ handleChangeEditSectionName }) => {
  // course
  const { course } = useSelector(state => state.course);
  // token
  const { token } = useSelector((state) => state.auth);
  // dispatch 
  const dispatch = useDispatch();
  //  States of mode of model [add, view, edit]
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  // to keep track of confirmation model
  const [conformationModel, setConformationModel] = useState(null);
  console.log("ConformationModel ",conformationModel)
  // handle delete Section
  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
    }, token)

    if (result) {
      dispatch(setCourse(result))
    }
    setConformationModel(null)
  }
  // handle delete subSection
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
    }, token);

    if (result) {
      // update the structure of course
      const updateCourseContent = course.courseContent.map((section) => (
        section._id === sectionId ? result : section
      ));
      console.log("Updated : ", updateCourseContent);
      const updatedCourse = { ...course, courseContent: updateCourseContent }
      console.log("UC : ", updatedCourse)
      dispatch(setCourse(updatedCourse))
    }
    setConformationModel(null);
  }

  return (
    <>
      <div className=" rounded-lg bg-richblack-700 p-6 px-8" id='nestedViewContainer'>
        {
          course?.courseContent?.map((section) => (
            <details key={section._id} open>
              {/* Section Dropdown content */}
              <summary className=' flex cursor-pointer items-center  justify-between border-b-2 border-b-richblack-600 py-2'>
                <div className=" flex items-center gap-x-3">
                  <RxDropdownMenu className='  text-2xl text-richblack-50' />
                  <p className=' font-semibold text-richblack-50'>{section.sectionName}</p>
                </div>
                {/* Edit delete and dropdown */}
                <div className=" flex items-center gap-x-3">
                  <button onClick={() => handleChangeEditSectionName(
                    section._id,
                    section.sectionName,
                  )}>
                    <MdEdit className=' text-xl text-richblack-300' />
                  </button>
                  <button onClick={() =>
                    setConformationModel({
                      text1: "Delete this Section? ",
                      text2: "All the lecture in this Section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConformationModel(null),
                    })
                  }>
                    <RiDeleteBin6Line className=' text-xl text-richblack-300' />
                  </button>
                  <span className=' font-medium text-richblack-300'></span>
                  <AiFillCaretDown className=' text-xl text-richblack-300' />
                </div>
              </summary>
              <div className=" px-6 pb-4">
                {/* Renderr All Sub Section Within a Section */}
                {
                  section.subSection?.map((subSection) => (
                    <div className=" flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2 "
                      key={subSection?._id} onClick={() => setViewSubSection(subSection)}>
                      <div className=" flex items-center gap-x-3 py-2">
                        <RxDropdownMenu className=' text-2xl text-richblack-50' />
                        <p className=' font-semibold text-richblack-50'>
                          {subSection.title}
                        </p>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}
                        className=' flex items-center gap-x-3'>
                        <button onClick={() => setEditSubSection({ ...subSection, sectionId: section._id })}>
                          <MdEdit className=' text-xl text-richblack-300'/>
                        </button>
                        <button onClick={()=>  setConformationModel({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(subSection._id, section._id),
                          btn2Handler: () => setConformationModel(null),
                        })}>
                          <RiDeleteBin6Line className=' text-xl text-richblack-300'/>
                        </button>
                      </div>
                    </div>

                  ))
                }
                {/* Add New Lecture to Section */}
                <button onClick={()=> setAddSubSection(section._id)}
                 className=' mt-3 flex  item-center gap-x-1 text-yellow-50'>
                  <FaPlus className=' text-lg'/>
                  <p>Add Lecture</p>
                 </button>
              </div>
            </details>
          ))
        }
      </div>
      {/* Model Display */}
      {
        addSubSection ? (
          <SubSectionModel
           modelData={addSubSection}
           setModelData={setAddSubSection}
           add={true}/>
        ): viewSubSection ? (
          <SubSectionModel 
           modelData={viewSubSection}
           setModelData={setViewSubSection}
           view={true}/>
        ) : editSubSection ? (
          <SubSectionModel
           modelData={editSubSection}
           setModelData={setEditSubSection}
           edit={true}/>
        ) : (
          <></>
        )
      }
      {/* Confirmation Model */}
      {
        conformationModel && (
          <ConformationModel modelData={conformationModel}/> )
      }
    </>
  )
}

export default NestedView
