import { useState, useEffect, Fragment } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Badge }                          from "@/components/ui/badge"
import { Button }                         from "@/components/ui/button"
import { Card, CardContent }              from "@/components/ui/card"
import { Progress }                       from "@/components/ui/progress"
import { Separator }                      from "@/components/ui/separator"
import { Avatar, AvatarFallback }         from "@/components/ui/avatar"

// ─── Animation wrapper (behaviour, not UI) ───────────────────────────────────

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

// ─── Shadcn primitives ───────────────────────────────────────────────────────

/** Section label — Badge outline, cyan, mono caps */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="outline"
      className="rounded-sm border-cyan-600/25 bg-cyan-600/5 text-cyan-600
                 font-mono tracking-widest uppercase text-[10px] px-2 py-1 mb-4"
    >
      {children}
    </Badge>
  )
}

/** Metric card — Card + CardContent, large cyan number */
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <Card className="shadow-none border-stone-200 bg-white rounded-2xl">
      <CardContent className="p-6 flex flex-col gap-2">
        <span className="text-3xl font-bold text-cyan-600 leading-none">{value}</span>
        <span className="text-sm text-stone-500 leading-snug">{label}</span>
      </CardContent>
    </Card>
  )
}

/** Placeholder image — Card with dashed border, aspect-ratio via style */
function ImageBlock({
  label,
  ratio = "16/9",
  className = "",
}: {
  label: string
  ratio?: string
  className?: string
}) {
  return (
    <Card
      className={`w-full shadow-none border-dashed border-stone-300 overflow-hidden ${className}`}
      style={{ aspectRatio: ratio, backgroundColor: "#F0EDE8" }}
    >
      <CardContent className="h-full flex items-center justify-center p-0 min-h-[120px]">
        <span className="text-stone-400 font-mono text-xs tracking-wide select-none">{label}</span>
      </CardContent>
    </Card>
  )
}

/** Two-column section layout (left: label, right: content) */
function SectionGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[180px_1fr] gap-8 md:gap-16">
      {children}
    </div>
  )
}

