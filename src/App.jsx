import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Admin from "./pages/Admin"
import Home from './pages/Home'
import ProgramDetail from './sections/ProgramDetail.jsx'
import ScrollToTop from './components/ScrollToTop'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Checkout from "./pages/Checkout"
import Assessment from "./pages/Assessment"
import {
  PrivacyPolicy,
  KvkkNotice,
  DistanceSalesAgreement,
  CancellationRefundPolicy,
} from "./pages/LegalDocuments"

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
        <Route path="/gizlilik-politikasi" element={<PrivacyPolicy />} />
        <Route path="/kvkk-aydinlatma" element={<KvkkNotice />} />
        <Route
          path="/mesafeli-satis-sozlesmesi"
          element={<DistanceSalesAgreement />}
        />
        <Route path="/iptal-iade" element={<CancellationRefundPolicy />} />
      </Routes>
    {!isAdminRoute && <FloatingWhatsApp />}
    </>
  );
}

export default App
