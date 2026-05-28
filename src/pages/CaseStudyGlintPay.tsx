import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft, ArrowRight,
  Briefcase, Clock, Users,
  AlertCircle, GitBranch, Layers, TrendingUp, Lightbulb,
  SlidersHorizontal, ShieldCheck, LayoutDashboard, Zap,
  type LucideIcon,
} from "lucide-react"
import { Tagline }           from "@/components/ui/tagline"
import { Button }            from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress }          from "@/components/ui/progress"
import { Separator }         from "@/components/ui/separator"

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

// ─── Metric card ─────────────────────────────────────────────────────────────

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

// ─── Two-column section layout ────────────────────────────────────────────────

function SectionGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[180px_1fr] gap-8 md:gap-16">
      {children}
    </div>
  )
}

// ─── Page divider ─────────────────────────────────────────────────────────────

function PageDivider() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <Separator className="bg-stone-200" />
    </div>
  )
}

// ─── Image placeholder (dashed border, zinc-100) ─────────────────────────────

function PlaceholderBlock({ label, ratio = "16/9" }: { label: string; ratio?: string }) {
  return (
    <div
      className="w-full rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-100
                 overflow-hidden flex items-center justify-center"
      style={{ aspectRatio: ratio, minHeight: "160px" }}
    >
      <span className="text-zinc-400 font-mono text-xs tracking-wide select-none">{label}</span>
    </div>
  )
}

// ─── Cyan placeholder (final design showcase) ─────────────────────────────────

