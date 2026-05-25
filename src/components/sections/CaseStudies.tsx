import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

/* ─── card data ───────────────────────────────────────────────────── */
interface CardData {
  tagline:    string
  category:   string
  title:      string
  bg:         string
  titleColor: string
  arrowColor: string
  metaColor:  string
  metaBorder: string
  imageBg:    string
}

const cards: CardData[] = [
  {
    tagline:    "Design System · 40% faster delivery",
    category:   "SaaS · EdTech",
    title:      "Times Higher Education",
    bg:         "#e8e4dc",
    titleColor: "text-zinc-900",
    arrowColor: "text-zinc-900",
    metaColor:  "text-zinc-900/60",
    metaBorder: "border-zinc-900/15",
    imageBg:    "bg-zinc-800",
  },
  {
    tagline:    "iOS & Android · End-to-end redesign",
    category:   "Fintech · Mobile",
    title:      "GlintPay",
    bg:         "#1a1a2e",
    titleColor: "text-zinc-50",
    arrowColor: "text-zinc-50",
    metaColor:  "text-zinc-400",
    metaBorder: "border-white/10",
    imageBg:    "bg-[#0f0f1a]",
  },
  {
    tagline:    "Activation flow · Onboarding",
    category:   "Fintech · Banking",
    title:      "NatWest CurrencyPay",
    bg:         "#0d3d56",
    titleColor: "text-cyan-50",
    arrowColor: "text-cyan-400",
    metaColor:  "text-cyan-300/60",
    metaBorder: "border-cyan-300/20",
    imageBg:    "bg-cyan-900/50",
  },
]

const n = cards.length
const CARD_HEIGHT = 600

/* ─── single card ─────────────────────────────────────────────────── */
function Card({
  card,
  i,
  scrollYProgress,
}: {
  card: CardData
  i: number
  scrollYProgress: MotionValue<number>
}) {
  const targetScale = 1 - (n - 1 - i) * 0.05
  const scale = useTransform(
    scrollYProgress,
    [i / n, (i + 1) / n],
    [1, targetScale]
  )

  return (
    <div
      className="sticky top-24"
      style={{ height: CARD_HEIGHT }}
    >
      <motion.div
        style={{ scale, background: card.bg }}
        className="w-full rounded-3xl p-10 min-h-[500px] shadow-[0_-8px_40px_rgba(0,0,0,0.4)] flex flex-col"
      >
        {/* Meta row */}
        <div className={`flex items-center justify-between pb-4 mb-6 border-b ${card.metaBorder}`}>
          <span className={`text-sm font-mono ${card.metaColor}`}>{card.tagline}</span>
          <span className={`text-sm font-mono ${card.metaColor} hidden sm:block`}>{card.category}</span>
        </div>

        {/* Title + arrow */}
        <div className="flex items-start justify-between gap-4">
          <h3 className={`text-5xl font-bold leading-tight ${card.titleColor}`}>
            {card.title}
          </h3>
          <ArrowUpRight className={`size-8 flex-shrink-0 mt-1 ${card.arrowColor} opacity-80`} />
        </div>

        {/* Image area */}
        <div className={`flex-1 rounded-2xl mt-6 ${card.imageBg} bg-black/20`} />
      </motion.div>
    </div>
  )
}

/* ─── section ─────────────────────────────────────────────────────── */
export function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <section id="work" className="bg-zinc-950 pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs tracking-widest uppercase text-zinc-500 mb-12">
          Featured Work
        </p>
      </div>

      <div
        ref={containerRef}
        className="max-w-5xl mx-auto px-6"
        style={{ height: CARD_HEIGHT * n }}
      >
        {cards.map((card, i) => (
          <Card key={card.title} card={card} i={i} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
