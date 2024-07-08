import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../../services/operations/settingApis';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';
const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]
const EditProfile = () => {
  const { token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.profile);
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitProfileForm = async (data) => {
    console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className=' flex flex-col  gap-y-6 bg-richblack-800  text-richblack-5  border border-1 border-richblack-700  p-8 px-12 rounded-md mt-10'>
        <div className=" font-semibold text-lg ">Profile Information</div>
        {/* First name and  Last Name */}
        <div className="  text-lg flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstName"
              className=" text-sm">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName" style={{ outline: "none" }}
              placeholder="Enter first name"
              className=" p-2 bg-richblack-700 border-b rounded-md "
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your first name.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastName"
              className=" text-sm">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName" style={{ outline: "none" }}
              placeholder="Enter Last name"
              className=" p-2 bg-richblack-700 border-b rounded-md "
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
            {errors.lastName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your Last name.
              </span>
            )}
          </div>
        </div>
        {/* DOB and Gender */}
        <div className="  text-lg flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="dateOfBirth"
              className=" text-sm">
               Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth" style={{ outline: "none" }}
              placeholder="Enter Date of Birth"
              className=" p-2 bg-richblack-700 border-b rounded-md "
              {...register("dateOfBirth",
                 { required: {
                  value:true,
                  message:"Please enter the Date of Birth"
                 },
                 max:{
                   value:new Date().toISOString().split("T")[0],
                   message:"Date of birth can not be in future"
                 }
                })}
              defaultValue={user?.additionalDetails?.dob}
            />
            {errors.dateOfBirth && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                 {errors.dateOfBirth.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="gender"
              className=" text-sm">
             Gender
            </label>
            <select
              type="text"
              name="gender"
              id="gender" style={{ outline: "none" }}
              placeholder="Select"
              className=" p-2 bg-richblack-700 border-b rounded-md "
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
            >
              {
                genders.map((ele,i)=>{
                  return (
                    <option key={i} value={ele}>{ele}</option>
                  )
                })
              }
            </select>
            {errors.gender && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.gender.message}
              </span>
            )}
          </div>
        </div>
        {/* contact number and About */}
        <div className="  text-lg flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="contactNumber"
              className=" text-sm">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              id="contactNumber" style={{ outline: "none" }}
              placeholder="Enter Contact Number"
              className=" p-2 bg-richblack-700 border-b rounded-md "
              {...register("contactNumber", { required: true })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {errors.contactNumber && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your Contact Number.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="about"
              className=" text-sm">
              About
            </label>
            <input
              type="text"
              name="about"
              id="about" style={{ outline: "none" }}
              placeholder="Enter Bio Details"
              className=" p-2 bg-richblack-700 border-b rounded-md "
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
            />
            {errors.about && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter Bio Details
              </span>
            )}
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
          <IconBtn type="submit" text="Save" />
        </div>
    </form>
  )
}

export default EditProfile
