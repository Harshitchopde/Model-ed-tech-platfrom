import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighLightText from './HighLightText'
import CTAButton from "../HomePage/Buttom"
import { FaArrowRight } from 'react-icons/fa6'
const InstructorSection = () => {
  return (
    <div>
         <div className="flex flex-col-reverse lg:flex-row items-center  gap-10 ">
                        <div className="relative w-[358px] lg:w-[616px] h-[545px] bg-white  border">
                            <img src={Instructor} className=' absolute h-[545px] left-[20px] top-[20px]' alt="" />
                        </div>
                        <div className=" ">
                            <div className="flex flex-col gap-5 w-[50%] mx-auto ">
                            <div className="text-4xl font-semibold">
                                Become an 
                                <HighLightText text={"Instructor"}/>
                            </div>
                            <div className=" text-richblack-400 text-xl ">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
                           <div className=" w-fit">
                                 <CTAButton active={true} linkTo={"/signup"}>
                                    <div className="text-xl flex gap-2  w-fit items-center">Start Teaching Today
                                        <FaArrowRight/>
                                    </div>
                                </CTAButton>
                           </div>
                            </div>
                          
                        </div>
                </div>
    </div>
  )
}

export default InstructorSection
