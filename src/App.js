
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from "./pages/Home.jsx";
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import NavBar from './components/common/NavBar.jsx';
import Verify_email from './pages/Verify_email.jsx';
import Error from './pages/Error.jsx';
import PrivateRoute from './components/core/Auth/PrivateRoute.jsx';
import DashBoard from './pages/DashBoard.jsx';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from './utils/constants.js';
import Cart from './components/core/DashBoard/Cart/index.jsx';
import EnrolledCourses from './components/core/DashBoard/EnrolledCourses.jsx';
import Instructor from './components/core/DashBoard/Instructors/Instructor.jsx';
import AddCourses from './components/core/DashBoard/AddCourses/index.jsx';
import MyCourses from './components/core/DashBoard/MyCourses.jsx';
import EditCourses from './components/core/DashBoard/EditCourses/index.jsx';
import MyProfile from './components/core/DashBoard/MyProfile.jsx';
import Setting from './components/core/DashBoard/Settings/index.jsx';
import OpenRoute from './components/core/Auth/OpenRoute.jsx';
import Catalog from './pages/Catalog.jsx';
import CourseDetails from './pages/CourseDetails.jsx';

function App() {
  const {user} = useSelector((state)=> state.profile);

  return (
    <div className='flex flex-col font-inter bg-richblack-900 text-white  min-h-screen'>
      <NavBar/>
    <Routes>
      <Route path='/'>
        <Route index element={<Home/>}/>
        <Route path='catalog/:catalogName' element={<Catalog/>}/>
        <Route path='courses/:courseId' element={<CourseDetails/>}/>
        <Route path='login' element={
          <OpenRoute>
            <Login/>
          </OpenRoute>
        }/>
        <Route path='signup' element={
          <OpenRoute>
           <SignUp/>
         </OpenRoute>
        }/>
        <Route path='verify-email' element={<Verify_email/>}/>
      </Route>
      <Route element={
        <PrivateRoute>
          <DashBoard/>
        </PrivateRoute>
      }>
        <Route path='dashboard/my-profile' element={<MyProfile/>}/>
        <Route path='dashboard/Settings' element={<Setting/>}/>
       {
        user?.accountType ===ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path='dashboard/cart' element={<Cart/>}/>
          <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
          </>
        )
       }
       {
        user?.accountType ===ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route  path='dashboard/instructor' element={<Instructor/>}/>
          <Route path='dashboard/add-course' element={<AddCourses/>}/>
          <Route path='dashboard/my-courses' element={<MyCourses/>}/>
          <Route path="dashboard/edit-course/:courseId" element={<EditCourses/>} />
          </>
        )
       }
      </Route>
      <Route path='*' element={<Error/>}/>
    </Routes>
     
    </div>
  );
}

export default App;
