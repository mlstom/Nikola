import React from 'react'
import { Outlet,useNavigate , useLocation} from "react-router-dom";
import { useStateContext } from './context/StateContext';
import { useEffect } from 'react';
import Sidebar from './components/SideBar';


const App = () => {
  
  const location = useLocation();
  const {admin,fetchKupci,fetchProizvodi} = useStateContext()
  let navigate = useNavigate();
  useEffect(() => {
    if(!admin){
      navigate('/login')
    }else{
      if(location.pathname =='/'){
        navigate('/proizvodi')
      }
    }
    
    
    fetchProizvodi()
    fetchKupci()
  }, [])
  
  return (
    <div className='flex gap-10'>
      <Sidebar />
       <Outlet />
     
    </div>
  )
}

export default App