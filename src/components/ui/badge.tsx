import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-light transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#06B6D4] text-[#09090b]",
        outline: "border-[#06B6D4]/40 bg-[#06B6D4]/5 text-[#06B6D4]",
        subtle:    "border-[#27272a] bg-[#18181b] text-[#71717a]",
        secondary: "border border-cyan-200 bg-cyan-50 text-cyan-700 font-semibold",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
