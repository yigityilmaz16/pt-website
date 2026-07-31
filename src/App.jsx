import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Admin from "./pages/Admin"
import Home from './pages/Home'
import ProgramDetail from './sections/ProgramDetail.jsx'
import ScrollToTop from './components/ScrollToTop'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Checkout from "./pages/Checkout"
import Assessment from "./pages/Assessment"

function App(){
  const location = useLocation()
const isAdminRoute = location.pathname.startsWith("/admin")
  return(
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ProgramDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/checkout/:slug" element={<Checkout />} />
        <Route path="/assessment/:token" element={<Assessment />} />
      </Routes>
    {!isAdminRoute && <FloatingWhatsApp />}
    </>
  );
}

export default App
