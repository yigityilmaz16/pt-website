import './App.css'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'

const Services = () => <section id="services" />
const Transformations = () => <section id="transformations" />
const Testimonials = () => <section id="testimonials" />
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
