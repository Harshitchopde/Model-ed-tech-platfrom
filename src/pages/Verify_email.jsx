import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Buttom from '../components/core/HomePage/Buttom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { RxCountdownTimer } from "react-icons/rx";
import { signUp } from '../services/operations/authApis';
const Verify_email = () => {
  const {loading, signUpData}= useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp,setOtp] = useState("");
  useEffect(()=>{
    // if user dont get the otp 
      // if(!signUpData){
      //   navigate("/signup")
      // }
  },[])
  const handleVerifyAndSubmit = (e)=>{
    e.preventDefault()
    const {
      firstName,
      accountType,
      lastName,
      email,
      password,
      conformPassword
    }= signUpData
    dispatch(
      signUp(
        firstName,
        accountType,
        lastName,
        email,
        password,
        conformPassword,
        navigate,
        otp
      )
    )
  }
  return (
    <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
        {
          loading?(<div>IT's Loading</div>):(
            <div className=" max-w-[500px] flex flex-col gap-3 p-4 lg:p-8">
              <div className=" text-2xl text-white">Verify email</div>
              <div className=" text-richblack-200 text-[18px] font-medium">A verification code has been sent to you. Enter the code below</div>
              <form onSubmit={handleVerifyAndSubmit} className=''>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props)=>(
                  <input {...props}
                    placeholder='-'
                    style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",}}
                    className=' w-[48px] lg:w-[60px]  bg-richblack-800 rounded-[0.5rem]   aspect-square text-center focus:outline-2
                     focus:outline-yellow-50 border-0 '/>
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
                />
               <button type='submit' className=' mt-6 bg-yellow-50 rounded-[0.5rem] w-full text-richblack-900 p-2'>Verify Email</button>
              </form>
              <div className=" flex justify-between mt-3">
               <Link to={"/login"}>
               <div className=" flex items-center gap-2 ">
                  <FaArrowLeftLong/> Back to login
                </div>
               </Link>
               <div className="  flex items-center gap-2  text-blue-200 ">
                <RxCountdownTimer/> Resend it
               </div>
              </div>
            </div>
          )
        }
    </div>
  )
}

export default Verify_email
