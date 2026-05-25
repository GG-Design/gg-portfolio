import { Nav }          from "@/components/Nav"
import { Hero }          from "@/components/Hero"
import { Logos }         from "@/components/sections/Logos"
import CaseStudies        from "@/components/CaseStudies"
import { About }         from "@/components/sections/About"
import { Services }      from "@/components/sections/Services"
import { Contact }       from "@/components/sections/Contact"
import { Footer }        from "@/components/Footer"
import { useLenis }      from "@/hooks/useLenis"

function App() {
  useLenis()

  return (
    <div className="bg-zinc-950 text-zinc-50 min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Logos />
        <CaseStudies />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
