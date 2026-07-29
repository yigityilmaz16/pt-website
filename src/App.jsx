import './App.css'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Transformations from './sections/Transformations'
import Testimonials from './sections/Testimonials'

const Faq = () => <section id="faq" />
const Contact = () => <section id="contact" />
const Footer = () => <footer />

function App(){
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
  );
}

export default App
