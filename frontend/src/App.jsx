import React from 'react'
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
const App = () => {
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