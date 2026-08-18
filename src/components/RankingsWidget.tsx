import { useMemo, useState } from "react"
import {
  Globe, Palette, LineChart as LineChartIcon, HeartPulse, FlaskConical, Wrench,
  Landmark, Share2, ChevronDown, type LucideIcon,
} from "lucide-react"

// ─── Mock data ──────────────────────────────────────────────────────────────
//
//  Modelled on the live THE World University Rankings profile page
//  (timeshighereducation.com) — University of Oxford, 2026 methodology:
//  Overall + Teaching / Research Environment / Research Quality / Industry /
//  International Outlook pillars. Figures for World University Rankings and
//  Arts & Humanities are taken directly from the live product; the remaining
//  subject tabs are illustrative, built to demonstrate the interaction.

interface RankingType {
  id: string
  label: string
  rank: number
  icon: LucideIcon
}

const RANKING_TYPES: RankingType[] = [
  { id: "world",     label: "World University Rankings 2026", rank: 1, icon: Globe },
  { id: "arts",      label: "Arts and Humanities 2026",        rank: 4, icon: Palette },
  { id: "business",  label: "Business and Economics 2026",     rank: 4, icon: LineChartIcon },
  { id: "medical",   label: "Medical and Health Sciences 2026", rank: 1, icon: HeartPulse },
  { id: "life",      label: "Life Sciences 2026",               rank: 6, icon: FlaskConical },
  { id: "engineering", label: "Engineering 2026",                rank: 8, icon: Wrench },
]

const METRICS = [
  { id: "overall",            label: "Overall" },
  { id: "teaching",           label: "Teaching" },
  { id: "researchEnvironment", label: "Research Environment" },
  { id: "researchQuality",    label: "Research Quality" },
  { id: "industry",           label: "Industry" },
  { id: "intlOutlook",        label: "International Outlook" },
] as const

type MetricId = (typeof METRICS)[number]["id"]

const BASE_SCORES: Record<string, Record<MetricId, number>> = {
  world:      { overall: 98.2, teaching: 97.2, researchEnvironment: 100,  researchQuality: 97.7, industry: 99.9, intlOutlook: 96.4 },
  arts:       { overall: 90.9, teaching: 93.8, researchEnvironment: 97.9, researchQuality: 77.4, industry: 68.9, intlOutlook: 77.4 },
  business:   { overall: 93.5, teaching: 92.0, researchEnvironment: 96.1, researchQuality: 88.4, industry: 91.2, intlOutlook: 85.6 },
  medical:    { overall: 97.6, teaching: 96.4, researchEnvironment: 99.1, researchQuality: 95.8, industry: 98.3, intlOutlook: 93.7 },
  life:       { overall: 94.8, teaching: 92.6, researchEnvironment: 97.0, researchQuality: 90.2, industry: 88.7, intlOutlook: 86.9 },
  engineering: { overall: 91.3, teaching: 89.7, researchEnvironment: 93.4, researchQuality: 85.1, industry: 94.6, intlOutlook: 82.0 },
}

const YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]

// Exact series pulled from the live product for the categories we could see.
const EXPLICIT_SERIES: Record<string, number[]> = {
  "world-overall": [94.2, 95, 94.3, 96, 95.4, 95.6, 95.7, 96.4, 98.5, 98.5, 98.2],
  "arts-overall":  [87.9, 88.8, 87.3, 87.6, 86.4, 87.5, 86.4, 87.1, 91.5, 91.1, 90.9],
  "arts-teaching": [89.5, 89.4, 88.3, 90.3, 90.1, 89.3, 88.9, 90.4, 93.5, 93.8, 93.8],
}

// Deterministic PRNG so the same type/metric always renders the same wave.
function seededRandom(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function hashSeed(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h) || 1
}

