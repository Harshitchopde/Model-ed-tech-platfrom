import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
const Home = () => {
    return (
        <div>
            {/* Section 1 */}
            <div className=" relative flex flex-col w-11/12 items-center">
                <Link to={"/signup"}>
                <div className='  mt-16 group mx-auto rounded-full bg-richblack-800 hover:scale-95 w-fit font-bold  transition-all  duration-200 text-richblack-200'>
                    <div className=" flex gap-4 justify-center  group-hover:bg-richblack-900  px-6 py-[14px] ">
                        <p className="">Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
                </Link>
            </div>
            {/* Section 2 */}
            {/* Section 3 */}
            {/* Footer */}
        </div>
    )
}

export default Home
