import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft, ArrowRight,
  Briefcase, Clock, Users,
  AlertCircle, Search, Layers, TrendingUp, RefreshCw, ExternalLink,
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

export default function CaseStudyCurrencyPay() {
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
          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-zinc-900">NatWest CurrencyPay</span>
        </div>
      </div>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-6 pb-16">
        <Button variant="ghost" size="sm" asChild className="mb-10 -ml-3 text-zinc-500 hover:text-zinc-900 hover:bg-stone-900/5">
          <Link to="/"><ArrowLeft className="w-3.5 h-3.5" />Back</Link>
        </Button>

        <FadeUp className="mb-6 flex flex-wrap gap-2">
          <Tagline lucideIcon={Briefcase} text="Lead Product Designer" />
          <Tagline lucideIcon={Clock} text="Contract" />
          <Tagline lucideIcon={Users} text="PM · iOS · Android · Compliance" />
        </FadeUp>

        <FadeUp delay={0.06}>
          <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-6 text-zinc-900">
            NatWest<br />CurrencyPay
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl leading-relaxed">
            Designed the end-to-end KYC onboarding flow for NatWest's CurrencyPay — a regulated FX mobile app for iOS and Android. The challenge was meeting compliance requirements without the registration experience feeling like a compliance process.
          </p>
        </FadeUp>

        <FadeUp delay={0.14} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard value="20"    label="Screens across the full registration flow" />
          <StatCard value="2"     label="Platforms: iOS and Android" />
          <StatCard value="3"     label="Competitors audited: Revolut, TransferWise, Monzo" />
          <StatCard value="Jumio" label="Identity verification provider integrated into the flow" />
        </FadeUp>

        {/* Prototype CTA */}
        <FadeUp delay={0.2} className="mt-8">
          <a
            href="https://currencypayregistration.netlify.app/#/screens"
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
            src="/images/natwestkycflow.png"
            alt="NatWest CurrencyPay — KYC flow"
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
                CurrencyPay was entering a market where Monzo, Revolut, and TransferWise had already reset user expectations for financial app onboarding. The product needed to satisfy FCA-regulated KYC requirements — identity documents, selfie capture, device registration, passcode setup — while feeling as frictionless as the consumer neobanks users were comparing it to.
              </p>
            </FadeUp>
            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    { n: "01", insight: "Compliance can't look like compliance", detail: "Every required step — camera permissions, document capture, passcode — needed to feel purposeful and guided, not bureaucratic." },
                    { n: "02", insight: "Third-party handoffs break trust", detail: "Jumio identity verification is a necessary integration — but an abrupt context switch at the most sensitive moment would cause drop-off." },
                    { n: "03", insight: "Two platforms, one experience", detail: "iOS and Android users needed identical confidence and flow parity despite platform-level differences in permissions UX." },
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
                I ran a competitive audit of Revolut, TransferWise, and Monzo — mapping every step of their registration and identity verification flows. The focus was on how each handled the highest-friction moments: permission requests, document upload, selfie capture, and the wait state after submission.
              </p>
            </FadeUp>

            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    { n: "01", insight: "Monzo's model was the benchmark", detail: "One ask per screen, clear rationale for each permission, no dead ends. We used this as the structural reference." },
                    { n: "02", insight: "Revolut front-loaded friction", detail: "Document upload appeared earlier in the flow, causing higher drop-off before users had established trust with the product." },
                    { n: "03", insight: "TransferWise over-explained", detail: "Lengthy copy on permission screens slowed momentum. Users scan — they don't read." },
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
                A 20-screen progressive registration flow modelled on Monzo's one-ask-per-screen principle. Each permission request was framed around user benefit, not legal obligation. The Jumio identity capture step was wrapped in native UI so it felt continuous rather than like a third-party handoff.
              </p>
            </FadeUp>

            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-3">Flow stages</p>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    "Get started — brand splash establishing context before any asks",
                    "Notifications — permission framed as 'payment authentication', not marketing",
                    "Camera — permission framed around QR device registration and photo ID",
                    "Register device — QR code scan linking mobile to web account",
                    "Passcode — 6-digit setup with clear security rationale",
                    "Take a photo — Jumio selfie capture wrapped in guided native UI",
                    "Confirmation — clear 'your account is being reviewed' end state",
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

            {/* Prototype link inline */}
            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="px-6 py-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-zinc-800 mb-0.5">Interactive prototype</p>
                    <p className="text-sm text-zinc-500">Full clickable flow — iOS registration end-to-end</p>
                  </div>
                  <a
                    href="https://currencypayregistration.netlify.app/#/screens"
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

      <PageDivider />

      {/* REFLECTIONS */}
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
                    The Jumio integration was a constraint we designed around, not with. Given more access to the SDK I'd have pushed for deeper visual customisation of the capture step — the one moment where the seam between native and third-party was most visible.
                  </p>
                </CardContent>
              </Card>
            </FadeUp>
            <FadeUp>
              <p className="text-zinc-500 font-semibold text-sm mb-4">What I'd carry forward</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Frame every permission around user benefit — never legal necessity",
                  "One ask per screen is slower to build and faster to complete",
                  "The wait state after document submission is a trust moment — design it carefully",
                  "Competitive audits are most useful when you map the emotional low points, not just the steps",
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

    </div>
  )
}
