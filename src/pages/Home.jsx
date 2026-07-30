import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Services from '../sections/Services'
import Transformations from '../sections/Transformations'
import Testimonials from '../sections/Testimonials'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

const Faq = () => <section id="faq" />

function Home(){
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const sectionId = location.hash.replace('#', '')
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash])

  return(
    <div>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Transformations />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
