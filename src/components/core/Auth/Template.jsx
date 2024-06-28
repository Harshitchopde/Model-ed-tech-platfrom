import React from 'react'
import LoginForm from './LoginForm'
import loginImg from "../../../assets/Images/login.webp"
import frame from "../../../assets/Images/frame.png"
import SignUpForm from './SignUpForm'
const Template = ({children}) => {
 
  return (
    <div className='text-white  mt-[150px] flex flex-wrap w-11/12 mx-auto  justify-around max-w-maxContent  bg-richblack-900 '>
        <div className=" flex w-[40%]  flex-col gap-7">
        
            <div className=" text-4xl  text-white">Welcome Back</div>
              <p className=' flex flex-col'>
                <span>Build skills for today, tomorrow, and beyond</span>
                <span className=' text-blue-100 italic'>Education to future-proof your career.</span>

              </p>
          
          {/* //from */}
          {
            children
          }
        </div>

        <div className="  relative flex  justify-center  items-center w-[50%]">
          <img  className=' z-10' src={loginImg}/>
          <img className=' absolute top-10 right-[10px]' src={frame}/>
        </div>
    </div>
  )
}

export default Template
