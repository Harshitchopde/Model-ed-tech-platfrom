import React, { useState } from 'react'
import Tab from '../../common/Tab'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setSignUpData } from '../../../slices/authSlicer'
import { useNavigate } from 'react-router-dom'
import { sendOTP } from '../../../services/operations/authApis'

const SignUpForm = () => {
  const navigate= useNavigate();
  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    conformPassword:""
  })
  const [accountType,setAccountType]=useState(ACCOUNT_TYPE.STUDENT);
  const dispatch = useDispatch();
  // destructure
  const {firstName,lastName,email,password,conformPassword} = formData;
  const handleChange = (e)=>{
    setFormData((prev)=>({
      ...prev,[e.target.name]:e.target.value
    }))
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    // toast.loading("submiting",{duration:3000})
    if(password!==conformPassword){
      toast.error("Passwords do not match")
      return;
    }
    const signUpData={
      ...formData,accountType,
    }
    dispatch(setSignUpData(signUpData));
    dispatch(sendOTP(formData.email,navigate));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      conformPassword: "",
    })
    
  }
  return (
    <form className=' mt-6 flex flex-col gap-y-6 w-full' onSubmit={handleSubmit} >
      <Tab accountType={accountType} setAccountType={setAccountType}/>
      <div className="flex flex-row gap-5">
      <label className=''>
            <p>First Name <sup className=' text-pink-200'>*</sup></p>
            <input
            required
            type='text'
            value={firstName}
            name='firstName'
            onChange={handleChange}
            placeholder='First Name'
            style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
            className='mt-2 bg-richblack-800 p-3 rounded-[0.5rem] text-richblack-5'
            />

        </label>
        <label className=''>
            <p>Last Name <sup className=' text-pink-200'>*</sup></p>
            <input
            required
            type='text'
            value={lastName}
            name='lastName'
            onChange={handleChange}
            placeholder='Last Name'
            style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
            className='mt-2 bg-richblack-800 p-3 rounded-[0.5rem] text-richblack-5'
            />

        </label>
      </div>
      <label>
        <p>Email Address <sup className="text-pink-200">*</sup></p>
        <input 
        required
        name='email'
        value={email}
        onChange={handleChange}
        type="text" 
        placeholder='Email Address'
        style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
        className='mt-2 p-3 rounded-[0.5rem] w-[95%] bg-richblack-800 text-richblack-5 '/>
      </label>
      <div className="flex flex-row gap-5">
      <label className=''>
            <p>Create Password <sup className=' text-pink-200'>*</sup></p>
            <input
            required
            name='password'
            onChange={handleChange}
            value={password}
            type='password'
            placeholder='Enter Password'
            style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
            className='mt-2 bg-richblack-800 p-3 rounded-[0.5rem] text-richblack-5'
            />

        </label>
        <label className=''>
            <p>Confrim Password<sup className=' text-pink-200'>*</sup></p>
            <input
            required
            name='conformPassword'
            value={conformPassword}
            type='password'
            onChange={handleChange}
            placeholder='Confirm Password'
            style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
            className='mt-2 bg-richblack-800 p-3 rounded-[0.5rem] text-richblack-5'
            />

        </label>
      </div>
      <button className=' flex justify-center items-center bg-yellow-50  p-3 rounded-[0.5rem] mt-6 text-black w-[95%]'>Create Account</button>
    </form>
  )
}

export default SignUpForm
