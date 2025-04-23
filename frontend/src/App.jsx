import React from 'react'
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useStateContext } from './context/StateContext';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga'

const App = () => {
  const { pathname } = useLocation();
  const{fetchProizvodi} = useStateContext()
  useEffect(() => {
    fetchProizvodi()
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0); 
    ReactGA.pageview(window.location.pathname)
  }, [pathname]);
 
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