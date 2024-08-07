import React, { useState } from 'react'

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../../services/operations/authApis';
const LoginForm = () => {
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData,setLoginData] = useState({
    email:"",
    password:"",
  })
  // destructure
  const {email,password} = loginData;
  const handleChange = (e)=>{
    setLoginData((prev)=>({
   ...prev,[e.target.name]:e.target.value
    }))
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(login(email,password,navigate))
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className=' mt-6  w-full  gap-y-4 flex flex-col'>
        <label>
            <p>Email Address <sup className=' text-pink-200'>*</sup></p>
            <input
             required
             value={email}
             name='email'
             onChange={handleChange}
             placeholder='Enter email address'
             type='text'
             style={{textDecoration:"none",outline:"none",boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                className=' mt-2 bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-5 w-full'
             />
        </label>
        <label className=" relative">
            <p>Password <sup className=' text-pink-200'>*</sup></p>
            <input  
              name='password'
              value={password}
              onChange={handleChange}
              required
              placeholder='Enter password address'
              type= {showPassword?"text":"password"}
              
             style={{textDecoration:"none",outline:"none",boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                className=' mt-2 bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-5 w-full'
             />
        <span onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-[50px] z-[10] cursor-pointer">
          {showPassword ? (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          )}
        </span>
          <Link to={"/forgot-password"}>
        <span className='hover:underline absolute text-blue-200 -bottom-7 right-0'>Forgot password</span>
          
          </Link>
        </label>
        <button className='  mt-[70px] rounded-[0.5rem] text-black bg-yellow-50 p-4 flex align-middle justify-center'>Sign In</button>
      </form>
    </div>
  )
}

export default LoginForm
