import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Visualization from '../components/Visualization'
import Contact from '../components/Contact'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { MathModeProvider } from '../components/MathModeToggle'

export default function Home() {
  return (
    <MathModeProvider>
      <Header />
      <main className="min-h-screen bg-gray-900 text-white">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Visualization />
        <Contact />
      </main>
      <Footer />
    </MathModeProvider>
  )
}