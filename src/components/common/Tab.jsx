import React, { useEffect, useState } from 'react'
import { ACCOUNT_TYPE } from '../../utils/constants';

const Tab = ({setAccountType,accountType}) => {
    const [selected,setSelected] = useState(false);
    // selected?setAccountType(ACCOUNT_TYPE.INSTRUCTOR):setAccountType(ACCOUNT_TYPE.STUDENT);
    // console.log("Tab ",accountType);
    useEffect(()=>{
      setAccountType(selected?ACCOUNT_TYPE.INSTRUCTOR:ACCOUNT_TYPE.STUDENT);
    },[selected])
  return (
    <div>
      <div 
       style={{boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",outline:"none"}}
       className=" cursor-pointer flex flex-row rounded-full  w-fit gap-x-2 px-1 py-1 bg-richblack-800">
        <div onClick={()=>setSelected(false)} className={` py-3 px-6 rounded-full
            ${!selected && "bg-richblack-900"}`}>Student</div>
        <div onClick={()=>setSelected(true)} className={` py-3 px-6 rounded-full
            ${selected && " bg-richblack-900"}`}>Instructor</div>
      </div>
    </div>
  )
}

export default Tab
