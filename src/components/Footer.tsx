import { Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-light text-zinc-500">
          Pierluigi Baroncelli &copy; 2026
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 text-xs font-light text-zinc-500">
          <Sparkles className="w-3 h-3 text-[#06B6D4]" />
          Built with Claude
        </div>
      </div>
    </footer>
  )
}
