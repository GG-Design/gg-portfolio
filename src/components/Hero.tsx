import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { AskMe } from "@/components/AskMe"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

const up = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export function Hero() {
  const [question, setQuestion] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)

  function handleSubmit() {
    if (question.trim()) setShowAnswer(true)
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-[#08090a] pt-24 pb-8 px-6 sm:px-8">

      {/* Dotted texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%)",
        }}
      />

      {/* Cyan glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[58%] h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px]"
        style={{
          background: "radial-gradient(circle, rgba(47,200,240,0.18) 0%, transparent 60%)",
        }}
      />

      {/* Card */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] py-12 text-center shadow-[0_40px_120px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] sm:py-14">
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Headline */}
          <motion.div variants={up}>
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#f4f5f7]">
              Lead Product Designer
              <span className="block bg-gradient-to-r from-[#2fc8f0] to-[#7fe0ff] bg-clip-text text-transparent">Design to deployed, with AI.</span>
            </h1>
          </motion.div>

          {/* Subline */}
          <motion.div variants={up}>
            <p className="mx-auto mt-5 max-w-[460px] text-[clamp(0.95rem,2.4vw,1.0625rem)] leading-[1.55] text-[#8b9096]">
              15+ years leading design across fintech, edtech, media &amp; publishing, and e-commerce. I now use AI to go further — from strategy and systems to working prototypes and live products.
            </p>
          </motion.div>

          {/* Command bar */}
          <motion.div variants={up}>
            <div className="mx-auto mt-8 flex max-w-[540px] items-center gap-3 rounded-full border border-white/10 bg-[#0a0c0e]/70 py-3 pl-5 pr-3 transition focus-within:border-[#2fc8f0]/60 focus-within:bg-[#0c1013]/90 focus-within:shadow-[0_0_0_4px_rgba(47,200,240,0.12),0_0_30px_rgba(47,200,240,0.18)]">
              <Sparkles className="text-[#2fc8f0]" size={20} />
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Ask GG anything…"
                className="min-w-0 flex-1 border-none bg-transparent text-base text-[#f4f5f7] shadow-none outline-none placeholder:text-[#8b9096] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <kbd className="text-xs px-2 py-1 rounded-md border border-white/20 bg-white/10 text-muted-foreground font-sans">⌘K</kbd>
            </div>

            {showAnswer && (
              <AskMe
                question={question}
                onClose={() => setShowAnswer(false)}
              />
            )}
          </motion.div>

          {/* CTAs — stacked, centered */}
          <motion.div variants={up} className="mt-6 flex flex-col items-center gap-6">
            <Button variant="secondary" asChild className="gap-2 rounded-full px-7 py-3 text-[15px] font-semibold">
              <a href="#work">View work <ArrowRight className="h-4 w-4" /></a>
            </Button>
            {/* Download CV — spec truncated, preserving existing ghost button */}
            <Button
              asChild
              variant="outline"
              className="rounded-full px-6 border-zinc-700 text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 bg-transparent"
            >
              <a href="/cv.pdf" download>Download CV</a>
            </Button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
