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
    logo:      "/logos/times_higher_education_logo.svg" as string | null,
    badge:     "B2C · EdTech",
    title:     "THE University Profiles",
    subline:   "23% increase in profile conversion, validated with 700+ students",
    bg:        "#ffffff",
    textColor: "#09090b",
    mutedColor:"#71717a",
    imageBg:   "#06B6D4",
    status:    "live" as const,
  },
  {
    id:        2,
    slug:      "/work/the-datapoints" as string | null,
    imagePath: "/images/Datapoint Flow.png" as string | null,
    imageAlt:  "THE DataPoints — analytics platform",
    logo:      "/logos/times_higher_education_logo.svg" as string | null,
    badge:     "B2B · EdTech · SaaS",
    title:     "THE DataPoints",
    subline:   "Analytics platform for 3,500+ universities — redesigned end-to-end",
    bg:        "#ffffff",
    textColor: "#09090b",
    mutedColor:"#71717a",
    imageBg:   "#06B6D4",
    status:    "coming-soon" as const,
  },
  {
    id:        3,
    slug:        "/work/glintpay" as string | null,
    imagePath:   "/images/glint.png",
    logo:        "/logos/glint-app.png" as string | null,
    logoWidth:   "40px",
    logoHeight:  "40px",
    logoRounded: true,
    badge:     "Fintech · Mobile",
    title:     "GlintPay App redesign",
    subline:   "13% increase in user retention, 15% increase in monthly transactions",
    bg:        "#ffffff",
    textColor: "#09090b",
    mutedColor:"#71717a",
    imageBg:   "#06B6D4",
    status:    "live" as const,
  },
  {
    id:        4,
    slug:      "/work/currencypay" as string | null,
    imagePath: "/images/natwestkycflow.png" as string | null,
    imageAlt:  "NatWest CurrencyPay — KYC flow",
    logo:      "/logos/natwest-colour.png" as string | null,
    logoWidth:  "79.5625px",
    logoHeight: "32px",
    badge:     "Fintech · Mobile",
    title:     "CurrencyPay KYC onboarding",
    subline:   "iOS & Android registration flow, built to meet FCA KYC requirements",
    bg:        "#ffffff",
    textColor: "#09090b",
    mutedColor:"#71717a",
    imageBg:   "#06B6D4",
    ctaLabel:  "View project",
    status:    "live" as const,
  },
  {
    id:        5,
    slug:      "/work/hive" as string | null,
    imagePath: "/images/hive_CHECKOUT_ui.webp" as string | null,
    imageAlt:  "Hive — redesigned checkout flow",
    logo:      "/logos/hive_coloured.svg" as string | null,
    logoHeight: "22px",
    badge:     "B2C · eCommerce · Web",
    title:     "Website redesign",
    subline:   "27% increase in conversions, 11% drop in bounce rate",
    bg:        "#ffffff",
    textColor: "#09090b",
    mutedColor:"#71717a",
    imageBg:   "#06B6D4",
    ctaLabel:  "View project",
    status:    "live" as const,
  },
  {
    id:        7,
    slug:      "/work/tide" as string | null,
    imagePath: "/images/Tide_wireframes.webp" as string | null,
    imageAlt:  "Tide — web app wireframes",
    logo:      "/logos/tide.svg" as string | null,
    badge:     "Fintech · Mobile & Web",
    title:     "Initial web app redesign",
    subline:   "High-fidelity wireframes and in-app notifications",
    bg:        "#ffffff",
    textColor: "#09090b",
    mutedColor:"#71717a",
    imageBg:   "#06B6D4",
    ctaLabel:  "View project",
    status:    "live" as const,
  },
  {
    id:        6,
    slug:      null as string | null,
    externalUrl: null as string | null,
    imagePath: null as string | null,
    logo:      "/favicon.png" as string | null,
    badge:     "AI · Coming Soon",
    title:     "Watch this space.",
    subline:   "An AI-led project. More soon.",
    bg:        "#ffffff",
    textColor: "#09090b",
    mutedColor:"#71717a",
    imageBg:   "#06B6D4",
    status:    "in-development" as const,
    hidden:    true, // kept in data for later — excluded from the rendered stack while we tune it
  },
];

// Cards actually rendered in the stack — filters out anything flagged
// `hidden` (data stays in `cards` above so it's easy to bring back).
const visibleCards = cards.filter((c) => !("hidden" in c && c.hidden));

type CardData = typeof cards[0];

// ─── Coming-soon placeholder ───────────────────────────────────────────────────

