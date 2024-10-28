import React, { useEffect, useRef, useState } from 'react'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useDispatch, useSelector } from 'react-redux'
import { CiShoppingCart } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { categoriesEndpoints } from '../../services/apis'
import { logOut } from '../../services/operations/authApis'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { apiConnector } from '../../services/apiconnnectors'
// const subLinks = [

//   {
//     title: "python",
//     link: "/catalog/python"
//   },
//   {
//     title: "web dev",
//     link: "/catalog/web-dev"
//   }, {
//     title: "python",
//     link: "/catalog/python"
//   },


// ]

const NavBar = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }
  const [isUserTabOpen, setIsUserTabOpen] = useState(false)
 const dispatch = useDispatch();
 const ref = useRef(null);
 const navgate = useNavigate();
  useOnClickOutside(ref,()=>setIsUserTabOpen(false))
  // redux storeage
  const { token } = useSelector((state) => state.auth);
  // for future use case
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks,setSubLinks] = useState([]);
  const { user } = useSelector((state) => state.profile);
  console.log("user", user?.image)
  console.log("Sublink > ",subLinks)
  // -----------sub link part-----------
  {    const fetchSublinks = async()=>{
        try {
           const res = await apiConnector("GET",categoriesEndpoints.CATEGORIES_API)
           console.log(res.data)
           setSubLinks(res.data.data);
        } catch (error) {
           console.log("Error occur : ",error)
        }
      }
      useEffect(()=>{
         fetchSublinks();
      },[])
    }
  return (
    <div className=' h-14 flex  bg-richblack-900   dark:bg-transparent border-b justify-center  border-b-richblack-700'>
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
              NavbarLinks.map((ele, i) => {
                return (
                  <li key={i}>
                    {
                      ele.title === "Catalog"
                        ? <div className=' relative group'>
                          <p className='flex gap-2 items-center'>
                            {ele.title} <FaAngleDown />
                          </p>
                          <div className=" group-hover:visible  z-50 invisible transition-all duration-200 translate-y-[30%] lg:w-[300px]  p-4  bg-richblack-5 text-richblack-800 rounded-md
                               absolute top-[50%]  translate-x-[-40%] ">
                            <div className=" group-hover:visible invisible rotate-45 -z-40 top-0  p-4  bg-richblack-5 text-richblack-800 rounded-md
                               absolute  translate-y-[-50%]  right-[30%] h-4 w-4  transition-all duration-200
                               "></div>
                            {
                              subLinks?.length ? (
                                subLinks.map((ele, i) => (
                                  <Link to={`/catalog/${ele?.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                    
                                     key={i}>
                                    <div className='  rounded-lg  bg-transparen py-2 pl-2 hover:bg-richblack-50'>{ele.name}</div>
                                  </Link>
                                ))
                              ) : (<div></div>)
                            }
                          </div>


                        </div>
                        : <Link to={ele.path}>
                          <div className={`${matchRoute(ele.path) ? " text-yellow-25" : " text-black-25"}`}>{ele.title}</div>
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
            user &&( user?.accountType === "Admin" || user?.accountType === "Instructor" || user?.accountType ==="Student" )&& (
              <div className=" flex gap-4 ">
                <Link to={"/dashboard/cart"} className='rounded-full p-2 bg-richblack-800 text-2xl'>
                  <IoMdSearch />
                </Link>
                <Link to={"/dashboard/cart"} className='flex items-center text-2xl'>
                  <CiShoppingCart />
                </Link>
                {
                  user?.image && <div to={"/dashboard/cart"}
                    onClick={() => setIsUserTabOpen(!isUserTabOpen)}
                    className=' relative cursor-pointer flex items-center  h-full text-2xl'>
                    <img src={user.image} className=' rounded-full' width={30} height={30} alt='not found' />
                    <FaCaretDown className=' text-sm' />
                    {isUserTabOpen && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
                        ref={ref}
                      >
                        <Link to="/dashboard/my-profile" onClick={() => setIsUserTabOpen(false)}>
                          <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                            <VscDashboard className="text-lg" />
                            Dashboard
                          </div>
                        </Link>
                        <div
                          onClick={() => {
                            dispatch(logOut(navgate))
                            setIsUserTabOpen(false)
                          }}
                          className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                        >
                          <VscSignOut className="text-lg" />
                          Logout
                        </div>
                      </div>
                    )}
                  </div>
                }
              </div>
            )
          }
          {
            token === null && (
              <Link to={"/login"}>
                <button className=' border border-richblue-600 bg-richblack-900 px-[12px] py-[6px] rounded-md text-richblack-5'>
                  Login
                </button>
              </Link>
            )
          }
          {
            token === null && (
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
