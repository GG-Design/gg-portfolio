import { ArrowUpRight } from "lucide-react"

const cases = [
  {
    tagline:    "Design System · 40% faster delivery",
    category:   "SaaS · EdTech",
    title:      "Times Higher\nEducation",
    titleColor: "text-zinc-900",
    arrowColor: "text-zinc-900",
    metaColor:  "text-zinc-900/60",
    metaBorder: "border-zinc-900/15",
    bg:         "#e8e4dc",
    imageBg:    "bg-zinc-800",
  },
  {
    tagline:    "iOS & Android · End-to-end redesign",
    category:   "Fintech · Mobile",
    title:      "GlintPay",
    titleColor: "text-zinc-50",
    arrowColor: "text-zinc-50",
    metaColor:  "text-zinc-400",
    metaBorder: "border-white/10",
    bg:         "#1a1a2e",
    imageBg:    "bg-[#0f0f1a]",
  },
  {
    tagline:    "Activation flow · Onboarding",
    category:   "Fintech · Banking",
    title:      "NatWest\nCurrencyPay",
    titleColor: "text-cyan-50",
    arrowColor: "text-cyan-400",
    metaColor:  "text-cyan-300/60",
    metaBorder: "border-cyan-300/20",
    bg:         "#083344",
    imageBg:    "bg-cyan-900/50",
  },
]

const zIndexes = [10, 20, 30]

export function Work() {
  return (
    <section id="work" className="bg-zinc-950 px-6 pt-32 pb-24">
      <div className="max-w-5xl mx-auto">

        <p className="text-xs tracking-widest uppercase text-zinc-500 mb-12">
          Featured Work
        </p>

        {/* 250vh tall container — cards stack as user scrolls through it */}
        <div style={{ height: "250vh" }} className="relative">
          {cases.map((c, i) => (
            <div
              key={c.title}
              className="sticky top-24"
              style={{ zIndex: zIndexes[i] }}
            >
              <div
                className="rounded-3xl overflow-hidden mx-4 min-h-[500px] shadow-[0_-4px_24px_rgba(0,0,0,0.5)]"
                style={{ background: c.bg }}
              >
                {/* Top content */}
                <div className="px-8 pt-8 pb-6">
                  <div className={`flex items-center justify-between pb-4 mb-6 border-b ${c.metaBorder}`}>
                    <span className={`text-sm font-mono ${c.metaColor}`}>{c.tagline}</span>
                    <span className={`text-sm font-mono ${c.metaColor} hidden sm:block`}>{c.category}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className={`text-5xl font-bold leading-tight ${c.titleColor} whitespace-pre-line`}>
                      {c.title}
                    </h3>
                    <ArrowUpRight className={`size-8 flex-shrink-0 mt-1 ${c.arrowColor} opacity-80`} />
                  </div>
                </div>

                {/* Image area */}
                <div className={`h-40 w-full ${c.imageBg}`} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
