import React from 'react'
import HighLightText from './HighLightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Buttom"
const LanguageLearingSection = () => {
  return (
    <div className='flex  flex-col w-11/12 mt-[150px] pb-10 mx-auto items-center font-bold gap-5 max-w-maxContent '>
      <div className=" text-4xl flex flex-col lg:flex-row gap-3 text-center mx-auto">
      Your swiss knife for 
      <HighLightText text={"learning any language"}/>
      </div>
      <div className=" font-medium text-base w-[70%] text-richblack-600 text-center">
      Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>
      <div className="flex flex-wrap">
          <img src={know_your_progress} className=' object-contain  -mr-32' alt="" />
          <img src={Compare_with_others} className=' object-contain' alt="" />
          <img src={Plan_your_lessons} className=' object-contain -ml-36 lg:-ml-10' alt="" />
      </div>
      <CTAButton active={true} linkTo={"/signup"}>
       <div className=" text-xl"> Learn More </div>
      </CTAButton>
    </div>
  )
}

export default LanguageLearingSection
