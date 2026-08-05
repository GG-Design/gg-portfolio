import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft, ArrowRight,
  Briefcase, Clock, Users,
  AlertCircle, Search, Layers, RefreshCw,
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

export default function CaseStudyHive() {
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
          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-zinc-900">Hive</span>
        </div>
      </div>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-6 pb-16">
        <Button variant="ghost" size="sm" asChild className="mb-10 -ml-3 text-zinc-500 hover:text-zinc-900 hover:bg-stone-900/5">
          <Link to="/"><ArrowLeft className="w-3.5 h-3.5" />Back</Link>
        </Button>

        <FadeUp className="mb-6 flex flex-wrap gap-2">
          <Tagline lucideIcon={Briefcase} text="Lead Product Designer" />
          <Tagline lucideIcon={Clock}     text="2018" />
          <Tagline lucideIcon={Users}     text="Team of 7 · 2 Designers, 3 Devs, 2 PMs" />
        </FadeUp>

        <FadeUp delay={0.06}>
          <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-6 text-zinc-900">
            Hive
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl leading-relaxed">
            Led the end-to-end redesign of hivehome.com — introducing a subscription-based plan model and migrating the existing user base, across 6 international markets.
          </p>
        </FadeUp>

        <FadeUp delay={0.14} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard value="7"    label="Team led — 2 designers, 3 devs, 2 PMs" />
          <StatCard value="6"    label="International markets supported end-to-end" />
          <StatCard value="1M+"  label="Users reached across all markets" />
          <StatCard value="2018" label="Delivered" />
        </FadeUp>
      </section>

      <FadeUp className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-[#06B6D4] rounded-2xl py-16 px-20 overflow-hidden
                        flex items-center justify-center">
          <img
            src="/images/hive_CHECKOUT_ui.webp"
            alt="Hive — redesigned checkout flow"
            className="w-auto h-auto max-w-full block rounded-lg"
          />
        </div>
      </FadeUp>

      <PageDivider />

      {/* THE PROBLEM */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={AlertCircle}>The Problem</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Hive hired us to redesign hivehome.com end-to-end. The redesign needed to introduce a subscription-based plan model on top of the existing one-off purchase experience, without disrupting or losing the existing user base — across six markets, each with its own product range, pricing and upsell structure.
              </p>
            </FadeUp>
            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    { n: "01", insight: "Migrating, not just launching", detail: "Existing customers needed a clear path onto the new subscription model — this couldn't be designed as if every user was new." },
                    { n: "02", insight: "Six markets, one system", detail: "Product range, pricing and upsells varied by country. The site needed a shared structure that could flex per market without forking the design." },
                    { n: "03", insight: "Multiple stakeholders, one vision", detail: "Head of Web, Brand and Marketing all had a stake in the outcome — alignment had to happen continuously, not just at sign-off." },
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

      {/* RESEARCH */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={Search}>Research & Discovery</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-600 leading-relaxed">
                We started with a competitive analysis and a full website architecture and sitemap exercise, then ran user labs to validate the proposed structure — building personas and analysing existing behavioural data to ground decisions in evidence rather than assumption.
              </p>
            </FadeUp>

            <FadeUp>
              <div className="bg-white rounded-2xl p-10 overflow-hidden flex items-center justify-center border border-stone-200">
                <img
                  src="/images/hive_sitemap+UK.webp"
                  alt="Hive — UK sitemap and website architecture"
                  className="w-auto h-auto max-w-full mx-auto"
                />
              </div>
            </FadeUp>

            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    { n: "01", insight: "Competitive audit shaped the architecture", detail: "Mapping competitor sitemaps first meant our own architecture started from what already worked in the category, not a blank page." },
                    { n: "02", insight: "User labs surfaced real behaviour", detail: "Lab sessions and personas grounded the subscription and migration flows in how people actually shopped, not how we assumed they would." },
                    { n: "03", insight: "Data validated the plan", detail: "Reviewing existing analytics before committing to the new structure caught assumptions that didn't hold up." },
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

      {/* THE SOLUTION */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={Layers}>The Solution</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-600 leading-relaxed">
                From the sitemap and research, I drew the core user flows — the key challenge being how to introduce the subscription plan model and migrate existing users onto it without a jarring transition. Wireframes were built in Sketch, then taken to high-fidelity UI, backed by a modular component system built to handle per-country product variations, pricing and upsells across all six markets.
              </p>
            </FadeUp>

            <FadeUp>
              <div className="bg-white rounded-2xl p-10 overflow-hidden flex items-center justify-center border border-stone-200">
                <img
                  src="/images/hive_byo+wireframes.webp"
                  alt="Hive — wireframes"
                  className="w-auto h-auto max-w-full mx-auto"
                />
              </div>
            </FadeUp>

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-3">What shipped</p>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    "User flows for the new subscription plan model and existing-user migration",
                    "Wireframes in Sketch, refined into high-fidelity UI",
                    "A modular component system handling per-country product, pricing and upsell variation",
                    "Redesigned checkout flow across all six markets",
                  ].map((item, i) => (
                    <div key={i}>
                      {i > 0 && <Separator className="bg-stone-200" />}
                      <div className="px-6 py-4 flex items-center gap-4">
                        <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-cyan-200 bg-cyan-50 text-xs text-cyan-700 font-semibold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
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

      <PageDivider />

      {/* TEAM & PROCESS */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={Users}>Team & Process</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-lg text-zinc-600 leading-relaxed">
                I managed a design team of a product designer, a digital designer and a UX researcher, working alongside 3 developers and 2 PMs. Stakeholder alignment ran throughout — regular meetings with the Head of Web, Brand and Marketing kept the redesign consistent with brand direction, and close collaboration with engineering and QA made sure design guidelines held up all the way to release.
              </p>
            </FadeUp>
          </div>
        </SectionGrid>
      </section>

      <PageDivider />

      {/* REFLECTIONS */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={RefreshCw}>Reflections</SectionLabel>
          </FadeUp>
          <div className="space-y-10">
            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-4">What I'd carry forward</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Modular components pay off fastest when variation across markets is unavoidable, not optional",
                  "Migrating existing users onto a new model needs its own dedicated flow — it can't be an afterthought to the new-user journey",
                  "Aligning Brand, Marketing and Web stakeholders early avoids late-stage rework",
                  "Sitemap and architecture work upfront makes every downstream decision faster",
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

      {/* FOOTER */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <Separator className="mb-10 bg-stone-200" />
          <FadeUp className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-zinc-500 font-semibold text-sm mb-2">Next</p>
              <h3 className="text-2xl font-bold text-zinc-900">GlintPay</h3>
              <p className="text-zinc-600 mt-1">GlintPay App redesign</p>
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

    </div>
  )
}
