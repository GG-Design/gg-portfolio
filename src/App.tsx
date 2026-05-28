import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Nav }          from "@/components/Nav"
import { Hero }         from "@/components/Hero"
import { Logos }        from "@/components/sections/Logos"
import CaseStudies       from "@/components/CaseStudies"
import { About }        from "@/components/sections/About"
import { Services }     from "@/components/sections/Services"
import { Contact }      from "@/components/sections/Contact"
import { Footer }       from "@/components/Footer"
import { useLenis }     from "@/hooks/useLenis"
import CaseStudyTHE     from "@/pages/CaseStudyTHE"
import CaseStudyGlintPay from "@/pages/CaseStudyGlintPay"
import ScrollToTop      from "@/components/ScrollToTop"

function HomePage() {
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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/times-higher-education" element={<CaseStudyTHE />} />
        <Route path="/work/glintpay" element={<CaseStudyGlintPay />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
