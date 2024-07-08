import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { changePassword } from '../../../../services/operations/settingApis'
import toast from 'react-hot-toast'
import IconBtn from '../../../common/IconBtn'
const UpdatePassword = () => {
  const {register,handleSubmit,formState:{errors}} = useForm()
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const {token} = useSelector(state=>state.auth);
  const navigate = useNavigate();
  const submitPasswordForm = async(data)=>{
    console.log("Form data : ",data)
    try {
      await changePassword(token,data);
     
    } catch (error) {
      console.log("Error : ",error)
      toast.error("Could not Set Password")
    }
  }
  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
    <div className=' flex flex-col  gap-y-6 bg-richblack-800  text-richblack-5  border border-1 border-richblack-700  p-8 px-12 rounded-md mt-10'>
      <div className=" font-semibold text-lg ">Password</div>
      {/* Current Password and New Password */}
      <div className="  text-lg flex flex-col gap-5 lg:flex-row">
        <div className="relative flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="oldPassword"
            className=" text-sm">
            Current Password
          </label>
          <input
            type={showOldPassword?"text":"password"}
            name="oldPassword"
            id="oldPassword" style={{ outline: "none" }}
            placeholder="Enter Current Password"
            className=" p-2 bg-richblack-700 border-b rounded-md "
            {...register("oldPassword", { required: true })}
            
          />
         <span onClick={()=>setShowOldPassword(!showOldPassword)} 
            className="absolute right-3 top-[38px] z-[10] cursor-pointer">
              {
                showOldPassword?<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>:
                <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
              }
            </span>
        </div>
        <div className=" relative flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="newPassword"
            className=" text-sm">
            New Password
          </label>
          <input
            type={showNewPassword?"text":"password"}
            name="newPassword"
            id="newPassword" style={{ outline: "none" }}
            placeholder="Enter New Password"
            className=" p-2 bg-richblack-700 border-b rounded-md "
            {...register("newPassword", { required: true })}   
          />
          <span onClick={()=>setShowNewPassword(!showNewPassword)} 
            className="absolute right-3 top-[38px] z-[10] cursor-pointer">
              {
                showNewPassword?<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>:
                <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
              }
            </span>
          
        </div>
      </div>

  
    </div>
      <div className="flex  mt-10 gap-2 justify-end">
      <button
          onClick={() => {
            navigate("/dashboard/my-profile")
          }}
          className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Update" />
      </div>
  </form>
  )
}

export default UpdatePassword
