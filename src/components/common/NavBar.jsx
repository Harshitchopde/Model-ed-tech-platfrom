import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { CiShoppingCart } from "react-icons/ci";
import { apiConnector } from '../../services/apiconnnectors'
import { categories } from '../../services/apis'
import { FaAngleDown } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { VscDashboard } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
const subLinks=[
  
    {
      title:"python",
      link:"/catalog/python"
    },
    {
      title:"web dev",
      link:"/catalog/web-dev"
    },{
      title:"python",
      link:"/catalog/python"
    },

  
]
const userTab=[
  {
    id:1,
    icon:<VscDashboard/>,
    title:"DashBoard",
    link:"/dashboard/my-profile"
  },{
    id:2,
    icon:<FiLogOut/>,
    title:"LogOut",
    link:"/home"
  }
]
const NavBar = () => {
    const location = useLocation();
    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }
    const [isUserTabOpen,setIsUserTabOpen]= useState(false)

    // redux storeage
    const {token} = useSelector((state)=>state.auth);
    const {totalItems} = useSelector((state)=> state.cart);
    // const [subLinks,setSubLinks] = useState([]);
    const { user} = useSelector((state)=>state.profile);
    console.log("user",user?.image)
    // -----------sub link part-----------
// {    const fetchSublinks = async()=>{
//       try {
//          const res = await apiConnector("GET",categories.CATEGORIES_API)
//          console.log(res.data)
//          setSubLinks(res.data.data);
//       } catch (error) {
//          console.log("Error occur : ",error)
//       }
//     }
//     useEffect(()=>{
//        fetchSublinks();
//     },[])}
  return (
    <div className=' h-14 flex  bg-richblack-900 border-b justify-center  border-b-richblack-700'>
      <div className=" w-11/12  flex items-center justify-between  max-w-maxContent">
      {/* Logo */}
      <Link to={"/"}>
      <div className="">
        <img src={Logo} alt="Not found!" width={150} height={70} />      
      </div>
      </Link>
      {/* Nav component */}
      <div className=" text-richblack-25 ">
        <ul className='flex gap-x-6'>
        {
            NavbarLinks.map((ele,i)=>{
                    return (
                     <li key={i}>
                        {
                            ele.title==="Catalog"
                            ?<div className=' relative group'>
                              <p  className='flex gap-2 items-center'>
                                {ele.title} <FaAngleDown/>
                              </p>  
                              <div className=" group-hover:visible  z-50 invisible transition-all duration-200 translate-y-[30%] lg:w-[300px]  p-4  bg-richblack-5 text-richblack-800 rounded-md
                               absolute top-[50%]  translate-x-[-40%] ">
                                <div className=" group-hover:visible invisible rotate-45 top-0  p-4  bg-richblack-5 text-richblack-800 rounded-md
                               absolute  translate-y-[-50%]  right-[30%] h-4 w-4  transition-all duration-200
                               "></div>
                                 {
                                  subLinks?.length?(
                                    subLinks.map((ele,i)=>(
                                     <Link to={ele.link} key={i}>
                                       <div className=''>{ele.title}</div>
                                     </Link>
                                    ))
                                  ): (<div></div>)
                                }
                               </div>
                              
                               
                            </div>
                            :<Link to={ele.path}>
                                <div className={`${matchRoute(ele.path)?" text-yellow-25":" text-black-25"}`}>{ele.title}</div>
                            </Link>
                        }
                     </li>
                )
            })

        }
        </ul>
      </div>
      {/* Login and Sign up */}
      <div className="flex flex-row gap-x-5">
          {
            user && user?.accountType !== "Instructor" && (
                <div className=" flex gap-4 ">
                <Link to={"/dashboard/cart"} className='rounded-full p-2 bg-richblack-800 text-2xl'>
                  <IoMdSearch/>
                </Link>
                <Link to={"/dashboard/cart"} className='flex items-center text-2xl'>
                  <CiShoppingCart/>
                </Link>
                {
                  user?.image && <div to={"/dashboard/cart"} 
                  onClick={()=>setIsUserTabOpen(!isUserTabOpen)}
                  className=' relative cursor-pointer flex items-center  h-full text-2xl'>
                  <img src={user.image} className=' rounded-full' width={30} height={30} alt='not found'/>
                  <FaCaretDown className=' text-sm'/>
                  {isUserTabOpen && <div
                  
                   className="  bg-richblack-800 rounded-[0.5rem] border-richblack-600  border  absolute bottom-0 translate-y-[100%] translate-x-[-60%] left-0 flex flex-col  ">
                     {
                      userTab.map((ele,i)=> {
                        // console.log("ele ",ele)
                        return (
                          <Link key={i} to={ele.link} onClick={()=>setIsUserTabOpen(false)}>
                             <div className=" text-xl hover:bg-richblack-700 border-richblack-600 border-b p-4">{ele.title}</div>
                          </Link>
                        )
                      })
                     }
                    
                    </div>}
                  </div>
                }
                </div>
            )
          }
          {
            token ===null && (
              <Link to={"/login"}>
                <button className=' border border-richblue-600 bg-richblack-900 px-[12px] py-[6px] rounded-md text-richblack-5'>
                  Login
                </button>
              </Link>
            )
          }
           {
            token ===null && (
              <Link to={"/signup"}>
                <button className=' border border-richblue-600 bg-richblack-900 px-[12px] py-[6px] rounded-md text-richblack-5'>
                  Sign up
                </button>
              </Link>
            )
          }
      </div>
      </div>
    </div>
  )
}

export default NavBar
