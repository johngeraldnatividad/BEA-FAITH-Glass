import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Offers from './components/Offers'
import Services from './components/Services'
import Projects from './components/Projects'
import Process from './components/Process'
import Contact from './components/Contact'
import FloatingContact from './components/FloatingContact'

export default function App() {
  // Fade-up animation as items scroll into view
  useEffect(() => {
    const els = document.querySelectorAll('.card, .step')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px 80px 0px' })
    els.forEach(el => {
      el.classList.add('reveal')
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Process />
        <Offers />
        <Services />
        <Projects />
        <Contact />
      </main>
      <FloatingContact />
    </>
  )
}