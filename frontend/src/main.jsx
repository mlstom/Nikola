import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from './pages/Home.jsx';
import Kontakt from './pages/Kontakt.jsx';
import Narudzbina from './pages/Narudzbina.jsx';
import Proizvodi from './pages/Proizvodi.jsx';
import NoPage from './pages/NoPage.jsx';
import App from './App.jsx';
import { StateContext } from './context/StateContext.jsx';
import Proizvod from './pages/Proizvod.jsx';
import Korpa from './pages/Korpa.jsx';
import ReactGA from 'react-ga'
const Tracking_Id = "G-4P99H2Y12N";
ReactGa.initialize(Tracking_Id)

createRoot(document.getElementById('root')).render(
  <StateContext>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/proizvodi" element={<Proizvodi />} />
          <Route path="/proizvod/:id" element={<Proizvod />} />
          <Route path="/narudzbina" element={<Narudzbina />} />
          <Route path="/korpa" element={<Korpa />} />  
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </StateContext>,
)