function buildSeries(typeId: string, metricId: MetricId): number[] {
  const key = `${typeId}-${metricId}`
  if (EXPLICIT_SERIES[key]) return EXPLICIT_SERIES[key]

  const base = BASE_SCORES[typeId][metricId]
  const rand = seededRandom(hashSeed(key))
  const values: number[] = []
  let current = base - 1.5 + rand() * 1
  for (let i = 0; i < YEARS.length; i++) {
    const drift = Math.sin(i / 2 + rand() * 2) * 1.6
    const noise = (rand() - 0.5) * 0.8
    current = current * 0.4 + (base + drift + noise) * 0.6
    values.push(Math.max(1, Math.min(100, current)))
  }
  // Anchor the final year close to the "current" published score.
  values[values.length - 1] = base
  return values
}

function buildRankTrend(currentRank: number): number[] {
  const rand = seededRandom(hashSeed(`rank-${currentRank}`))
  const values: number[] = []
  let current = currentRank + Math.round(rand() * 6)
  for (let i = 0; i < YEARS.length; i++) {
    current = Math.max(1, Math.round(current + (rand() - 0.55) * 3))
    values.push(current)
  }
  values[values.length - 1] = currentRank
  return values
}

function ordinal(n: number): string {
  const rem100 = n % 100
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`
  switch (n % 10) {
    case 1: return `${n}st`
    case 2: return `${n}nd`
    case 3: return `${n}rd`
    default: return `${n}th`
  }
}

function niceTicks(min: number, max: number, count = 5): number[] {
  const span = Math.max(max - min, 1)
  const step = Math.max(1, Math.round(span / (count - 1)))
  const top = Math.ceil(max / step) * step
  return Array.from({ length: count }, (_, i) => top - i * step)
}

// Catmull-Rom → cubic-bezier smoothing for a soft line, no extra dependency.
function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return ""
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`
  }
  return d
}

// ─── Chart ──────────────────────────────────────────────────────────────────

const CHART_W = 560
const CHART_H = 200
const PAD_L = 8
const PAD_R = 30
const PAD_T = 24
const PAD_B = 24

