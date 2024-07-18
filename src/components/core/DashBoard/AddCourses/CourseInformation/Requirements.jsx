import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Requirements = ({
    name,
    label,
    register,
    setValue,
    errors,
    getValues,
}) => {

    const {editCourse,course} = useSelector(state=>state.course)
    const [requirements,setRequirements] = useState("")
    const [requirementList,setRequirementsList] = useState([])
    useEffect(()=>{
            if(editCourse){
                console.log("Course : ",course);
                setRequirementsList(course?.instructions)
            }
            register(name,{
                required: true,
                validate: (value)=>value.length > 0
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
        
        useEffect(()=>{
            setValue(name,requirementList)
            // eslint-disable-next-line react-hooks/exhaustive-deps

    },[requirementList])

    const handleAddRequirement = ()=>{
        if(requirements){
            setRequirementsList([...requirementList,requirements]);
            setRequirements("");
        }
    }
    const handleRemoveRequirement = (index)=>{
        const update = [...requirementList]
        update.splice(index,1);
        setRequirementsList(update)
    }
  return (
    <div className=' flex flex-col space-y-2'>
        <label htmlFor={name} className=' text-sm  text-richblack-5'>
            {label}<sup  className=' text-pink-200'>*</sup>
        </label>
        <div className=" flex flex-col items-start space-y-2">
            <input 
            type='text'
            id={name}
            value={requirements}
            onChange={(e)=>setRequirements(e.target.value)}
            className=' form-style w-full'/>
            <button type='button'
             onClick={handleAddRequirement}
             className=' font-semibold text-yellow-50'>
                Add
             </button>
        </div>
       <ul className=' mt-2 list-disc list-inside'>
       {
            requirementList?.map((requirement,index)=>(
                <li key={index} className=' flex items-center text-richblack-5 gap-x-4'>
                    <span>{requirement}</span>
                    <button type='button'
                    className=" text-xs text-pure-greys-300"
                    onClick={()=> handleRemoveRequirement(index)}>clear</button>
                </li>
            ))
        }
       </ul>
    </div>
  )
}

export default Requirements
