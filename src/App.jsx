import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Admin from "./pages/Admin"
import Home from './pages/Home'
import ProgramDetail from './sections/ProgramDetail.jsx'
import ScrollToTop from './components/ScrollToTop'
import FloatingWhatsApp from './components/FloatingWhatsApp'

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
      </Routes>
    {!isAdminRoute && <FloatingWhatsApp />}
    </>
  );
}

export default App
