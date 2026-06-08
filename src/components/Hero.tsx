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
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-transparent px-6 pt-16">

      {/* Radial gradient for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Ambient cyan glow — always visible, static, behind the Ask GG bar */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[62%] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(47,200,240,0.15) 0%, transparent 60%)" }}
      />

      <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-6 pt-2 md:pt-4">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center gap-6 w-full">

          {/* Headline */}
          <motion.div variants={up} className="flex flex-col items-center gap-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[#f4f5f7]">
              Lead Product Designer
              <span className="block bg-gradient-to-r from-[#2fc8f0] to-[#7fe0ff] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] pb-3">Design to deployed, with AI.</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={up} className="flex flex-col items-center gap-2 max-w-xl">
            <p className="text-xl text-zinc-300 font-light leading-relaxed text-center">
              15+ years leading design across fintech, edtech, media & publishing, and e-commerce. I now use AI to go further — from strategy and systems to working prototypes and live products.
            </p>
          </motion.div>

          {/* Ask GG bar */}
          <motion.div variants={up} className="w-full max-w-xl">
            <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-zinc-900 border border-white/10 transition-all focus-within:border-cyan-400/60 focus-within:ring-2 focus-within:ring-cyan-400/20">
              <Sparkles size={18} className="text-[#2fc8f0] flex-shrink-0" />
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Ask me anything about my work..."
                className="flex-1 bg-transparent border-none shadow-none text-zinc-300 placeholder:text-zinc-500 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ fontSize: "16px" }}
              />
              <Button onClick={handleSubmit} className="shrink-0 rounded-full bg-white/[0.08] px-4 py-1.5 text-sm font-medium text-white/70 hover:bg-white/[0.15] hover:text-white transition-all duration-150">Ask GG</Button>
            </div>

            {showAnswer && (
              <AskMe
                question={question}
                onClose={() => setShowAnswer(false)}
              />
            )}
          </motion.div>

          {/* CTAs — stacked, centered, equal gap */}
          <motion.div variants={fadeIn} className="flex flex-col items-center gap-6 w-full">
            <Button
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[15px] font-semibold text-[#0a0a0a] transition hover:-translate-y-px hover:bg-white/90"
              onClick={() => {
                const el = document.getElementById("work")
                const w = window as typeof window & { __lenis?: { scrollTo: (el: Element) => void } }
                if (w.__lenis && el) w.__lenis.scrollTo(el)
                else el?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              View work
              <ArrowRight size={16} />
            </Button>
            <Button variant="outline" asChild>
              <a href="/cv.pdf">Download CV</a>
            </Button>
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
