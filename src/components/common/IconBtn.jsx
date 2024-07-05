import React from 'react'

const IconBtn = ({
    text,
    onClick,
    children,
    disabled,
    outline = false,
    customClass,
    type
}) => {
  return (
   <button 
   disabled={disabled}
   type={type}
   onClick={onClick}
   className={`flex  items-start   ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
  } cursor-pointer gap-x-2 h-fit rounded-md py-2 px-4 font-semibold text-richblack-900 ${customClass}`}>
    {
        children
        ? <>
        <span className={` ${outline && " text-yellow-50" }`}> {text} </span>
        {children}
        </>
        :<div>{text}</div>
    }
   </button>
  )
}

export default IconBtn
