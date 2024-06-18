
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from "./pages/Home.jsx";

function App() {
  return (
    <div className='flex flex-col font-inter bg-richblack-900  min-h-screen'>
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
     
    </div>
  );
}

export default App;
