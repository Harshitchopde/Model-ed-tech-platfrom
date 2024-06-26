import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
const NavBar = () => {
    const location = useLocation();
    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }
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
                            ?<div>{ele.title}</div>
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
        
      </div>
      </div>
    </div>
  )
}

export default NavBar