function RankingsChart({ series }: { series: number[] }) {
  const min = Math.min(...series)
  const max = Math.max(...series)
  const ticks = niceTicks(min, max)
  const tickMin = ticks[ticks.length - 1]
  const tickMax = ticks[0]

  const innerW = CHART_W - PAD_L - PAD_R
  const innerH = CHART_H - PAD_T - PAD_B

  const points = series.map((v, i) => ({
    x: PAD_L + (i / (series.length - 1)) * innerW,
    y: PAD_T + (1 - (v - tickMin) / (tickMax - tickMin || 1)) * innerH,
  }))

  const linePath = smoothPath(points)
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${PAD_T + innerH} L ${points[0].x} ${PAD_T + innerH} Z`

  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H + 24}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="rankingsFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map((t) => {
        const y = PAD_T + (1 - (t - tickMin) / (tickMax - tickMin || 1)) * innerH
        return (
          <g key={t}>
            <line x1={PAD_L} y1={y} x2={CHART_W - PAD_R} y2={y} stroke="#EDEDF0" strokeWidth={1} />
            <text x={CHART_W - PAD_R + 8} y={y + 4} fontSize={11} fill="#A1A1AA">{Math.round(t * 10) / 10}</text>
          </g>
        )
      })}

      <path d={areaPath} fill="url(#rankingsFill)" stroke="none" />
      <path d={linePath} fill="none" stroke="#6366F1" strokeWidth={2.5} strokeLinecap="round" />

      {points.map((p, i) => (
        <g key={i}>
          <text
            x={p.x}
            y={p.y - 10}
            fontSize={10.5}
            fill="#52525B"
            textAnchor="middle"
          >
            {series[i].toFixed(1)}
          </text>
          <circle cx={p.x} cy={p.y} r={3} fill="#6366F1" stroke="white" strokeWidth={1.5} />
        </g>
      ))}

      {YEARS.map((year, i) => (
        <text
          key={year}
          x={points[i].x}
          y={CHART_H + 18}
          fontSize={11}
          fill="#A1A1AA"
          textAnchor="middle"
        >
          {year}
        </text>
      ))}
    </svg>
  )
}

// ─── Widget ─────────────────────────────────────────────────────────────────

export function RankingsWidget() {
  const [activeType, setActiveType] = useState(RANKING_TYPES[0].id)
  const [activeMetric, setActiveMetric] = useState<MetricId>("overall")
  const [expanded, setExpanded] = useState(false)

  const type = RANKING_TYPES.find((t) => t.id === activeType)!
  const scores = BASE_SCORES[activeType]

  const series = useMemo(() => buildSeries(activeType, activeMetric), [activeType, activeMetric])
  const rankTrend = useMemo(() => buildRankTrend(type.rank), [type.rank])

  function selectType(id: string) {
    setActiveType(id)
    setActiveMetric("overall")
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      {/* University identity bar */}
      <div className="flex items-center justify-between gap-4 px-6 md:px-10 py-5 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600">
            <Landmark className="w-4.5 h-4.5" />
          </span>
          <h3 className="text-lg font-bold text-zinc-900">University of Oxford</h3>
        </div>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-stone-200 text-zinc-500">
          <Share2 className="w-3.5 h-3.5" />
        </span>
      </div>

      <div className="p-6 md:p-10">
        <p className="text-sm font-semibold text-zinc-800 mb-3">Select the type of ranking below to see stats</p>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {RANKING_TYPES.map((t) => {
            const active = t.id === activeType
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => selectType(t.id)}
                className={`shrink-0 text-left rounded-xl border px-3.5 py-2.5 min-w-[128px] transition-colors ${
                  active
                    ? "border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/40"
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-md ${
                      active ? "bg-indigo-100 text-indigo-600" : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                  </span>
                  <span className="text-xs text-zinc-600 leading-tight">{t.label}</span>
                </div>
                <span className="text-lg font-bold text-zinc-900">{ordinal(t.rank)}</span>
              </button>
            )
          })}
        </div>

        <h4 className="text-lg font-bold text-zinc-900 mt-8 mb-5">{type.label}</h4>

        <div className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-10 items-start">
          <div className="space-y-3.5">
            {METRICS.map((m) => {
              const value = scores[m.id]
              const active = m.id === activeMetric
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMetric(m.id)}
                  className={`w-full text-left ${active ? "border-l-2 border-indigo-500 pl-2.5" : "pl-3"}`}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className={`text-xs ${active ? "font-semibold text-zinc-900" : "text-zinc-500"}`}>
                      {m.label}
                    </span>
                    <span className={`text-xs tabular-nums ${active ? "font-semibold text-indigo-600" : "text-zinc-500"}`}>
                      {value.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${active ? "bg-indigo-500" : "bg-indigo-200"}`}
                      style={{ width: `${Math.min(value, 100)}%` }}
                    />
                  </div>
                </button>
              )
            })}
          </div>

          <div>
            <RankingsChart series={series} />
            <p className="text-xs text-zinc-500 -mt-1">
              Breakdown via year:{" "}
              <span className="text-indigo-600 font-medium">
                {METRICS.find((m) => m.id === activeMetric)?.label}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-100">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-2 text-sm font-semibold text-zinc-900"
          >
            Ranking positions {YEARS[0]} to {YEARS[YEARS.length - 1]}
            <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>

          {expanded && (
            <div className="mt-5">
              <div className="grid grid-cols-6 md:grid-cols-11 gap-3">
                {YEARS.map((year, i) => (
                  <div key={year} className="text-center">
                    <p className="text-[11px] text-zinc-400 mb-1">{year}</p>
                    <p className="text-sm font-bold text-zinc-900">{ordinal(rankTrend[i])}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mt-5">
                All ranked institutions have an overall score and pillar scores. However for each pillar, only
                institutions ranked in the top 500 overall have a published score — institutions below that
                threshold have a publicly visible overall score only.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