function CyanPlaceholderBlock({ label }: { label: string }) {
  return (
    <div
      className="w-full bg-[#06B6D4] rounded-2xl py-16 px-20 overflow-hidden
                 flex items-center justify-center"
      style={{ minHeight: "240px" }}
    >
      <span className="text-cyan-900/50 font-mono text-xs tracking-wide select-none">{label}</span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CaseStudyGlintPay() {
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
          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-zinc-900">
            GlintPay
          </span>
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
          <Tagline lucideIcon={Clock}     text="12 months" />
          <Tagline lucideIcon={Users}     text="1 PM · 1 User Researcher · 2 FE · 1 BE" />
        </FadeUp>

        {/* Title + subtitle */}
        <FadeUp delay={0.06}>
          <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-6 text-zinc-900">
            GlintPay
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl leading-relaxed">
            Redesigned the iOS and Android apps end-to-end — making spending from gold feel
            obvious, safe and fast.
          </p>
        </FadeUp>

        {/* Stat cards */}
        <FadeUp delay={0.14} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard value="3 wallets"     label="Gold, GBP and USD unified in one dashboard" />
          <StatCard value="2 platforms"   label="iOS and Android, same behaviour, platform‑native feel" />
          <StatCard value="1 interaction" label="Hidden swipe replaced with explicit modal switcher" />
          <StatCard value="0 dead ends"   label="Streamlined KYC with clear progress and fewer drop-offs" />
        </FadeUp>

        <FadeUp className="mt-8">
          <div className="bg-[#06B6D4] rounded-xl p-16 flex items-center justify-center">
            <img
              src="/images/glint.png"
              alt="GlintPay app"
              className="w-auto h-auto max-w-full mx-auto"
            />
          </div>
        </FadeUp>
      </section>

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
              <p className="text-xl font-semibold text-zinc-900 mb-3">
                The Glint dilemma: making spending from gold feel obvious and safe
              </p>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Glint's card lets people spend from Gold, GBP, or USD — but the legacy app hid the
                control behind a horizontal swipe. Onboarding was branched and unpredictable, and
                day‑one actions sat below the fold. I rebuilt the core so it's clear where money
                comes from, simple to get started, and consistent across iOS and Android.
              </p>
            </FadeUp>

            {/* Constraint cards */}
            <FadeUp className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  icon:  <Layers size={24} className="text-zinc-900 mb-4" />,
                  label: "Comprehensive",
                  desc:  "Cover essentials for day‑one success: funding, spending, exchanging, and card control — without detours.",
                },
                {
                  icon:  <GitBranch size={24} className="text-zinc-900 mb-4" />,
                  label: "Scalable",
                  desc:  "Support multiple wallets (Gold/GBP/USD) and markets, reuse the same truth across dashboard, exchange, and card settings.",
                },
                {
                  icon:  <SlidersHorizontal size={24} className="text-zinc-900 mb-4" />,
                  label: "Adjustable",
                  desc:  "Allow safe customisation (limits, source switching, education banners) and future personalisation without UX debt.",
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

      <PageDivider />

      {/* ══════════════════════════════════════════════════════════════════
          USER NEEDS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={Users}>User Needs</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-xl font-semibold text-zinc-900 mb-3">
                What people needed to feel in control
              </p>
              <p className="text-lg text-zinc-600 leading-relaxed">
                We interviewed existing and prospective users and reviewed support tickets to
                understand how trust is earned in a gold‑backed spending app.
              </p>
            </FadeUp>

            {/* 4 numbered needs */}
            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    { n: "01", insight: "Predictable verification", detail: "Linear KYC with clear progress and realistic time‑to‑complete." },
                    { n: "02", insight: "Explicit control",         detail: "Visible selector for card spending source with confirmation." },
                    { n: "03", insight: "Fast first action",        detail: "Primary CTAs reachable in one tap, predictable outcomes." },
                    { n: "04", insight: "Inline clarity",           detail: 'Contextual hints (e.g., "Card spends from: Gold Wallet") over generic help.' },
                  ].map((item, i) => (
                    <div key={item.n}>
                      {i > 0 && <Separator className="bg-stone-200" />}
                      <div className="px-6 py-5 flex gap-4 items-start">
                        <span className="shrink-0 inline-flex items-center justify-center
                                         w-8 h-8 rounded-lg border border-cyan-200
                                         bg-cyan-50 text-xs text-cyan-700 font-semibold">
                          {item.n}
                        </span>
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

            <FadeUp>
              <div className="bg-white rounded-xl p-16 flex items-center justify-center">
                <img
                  src="/images/GlintpayFlow.png"
                  alt="KYC flow and source selector"
                  className="w-auto h-auto max-w-full mx-auto"
                />
              </div>
            </FadeUp>
          </div>
        </SectionGrid>
      </section>

      <PageDivider />

      {/* ══════════════════════════════════════════════════════════════════
          EXPLORATION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={GitBranch}>Exploration</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-xl font-semibold text-zinc-900 mb-3">
                Choosing the dashboard pattern
              </p>
              <p className="text-lg text-zinc-600 leading-relaxed">
                The core problem was how to make the card‑linked currency unmistakable on the Home
                screen. Research showed people missed the current source and didn't trust the hidden
                interaction.
              </p>
            </FadeUp>

            {/* Option cards */}
            <FadeUp className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-none border border-stone-200 bg-white rounded-2xl">
                <CardContent className="p-6 flex flex-col gap-3">
                  <p className="text-sm font-semibold text-zinc-800">Option A — Swipe‑to‑link (legacy)</p>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Users had to horizontally swipe the wallet list to change which currency the card
                    used. In testing, the gesture was non‑discoverable and easy to forget; several
                    participants changed sources by accident.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-none border border-stone-200 bg-white rounded-2xl">
                <CardContent className="p-6 flex flex-col gap-3">
                  <p className="text-sm font-semibold text-zinc-800">Option B — Modal switcher (chosen)</p>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    A visible control opens a modal with all wallets (GBP, Gold, USD, EUR). Selecting
                    a wallet shows a brief explanation and a confirmation step — making state explicit
                    and reducing errors.
                  </p>
                </CardContent>
              </Card>
            </FadeUp>

            <FadeUp>
              <div className="bg-white rounded-2xl p-16 flex items-center justify-center">
                <img
                  src="/images/glintframesoptions.png"
                  alt="Dashboard exploration — option A vs option B"
                  className="w-auto h-auto max-w-full mx-auto"
                />
              </div>
            </FadeUp>

            {/* Outcome tags */}
            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    { label: "Clarity",    desc: "The modal is explicit and visible. The previous swipe was non‑intuitive and hidden." },
                    { label: "Affordance", desc: 'Clear control + "Linked" treatment makes it immediately clear which card is linked to which currency.' },
                    { label: "Visibility", desc: "Wallet cards on Home show each currency with its amount, reinforcing trust before spending." },
                  ].map((item, i) => (
                    <div key={item.label}>
                      {i > 0 && <Separator className="bg-stone-200" />}
                      <div className="px-6 py-4 flex items-start gap-4">
                        <span className="text-sm font-semibold text-zinc-800 shrink-0 min-w-[90px]">
                          {item.label}
                        </span>
                        <span className="text-sm text-zinc-600 leading-relaxed">{item.desc}</span>
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

      {/* ══════════════════════════════════════════════════════════════════
          FINAL DESIGN
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={Layers}>Final Design</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-xl font-semibold text-zinc-900 mb-3">What shipped</p>
              <p className="text-lg text-zinc-600 leading-relaxed">
                A clear dashboard with a persistent Card spends from control, and a predictable
                onboarding flow.
              </p>
            </FadeUp>

            <FadeUp>
              <div className="bg-[#06B6D4] rounded-2xl p-16 overflow-hidden
                              flex items-center justify-center">
                <img
                  src="/images/glint screens.png"
                  alt="Final design — dashboard and card linking flow"
                  className="w-auto h-auto max-w-full mx-auto block"
                />
              </div>
            </FadeUp>

            {/* Shipped items */}
            <FadeUp>
              <Card className="shadow-none border border-stone-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {[
                    { n: "01", label: "Dashboard header",   desc: "Balances + Card spends from (Gold | GBP | USD) + primary CTAs (Add Money, Spend, Exchange)" },
                    { n: "02", label: "KYC & registration", desc: "Streamlined checks with clear progress, fewer dead ends and faster first access." },
                    { n: "03", label: "System",             desc: "Shared components and tokens across iOS and Android — same behaviour, platform‑native feel." },
                  ].map((item, i) => (
                    <div key={item.n}>
                      {i > 0 && <Separator className="bg-stone-200" />}
                      <div className="px-6 py-4 flex items-start gap-4">
                        <span className="shrink-0 inline-flex items-center justify-center
                                         w-8 h-8 rounded-lg border border-cyan-200
                                         bg-cyan-50 text-xs text-cyan-700 font-semibold">
                          {item.n}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-800 mb-0.5">{item.label}</p>
                          <p className="text-sm text-zinc-600">{item.desc}</p>
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

      {/* ══════════════════════════════════════════════════════════════════
          IMPACT
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={TrendingUp}>Impact</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-xl font-semibold text-zinc-900 mb-3">Outcomes</p>
            </FadeUp>
            <FadeUp className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  icon:  <ShieldCheck size={24} className="text-zinc-900 mb-4" />,
                  label: "Clarity & trust",
                  desc:  "Switching from a hidden swipe to a modal plus confirm made the card‑linked currency explicit. The persistent Card spends from: label removed doubt and increased confidence before spending.",
                },
                {
                  icon:  <LayoutDashboard size={24} className="text-zinc-900 mb-4" />,
                  label: "Control on Home",
                  desc:  "Putting Add Money, Spend, Exchange on the Home screen gave people immediate control of key actions.",
                },
                {
                  icon:  <Zap size={24} className="text-zinc-900 mb-4" />,
                  label: "Activation speed",
                  desc:  "With source and balances visible on entry, more users completed add → spend in the same session.",
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
          LEARNINGS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <SectionGrid>
          <FadeUp className="self-start">
            <SectionLabel lucideIcon={Lightbulb}>Learnings</SectionLabel>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <p className="text-xl font-semibold text-zinc-900 mb-3">What changed my mind</p>
              <Card
                className="shadow-none bg-white border border-stone-200 border-l-2 border-l-cyan-400
                           rounded-sm overflow-visible"
              >
                <CardContent className="pl-5 pr-6 py-5">
                  <p className="text-lg font-medium text-zinc-700 leading-relaxed">
                    Patterns that seem efficient (gestures, branching) often erode trust when
                    controls are safety‑critical.
                  </p>
                </CardContent>
              </Card>
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
              <h3 className="text-2xl font-bold text-zinc-900">Times Higher Education</h3>
              <p className="text-zinc-600 mt-1">University Profiles — first design system, validated with 700+ students</p>
            </div>
            <Button variant="ghost" size="sm" asChild
              className="text-zinc-500 hover:text-zinc-900 hover:bg-stone-900/5"
            >
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
