import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { CiShoppingCart } from "react-icons/ci";
import { apiConnector } from '../../services/apiconnnectors'
import { categories } from '../../services/apis'
import { FaAngleDown } from "react-icons/fa6";
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
const NavBar = () => {
    const location = useLocation();
    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }

    // redux storeage
    const {token} = useSelector((state)=>state.auth);
    const {totalItems} = useSelector((state)=> state.cart);
    // const [subLinks,setSubLinks] = useState([]);
    const { user} = useSelector((state)=>state.profile);

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
                <Link to={"/dashboard/cart"} className='relative '>
                  <CiShoppingCart/>
                </Link>
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
