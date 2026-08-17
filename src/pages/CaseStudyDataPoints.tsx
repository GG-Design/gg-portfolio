import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft, ArrowRight,
  Briefcase, Clock, Users,
  AlertCircle, Search, Layers, TrendingUp, RefreshCw, Database, Presentation, ExternalLink,
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

function CyanImageBlock({ src, alt, onOpen }: { src: string; alt: string; onOpen: (src: string, alt: string) => void }) {
  return (
    <div className="bg-[#06B6D4] rounded-2xl py-16 px-20 overflow-hidden flex items-center justify-center">
      <img src={src} alt={alt} onClick={() => onOpen(src, alt)} className="w-auto h-auto max-w-full block cursor-zoom-in" />
    </div>
  )
}

function GreyImageBlock({ src, alt, onOpen }: { src: string; alt: string; onOpen: (src: string, alt: string) => void }) {
  return (
    <div className="bg-zinc-100 rounded-2xl p-12 overflow-hidden flex items-center justify-center">
      <img src={src} alt={alt} onClick={() => onOpen(src, alt)} className="w-auto h-auto max-w-full block rounded-sm cursor-zoom-in" />
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
          <h1 className="text-4xl md:text-6xl font-bold leading-none tracking-tight mb-6 text-zinc-900">
            THE DataPoints &amp; Insights
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl leading-relaxed">
            Redesigned THE's analytics platform end-to-end. 3,500+ universities use it to track their rankings performance, benchmark against peers and build strategy plans.
          </p>
        </FadeUp>

      </section>

      <FadeUp className="max-w-5xl mx-auto px-6 pb-12">
        <CyanImageBlock src="/images/DatapointFlow.png" alt="THE DataPoints — full platform overview" onOpen={lightbox.open} />
      </FadeUp>

      <FadeUp delay={0.14} className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard value="3,500+" label="Universities using the platform globally" />
        <StatCard value="5"      label="Modules redesigned end-to-end" />
        <StatCard value="2"      label="Products: analytics platform + data collection tool" />
        <StatCard value="1"      label="Unified design system across all modules" />
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
                DataPoints had been built up over years with no shared design language. Every module looked like a different product. For university administrators and planning teams working under time pressure, the platform felt dense and hard to navigate. The data was all there but nobody trusted what they were reading.
              </p>
            </FadeUp>
            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    { n: "01", insight: "Five modules, five visual languages", detail: "No shared components, no consistent hierarchy — every screen felt like a different product." },
                    { n: "02", insight: "Data density without data clarity", detail: "Rankings were surfaced but not explained. Users couldn't quickly answer 'how are we doing?'" },
                    { n: "03", insight: "Submissions felt like a black hole", detail: "Universities sending their annual data had no progress indicator, no validation, and no confidence it had actually been received." },
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
                I ran sessions with university strategy leads, planning teams, and THE's customer success team who fielded the support calls when the platform confused people. Analytics showed where sessions dropped off. Walkthroughs with users revealed the workarounds they'd built because the interface wasn't giving them what they needed.
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
                    { n: "01", insight: "Users navigate by task, not by module", detail: "'How did our Teaching score change?' not 'Let me go to Analyse Results.'" },
                    { n: "02", insight: "Benchmarking was the primary use case", detail: "Comparing against peers drove more sessions than checking absolute rank." },
                    { n: "03", insight: "Export was often the real goal", detail: "Most users came to build something for a board presentation, not to explore data. They were screenshotting charts and pasting them into PowerPoint because the platform had no export." },
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
            <SectionLabel lucideIcon={Presentation}>Stakeholder Presentation</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-600 leading-relaxed">
                I built an interactive prototype to present the redesign rationale to stakeholders. Each module includes the opportunity, the problem to solve, and hypotheses to validate before committing to the solution.
              </p>
            </FadeUp>

            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="px-6 py-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-zinc-800 mb-0.5">Stakeholder presentation</p>
                    <p className="text-sm text-zinc-500">Interactive Figma presentation showing opportunity, problems and hypotheses for each module</p>
                  </div>
                  <a
                    href="https://www.figma.com/proto/SN3itdWM1PmzWTTp1kXZ6j/DataPoints---redesign?node-id=300-10484&p=f&m=draw&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=300%3A10484&page-id=300%3A4146"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
                  >
                    View presentation
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
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
                I unified the system across five modules with shared components, consistent data hierarchy and a single visual language. Each module was redesigned around what users actually came to do, not what data happened to live there.
              </p>
            </FadeUp>

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-1">01 — Home Dashboard</p>
              <p className="text-base text-zinc-600 leading-relaxed mb-5">Current rankings at a glance, most recent data cycle, direct path into each module. Built to answer "how are we doing?" in under ten seconds.</p>
              <GreyImageBlock src="/images/homedashboard.png" alt="Home Dashboard screenshot" onOpen={lightbox.open} />
            </FadeUp>

            <ModuleDivider />

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-1">02 — Analyse Results</p>
              <p className="text-base text-zinc-600 leading-relaxed mb-5">The most data-heavy module. Redesigned around benchmarking as the primary use case: persistent filters, peer comparison always visible, metric breakdowns without drilling down. Save and download inline.</p>
              <GreyImageBlock src="/images/analysisresults.png" alt="Analyse Results screenshot" onOpen={lightbox.open} />
            </FadeUp>

            <ModuleDivider />

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-1">03 — Plan Builder</p>
              <p className="text-base text-zinc-600 leading-relaxed mb-5">A workspace for building multi-year strategy plans from ranking data. Replaced the spreadsheet workarounds planning teams were using outside the platform. Exportable as a standalone document.</p>
              <GreyImageBlock src="/images/planbuilder.png" alt="Plan Builder screenshot" onOpen={lightbox.open} />
            </FadeUp>

            <ModuleDivider />

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-1">04 — Export Presentation</p>
              <p className="text-base text-zinc-600 leading-relaxed mb-5">Generate board-ready presentations directly from the platform. Pick your metrics, choose your format, download. No more screenshotting charts into PowerPoint.</p>
              <GreyImageBlock src="/images/exportpresentation.png" alt="Export Presentation screenshot" onOpen={lightbox.open} />
            </FadeUp>

            <ModuleDivider />

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-1">05 — Share Externally</p>
              <p className="text-base text-zinc-600 leading-relaxed mb-5">A sharing layer that lets institutions surface selected ranking data to external audiences without exposing the full platform.</p>
              <GreyImageBlock src="/images/shareexternally.png" alt="Share Externally screenshot" onOpen={lightbox.open} />
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
                I also designed the Data Collection tool, the annual submission flow universities use to send ranking data to THE. I modelled it on UK government form patterns: one question per page, clear validation, visible progress, and a confirmation state so submitters knew the right data had been received.
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
              <GreyImageBlock src="/images/gethelpform.png" alt="Data Collection tool — form flow" onOpen={lightbox.open} />
            </FadeUp>

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-4">AI enhancements</p>
              <Card className="shadow-none bg-white border border-stone-200 border-l-2 border-l-cyan-400 rounded-sm overflow-visible">
                <CardContent className="pl-5 pr-6 py-5">
                  <p className="text-lg font-medium text-zinc-700 leading-relaxed">
                    I designed AI-generated summary boxes into the rankings views, surfacing strengths and weaknesses automatically from each institution's data. This was scoped as a premium upgrade to drive revenue from higher-tier subscriptions.
                  </p>
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
                    I left before the product shipped. Given more time I'd have pushed for a phased rollout, getting one module live early to test the system with real usage data before committing to the full architecture.
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
              <h3 className="text-2xl font-bold text-zinc-900">GlintPay</h3>
              <p className="text-zinc-600 mt-1">iOS &amp; Android end-to-end redesign</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-zinc-500 hover:text-zinc-900 hover:bg-stone-900/5">
              <Link to="/work/glintpay">
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
