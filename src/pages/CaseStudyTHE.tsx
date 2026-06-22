import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft, ArrowRight,
  Briefcase, Clock, Users,
  AlertCircle, Search, Layers, TrendingUp, RefreshCw,
  Target, ArrowUp, Database,
  type LucideIcon,
} from "lucide-react"
import { Tagline }                        from "@/components/ui/tagline"
import { Button }                         from "@/components/ui/button"
import { Card, CardContent }              from "@/components/ui/card"
import { Progress }                       from "@/components/ui/progress"
import { Separator }                      from "@/components/ui/separator"

// ─── Animation wrapper ────────────────────────────────────────────────────────

function FadeUp({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
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

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ lucideIcon, children }: { lucideIcon?: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <Tagline lucideIcon={lucideIcon}>{children}</Tagline>
    </div>
  )
}

/** Metric card */
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <Card className="shadow-none border border-stone-200 bg-white rounded-2xl">
      <CardContent className="p-6 flex flex-col gap-2">
        <span className="text-3xl font-bold text-cyan-600 leading-none">{value}</span>
        <span className="text-sm text-zinc-600 leading-snug">{label}</span>
      </CardContent>
    </Card>
  )
}


/** Real image on cyan background — matches the home-page card pattern */
function CyanImageBlock({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-[#06B6D4] rounded-2xl py-16 px-20 overflow-hidden
                    flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="w-auto h-auto max-w-full block rounded-lg"
      />
    </div>
  )
}

/** Two-column section layout */
function SectionGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[180px_1fr] gap-8 md:gap-16">
      {children}
    </div>
  )
}

