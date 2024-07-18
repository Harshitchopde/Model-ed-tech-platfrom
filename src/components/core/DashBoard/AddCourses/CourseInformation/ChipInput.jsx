import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md"
const ChipInput = ({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValue,
}) => {
    const { course,editCourse} = useSelector(state=>state.course);
    
    // Setting state for managing the chips arrays 
    const [chips,setChips] = useState([]);

    useEffect(()=>{
        if(editCourse){
            console.log("Course in : ",course)
            setChips(course?.tag)
        }
        register(name, {
            required:true,
            validate: (value)=>name.length > 0
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    // add chip to chips array
    useEffect(()=>{
        setValue(name,chips)
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[chips])

    // Function to handle user input when chips are added to chips array
    const handleKeyDown = (event)=>{
        // Check if user press "Enter" or ",
        console.log("Key : ",event.key)
        if(event.key === "Enter" || event.key === ","){
            // prevent default behavior 
            event.preventDefault();
            const chipsValue  = event.target.value.trim()
            // check for not in array
            if(chipsValue && !chips.includes(chipsValue)){
                // add to array and clean input
                const newChips = [...chips,chipsValue];
                setChips(newChips)
                event.target.value = ""
            }
        }
    }
    // Function to handle remove chip
    const handleDeletionChip = (chipIndex)=>{
        const newChips = chips.filter((_,index)=>chipIndex !== index);
        setChips(newChips)
    }
  return (
    <div className=' flex flex-col space-y-2'>
        {/* Render the label for the input */}
        <label htmlFor={name}className=' text-sm text-richblack-5'>
            {label}<sup className=' text-pink-200 '>*</sup>
        </label>
        {/* render the chips and input */}
        <div className=" flex w-full flex-wrap gap-y-2">
            {
                chips.map((chip,idx)=>(
                    <div key={idx} className=' m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'>
                        {/* chip */}
                        {chip}
                        {/* chancel */}
                        <button type='button' className='ml-2 focus:outline-none'
                        onClick={() =>handleDeletionChip(idx)}>
                            <MdClose className=' text-sm'/>
                        </button>
                    </div>
                ))
            }
            <input id={name}
            type='text'
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className=' form-style w-full'/>
        </div>
        {/* Render error */}
        {
            errors[name] && (
                <span className=' ml-2 text-xs tracking-wide text-pink-200'>*{label} is Required</span>
            )
        }
    </div>
  )
}

export default ChipInput
