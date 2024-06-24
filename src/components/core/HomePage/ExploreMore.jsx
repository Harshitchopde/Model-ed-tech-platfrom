import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';
const tagsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
   
]
const ExploreMore = () => {
    const [currentTab,setCurrentTab] = useState(tagsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMycart = (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);

    }
  return (
    <div className=' flex flex-col  items-center text-center'>
        <div className=" text-4xl flex justify-center  gap-3 ">
            Unlock the 
            <HighLightText text={"Power of Code"}/>
        </div>
        <p className=' text-lg mt-2  text-richblack-300 text-center'>Learn to Build Anything You Can Imagine</p>

        <div className="mt-5 w-fit bg-richblack-800 border-b mb-10  flex gap-6 py-1 px-1 rounded-full">
                {
                    tagsName.map((tag,i)=>{
                        return (
                            <div key={i}
                                onClick={()=>setMycart(tag)}
                            className={`hover:bg-richblack-900 rounded-full py-3 px-8 
                                ${currentTab===tag?"bg-richblack-900":""} transition-all duration-200`}>{tag}</div>
                        )
                    })
                }
            
      </div>
        <div className=" lg:h-[150px] flex flex-col gap-10 lg:flex-row">
            {
                courses.map((ele,i)=>{
                    return (
                        <CourseCard key={i}
                            cardData={ele}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore
