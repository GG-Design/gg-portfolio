import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft, ArrowRight,
  Briefcase, Clock, Users,
  AlertCircle, Search, Layers, TrendingUp, RefreshCw,
  GraduationCap, SlidersHorizontal,
  type LucideIcon,
} from "lucide-react"
import { Tagline }                        from "@/components/ui/tagline"
import { Button }                         from "@/components/ui/button"
import { Card, CardContent }              from "@/components/ui/card"
import { Progress }                       from "@/components/ui/progress"
import { Separator }                      from "@/components/ui/separator"
import { Lightbox, useLightbox }          from "@/components/Lightbox"

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
function CyanImageBlock({ src, alt, onOpen }: { src: string; alt: string; onOpen: (src: string, alt: string) => void }) {
  return (
    <div className="bg-[#06B6D4] rounded-2xl py-16 px-20 overflow-hidden
                    flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        onClick={() => onOpen(src, alt)}
        className="w-auto h-auto max-w-full block rounded-sm cursor-zoom-in"
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
  const lightbox = useLightbox()

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

          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-zinc-900">THE Profiles</span>
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
          <h1 className="text-4xl md:text-6xl font-bold leading-none tracking-tight mb-6 text-zinc-900">
            THE Profiles
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl leading-relaxed">
            Rebuilding university profile pages as a modular, scalable platform
          </p>
        </FadeUp>

      </section>

      {/* Hero image */}
      <FadeUp className="max-w-5xl mx-auto px-6 pb-12">
        <CyanImageBlock
          src="/images/profile_header.png"
          alt="THE Profiles — redesigned university profile overview"
          onOpen={lightbox.open}
        />
      </FadeUp>

      {/* Stat cards */}
      <FadeUp delay={0.14} className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard value="700+" label="Students who validated the final structure" />
        <StatCard value="80%+" label="Task success rate in usability testing" />
        <StatCard value="77%"  label="Would rely on profiles to compare universities" />
        <StatCard value="4"    label="Internal teams aligned: Editorial, Sales, SEO, Rankings" />
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
                THE's university profile pages had been patched together over years. Multiple
                templates, duplicated content, no single source of truth. Students comparing
                universities couldn't find rankings, fees, or programmes without digging. THE's own
                editorial, sales, SEO, and rankings teams couldn't update content without breaking
                something.
              </p>
            </FadeUp>
            <FadeUp>
              <div className="bg-stone-100 rounded-2xl py-16 px-20 overflow-hidden
                              flex items-center justify-center">
                <img
                  src="/images/old_profile_header.png"
                  alt="Before — fragmented profile templates side by side"
                  onClick={() => lightbox.open("/images/old_profile_header.png", "Before — fragmented profile templates side by side")}
                  className="w-auto h-auto max-w-full block rounded-sm cursor-zoom-in"
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
                I ran workshops with Editorial, Sales, SEO and Rankings to understand what each team
                needed from profiles. Then I combined Hotjar heatmaps and analytics with a Maze survey
                and moderated interviews across 700+ students globally.
              </p>
            </FadeUp>


            <FadeUp className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-100 rounded-2xl overflow-hidden p-8 flex items-center justify-center">
                <img
                  src="/images/maze.png"
                  alt="Research synthesis — Hotjar + Maze"
                  onClick={() => lightbox.open("/images/maze.png", "Research synthesis — Hotjar + Maze")}
                  className="w-auto h-auto max-w-full block cursor-zoom-in"
                />
              </div>
              <div className="bg-zinc-100 rounded-2xl overflow-hidden p-8 flex items-center justify-center">
                <img
                  src="/images/maze2.png"
                  alt="Stakeholder workshop outputs"
                  onClick={() => lightbox.open("/images/maze2.png", "Stakeholder workshop outputs")}
                  className="w-auto h-auto max-w-full block cursor-zoom-in"
                />
              </div>
            </FadeUp>

            {/* Key insights */}
            <FadeUp className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  icon:  <GraduationCap size={24} className="text-zinc-900 mb-4" />,
                  label: "Students decide, not browse",
                  desc:  "Most visits were to evaluate a specific university. Key info had to be immediate, not buried behind scroll or tabs.",
                },
                {
                  icon:  <Layers size={24} className="text-zinc-900 mb-4" />,
                  label: "Long pages work when the top works",
                  desc:  "Early exits spiked whenever essentials were buried below the fold. The header had to earn the scroll.",
                },
                {
                  icon:  <SlidersHorizontal size={24} className="text-zinc-900 mb-4" />,
                  label: "One template can't fit real data",
                  desc:  "Institutions publish wildly uneven fields. The system needed hide-when-empty rules to stay coherent at scale.",
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
                Instead of building another rigid template, I designed a single long-scroll page built
                from configurable blocks, all powered by THE's DataPoints API. Pages adapt
                automatically to uneven data using hide-when-empty rules.
              </p>
            </FadeUp>

            {/* Redesigned profile — desktop, full scroll */}
            <FadeUp>
              <div className="bg-zinc-100 rounded-2xl p-16 overflow-hidden
                              flex items-center justify-center">
                <img
                  src="/images/desktop_nav.png"
                  alt="Redesigned profile — desktop, full scroll"
                  onClick={() => lightbox.open("/images/desktop_nav.png", "Redesigned profile — desktop, full scroll")}
                  className="w-auto h-auto max-w-full mx-auto block cursor-zoom-in"
                />
              </div>
            </FadeUp>

            {/* Key components list */}
            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-3">Key components</p>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    "Key stats strip above the fold so students get essentials immediately",
                    "Sticky in-page navigation on desktop so long pages stay scannable",
                    "Tab navigation on mobile, only Overview and Rankings open by default",
                    "Rankings module with methodology link and source citation to build trust",
                    "Programmes module routing directly to enquiry flow to reduce friction",
                    "Clearly labelled commercial modules to maintain credibility",
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
                  onClick={() => lightbox.open("/images/mobileabovefold.png", "Mobile — overview tab, essentials above fold")}
                  className="w-auto h-auto max-w-full mx-auto block cursor-zoom-in"
                />
              </div>
              <div className="bg-zinc-100 rounded-2xl overflow-hidden p-8
                              flex items-center justify-center">
                <img
                  src="/images/mobilerankings.png"
                  alt="Mobile — rankings tab with methodology link"
                  onClick={() => lightbox.open("/images/mobilerankings.png", "Mobile — rankings tab with methodology link")}
                  className="w-auto h-auto max-w-full mx-auto block cursor-zoom-in"
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
                    "First reusable block system at THE, now used across the organisation",
                    "4 internal teams aligned on one shared structure",
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
                    The scope was ambitious and everyone signed off on it, but the estimates weren't
                    realistic. Next time I'd push for vertical slicing from the start. Ship the
                    highest-value profile type first, learn from it, then scale.
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
                  "Get engineers in the room before estimates, not after the brief",
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
              <h3 className="text-2xl font-bold text-zinc-900">THE DataPoints</h3>
              <p className="text-zinc-600 mt-1">Analytics platform for 3,500+ universities</p>
            </div>
            <Button variant="ghost" size="sm" asChild
              className="text-zinc-500 hover:text-zinc-900 hover:bg-stone-900/5"
            >
              <Link to="/work/the-datapoints">
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
