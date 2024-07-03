import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { resetCourseDetails } from '../../../slices/courseSlicer';

const SideBarLinks = ({ link, iconName }) => {
    const Icon = Icons[iconName];
    const dispatch = useDispatch();
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }
    return (
        <NavLink to={link?.path}
            onClick={() => dispatch(resetCourseDetails())}
            className={`  relative  text-richblack-300  text-sm  font-medium px-8 py-2 
    ${matchRoute(link.path) ? " text-yellow-50 bg-yellow-800" : " bg-opacity-0 text-richblack-0"}
     transition-all duration-200`}>
            <span
                className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"
                    }`}
            ></span>
            <div className="flex items-center gap-x-2">
                {/* Icon Goes Here */}
                <Icon className="text-lg" />
                <span>{link.name}</span>
            </div>
        </NavLink>
    )
}

export default SideBarLinks
