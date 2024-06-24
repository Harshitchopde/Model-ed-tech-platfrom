import React from 'react'
import CTAButton from "../HomePage/Buttom"
import { FaArrowRight } from 'react-icons/fa6'
import { TypeAnimation } from 'react-type-animation'
const CodeBlock = (
{    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock,
    backgroundgradient,
    codeColor}
) => {
  return (
    <div className={`my-20 flex  justify-between  flex-col lg:gap-10 gap-10 ${position} `}>
        {/* Section 1 */}
        <div className="w-[100%] lg:w-[50%] flex  flex-col gap-8">
            {heading}
            <div className=" text-richblack-300  mt-3 w-[85%] font-bold">
                {subheading}
            </div>
            <div className="flex gap-7 mt-7">
                <CTAButton active={ctabtn1.active} linkTo={ctabtn1.link}>
                    <div className="text-xl flex gap-2">
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkTo={ctabtn2.link}>
                    <div className="text-xl flex gap-2">
                    {ctabtn2.btnText}
                
                    </div>
                </CTAButton>
            </div>
        </div>
        {/* Section 2 */}
        
            <div className=" h-fit py-2 relative code-border leading-[18px] sm:leading-6 w-[100%] lg:w-[500px] flex flex-row ">
                {/* Gradient */}
                {backgroundgradient}
            <div className="flex flex-col w-[10%] text-center">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
       
            <div className={`w-[90%]  flex flex-col gap-2 font-bold ${codeColor} pr-2 font-mono`}>
                <TypeAnimation
                 sequence={[codeblock,2000,""]}
                 repeat={Infinity}
                 cursor={true}
                 omitDeletionAnimation={true}
                 style={
                    {
                        whiteSpace:"pre-line",
                        display:"block"
                    }
                 }
                />
    
            </div>
         
      
        </div>
    </div>
  )
}

export default CodeBlock
