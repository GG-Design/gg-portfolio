import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]/60 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:   "bg-[#06B6D4] text-[#09090b] hover:bg-[#06B6D4]/85",
        outline:   "border border-[#27272a] bg-transparent text-[#fafafa] hover:bg-white/5 hover:border-[#3f3f46]",
        ghost:     "bg-transparent text-[#71717a] hover:text-[#fafafa] hover:bg-white/5",
        secondary: "bg-[#18181b] text-[#fafafa] hover:bg-[#27272a]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm:      "h-8 px-4 text-xs",
        lg:      "h-12 px-8 text-base",
        icon:    "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
