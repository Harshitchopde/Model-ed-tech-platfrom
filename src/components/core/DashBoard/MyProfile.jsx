import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { RiEditBoxLine } from "react-icons/ri"
import { useNavigate } from 'react-router-dom';
const MyProfile = () => {
  const {user} = useSelector((state)=>state.profile);
  const navigate = useNavigate();
  return (
    <div className=' text-richblack-5  text-3xl flex flex-col  font-medium'>
      <h1 className=' mb-14'>My Profile </h1>
      {/* name */}
      <div className=" flex border-richblack-700 p-8  bg-richblack-800 border rounded-[0.5rem] items-center justify-between px-12 ">
        <div className=" flex  gap-x-4">
          <img src={user?.image} alt="not found!" 
           className=' w-[78px] rounded-full aspect-square'
          />
          <div className="flex flex-col gap-y-2 justify-center ">
            <div className="   flex gap-x-2 font-semibold text-lg ">
              <div className="">{user?.firstName}</div>
              <div className="">{user?.lastName}</div>
              </div>
            <div className=" text-sm font-semibold">{user?.email}</div>
          </div>
        </div>
        <IconBtn  customClass={" text-sm"}
        onClick={()=>{
          navigate("/dashboard/Settings")
        }}
        text={"Edit"}>
          <RiEditBoxLine/>
        </IconBtn>
      </div>
      {/* About  */}
      <div className="flex border-richblack-700 p-8  mt-12 bg-richblack-800 border rounded-[0.5rem]  justify-between px-12 ">
        <div className=" flex flex-col gap-y-8">
          <div className=" font-semibold text-lg">About</div>
          <div className=" text-sm text-richblack-500">Write Something about yourself</div>
          <div className=" font-semibold text-lg">Account Type: {user?.accountType}</div>
        </div>
        <IconBtn text={"Edit"}
        onClick={()=>navigate("/dashboard/Settings")}
        customClass={" text-sm"}>
          
          <RiEditBoxLine/>
        </IconBtn>
      </div>
      {/* Personal Detail */}
      <div className=" flex flex-col border-richblack-700 p-8 mt-12 bg-richblack-800 border  rounded-[0.5rem] justify-between px-12">
        <div className=" flex   justify-between">
          <div className=" text-lg font-semibold">Personal Details</div>
          <IconBtn text={"Edit"}
          onClick={()=>navigate("/dashboard/Settings")}
          customClass={" text-sm"}
          >
            <RiEditBoxLine/>
          </IconBtn>
        </div>

        <div className=" flex  flex-col gap-7 w-[500px]">
          {/* first name and last name */}
          <div className=" flex  justify-between">
          
              <div className=" flex flex-col  gap-y-2">
              <div className=" text-richblack-500 text-sm">First Name</div>
              <div className=" text-sm">{user?.firstName}</div>
              </div>
              <div className=" flex flex-col  gap-y-2">
              <div className=" text-richblack-500 text-sm">Last Name</div>
              <div className=" text-sm">{user?.lastName}</div>
          </div>
          </div>
          {/* email and phone number */}
          <div className=" flex justify-between ">
          
              <div className=" flex flex-col  gap-y-2">
              <div className=" text-richblack-500 text-sm">Email</div>
              <div className=" text-sm">{user?.email}</div>
              </div>
              <div className=" flex flex-col  gap-y-2">
              <div className=" text-richblack-500 text-sm">Phone Number</div>
              <div className=" text-sm">Add your contact</div>
              </div>
          </div>

          {/* gender and date of birth */}
          <div className=" flex justify-between ">
          
              <div className=" flex flex-col  gap-y-2">
              <div className=" text-richblack-500 text-sm">Gender</div>
              <div className=" text-sm">Add Gender</div>
              </div>
              <div className=" flex flex-col  gap-y-2">
              <div className=" text-richblack-500 text-sm">Date of Birth</div>
              <div className=" text-sm">   -- / -- / ----</div>
              </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MyProfile
