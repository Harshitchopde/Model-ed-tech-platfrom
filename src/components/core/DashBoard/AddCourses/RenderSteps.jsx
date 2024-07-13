import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation'
import CourseBuilderForm from './CourseBuilder'
import PublishForm from './Publish'

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course)
  // const step = 1;
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]
  return (
    <>
      <div className=" relative mb-2  mt-14 flex w-full justify-center">
        {
          steps.map((item) => (
            <>
              <div className=" flex flex-col items-center" key={item.id}>


                <button className={`w-[34px]  cursor-default grid place-items-center aspect-square rounded-full border
                       ${item.id === step ? " text-yellow-50 border-yellow-50 bg-yellow-900" : " text-richblack-400 bg-richblack-800 border-richblack-700"} ${step > item.id && " text-yellow-50 bg-yellow-50"}`}>
                  {
                    step > item.id ? (
                      <FaCheck className='font-bold text-richblack-900' />
                    ) : (
                      item.id
                    )
                  }
                </button>
              </div>
              {
                item.id !== steps.length && (
                  <div className={` h-[calc(34px/2)] w-[33%] border-dashed  border-b-2 
                            ${item.id < step ? " text-yellow-50" : " text-richblack-500"}`}></div>
                )
              }
            </>
          ))
        }
      </div>
      <div className=" relative mb-16  flex w-full justify-between">
        {
          steps.map((item) => (
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              <div className={` text-sm ${item.id > step ? " text-richblack-500" : " text-richblack-5"}`}>
                {item.title}
              </div>
            </div>
          ))
        }
      </div>
      {/*  Render the specific components based on current step */}
      {step=== 1 && <CourseInformationForm/>}
      {step === 2 && <CourseBuilderForm/>}
      {step ===3 && <PublishForm/>}
    </>
  )
}

export default RenderSteps
