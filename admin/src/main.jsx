
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StateContext } from './context/StateContext.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './pages/NoPage.jsx';
import Proizvodi from './pages/Proizvodi.jsx';
import Narudzbine from './pages/Narudzbine.jsx';
import Login from './pages/Login.jsx';
import Settings from './pages/Settings.jsx';
import Kupon from './pages/Kupon.jsx';
createRoot(document.getElementById('root')).render(
  <StateContext>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<App />}>
          <Route path='/proizvodi' element={<Proizvodi/>} />
          <Route path="/narudzbine" element={<Narudzbine />} />
          <Route path="/kupon" element={<Kupon />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </StateContext >,
)
