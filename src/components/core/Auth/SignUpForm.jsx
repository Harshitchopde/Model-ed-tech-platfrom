import React from 'react'

const SignUpForm = () => {
  return (
    <form className=' mt-6 flex flex-col gap-y-6 w-full'>
      <div className="flex flex-row gap-5">
      <label className=''>
            <p>First Name <sup className=' text-pink-200'>*</sup></p>
            <input
            required
            type='text'
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
        type="text" 
        placeholder='Email Address'
        style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
        className='mt-2 p-3 rounded-[0.5rem] w-[95%] bg-richblack-800 text-richblack-5 '/>
      </label>
    </form>
  )
}

export default SignUpForm
