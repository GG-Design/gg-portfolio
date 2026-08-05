import { motion } from "framer-motion"

const logos = [
  { src: "/logos/glint.svg", alt: "GlintPay" },
  { src: "/logos/natwest.svg", alt: "NatWest" },
  { src: "/logos/tide.svg", alt: "Tide" },
  { src: "/logos/hsbc.svg", alt: "HSBC" },
  { src: "/logos/hive.svg", alt: "Hive" },
  { src: "/logos/the.svg", alt: "Times Higher Education" },
  { src: "/logos/ovo.svg", alt: "OVO Energy" },
]

export function Logos() {
  const doubled = [...logos, ...logos]

  return (
    <section className="w-full bg-transparent pt-2 pb-8">
      <p className="text-xs tracking-widest uppercase text-zinc-300 text-center mb-8">
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

      {/* Scroll indicator — points down to the work cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="flex flex-col items-center mt-12"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, #52525b, transparent)" }}
        />
      </motion.div>
    </section>
  )
}
