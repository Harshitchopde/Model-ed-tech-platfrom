import React from 'react'
import { Link } from 'react-router-dom'

const Buttom = ({children,active,linkTo}) => {
  return (
    <Link to={linkTo}>
       <div className={`text-center  text-[13px] px-6 rounded-md flex items-center gap-2  font-bold py-3 
       ${active?"bg-yellow-50 text-black":"bg-richblack-800"} hover:scale-95 transition-all duration-200`}>
         {children}</div>
    </Link>
  )
}

export default Buttom
