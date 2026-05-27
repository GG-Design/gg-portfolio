const logos = [
  { src: "/logos/glint.svg", alt: "GlintPay" },
  { src: "/logos/natwest.svg", alt: "NatWest" },
  { src: "/logos/tide.svg", alt: "Tide" },
  { src: "/logos/hsbc.svg", alt: "HSBC" },
  { src: "/logos/hive.svg", alt: "HiveHome" },
  { src: "/logos/the.svg", alt: "Times Higher Education" },
  { src: "/logos/ovo.svg", alt: "OVO Energy" },
]

export function Logos() {
  const doubled = [...logos, ...logos]

  return (
    <section className="w-full bg-zinc-950 py-16">
      <p className="text-xs tracking-widest uppercase text-zinc-600 text-center mb-8">
        Brands I&apos;ve Worked With
      </p>

      {/* Marquee container with edge fades */}
      <div
        className="overflow-hidden w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="flex items-center w-max animate-marquee">
          {doubled.map((logo, i) => (
            <span key={`${logo.alt}-${i}`} className="inline-flex items-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto grayscale brightness-0 invert opacity-40 hover:opacity-80 transition-opacity duration-300 mx-10"
              />
              <span className="w-px h-4 bg-zinc-700 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
