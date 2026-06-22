import { Download } from "lucide-react"

export function About() {
  return (
    <section id="about" className="min-h-screen flex items-center px-6 py-32">
      <div className="max-w-5xl mx-auto w-full">
        <div className="border-t border-zinc-800 pt-16">
          <p className="text-xs tracking-[0.2em] uppercase font-light text-zinc-500 mb-16">About</p>

          <div className="max-w-2xl space-y-8">
            <p className="text-2xl md:text-3xl font-light text-zinc-50 leading-snug">
              I'm Pierluigi — GG. A lead product designer with 15+ years shaping digital products across fintech, edtech, media & publishing, and e-commerce.
            </p>

            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              I've led design at Times Higher Education, where I built their first design system and directed a platform used by 10,000+ universities worldwide. Before that, Glint, Tide, NatWest, Hive, OVO Energy, HSBC and others.
            </p>

            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              I work at the intersection of strategy and craft — comfortable in the room with stakeholders and in Figma at the same time. Recently I've been learning to close the gap between design and code, using AI to take ideas from concept to deployed.
            </p>

            <p className="text-sm text-zinc-500">
              Based in London. Available for senior roles and select freelance projects.
            </p>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-50 border border-zinc-700 hover:border-zinc-500 rounded-full px-5 py-2.5 transition-colors w-fit"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
