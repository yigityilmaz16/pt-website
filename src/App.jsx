import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProgramDetail from './sections/ProgramDetail.jsx'
import ScrollToTop from './components/ScrollToTop'

function App(){
  return(
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ProgramDetail />} />
      </Routes>
    </>
  );
}

export default App
