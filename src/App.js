
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from "./pages/Home.jsx";
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import NavBar from './components/common/NavBar.jsx';
import Verify_email from './pages/Verify_email.jsx';

function App() {
  return (
    <div className='flex flex-col font-inter bg-richblack-900 text-white  min-h-screen'>
      <NavBar/>
    <Routes>
      <Route path='/'>
        <Route index element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='verify-email' element={<Verify_email/>}/>
      </Route>
    </Routes>
     
    </div>
  );
}

export default App;
