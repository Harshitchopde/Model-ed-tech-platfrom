import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProfile } from '../../../../services/operations/settingApis';
const DeleteAccount = () => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <div className=' flex   bg-[#340019]  border border-[#4E0A25] rounded-md p-8 px-12'>
      <div className="flex gap-x-3">
        <div className="text-3xl">
        <RiDeleteBin5Line className=' rounded-full w-[50px] h-[50px] p-3 text-[#EF476F] bg-[#691432]'/>
        </div>
        <div className="flex flex-col ">
          <div className="mb-3 text-lg font-bold ">Delete Account</div>
          <div className="">Would you like to delete account?</div>
          <div className="">This account may contain Paid Courses. Deleting your account is</div>
          <div className="">permanent and will remove all the contain associated with it.</div>

          <button onClick={handleDeleteAccount} className='px-6 italic mt-2 w-fit p-4 bg-[#EF476F]'>I want to Delete my account.</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccount
