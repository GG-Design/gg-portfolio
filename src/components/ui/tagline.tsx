import { ArrowUpRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface TaglineProps {
  /** ArrowUpRight at the end.
   *  Defaults to true when no lucideIcon; defaults to false when lucideIcon is set. */
  icon?: boolean
  /** Coloured dot before the label (ignored when lucideIcon is set). */
  dot?: "green" | "orange"
  /** Lucide icon before the label — takes precedence over dot. */
  lucideIcon?: LucideIcon
  /** Text content — alternative to children for self-closing usage. */
  text?: string
  children?: React.ReactNode
  className?: string
}

/**
 * Tagline — white rounded-full pill. Four modes:
 *
 *   <Tagline>B2C · EdTech</Tagline>
 *     → green dot + text + ArrowUpRight  (card categories, home page)
 *
 *   <Tagline lucideIcon={Briefcase} text="Lead Product Designer" />
 *     → Lucide icon + text  (metadata badges — no arrow by default)
 *
 *   <Tagline dot="green" text="9 months" icon={false} />
 *     → green dot + text  (no arrow)
 *
 *   <Tagline icon={false}>The Problem</Tagline>
 *     → text only  (section labels)
 */
export function Tagline({
  icon,
  dot,
  lucideIcon: Icon,
  text,
  children,
  className,
}: TaglineProps) {
  const label     = text ?? children
  // Arrow visible by default; suppressed by default when a lucideIcon is provided
  const showArrow = Icon ? icon === true : icon !== false
  // Dot shown when no lucideIcon, and either arrow-mode is active or dot is explicitly set
  const showDot   = !Icon && (showArrow || !!dot)
  const dotColor  = dot === "orange" ? "bg-orange-400" : "bg-green-400"

  return (
    <div
      className={cn(
        "bg-white border border-zinc-200 rounded-full shadow-sm",
        "inline-flex items-center gap-1.5 px-3 h-7",
        className
      )}
    >
      {Icon    && <Icon size={12} className="text-zinc-500 shrink-0" />}
      {showDot && <span className={cn("w-2 h-2 rounded-full shrink-0", dotColor)} />}
      <span className="text-sm font-medium text-zinc-900 whitespace-nowrap">{label}</span>
      {showArrow && <ArrowUpRight size={14} className="text-zinc-400 shrink-0" />}
    </div>
  )
}