/** Full-bleed Separator inside max-width wrapper */
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

      {/* ── Fixed nav (plain div, fades in at 80px) ── */}
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
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild
            className="-ml-3 text-cyan-500 hover:text-cyan-600 hover:bg-cyan-400/8"
          >
            <Link to="/">
              <ArrowLeft className="w-3.5 h-3.5" />
              Work
            </Link>
          </Button>

          <span className="text-sm font-medium text-zinc-900">Times Higher Education</span>

          <Link to="/" aria-label="GG — home">
            <Avatar className="w-8 h-8 border-2 border-cyan-400 cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarFallback className="bg-zinc-900/10 text-zinc-900 text-xs font-semibold tracking-tight">
                GG
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 pt-6 pb-16">

        {/* Back to work */}
        <Button variant="ghost" size="sm" asChild
          className="mb-10 -ml-3 text-cyan-500 hover:text-cyan-600 hover:bg-cyan-400/8"
        >
          <Link to="/">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to work
          </Link>
        </Button>

        {/* Announcement badge */}
        <FadeUp>
          <div className="mb-8">
            <Badge
              variant="outline"
              className="gap-2 border-cyan-400/30 bg-cyan-400/5 text-zinc-600 font-normal py-1.5 px-3"
            >
              <span className="text-cyan-500 text-[10px] leading-none">●</span>
              Lead Product Designer · 9 months · EdTech · SaaS
            </Badge>
          </div>
        </FadeUp>

        {/* Title + subtitle */}
        <FadeUp delay={0.08}>
          <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-6 text-zinc-900">
            Times Higher<br />Education
          </h1>
          <p className="text-xl text-stone-500 max-w-2xl leading-relaxed">
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
        <ImageBlock label="University Profile — redesigned overview" ratio="16/7" />
      </FadeUp>

      {/* Role / Duration / Team card */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <FadeUp>
          <Card
            className="shadow-none border-stone-200 border-t-2 border-t-cyan-400 overflow-hidden rounded-2xl"
            className="bg-white"
          >
            <CardContent className="p-0 flex">
              {[
                { label: "Role",     value: "Lead Product Designer" },
                { label: "Duration", value: "9 months" },
                { label: "Team",     value: "PM · Tech Lead · 2 FE · 1 BE" },
              ].map((item, i) => (
                <Fragment key={item.label}>
                  {i > 0 && <Separator orientation="vertical" className="self-stretch h-auto bg-stone-200" />}
                  <div className="flex-1 px-6 py-5">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1.5">{item.label}</p>
                    <p className="text-sm font-medium text-zinc-800">{item.value}</p>
                  </div>
                </Fragment>
              ))}
            </CardContent>
          </Card>
        </FadeUp>
      </div>

      <PageDivider />

      {/* ══════════════════════════════════════════════════════════════════
          THE PROBLEM
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel>The Problem</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-700 leading-relaxed">
                THE's university profile pages had grown organically over years — multiple templates,
                duplicated content, no shared data layer. For students mid-decision, the most important
                information (rankings, fees, programmes, admissions) was buried or inconsistent. For
                THE's editorial and commercial teams, updates were slow and error-prone.
              </p>
            </FadeUp>
            <FadeUp>
              <ImageBlock label="Before — fragmented profile templates side by side" ratio="16/9" />
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
            <SectionLabel>Research & Discovery</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-700 leading-relaxed">
                I ran stakeholder workshops across Editorial, Sales, SEO and Rankings. Combined Hotjar
                heatmaps and analytics with Maze surveys and moderated interviews — globally, across
                700+ students.
              </p>
            </FadeUp>

            {/* Research numbers — 3 stat Cards */}
            <FadeUp className="grid grid-cols-3 gap-3">
              {[
                { value: "77%",  label: "of students said they'd rely on profiles to compare universities" },
                { value: "80%+", label: "reached their intended section in usability testing" },
                { value: "700+", label: "students worldwide validated the final structure" },
              ].map(s => (
                <Card key={s.value} className="shadow-none border-stone-200 bg-white">
                  <CardContent className="p-5 flex flex-col gap-2">
                    <span className="text-2xl font-bold text-cyan-600">{s.value}</span>
                    <span className="text-xs text-stone-500 leading-snug">{s.label}</span>
                  </CardContent>
                </Card>
              ))}
            </FadeUp>

            {/* Research image placeholders */}
            <FadeUp className="grid grid-cols-2 gap-4">
              <ImageBlock label="Research synthesis — Hotjar + Maze" ratio="4/3" />
              <ImageBlock label="Stakeholder workshop outputs"        ratio="4/3" />
            </FadeUp>

            {/* Key insights — Card with Badge number + Separator rows */}
            <FadeUp>
              <Card className="shadow-none border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    { n: "01", insight: "Students come to decide, not explore",
                               detail:  "Essentials must be visible immediately — not behind scroll or tabs." },
                    { n: "02", insight: "Long pages work when the top works",
                               detail:  "Early exits spiked whenever essentials were buried below the fold." },
                    { n: "03", insight: "One template can't fit real data",
                               detail:  "Institutions publish wildly uneven fields — the system had to adapt." },
                  ].map((item, i) => (
                    <div key={item.n}>
                      {i > 0 && <Separator className="bg-stone-200" />}
                      <div className="px-6 py-5 flex gap-4 items-start">
                        <Badge
                          variant="outline"
                          className="shrink-0 font-mono text-[10px] border-cyan-600/20
                                     bg-cyan-600/5 text-cyan-600 rounded-sm px-1.5 py-0.5"
                        >
                          {item.n}
                        </Badge>
                        <div>
                          <p className="text-sm font-semibold text-zinc-800 mb-0.5">{item.insight}</p>
                          <p className="text-sm text-stone-500">{item.detail}</p>
                        </div>
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
          THE SOLUTION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel>The Solution</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-700 leading-relaxed">
                A single long-scroll page built from configurable blocks powered by THE's DataPoints
                API. Hide-when-empty rules meant pages adapted to uneven institutional data. Sticky
                in-page navigation on desktop, tabs on mobile — with Overview and Rankings open by
                default.
              </p>
            </FadeUp>

            <FadeUp>
              <ImageBlock label="Redesigned profile — desktop, full scroll" ratio="16/9" />
            </FadeUp>

            {/* Key components list */}
            <FadeUp>
              <p className="text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-3">
                Key components
              </p>
              <Card className="shadow-none border-stone-200 bg-white overflow-hidden">
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
                        <Badge
                          variant="outline"
                          className="shrink-0 w-6 h-6 rounded-full p-0 flex items-center justify-center
                                     font-mono text-[10px] border-stone-200 bg-stone-50 text-stone-400"
                        >
                          {i + 1}
                        </Badge>
                        <span className="text-sm text-zinc-700">{item}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeUp>

            {/* Mobile placeholders */}
            <FadeUp className="grid grid-cols-2 gap-4">
              <ImageBlock label="Mobile — overview tab, essentials above fold" ratio="9/16" />
              <ImageBlock label="Mobile — rankings tab with methodology link"   ratio="9/16" />
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
            <SectionLabel>Impact</SectionLabel>
          </FadeUp>
          <div className="space-y-8">

            <FadeUp className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard value="700+" label="Students validated the structure globally" />
              <StatCard value="80%+" label="Task success rate in usability testing" />
              <StatCard value="4"    label="Internal teams aligned" />
              <StatCard value="1st"  label="Reusable block system at THE" />
            </FadeUp>

            <FadeUp>
              <Card className="shadow-none border-stone-200 bg-white overflow-hidden">
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
                        <span className="text-sm text-zinc-700">{item}</span>
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
            <SectionLabel>Reflections</SectionLabel>
          </FadeUp>
          <div className="space-y-10">

            {/* Pullquote — Card with left cyan border */}
            <FadeUp>
              <p className="text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-4">
                What I'd do differently
              </p>
              <Card
                className="shadow-none bg-transparent border-0 border-l-2 border-cyan-400
                           rounded-none overflow-visible"
              >
                <CardContent className="pl-5 pr-0 py-0">
                  <p className="text-lg text-zinc-700 leading-relaxed">
                    The project was genuinely ambitious. Engineers and the business signed off on the
                    scope, but the estimates weren't grounded in delivery reality. I'd push for vertical
                    slicing from the start — ship the highest-value profile type end-to-end first, learn
                    from it, then scale the block architecture.
                  </p>
                </CardContent>
              </Card>
            </FadeUp>

            {/* Carry forward — Cards with cyan ArrowRight */}
            <FadeUp>
              <p className="text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-4">
                What I'd carry forward
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Plain labels always beat clever section names",
                  "Anchor navigation must be obvious at the top and quieter on scroll",
                  "Tabs reduce mobile fatigue when only essentials open by default",
                  "Get engineers in the room before estimates — not after the brief",
                ].map((item, i) => (
                  <Card key={i} className="shadow-none border-stone-200 rounded-2xl"
                    className="bg-white"
                  >
                    <CardContent className="px-5 py-4 flex gap-3 items-start">
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-zinc-700 leading-relaxed">{item}</p>
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
              <p className="text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-2">Next</p>
              <h3 className="text-2xl font-bold text-zinc-900">GlintPay</h3>
              <p className="text-stone-500 mt-1">iOS & Android end-to-end redesign</p>
            </div>
            <Button variant="ghost" size="sm" asChild
              className="text-stone-500 hover:text-zinc-900 hover:bg-stone-900/5"
            >
              <Link to="/">
                <ArrowLeft className="w-3.5 h-3.5 text-cyan-500" />
                Back to all work
              </Link>
            </Button>
          </FadeUp>
        </div>
      </section>

    </div>
  )
}
