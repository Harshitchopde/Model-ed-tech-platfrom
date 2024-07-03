
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/core/DashBoard/SideBar'

const DashBoard = () => {
    const {loading:profileLoading} = useSelector((state)=>state.profile)
    const {loading:authLoading} = useSelector((state)=>state.auth)
    if(profileLoading ||authLoading){
        return (
            <div className=" grid min-h-[calc(100vh-3.5rem)]  place-items-center ">
                <div className=" text-white text-3xl ">Loading...</div>
            </div>
        )
    }
  return (
    <div className='  flex relative  min-h-[calc(100vh-3.5rem)] '>
      <SideBar/>
      <div className=" h-[calc(100vh-3.5rem)]  flex-1 overflow-auto">
        <div className=" mx-auto  w-11/12  py-10 max-w-[1000px]">
            <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
