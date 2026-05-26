import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const cards = [
  {
    id: 1,
    slug: "/work/times-higher-education",
    tagline: "Design System · 40% faster delivery",
    category: "SaaS · EdTech",
    title: "Times Higher Education",
    description: "Built THE's first design system, reducing delivery time 40% across 100+ global universities.",
    bg: "#e8e4dc",
    textColor: "#1a1a1a",
    mutedColor: "#6b6b6b",
    imageBg: "rgba(0,0,0,0.12)",
  },
  {
    id: 2,
    slug: null,
    tagline: "iOS & Android · End-to-end redesign",
    category: "Fintech · Mobile",
    title: "GlintPay",
    description: "End-to-end iOS & Android redesign improving clarity, engagement and customer retention.",
    bg: "#1a1a2e",
    textColor: "#f8fafc",
    mutedColor: "rgba(255,255,255,0.45)",
    imageBg: "rgba(255,255,255,0.05)",
  },
  {
    id: 3,
    slug: null,
    tagline: "Activation flow · Onboarding",
    category: "Fintech · Banking",
    title: "NatWest CurrencyPay",
    description: "Activation and compliance flow redesign improving onboarding conversion rates.",
    bg: "#0d3d56",
    textColor: "#e0f7fa",
    mutedColor: "rgba(224,247,250,0.5)",
    imageBg: "rgba(255,255,255,0.06)",
  },
];

interface CardProps {
  card: typeof cards[0];
  index: number;
  total: number;
  progress: any;
}

function Card({ card, index, total, progress }: CardProps) {
  const navigate = useNavigate();
  const scale = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [1, 1 - (total - index - 1) * 0.04]
  );

  return (
    <div
      className="sticky w-full px-4 md:px-8"
      style={{ top: `${72 + index * 20}px` }}
    >
      <motion.div
        onClick={card.slug ? () => navigate(card.slug!) : undefined}
        style={{
          scale,
          backgroundColor: card.bg,
          transformOrigin: "top center",
          boxShadow: "0 -4px 32px rgba(0,0,0,0.4), 0 24px 64px rgba(0,0,0,0.3)",
          minHeight: "380px",
          display: "flex",
          flexDirection: "column",
          cursor: card.slug ? "pointer" : "default",
        }}
        className={[
          "w-full max-w-5xl mx-auto rounded-3xl transition-shadow duration-200",
          card.slug ? "hover:shadow-[0_-4px_32px_rgba(0,0,0,0.5),0_28px_72px_rgba(0,0,0,0.4)]" : "",
        ].join(" ")}
      >
        {/* Tagline bar — always visible at top */}
        <div
          className="flex justify-between items-center px-8 py-5 text-xs font-mono tracking-widest uppercase"
          style={{ color: card.mutedColor }}
        >
          <span>{card.tagline}</span>
          <span>{card.category}</span>
        </div>
        <hr style={{ borderColor: card.mutedColor, opacity: 0.3, margin: 0 }} />

        {/* Card body */}
        <div className="px-10 pt-8 pb-10 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3
                className="text-4xl md:text-5xl font-bold leading-tight"
                style={{ color: card.textColor }}
              >
                {card.title}
              </h3>
              <p
                className="mt-3 text-sm max-w-lg leading-relaxed"
                style={{ color: card.mutedColor }}
              >
                {card.description}
              </p>
            </div>
            <ArrowUpRight
              className="shrink-0 ml-4 mt-1"
              size={28}
              style={{ color: card.mutedColor }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="bg-[#09090b] pt-24 pb-24">
      <p className="text-xs tracking-widest text-zinc-500 uppercase mb-16 max-w-5xl mx-auto px-4 md:px-8">
        Featured Work
      </p>

      {/* Each card gets 100vh of scroll room so you see one at a time */}
      <div
        ref={containerRef}
        style={{ height: `${cards.length * 100}vh` }}
        className="relative"
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            total={cards.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto mt-16 text-center">
        <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
          View all work →
        </a>
      </div>
    </section>
  );
}
