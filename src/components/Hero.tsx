import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { AskMe } from "@/components/AskMe"
import { Button } from "@/components/ui/button"

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

const up = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease } },
}

export function Hero() {
  const [question, setQuestion] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)

  function handleSubmit() {
    if (question.trim()) setShowAnswer(true)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-16">

      {/* Dotted texture — radial-gradient dots masked to fade at edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0
                   [background-image:radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)]
                   [background-size:22px_22px]
                   [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]
                   [-webkit-mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]"
      />

      {/* Radial vignette for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Hero card surface */}
      <div className="relative w-full max-w-[720px] mx-auto px-4">
        <div
          className="rounded-3xl border border-white/10
                     bg-gradient-to-b from-white/[0.07] to-white/[0.02]
                     shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]
                     px-8 py-12 md:px-12 md:py-16"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-6 w-full text-center"
          >

            {/* Headline */}
            <motion.div variants={up} className="flex flex-col items-center gap-1">
              <h1 className="text-4xl md:text-[4.25rem] font-bold leading-[1.05] tracking-tight text-zinc-50">
                Lead Product Designer
              </h1>
              <h1 className="text-4xl md:text-[4.25rem] font-bold leading-[1.05] tracking-tight text-cyan-400">
                Design to deployed,<br />with AI.
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={up} className="max-w-xl">
              <p className="text-xl text-zinc-300 font-light leading-relaxed text-center">
                15+ years leading design across fintech, edtech, media &amp; publishing, and e-commerce. I now use AI to go further — from strategy and systems to working prototypes and live products.
              </p>
            </motion.div>

            {/* Ask GG bar — constrained + cyan glow + ⌘K chip */}
            <motion.div variants={up} className="relative w-full max-w-[540px] mx-auto">

              {/* Cyan glow pool behind the bar */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2
                           w-[440px] h-[72px] rounded-full bg-cyan-400/[0.12] blur-[48px]"
              />

              <div className="relative flex items-center gap-3 px-4 py-3 rounded-full bg-zinc-900 border border-zinc-700 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/40 transition-all cursor-text group">
                <Sparkles className="w-4 h-4 text-zinc-500 flex-shrink-0 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="Ask GG anything..."
                  className="flex-1 text-base text-zinc-300 placeholder:text-zinc-500 bg-transparent outline-none"
                />
                {/* ⌘K key-hint chip */}
                <span className="hidden sm:inline-flex items-center text-[11px] font-mono text-zinc-500 border border-zinc-700 rounded-md px-1.5 py-0.5 leading-none select-none">
                  ⌘K
                </span>
              </div>

              {showAnswer && (
                <AskMe
                  question={question}
                  onClose={() => setShowAnswer(false)}
                />
              )}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={up} className="flex items-center justify-center gap-3">
              <Button
                asChild
                className="rounded-full px-6 bg-zinc-50 hover:bg-white text-zinc-900 font-semibold"
              >
                <a href="#work">View work</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 border-zinc-700 text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 bg-transparent"
              >
                <a href="/cv.pdf" download>Download CV</a>
              </Button>
            </motion.div>

            {/* Featured work label */}
            <motion.div
              variants={fadeIn}
              className="w-full flex items-center justify-center pt-2"
            >
              <span className="text-xs tracking-[0.18em] uppercase text-zinc-600 font-light">
                Featured Work
              </span>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, #52525b, transparent)" }}
        />
      </motion.div>
    </section>
  )
}
