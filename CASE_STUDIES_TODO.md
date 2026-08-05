# CaseStudies.tsx — open items

## Copy restructure (next up)
Consider changing the card content hierarchy in `src/components/CaseStudies.tsx`
(the `ImageCard` component): use the **Title** slot for the project/product name
itself, and move the **metrics/results obtained** (e.g. "1M+ users across 6
countries", "700+ students", "3,500+ universities") into the secondary copy
line, rather than folding them into the subline as a trailing clause like now.

Current pattern (per card in the `cards` array):
- `title` → project name (e.g. "Hive", "GlintPay")
- `subline` → one line mixing description + metric (e.g. "hivehome.com
  redesign — led a 7-person team to 1M+ users across 6 countries")

Idea: keep title as-is, but restructure `subline` (or add a new field) so the
metric reads as its own clear line rather than being buried at the end of a
long sentence.

## Status of earlier fixes (for reference)
- Stacking scroll animation: fixed (data-driven from index/total, fixed
  card heights via h-[336px] image stage + fixed-height CTA/logo slots, no
  opacity animation, progressive perspective scale on recede).
- Hover state: card CTA button shows hover via `group-hover`, not full-card
  opacity/color change (opacity broke stacking, color-shift felt dull).
- Hive: logo recolored, sized down to 22px, "View project" CTA linking out
  to hivehome.com (no dedicated case-study page yet — could build one later).
- NatWest: CTA relabeled "View project" (was "Case study").
- THE DataPoints: orange status dot already correct (status: "coming-soon").
