import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Menu } from "lucide-react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"

const links = [
  { label: "Work",  href: "#work" },
  { label: "About", href: "#about" },
]

export function Nav() {
  const [visible, setVisible]   = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [lastY, setLastY]       = useState(0)

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      setVisible(y < lastY || y < 80)
      setLastY(y)
    }
    window.addEventListener("scroll", handle, { passive: true })
    return () => window.removeEventListener("scroll", handle)
  }, [lastY])

  return (
    <motion.header
      animate={{ y: visible ? 0 : -72 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={[
        "fixed top-0 left-0 right-0 z-50 h-16",
        "border-b transition-all duration-300",
        scrolled
          ? "border-zinc-800 bg-zinc-950/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">

        {/* Monogram logo */}
        <a
          href="/"
          className="w-8 h-8 rounded-lg bg-cyan-400/20 hover:bg-cyan-400/30 transition-colors flex items-center justify-center flex-shrink-0"
          aria-label="Pierluigi Baroncelli"
        >
          <span className="text-xs font-semibold text-cyan-400 tracking-tight">GG</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">
              {l.label}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/pierluigi-baroncelli"
            target="_blank" rel="noopener noreferrer"
            className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors duration-200 inline-flex items-center gap-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">
            LinkedIn
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 text-zinc-500 hover:text-zinc-50 transition-colors" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-1 pt-12 px-4">
                {links.map(l => (
                  <a key={l.label} href={l.href}
                    className="px-4 py-3 text-base font-light text-zinc-400 hover:text-zinc-50 transition-colors rounded-md hover:bg-white/5">
                    {l.label}
                  </a>
                ))}
                <a
                  href="https://www.linkedin.com/in/pierluigi-baroncelli"
                  target="_blank" rel="noopener noreferrer"
                  className="px-4 py-3 text-base font-light text-zinc-400 hover:text-zinc-50 transition-colors rounded-md hover:bg-white/5 inline-flex items-center gap-2">
                  LinkedIn
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </motion.header>
  )
}
