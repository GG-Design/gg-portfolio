import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft, ArrowRight,
  Briefcase, Clock, Users,
  AlertCircle, Layers, ExternalLink,
  type LucideIcon,
} from "lucide-react"
import { Tagline }           from "@/components/ui/tagline"
import { Button }            from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress }          from "@/components/ui/progress"
import { Separator }         from "@/components/ui/separator"
import { Lightbox, useLightbox } from "@/components/Lightbox"

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ lucideIcon, children }: { lucideIcon?: LucideIcon; children: React.ReactNode }) {
  return <div className="mb-4"><Tagline lucideIcon={lucideIcon}>{children}</Tagline></div>
}

function SectionGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[180px_1fr] gap-8 md:gap-16">
      {children}
    </div>
  )
}

function PageDivider() {
  return <div className="max-w-5xl mx-auto px-6"><Separator className="bg-stone-200" /></div>
}

export default function CaseStudyTide() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [navVisible, setNavVisible] = useState(false)
  const lightbox = useLightbox()

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0)
      setNavVisible(scrolled > 80)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div style={{ backgroundColor: "#FAF9F6" }} className="min-h-screen text-zinc-900">

      <Progress
        value={scrollProgress}
        indicatorClassName="bg-cyan-400"
        className="fixed top-0 left-0 right-0 z-50 h-0.5 rounded-none bg-transparent"
      />

      <div
        className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-stone-200 backdrop-blur-md transition-all duration-200"
        style={{
          backgroundColor: "rgba(250,249,246,0.9)",
          opacity: navVisible ? 1 : 0,
          transform: navVisible ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: navVisible ? "auto" : "none",
        }}
      >
        <div className="relative max-w-5xl mx-auto px-6 h-full flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="-ml-3 text-zinc-500 hover:text-zinc-900 hover:bg-stone-900/5">
            <Link to="/"><ArrowLeft className="w-3.5 h-3.5" />Back</Link>
          </Button>
          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-zinc-900">Tide</span>
        </div>
      </div>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-6 pb-16">
        <Button variant="ghost" size="sm" asChild className="mb-10 -ml-3 text-zinc-500 hover:text-zinc-900 hover:bg-stone-900/5">
          <Link to="/"><ArrowLeft className="w-3.5 h-3.5" />Back</Link>
        </Button>

        <FadeUp className="mb-6 flex flex-wrap gap-2">
          <Tagline lucideIcon={Briefcase} text="Product Designer" />
          <Tagline lucideIcon={Clock}     text="Contract" />
          <Tagline lucideIcon={Users}     text="Web & Mobile" />
        </FadeUp>

        <FadeUp delay={0.06}>
          <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-6 text-zinc-900">
            Tide
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl leading-relaxed">
            Contract work across Tide's web and mobile app — a redesigned responsive web app, bespoke non-intrusive in-app notifications, and a new login screen.
          </p>
        </FadeUp>

        {/* Prototype CTA */}
        <FadeUp delay={0.14} className="mt-10">
          <a
            href="https://tidedesktopapp.netlify.app/#/screens"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
          >
            View prototype
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </FadeUp>
      </section>

      <FadeUp className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-[#06B6D4] rounded-2xl py-16 px-20 overflow-hidden
                        flex items-center justify-center">
          <img
            src="/images/Tide_wireframes.webp"
            alt="Tide — web app wireframes"
            onClick={() => lightbox.open("/images/Tide_wireframes.webp", "Tide — web app wireframes")}
            className="w-auto h-auto max-w-full block rounded-lg cursor-pointer"
          />
        </div>
      </FadeUp>

      <PageDivider />

      {/* MOBILE APP — IN-APP NOTIFICATIONS */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={AlertCircle}>Mobile App</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-xl font-semibold text-zinc-900 mb-3">In-app notifications — UX & UI</p>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Designed bespoke, non-intrusive in-app notifications for the Tide mobile app — surfacing timely information without interrupting the task the user was already doing.
              </p>
            </FadeUp>

            <FadeUp>
              <div className="bg-white rounded-2xl p-10 overflow-hidden flex items-center justify-center border border-stone-200">
                <img
                  src="/images/Tide_Notications.webp"
                  alt="Tide — in-app notifications"
                  onClick={() => lightbox.open("/images/Tide_Notications.webp", "Tide — in-app notifications")}
                  className="w-auto h-auto max-w-full mx-auto cursor-pointer"
                />
              </div>
            </FadeUp>
          </div>
        </SectionGrid>
      </section>

      <PageDivider />

      {/* WEB APP REDESIGN */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={Layers}>Web App</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-xl font-semibold text-zinc-900 mb-3">Responsive redesign — UX</p>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Redesigned the responsive web app end-to-end. I ran a competitive analysis of comparable business banking products, then delivered wireframes and an interactive prototype covering the full desktop experience.
              </p>
            </FadeUp>

            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="px-6 py-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-zinc-800 mb-0.5">Interactive prototype</p>
                    <p className="text-sm text-zinc-500">Full clickable flow — desktop web app</p>
                  </div>
                  <a
                    href="https://tidedesktopapp.netlify.app/#/screens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
                  >
                    View prototype
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </CardContent>
              </Card>
            </FadeUp>
          </div>
        </SectionGrid>
      </section>

      {/* FOOTER */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <Separator className="mb-10 bg-stone-200" />
          <FadeUp className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-zinc-500 font-semibold text-sm mb-2">Next</p>
              <h3 className="text-2xl font-bold text-zinc-900">Times Higher Education</h3>
              <p className="text-zinc-600 mt-1">University Profiles — first design system, validated with 700+ students</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-zinc-500 hover:text-zinc-900 hover:bg-stone-900/5">
              <Link to="/work/times-higher-education">
                Next case study
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </FadeUp>
        </div>
      </section>

      <Lightbox image={lightbox.image} onClose={lightbox.close} />

    </div>
  )
}
