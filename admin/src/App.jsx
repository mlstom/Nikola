import React from 'react'
import { Outlet,useNavigate } from "react-router-dom";
import { useStateContext } from './context/StateContext';
import { useEffect } from 'react';
import Sidebar from './components/SideBar';
import { NavLink, useLocation } from "react-router-dom";
const App = () => {
  const location = useLocation();
  const {admin} = useStateContext()
  let navigate = useNavigate();
  useEffect(() => {
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