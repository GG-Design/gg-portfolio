import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft, ArrowRight,
  Briefcase, Clock, Users,
  AlertCircle, Search, Layers, TrendingUp, RefreshCw, Database,
  type LucideIcon,
} from "lucide-react"
import { Tagline }           from "@/components/ui/tagline"
import { Button }            from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress }          from "@/components/ui/progress"
import { Separator }         from "@/components/ui/separator"

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

function CyanImageBlock({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-[#06B6D4] rounded-2xl py-16 px-20 overflow-hidden flex items-center justify-center">
      <img src={src} alt={alt} className="w-auto h-auto max-w-full block rounded-lg" />
    </div>
  )
}

function GreyImageBlock({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-zinc-100 rounded-2xl p-12 overflow-hidden flex items-center justify-center">
      <img src={src} alt={alt} className="w-auto h-auto max-w-full block rounded-lg" />
    </div>
  )
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

function ModuleDivider() {
  return <div className="max-w-5xl mx-auto"><Separator className="bg-stone-100" /></div>
}

export default function CaseStudyDataPoints() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [navVisible, setNavVisible] = useState(false)

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
          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-zinc-900">THE DataPoints</span>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-6 pt-6 pb-16">
        <Button variant="ghost" size="sm" asChild className="mb-10 -ml-3 text-zinc-500 hover:text-zinc-900 hover:bg-stone-900/5">
          <Link to="/"><ArrowLeft className="w-3.5 h-3.5" />Back</Link>
        </Button>

        <FadeUp className="mb-6 flex flex-wrap gap-2">
          <Tagline lucideIcon={Briefcase} text="Principal Product Designer" />
          <Tagline lucideIcon={Clock} text="12 months" />
          <Tagline lucideIcon={Users} text="PM · Tech Lead · 3 FE · 2 BE · Data" />
        </FadeUp>

        <FadeUp delay={0.06}>
          <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-6 text-zinc-900">
            THE DataPoints<br />&amp; Insights
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl leading-relaxed">
            Led the end-to-end redesign of THE's SaaS analytics platform — used by 3,500+ universities globally to analyse World University Rankings performance, benchmark against peers, and build strategic plans. The redesigned product launched as THE Insights.
          </p>
        </FadeUp>

        <FadeUp delay={0.14} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard value="3,500+" label="Universities using the platform globally" />
          <StatCard value="5"      label="Modules redesigned end-to-end" />
          <StatCard value="2"      label="Products: analytics platform + data collection tool" />
          <StatCard value="1"      label="Unified design system across all modules" />
        </FadeUp>
      </section>

      <FadeUp className="max-w-5xl mx-auto px-6 pb-20">
        <CyanImageBlock src="/images/Datapoint Flow.png" alt="THE DataPoints — full platform overview" />
      </FadeUp>

      <PageDivider />

      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={AlertCircle}>The Problem</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-600 leading-relaxed">
                DataPoints had accumulated years of incremental feature additions with no coherent design system beneath them. Each module had drifted into its own visual language. For university administrators and strategy teams working under time pressure, the platform felt dense, inconsistent, and hard to navigate. The data was there — confidence in reading it wasn't.
              </p>
            </FadeUp>
            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    { n: "01", insight: "Five modules, five visual languages", detail: "No shared components, no consistent hierarchy — every screen felt like a different product." },
                    { n: "02", insight: "Data density without data clarity", detail: "Rankings data was surfaced but not contextualised. Users couldn't quickly answer 'how are we doing?'" },
                    { n: "03", insight: "Submission process was opaque", detail: "Universities submitting annual ranking data had no clear progress, no validation feedback, and no confidence the right data had been sent." },
                  ].map((item, i) => (
                    <div key={item.n}>
                      {i > 0 && <Separator className="bg-stone-200" />}
                      <div className="px-6 py-5 flex gap-4 items-start">
                        <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-cyan-200 bg-cyan-50 text-xs text-cyan-700 font-semibold">{item.n}</span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-800 mb-0.5">{item.insight}</p>
                          <p className="text-sm font-medium text-zinc-600">{item.detail}</p>
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

      <PageDivider />

      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={Search}>Research &amp; Discovery</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-600 leading-relaxed">
                I ran discovery sessions with university strategy leads, data officers, and THE's internal customer success team — the people who fielded support calls when the platform confused users. Analytics showed where sessions dropped off. Moderated walkthroughs revealed the workarounds users had built to compensate for missing affordances.
              </p>
            </FadeUp>

            <FadeUp className="grid grid-cols-3 gap-3">
              {[
                { value: "12+", label: "University stakeholders interviewed across strategy, data, and admin roles" },
                { value: "5",   label: "Modules mapped end-to-end before a single frame was drawn" },
                { value: "3",   label: "Rounds of concept validation before moving to high fidelity" },
              ].map(s => (
                <Card key={s.value} className="shadow-none border border-stone-200 bg-white">
                  <CardContent className="p-5 flex flex-col gap-2">
                    <span className="text-2xl font-bold text-cyan-600">{s.value}</span>
                    <span className="text-xs text-zinc-600 leading-snug">{s.label}</span>
                  </CardContent>
                </Card>
              ))}
            </FadeUp>

            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    { n: "01", insight: "Users navigate by task, not by module", detail: "'I want to see how our Teaching score changed' — not 'I want to go to Analyse Results'." },
                    { n: "02", insight: "Benchmarking was the primary use case", detail: "Comparison against peer institutions drove more sessions than absolute rank tracking." },
                    { n: "03", insight: "Export was often the real goal", detail: "Users frequently arrived to build a board-ready presentation, not to explore data." },
                  ].map((item, i) => (
                    <div key={item.n}>
                      {i > 0 && <Separator className="bg-stone-200" />}
                      <div className="px-6 py-5 flex gap-4 items-start">
                        <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-cyan-200 bg-cyan-50 text-xs text-cyan-700 font-semibold">{item.n}</span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-800 mb-0.5">{item.insight}</p>
                          <p className="text-sm font-medium text-zinc-600">{item.detail}</p>
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

      <PageDivider />

      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={Layers}>The Solution</SectionLabel>
          </FadeUp>
          <div className="space-y-10">
            <FadeUp>
              <p className="text-lg text-zinc-600 leading-relaxed">
                A unified system across five modules — shared components, consistent data hierarchy, and a single visual language. Each module redesigned around the job it needed to do, not the data it happened to hold.
              </p>
            </FadeUp>

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-1">01 — Home Dashboard</p>
              <p className="text-base text-zinc-600 leading-relaxed mb-5">A clear mission-control view: current rankings at a glance, immediate access to the most recent data cycle, and a direct path into each module. Built to answer "how are we doing?" in under ten seconds.</p>
              <GreyImageBlock src="/images/homedashboard.png" alt="Home Dashboard screenshot" />
            </FadeUp>

            <ModuleDivider />

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-1">02 — Analyse Results</p>
              <p className="text-base text-zinc-600 leading-relaxed mb-5">The most data-dense module. Redesigned around benchmarking as the primary use case — persistent filters, peer comparison always visible, metric breakdown surfaced without drill-down. Save to plan and download chart actions inline.</p>
              <GreyImageBlock src="/images/analysisresults.png" alt="Analyse Results screenshot" />
            </FadeUp>

            <ModuleDivider />

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-1">03 — Plan Builder</p>
              <p className="text-base text-zinc-600 leading-relaxed mb-5">A structured workspace for building multi-year strategy plans from ranking data. Sections for performance narrative, targets, and actions — exportable as a self-contained document. Replaced the spreadsheet workarounds strategy teams were using outside the platform.</p>
              <GreyImageBlock src="/images/planbuilder.png" alt="Plan Builder screenshot" />
            </FadeUp>

            <ModuleDivider />

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-1">04 — Export Presentation</p>
              <p className="text-base text-zinc-600 leading-relaxed mb-5">Generate board-ready presentations directly from the platform. Select your metrics, choose your format, download. No reformatting in PowerPoint, no copy-pasting chart screenshots.</p>
              <GreyImageBlock src="/images/exportpresentation.png" alt="Export Presentation screenshot" />
            </FadeUp>

            <ModuleDivider />

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-1">05 — Share Externally</p>
              <p className="text-base text-zinc-600 leading-relaxed mb-5">A controlled sharing layer allowing institutions to surface selected ranking data to external stakeholders — prospective students, partners, accreditation bodies — without exposing the full platform.</p>
              <GreyImageBlock src="/images/shareexternally.png" alt="Share Externally screenshot" />
            </FadeUp>
          </div>
        </SectionGrid>
      </section>

      <PageDivider />

      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={Database}>Data Collection</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Alongside the analytics platform, I designed the Data Collection tool — the annual submission flow used by universities to send their ranking data to THE. Modelled on UK government form design principles: one question per page, clear validation, explicit progress, and a confirmation state that gave submitters confidence the right data had been received.
              </p>
            </FadeUp>
            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    "One question per screen — reduced cognitive load for data officers completing lengthy submissions",
                    "Inline validation — errors surfaced immediately, not on submit",
                    "Explicit progress indicator — users always knew how much was left",
                    "Confirmation state — clear receipt that submission was complete and accepted",
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
            <FadeUp>
              <GreyImageBlock src="/images/gethelpform.png" alt="Data Collection tool — form flow" />
            </FadeUp>
          </div>
        </SectionGrid>
      </section>

      <PageDivider />

      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={TrendingUp}>Impact</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard value="3,500+" label="Universities on the redesigned platform" />
              <StatCard value="5"      label="Modules unified under one design system" />
              <StatCard value="&#8595;" label="Support contacts related to submission errors" />
              <StatCard value="Insights" label="Product launched reflecting the redesign direction" />
            </FadeUp>
            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    "THE subsequently launched THE Insights — the public product reflecting this redesign direction",
                    "First unified component system across the DataPoints platform",
                    "Data Collection redesign reduced submission support contacts",
                    "Export module unlocked a workflow that previously required leaving the platform entirely",
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

      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={RefreshCw}>Reflections</SectionLabel>
          </FadeUp>
          <div className="space-y-10">
            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-4">What I'd do differently</p>
              <Card className="shadow-none bg-white border border-stone-200 border-l-2 border-l-cyan-400 rounded-sm overflow-visible">
                <CardContent className="pl-5 pr-6 py-5">
                  <p className="text-lg font-medium text-zinc-700 leading-relaxed">
                    I left before the product shipped. With more time I'd have pushed harder for a phased rollout — getting one module live early would have given us real usage data to pressure-test the system before committing the full architecture. The design was solid; the risk was in assuming all five modules could land simultaneously.
                  </p>
                </CardContent>
              </Card>
            </FadeUp>
            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-4">What I'd carry forward</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Design the export first — it reveals what the rest of the system needs to produce",
                  "Task-based navigation beats module-based navigation for power users",
                  "Government form patterns work in B2B SaaS — clarity beats sophistication",
                  "A shared component system is only valuable if the team owns it, not just design",
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

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <Separator className="mb-10 bg-stone-200" />
          <FadeUp className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-zinc-500 font-semibold text-sm mb-2">Next</p>
              <h3 className="text-2xl font-bold text-zinc-900">Times Higher Education</h3>
              <p className="text-zinc-600 mt-1">University Profiles — design system &amp; validation</p>
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

    </div>
  )
}
