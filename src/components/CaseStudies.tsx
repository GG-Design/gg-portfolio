import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Card }    from "@/components/ui/card";
import { Button }  from "@/components/ui/button";
import { Tagline } from "@/components/ui/tagline";

// ─── Data ─────────────────────────────────────────────────────────────────────

const cards = [
  {
    id:        1,
    slug:      "/work/times-higher-education",
    imagePath: "/images/profiles.png",
    badge:     "B2C · EdTech",
    title:     "Times Higher Education",
    subline:   "University Profiles — first design system, validated with 700+ students",
    bg:        "#ffffff",
    textColor: "#09090b",
    mutedColor:"#71717a",
    imageBg:   "#06B6D4",
    status:    "live" as const,
  },
  {
    id:        2,
    slug:      "/work/glintpay" as string | null,
    imagePath: "/images/glint.png",
    badge:     "Fintech · Mobile",
    title:     "GlintPay",
    subline:   "End-to-end iOS & Android redesign",
    bg:        "#ffffff",
    textColor: "#09090b",
    mutedColor:"#71717a",
    imageBg:   "#06B6D4",
    status:    "live" as const,
  },
  {
    id:        3,
    slug:      null as string | null,
    imagePath: null as string | null,
    badge:     "AI · Coming Soon",
    title:     "Watch this space.",
    subline:   "An AI-led project. More soon.",
    bg:        "#ffffff",
    textColor: "#09090b",
    mutedColor:"#71717a",
    imageBg:   "#06B6D4",
    status:    "in-development" as const,
  },
];

type CardData = typeof cards[0];

// ─── Coming-soon placeholder ───────────────────────────────────────────────────

function ComingSoonPlaceholder() {
  return (
    <div
      className="relative h-48 w-full flex items-center justify-center
                 [background-image:radial-gradient(circle,rgba(255,255,255,0.3)_1px,transparent_1px)]
                 [background-size:20px_20px]"
    >
      <motion.div
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={56} className="text-white" strokeWidth={1} />
      </motion.div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ImageCard({ card }: { card: CardData }) {
  const navigate = useNavigate();
  const dot      = card.status === "live" ? "green" : "orange";

  return (
    <Card
      onClick={card.slug ? () => navigate(card.slug!) : undefined}
      className={[
        "group overflow-hidden rounded-3xl border-0",
        "shadow-[0_24px_80px_rgba(0,0,0,0.24)]",
        card.slug ? "cursor-pointer" : "cursor-default",
      ].join(" ")}
      style={{ background: card.bg }}
    >
      {/* ── Content area ────────────────────────────────── */}
      <div className="py-16 px-8 max-w-[800px] mx-auto w-full flex flex-col items-center gap-6">

        {/* Tagline pill — dot colour from status */}
        <Tagline icon={false} dot={dot}>{card.badge}</Tagline>

        {/* Title */}
        <h2
          className="font-semibold text-center text-[60px] leading-[60px] tracking-[-1.5px]"
          style={{ color: card.textColor }}
        >
          {card.title}
        </h2>

        {/* Description */}
        <p
          className="text-lg leading-8 text-center max-w-[600px] mx-auto"
          style={{ color: card.mutedColor }}
        >
          {card.subline}
        </p>

        {/* CTA — only for live/linked cards */}
        {card.slug && (
          <Button
            className="bg-zinc-900 text-white rounded-full px-5 h-9 text-sm
                       font-medium hover:bg-zinc-700 gap-1.5"
          >
            Case study
            <ArrowRight size={14} />
          </Button>
        )}
      </div>

      {/* Image stage */}
      <div
        className="mx-6 mb-6 rounded-2xl p-6 overflow-hidden max-h-[280px]"
        style={{ background: card.imageBg }}
      >
        {card.imagePath ? (
          <motion.div
            whileHover={{ y: -40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <img
              src={card.imagePath}
              alt={card.title}
              className="w-full object-contain block max-h-[420px]"
            />
          </motion.div>
        ) : (
          <ComingSoonPlaceholder />
        )}
      </div>
    </Card>
  );
}

// ─── Scroll-stack wrapper ─────────────────────────────────────────────────────

interface PortfolioCardProps {
  card:     CardData;
  index:    number;
  total:    number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function PortfolioCard({ card, index, total, progress }: PortfolioCardProps) {
  const scale = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [1, 1 - (total - index - 1) * 0.04]
  );

  return (
    <div
      className="sticky w-full"
      style={{ top: `${72 + index * 20}px` }}
    >
      <motion.div
        style={{ scale, transformOrigin: "top center" }}
        className={`max-w-5xl mx-auto px-6${index > 0 ? " -mt-8" : ""}`}
      >
        <ImageCard card={card} />
      </motion.div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ["start start", "end end"],
  });

  return (
    <section id="work" className="bg-transparent pt-24 pb-8">
      <p className="text-xs tracking-widest text-zinc-500 uppercase mb-16 max-w-5xl mx-auto px-6">
        Featured Work
      </p>

      <div
        ref={containerRef}
        style={{ height: `${cards.length * 100}vh` }}
        className="relative"
      >
        {cards.map((card, index) => (
          <PortfolioCard
            key={card.id}
            card={card}
            index={index}
            total={cards.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

    </section>
  );
}
