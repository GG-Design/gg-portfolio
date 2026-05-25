import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = "SheetOverlay"

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: "left" | "right" | "top" | "bottom"
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex flex-col bg-[#09090b] shadow-xl transition ease-in-out",
        "data-[state=open]:animate-in data-[state=closed]:animate-out duration-300",
        side === "right" && [
          "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l border-[#27272a]",
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        ],
        side === "left" && [
          "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r border-[#27272a]",
          "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        ],
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-md p-1.5 text-[#71717a] hover:text-[#fafafa] transition-colors hover:bg-white/5 focus:outline-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = "SheetContent"

export { Sheet, SheetTrigger, SheetClose, SheetContent }
