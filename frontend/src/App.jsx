import React from 'react'
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useStateContext } from './context/StateContext';
const App = () => {
  const{fetchProizvodi} = useStateContext()
  useEffect(() => {
    fetchProizvodi()
  }, [])
  
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App