function ComingSoonPlaceholder() {
  return (
    <div
      className="relative h-full w-full flex items-center justify-center
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

  // Internal case-study pages use client-side navigate; cards with no page
  // yet (e.g. Hive) but a real external site link out in a new tab instead.
  const handleClick = card.slug
    ? () => navigate(card.slug!)
    : card.externalUrl
    ? () => window.open(card.externalUrl!, "_blank", "noopener,noreferrer")
    : undefined;

  return (
    <Card
      onClick={handleClick}
      className={[
        "group overflow-hidden rounded-3xl border-0",
        "shadow-[0_24px_80px_rgba(0,0,0,0.24)]",
        handleClick ? "cursor-pointer" : "cursor-default",
      ].join(" ")}
      style={{ background: card.bg }}
    >
      {/* ── Content area — kept compact (smaller title, tighter padding,
          wider subline) so the image stage below stays visible in the
          sticky viewport instead of getting pushed off-screen ─────── */}
      <div className="py-10 px-8 max-w-[800px] mx-auto w-full flex flex-col items-center gap-5">

        {/* Logo — fixed-height slot (rendered even when empty) keeps every card
            the same height, which is what the stacking scroll effect relies on */}
        <div className="h-10 flex items-center justify-center">
          {card.logo && (
            <img
              src={card.logo}
              alt={`${card.title} logo`}
              className={`block${card.logoRounded ? " rounded-lg" : ""}`}
              style={{ height: card.logoHeight ?? "32px", width: card.logoWidth ?? "auto", objectFit: "contain" }}
            />
          )}
        </div>

        {/* Tagline pill — dot colour from status */}
        <Tagline icon={false} dot={dot}>{card.badge}</Tagline>

        {/* Title */}
        <h2
          className="font-semibold text-center text-[44px] leading-[48px] tracking-[-1.5px]"
          style={{ color: card.textColor }}
        >
          {card.title}
        </h2>

        {/* Description */}
        <p
          className="text-base leading-7 text-center max-w-[720px] mx-auto"
          style={{ color: card.mutedColor }}
        >
          {card.subline}
        </p>

        {/* CTA — fixed-height slot (rendered even when there's no link),
            same trick as the logo slot above, so a card with a button
            (Hive) and a card without one (the AI "coming soon" card) still
            render at exactly the same total height. Every card in this
            stack has to be the same height for the scroll-stack effect to
            cover cleanly — a card without a CTA leaving a gap here is what
            let the card behind it poke out below.
            Shows its own hover state (group-hover) whenever the card
            itself is hovered, not just when hovering the button directly —
            since the whole card is already clickable, the button should
            visually react wherever you hover. */}
        <div className="h-9 flex items-center justify-center">
          {(card.slug || card.externalUrl) && (
            <Button
              className="bg-zinc-900 text-white rounded-full px-5 h-9 text-sm
                         font-medium group-hover:bg-zinc-700 hover:bg-zinc-700 gap-1.5"
            >
              {card.ctaLabel ?? "Case study"}
              <ArrowRight size={14} />
            </Button>
          )}
        </div>
      </div>

      {/* Image stage — fixed height (not max-height) so every card is the
          same total height whether it shows a real image or the
          coming-soon placeholder. The stacking scroll effect in
          PortfolioCard relies on every card being the same height to
          cover the one behind it cleanly. */}
      <motion.div
        className="mx-6 mb-6 rounded-2xl p-6 overflow-hidden h-[336px]"
        style={{ background: card.imageBg }}
        whileHover={{ backgroundColor: "#0891B2" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {card.imagePath ? (
          <img
            src={card.imagePath}
            alt={card.imageAlt ?? card.title}
            className="mx-auto object-contain block w-full h-full"
          />
        ) : (
          <ComingSoonPlaceholder />
        )}
      </motion.div>
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

// Tuning constants for the stack — independent of card count, so adding or
// removing cards never requires touching these.
const STACK_TOP_OFFSET  = 8;    // px each card's sticky position steps down by
const SCALE_STEP        = 0.035; // additional shrink per card stacked on top of this one
const MIN_SCALE         = 0.82;  // floor — cards never shrink past this, however deep the stack gets
const MAX_VISIBLE_DEPTH = 2;     // cards more than this many steps back freeze in place

// Each card's sticky slot is shorter than a full 100vh on purpose: a card's
// own rendered height (~700px) is fixed regardless of viewport height, so a
// full 100vh slot leaves a growing dead zone below the card on taller
// laptop/desktop screens before the next card's top edge peeks in. Shrinking
// the slot keeps a small dwell margin (so the sticky pin still holds
// briefly) while making sure the next card's top is already visible as soon
// as the current one becomes active, instead of only appearing after
// scrolling partway through that card's dwell.
const CARD_SLOT_VH = 90;

function PortfolioCard({ card, index, total, progress }: PortfolioCardProps) {
  // Every card's sticky wrapper occupies exactly one CARD_SLOT_VH-tall slot,
  // so the container is `total` slots tall — but Framer's scrollYProgress
  // (offset "start start" → "end end") reaches 1.0 once the container's
  // BOTTOM meets the viewport's bottom, which happens after only
  // (total - 1) slot-heights of actual scrolling (the last slot never needs
  // to scroll past itself). So progress 0→1 spans (total - 1) slot-widths,
  // not `total`: a card's real slot boundary sits
  // at index / (total - 1) of progress, not index / total. Using `total`
  // as the denominator underestimates every later card's hand-off point,
  // and the error compounds with index — negligible for card 1, but by the
  // last couple of cards it's nearly a full slot, which is exactly why the
  // final two cards were colliding instead of handing off cleanly.
  const denom  = Math.max(total - 1, 1);
  const step   = 1 / denom;
  const enter  = index * step; // this card becomes the active, full-size card

  // No opacity animation at all — every card is always fully opaque. Cards
  // are invisible before their turn purely because they're still below the
  // fold in normal document flow (this is a sticky-positioned stack, not an
  // absolutely-positioned one), and the "peek" of earlier cards once
  // covered comes only from them shrinking and sitting at a lower
  // z-index/top-offset than the active card — never from transparency, so
  // there's no way for cards to look washed-out or ghosted through one
  // another.
  //
  // Scale keeps shrinking a little further for every subsequent card that
  // stacks on top of this one (not just a single flat "receded" size), so
  // by the time a few cards have piled up, each one behind the active
  // card is a visibly different, progressively smaller size — a real
  // perspective pile instead of a jumble of identically-sized slivers.
  // Built from `enter` breakpoints only (card k's own index/total slot),
  // so it's still fully derived from index/total and reflows automatically
  // for any card count.
  //
  // Depth is capped at MAX_VISIBLE_DEPTH rather than left unbounded
  // (total - 1 - index): once a card is buried that many cards deep it's
  // already reduced to a sliver, so there's nothing to gain from keeping
  // its scale live for the rest of the scroll — and continuing to would
  // mean every card behind the active one recomputes its transform on
  // every frame for the whole remainder of the section. With several
  // nested, near-identically-scaled transforms all still updating at
  // once, their overlapping edges are only a sub-pixel apart, which is
  // exactly the condition that produces visible flicker as each one
  // rounds differently frame to frame. Capping depth freezes a card's
  // scale (via useTransform's default clamping) once it's gone far enough
  // back to no longer matter, so only the couple of cards actually near
  // the top of the pile are ever animating at once.
  const depth = Math.min(total - 1 - index, MAX_VISIBLE_DEPTH); // how many cards behind the active one are still live
  const scaleInputs: number[]  = [enter];
  const scaleOutputs: number[] = [1];
  for (let d = 1; d <= depth; d++) {
    scaleInputs.push(Math.min((index + d) * step, 1));
    scaleOutputs.push(Math.max(1 - d * SCALE_STEP, MIN_SCALE));
  }
  // useTransform needs at least two points — the last card (depth 0) has
  // nothing left to recede into, so give it a flat, constant 1.
  if (scaleInputs.length === 1) {
    scaleInputs.push(1);
    scaleOutputs.push(1);
  }
  const scale = useTransform(progress, scaleInputs, scaleOutputs);

  return (
    // The wrapper is pinned to a fixed CARD_SLOT_VH scroll slot — the same
    // allocation the container below gives every card (cards.length *
    // CARD_SLOT_VH total). This keeps the index/total scroll-progress math
    // locked to each card's actual sticky hand-off regardless of how tall
    // its content is. Without a fixed slot, cards with little content (no
    // image, e.g. Hive or the "coming soon" card) consume their scroll
    // runway far faster than cards with a big image, which desyncs the
    // progress-based recede timing from when the card is actually visible
    // — the stack looks fine card-to-card until it hits two short cards in
    // a row, then collides/overlaps. Content is top-aligned inside the
    // slot so shorter cards don't stretch.
    //
    // z-index is derived from index so later cards always paint on top of
    // earlier ones, regardless of DOM/paint-order quirks — this is what
    // guarantees clean stacking as card count grows.
    <div
      className="sticky w-full"
      style={{ top: `${72 + index * STACK_TOP_OFFSET}px`, height: `${CARD_SLOT_VH}vh`, zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale, transformOrigin: "top center", willChange: "transform" }}
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
    <section id="work" className="bg-transparent pt-12 pb-8">
      <p className="text-xs tracking-widest text-zinc-500 uppercase mb-16 max-w-5xl mx-auto px-6">
        Featured Work
      </p>

      <div
        ref={containerRef}
        style={{ height: `${visibleCards.length * CARD_SLOT_VH}vh` }}
        className="relative"
      >
        {visibleCards.map((card, index) => (
          <PortfolioCard
            key={card.id}
            card={card}
            index={index}
            total={visibleCards.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

    </section>
  );
}
