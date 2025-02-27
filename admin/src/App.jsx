import React from 'react'
import { Outlet,useNavigate , useLocation} from "react-router-dom";
import { useStateContext } from './context/StateContext';
import { useEffect } from 'react';
import Sidebar from './components/SideBar';

const App = () => {
  const location = useLocation();
  const {admin} = useStateContext()
  let navigate = useNavigate();
  useEffect(() => {
    console.log(admin)
    if(!admin){
      navigate('/login')
    }
    if(location.pathname =='/'){
      navigate('/proizvodi')
    }
  }, [])
  
  return (
    <div className='flex'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default App