import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Setting = () => {
  return (
    <>
      <h1 className='mb-14 text-3xl font-medium  text-richblack-5'>Edit Profile</h1>
      {/* Change profile picture */}
      <ChangeProfilePicture/>
      {/* Edit Profile */}
      <EditProfile/>
      {/* Password */}
      <UpdatePassword/>
      {/* Delete Account */}
      <DeleteAccount/>
    </>
  )
}

export default Setting
