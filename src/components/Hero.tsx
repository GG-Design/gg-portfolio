import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { AskMe } from "@/components/AskMe"

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

      {/* Radial gradient for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-6 pt-2 md:pt-4">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center gap-6 w-full">

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
          <motion.div variants={up} className="flex flex-col items-center gap-2 max-w-xl">
            <p className="text-xl text-zinc-300 font-light leading-relaxed text-center">
              15+ years leading design across fintech, edtech, media & publishing, and e-commerce. I now use AI to go further — from strategy and systems to working prototypes and live products.
            </p>
          </motion.div>

          {/* AI input bar */}
          <motion.div variants={up} className="w-full max-w-xl">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-full bg-zinc-900 border border-cyan-400/40 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-all cursor-text group"
              style={{ animation: "borderPulse 3s ease-in-out infinite" }}
            >
              <Sparkles className="w-4 h-4 text-zinc-500 flex-shrink-0 group-hover:text-zinc-400 transition-colors" />
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Ask GG anything..."
                style={{ fontSize: "16px" }}
                className="flex-1 text-zinc-300 placeholder:text-zinc-500 bg-transparent outline-none"
              />
              <button
                onClick={handleSubmit}
                className="hidden sm:inline-flex text-xs text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full flex-shrink-0"
              >
                Ask GG
              </button>
            </div>

            {showAnswer && (
              <AskMe
                question={question}
                onClose={() => setShowAnswer(false)}
              />
            )}
          </motion.div>

          {/* Featured work row */}
          <motion.div
            variants={fadeIn}
            className="w-full max-w-xl flex items-center justify-between pt-2"
          >
            <span className="text-xs tracking-[0.18em] uppercase text-zinc-600 font-light">
              Featured Work
            </span>
            <a
              href="#work"
              className="text-xs text-zinc-500 hover:text-zinc-50 transition-colors"
            >
              View all →
            </a>
          </motion.div>

        </motion.div>
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
