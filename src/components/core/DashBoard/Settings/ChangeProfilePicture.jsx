import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPicture } from '../../../../services/operations/settingApis';
import IconBtn from '../../../common/IconBtn';
import {FiUpload} from "react-icons/fi"
const ChangeProfilePicture = () => {
  const fileInputRef = useRef(null);
  const {token} = useSelector((state)=>state.auth);
  const { user } = useSelector(state=> state.profile);
  const [loading,setLoading] = useState(false);
  const [imageFile,setImageFile] = useState(null);
  const [previewSource,setPreviewSource] = useState(null);

  const dispatch = useDispatch()
  const handleClick = ()=>{
    fileInputRef.current.click();
  }
  const handleFileChange = (e)=>{
    const file = e.target.files[0]
    console.log("File : ",file);
    if(file){
       setImageFile(file);
       previewFile(file);
    }
  }
  const previewFile = (file)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
      setPreviewSource(reader.result)
    }
  }
  const handleFileUpload = ()=>{
    try {
      console.log("Loading...")
      setLoading(false);
      const formData = new FormData();
      formData.append("displayPicture",imageFile);
      console.log("Form Data : ",formData);
      console.log("GET ",formData.getAll("displayPicture"))
      dispatch(updateDisplayPicture(token,formData)).then(()=>{
        setLoading(false)
      })
    } catch (error) {
      console.log("Error : ",error);
      toast.error("Could not Upload Picture!")
    }
    setLoading(false)
  }
  return (
    <div className=' flex  rounded-md border items-center  justify-between text-richblack-5 bg-richblack-800 border-richblack-700 p-8 px-12'>
     <div className=" flex gap-x-5">
      <img src={previewSource || user?.image} alt="Not found!"
       className=' w-[78px] aspect-square rounded-full' />
       <div className=" flex flex-col gap-y-3">
         <div className=" text-richblack-5">Change Profile Picture</div>
         <div className=" flex gap-x-5">
          <input type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              className=' hidden'
              accept='image/png,image/gif, imgage/jpg, image/jpeg'
              />

          <button
            disabled={loading}
            onClick={handleClick}
            className=' cursor-pointer  rounded-md text-richblack-50 bg-richblack-700 font-semibold py-2 px-5'
          >Select</button> 
          <IconBtn
           text={loading? "Uploading...":"Upload"}
           customClass={" "}
           
           onClick={handleFileUpload}>
            {
              !loading && (
                <FiUpload className='  text-lg '/>
              )
            }
           </IconBtn>

         </div>
       </div>
     </div>
    </div>
  )
}

export default ChangeProfilePicture