/** Separator inside max-width wrapper */
function PageDivider() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <Separator className="bg-stone-200" />
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CaseStudyTHE() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [navVisible,     setNavVisible]     = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total    = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0)
      setNavVisible(scrolled > 80)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div style={{ backgroundColor: "#FAF9F6" }} className="min-h-screen text-zinc-900">

      {/* ── Reading progress bar ── */}
      <Progress
        value={scrollProgress}
        indicatorClassName="bg-cyan-400"
        className="fixed top-0 left-0 right-0 z-50 h-0.5 rounded-none bg-transparent"
      />

      {/* ── Fixed nav ── */}
      <div
        className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-stone-200 backdrop-blur-md
                   transition-all duration-200"
        style={{
          backgroundColor: "rgba(250,249,246,0.9)",
          opacity:      navVisible ? 1 : 0,
          transform:    navVisible ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: navVisible ? "auto" : "none",
        }}
      >
        <div className="relative max-w-5xl mx-auto px-6 h-full flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild
            className="-ml-3 text-zinc-500 hover:text-zinc-900 hover:bg-stone-900/5"
          >
            <Link to="/">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>
          </Button>

          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-zinc-900">Times Higher Education</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 pt-6 pb-16">

        {/* Back button */}
        <Button variant="ghost" size="sm" asChild
          className="mb-10 -ml-3 text-zinc-500 hover:text-zinc-900 hover:bg-stone-900/5"
        >
          <Link to="/">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>
        </Button>

        {/* Metadata badges */}
        <FadeUp className="mb-6 flex flex-wrap gap-2">
          <Tagline lucideIcon={Briefcase} text="Lead Product Designer" />
          <Tagline lucideIcon={Clock} text="9 months" />
          <Tagline lucideIcon={Users} text="PM · Tech Lead · 2 FE · 1 BE" />
        </FadeUp>

        {/* Title + subtitle */}
        <FadeUp delay={0.06}>
          <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-6 text-zinc-900">
            Times Higher<br />Education
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl leading-relaxed">
            Redesigned THE's university profile system from fragmented legacy pages into a
            modular, data-driven platform — validated with 700+ students and shipped across
            thousands of institutions worldwide.
          </p>
        </FadeUp>

        {/* Stat cards */}
        <FadeUp delay={0.14} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard value="700+" label="Students who validated the final structure" />
          <StatCard value="80%+" label="Task success rate in usability testing" />
          <StatCard value="77%"  label="Would rely on profiles to compare universities" />
          <StatCard value="4"    label="Internal teams aligned: Editorial, Sales, SEO, Rankings" />
        </FadeUp>
      </section>

      {/* Hero image */}
      <FadeUp className="max-w-5xl mx-auto px-6 pb-20">
        <CyanImageBlock
          src="/images/profile_header.png"
          alt="University Profile — redesigned overview"
        />
      </FadeUp>

      <PageDivider />

      {/* ══════════════════════════════════════════════════════════════════
          THE PROBLEM
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={AlertCircle}>The Problem</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-600 leading-relaxed">
                THE's university profile pages had grown organically over years — multiple templates,
                duplicated content, no shared data layer. For students mid-decision, the most important
                information (rankings, fees, programmes, admissions) was buried or inconsistent. For
                THE's editorial and commercial teams, updates were slow and error-prone.
              </p>
            </FadeUp>
            <FadeUp>
              <div className="bg-stone-100 rounded-2xl py-16 px-20 overflow-hidden
                              flex items-center justify-center">
                <img
                  src="/images/old_profile_header.png"
                  alt="Before — fragmented profile templates side by side"
                  className="w-auto h-auto max-w-full block rounded-lg"
                />
              </div>
            </FadeUp>
          </div>
        </SectionGrid>
      </section>

      <PageDivider />

      {/* ══════════════════════════════════════════════════════════════════
          RESEARCH & DISCOVERY
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={Search}>Research & Discovery</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-600 leading-relaxed">
                I ran stakeholder workshops across Editorial, Sales, SEO and Rankings. Combined Hotjar
                heatmaps and analytics with Maze surveys and moderated interviews — globally, across
                700+ students.
              </p>
            </FadeUp>


            <FadeUp className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-100 rounded-2xl overflow-hidden p-8 flex items-center justify-center">
                <img
                  src="/images/maze.png"
                  alt="Research synthesis — Hotjar + Maze"
                  className="w-auto h-auto max-w-full block"
                />
              </div>
              <div className="bg-zinc-100 rounded-2xl overflow-hidden p-8 flex items-center justify-center">
                <img
                  src="/images/maze2.png"
                  alt="Stakeholder workshop outputs"
                  className="w-auto h-auto max-w-full block"
                />
              </div>
            </FadeUp>

            {/* Key insights */}
            <FadeUp className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  icon:  <Target size={24} className="text-zinc-900 mb-4" />,
                  label: "Students come to decide, not explore",
                  desc:  "Essentials must be visible immediately — not behind scroll or tabs.",
                },
                {
                  icon:  <ArrowUp size={24} className="text-zinc-900 mb-4" />,
                  label: "Long pages work when the top works",
                  desc:  "Early exits spiked whenever essentials were buried below the fold.",
                },
                {
                  icon:  <Database size={24} className="text-zinc-900 mb-4" />,
                  label: "One template can't fit real data",
                  desc:  "Institutions publish wildly uneven fields — the system had to adapt.",
                },
              ].map(item => (
                <Card key={item.label} className="rounded-2xl border border-zinc-200 bg-white p-6">
                  <CardContent className="p-0 flex flex-col">
                    {item.icon}
                    <span className="font-semibold text-zinc-900 mb-2">{item.label}</span>
                    <span className="text-sm text-zinc-500">{item.desc}</span>
                  </CardContent>
                </Card>
              ))}
            </FadeUp>
          </div>
        </SectionGrid>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          THE SOLUTION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={Layers}>The Solution</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-600 leading-relaxed">
                A single long-scroll page built from configurable blocks powered by THE's DataPoints
                API. Hide-when-empty rules meant pages adapted to uneven institutional data. Sticky
                in-page navigation on desktop, tabs on mobile — with Overview and Rankings open by
                default.
              </p>
            </FadeUp>

            {/* Redesigned profile — desktop, full scroll */}
            <FadeUp>
              <div className="bg-zinc-100 rounded-2xl p-16 overflow-hidden
                              flex items-center justify-center">
                <img
                  src="/images/desktop_nav.png"
                  alt="Redesigned profile — desktop, full scroll"
                  className="w-auto h-auto max-w-full mx-auto block"
                />
              </div>
            </FadeUp>

            {/* Key components list */}
            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-3">Key components</p>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    "Key stats strip above the fold",
                    "Sticky in-page navigation on desktop",
                    "Tab navigation on mobile",
                    "Rankings module with methodology link and source citation",
                    "Programmes module routing directly to enquiry flow",
                    "Clearly labelled commercial modules",
                  ].map((item, i) => (
                    <div key={i}>
                      {i > 0 && <Separator className="bg-stone-200" />}
                      <div className="px-6 py-4 flex items-center gap-4">
                        <span className="shrink-0 inline-flex items-center justify-center
                                         w-8 h-8 rounded-lg border border-cyan-200
                                         bg-cyan-50 text-xs text-cyan-700 font-semibold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium text-zinc-700">{item}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeUp>

            <FadeUp className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-100 rounded-2xl overflow-hidden p-8
                              flex items-center justify-center">
                <img
                  src="/images/mobileabovefold.png"
                  alt="Mobile — overview tab, essentials above fold"
                  className="w-auto h-auto max-w-full mx-auto block"
                />
              </div>
              <div className="bg-zinc-100 rounded-2xl overflow-hidden p-8
                              flex items-center justify-center">
                <img
                  src="/images/mobilerankings.png"
                  alt="Mobile — rankings tab with methodology link"
                  className="w-auto h-auto max-w-full mx-auto block"
                />
              </div>
            </FadeUp>
          </div>
        </SectionGrid>
      </section>

      <PageDivider />

      {/* ══════════════════════════════════════════════════════════════════
          IMPACT
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={TrendingUp}>Impact</SectionLabel>
          </FadeUp>
          <div className="space-y-8">

            <FadeUp className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard value="23%" label="Profile conversion rate improvement" />
              <StatCard value="28%" label="Page engagement improvement" />
              <StatCard value="13%" label="Decrease in bounce rate" />
              <StatCard value="1st" label="Reusable block system at THE" />
            </FadeUp>

            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    "Shipped across thousands of university profiles at scale",
                    "Professionals cited visible methodology and source labelling as trust signals",
                    "First reusable block system at THE",
                    "4 internal teams aligned: Editorial, Sales, SEO, Rankings",
                  ].map((item, i) => (
                    <div key={i}>
                      {i > 0 && <Separator className="bg-stone-200" />}
                      <div className="px-6 py-4 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span className="text-sm font-medium text-zinc-700">{item}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeUp>
          </div>
        </SectionGrid>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          REFLECTIONS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={RefreshCw}>Reflections</SectionLabel>
          </FadeUp>
          <div className="space-y-10">

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-4">What I'd do differently</p>
              <Card
                className="shadow-none bg-white border border-stone-200 border-l-2 border-l-cyan-400
                           rounded-sm overflow-visible"
              >
                <CardContent className="pl-5 pr-6 py-5">
                  <p className="text-lg font-medium text-zinc-700 leading-relaxed">
                    The project was genuinely ambitious. Engineers and the business signed off on the
                    scope, but the estimates weren't grounded in delivery reality. I'd push for vertical
                    slicing from the start — ship the highest-value profile type end-to-end first, learn
                    from it, then scale the block architecture.
                  </p>
                </CardContent>
              </Card>
            </FadeUp>

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-4">What I'd carry forward</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Plain labels always beat clever section names",
                  "Anchor navigation must be obvious at the top and quieter on scroll",
                  "Tabs reduce mobile fatigue when only essentials open by default",
                  "Get engineers in the room before estimates — not after the brief",
                ].map((item, i) => (
                  <Card key={i} className="shadow-none bg-white border border-stone-200 rounded-2xl">
                    <CardContent className="px-5 py-4 flex gap-3 items-start">
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-zinc-700 leading-relaxed">{item}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeUp>
          </div>
        </SectionGrid>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER — next case study
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <Separator className="mb-10 bg-stone-200" />
          <FadeUp className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-zinc-500 font-semibold text-sm mb-2">Next</p>
              <h3 className="text-2xl font-bold text-zinc-900">GlintPay</h3>
              <p className="text-zinc-600 mt-1">iOS & Android end-to-end redesign</p>
            </div>
            <Button variant="ghost" size="sm" asChild
              className="text-zinc-500 hover:text-zinc-900 hover:bg-stone-900/5"
            >
              <Link to="/work/glintpay">
                Next case study
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </FadeUp>
        </div>
      </section>

    </div>
  )
}
