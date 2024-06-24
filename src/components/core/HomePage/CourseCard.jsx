import React from 'react'

const CourseCard = ({cardData, currentCard,setCurrentCard}) => {
  return (
    <div>
      <div className={` flex flex-col  p-5 ${cardData.heading===currentCard?"bg-white text-black  shadow-2xl shadow-yellow-400  ":"bg-richblack-800"}`}>
         <div className=" text-2xl mb-4 ">{cardData.heading}</div>
         <div className="  text-richblack-300 pb-[60px] border-dashed  border-b-2 ">{cardData.description}</div>
        <div className="flex flex-row items-center mt-3 justify-between align-middle">
            <div className="">{cardData.level}</div>
            <div className="flex gap-2">{cardData.lessionNumber} Lession</div>
            {/* raefafa */}
        </div>
      </div>
    </div>
  )
}

export default CourseCard
