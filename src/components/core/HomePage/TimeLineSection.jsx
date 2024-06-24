import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timeLineImage from "../../../assets/Images/TimelineImage.png"
const timeLine = [
    {
        Logo: Logo1,
        heading: "Leadership",
        desc: "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        desc: "Fully committed to the success company"
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        desc: "Fully committed to the success company"
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        desc: "Fully committed to the success company"
    },
]
const TimeLineSection = () => {
    return (
        <div className=' '>
            <div className="flex  flex-col lg:flex-row w-11/12 mt-10 mx-auto  gap-14 max-w-maxContent ">
                <div className="lg:w-[45%] flex flex-col  justify-center  gap-10">
                    {
                        timeLine.map((ele, i) => {
                            return (
                                <div key={i} className="flex flex-row gap-5">
                                    <div className="flex items-center bg-white rounded-full justify-center h-[50px] w-[50px]">
                                        <img src={ele.Logo} alt="Not found!" />
                                    </div>
                                    <div className="flex flex-col items-start gap-2">
                                        <div className=' font-bold'>{ele.heading}</div>
                                        <div className=''>{ele.desc}</div>
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>
                <div className="lg:w-[60%] relative shadow-blue-200">
                    <img src={timeLineImage} alt="time line image" />
                    <div className=" absolute lg:translate-x-[40%] lg:translate-y-[-50%] uppercase py-10 bg-caribbeangreen-700 flex flex-col lg:flex-row  translate-y-[-110%] translate-x-[90%] gap-7 ">
                        <div className="flex flex-row  gap-5 lg:pl-8 lg:pr-[70px] items-center border-r border-caribbeangreen-400">
                            <p className='text-3xl text-white'>10</p>
                            <p className='text-sm max-w-[50px] text-caribbeangreen-400'>years experience</p>
                        </div>
                        <div className="flex flex-row  gap-5 items-center">
                            <p className='text-3xl text-white'>250</p>
                            <p className='text-sm max-w-[100px] text-caribbeangreen-400'>Types of courses</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TimeLineSection
