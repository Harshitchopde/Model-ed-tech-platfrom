import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { sidebarLinks } from '../../../data/dashboard-links';
import SideBarLinks from './SideBarLinks';
import { VscSignOut } from 'react-icons/vsc';

const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)
    if (profileLoading || authLoading) {
        return (
          <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
            <div className="spinner"></div>
          </div>
        )
      }
    
  return (
    <div className=' flex h-[calc(100vh-3.5rem)] flex-col  min-w-[222px] bg-richblack-800  border-r border-r-richblack-700 text-richblack-500'>
        <div className="flex flex-col">
            {
                sidebarLinks.map((link)=>{
                    if(link.type && user?.accountType !== link.type){
                        return null;
                    }
                    return (
                        <SideBarLinks key={link.id} link={link} iconName={link.icon}/>
                    )
                })
            }
        </div>
        <div className=" mx-auto bg-richblack-700 w-10/12 mt-6 mb-6 h-[1px]"></div>
        <div className=" flex flex-col">
            <SideBarLinks link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName={"VscSettingsGear"}/>
        </div>
        <button className=' text-richblack-300 text-sm  font-medium px-8 py-2'>
            <div className=" flex items-center gap-x-2">
                <VscSignOut className=' text-lg'/>
                <span>LogOut</span>
            </div>
        </button>
    </div>
  )
}

export default SideBar
