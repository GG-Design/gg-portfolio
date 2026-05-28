import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card }   from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tagline } from "@/components/ui/tagline";

// ─── Data ─────────────────────────────────────────────────────────────────────

const cards = [
  {
    id: 1,
    slug: "/work/times-higher-education",
    imagePath: "/images/profiles.png",
    badge:     "B2C · EdTech",
    title:     "Times Higher Education",
    subline:   "University Profiles — first design system, validated with 700+ students",
  },
  {
    id: 2,
    slug: "/work/glintpay" as string | null,
    imagePath: "/images/glint.png",
    badge:     "Fintech · Mobile",
    title:     "GlintPay",
    subline:   "End-to-end iOS & Android redesign",
  },
];

type CardData = typeof cards[0];

// ─── Card ─────────────────────────────────────────────────────────────────────

/** Centered Figma-matched card */
function ImageCard({ card }: { card: CardData }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={card.slug ? () => navigate(card.slug!) : undefined}
      className="group overflow-hidden rounded-3xl border-0
                 shadow-[0_24px_80px_rgba(0,0,0,0.24)]
                 bg-white cursor-pointer"
    >
      {/* ── Content area — centred column ───────────────── */}
      <div className="py-16 px-8 max-w-[800px] mx-auto w-full
                      flex flex-col items-center gap-6">

        {/* Tagline pill */}
        <Tagline>{card.badge}</Tagline>

        {/* Title */}
        <h2
          className="text-zinc-900 font-semibold text-center"
          style={{ fontSize: "60px", lineHeight: "60px", letterSpacing: "-1.5px" }}
        >
          {card.title}
        </h2>

        {/* Description */}
        <p className="text-lg text-zinc-500 leading-8 text-center max-w-[600px] mx-auto">
          {card.subline}
        </p>

        {/* CTA */}
        <Button
          className="bg-zinc-900 text-white rounded-full px-5 h-9 text-sm
                     font-medium hover:bg-zinc-700 gap-1.5"
        >
          Case study
          <ArrowRight size={14} />
        </Button>
      </div>

      {/* Cyan image stage — 24px margin from card edge, padded inside */}
      <div
        className="mx-6 mb-6 bg-[#06B6D4] rounded-2xl p-6 overflow-hidden
                   transition-colors duration-500 group-hover:bg-[#0284C7]"
        style={{ maxHeight: "280px" }}
      >
        <motion.div
          whileHover={{ y: -40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <img
            src={card.imagePath!}
            alt={card.title}
            className="w-full object-contain block"
            style={{ maxHeight: "420px" }}
          />
        </motion.div>
      </div>
    </Card>
  );
}

// ─── Scroll-stack wrapper ─────────────────────────────────────────────────────

interface PortfolioCardProps {
  card: CardData;
  index: number;
  total: number;
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
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="bg-[#09090b] pt-24 pb-24">
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

      <div className="max-w-5xl mx-auto px-6 mt-16 text-center">
        <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
          View all work →
        </a>
      </div>
    </section>
  );
}
