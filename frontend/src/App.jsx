import React from 'react'
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useStateContext } from './context/StateContext';
import { useLocation } from 'react-router-dom';

const App = () => {
  const { pathname } = useLocation();
  const{fetchProizvodi} = useStateContext()
  useEffect(() => {
    fetchProizvodi()
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [pathname]);
  useEffect(() => {
    // Kada se aplikacija učita, pozivamo /sitemap.xml
    fetch('https://backend.srv758372.hstgr.cloud/sitemap.xml')
      .then((response) => response.text()) // Pretvaramo XML u tekst
      .then((data) => {
        console.log('Sitemap:', data); // Prikazujemo sitemap u konzoli (ili ga koristiš kako ti treba)
      })
      .catch((error) => {
        console.error('Error fetching sitemap:', error);
      });
  }, []); 
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