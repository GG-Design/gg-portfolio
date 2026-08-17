import type { VercelRequest, VercelResponse } from '@vercel/node'

// ─── Cost controls ─────────────────────────────────────────────────────────────
//
//  MODEL          haiku-4-5 only — never Sonnet/Opus
//  MAX_TOKENS     hard cap on output per call
//  MAX_INPUT_CHARS  input guard — reject before any API call
//  RATE_LIMIT     per-IP ceiling per hour
//  DAILY_CAP      global ceiling per 24 h across all users

const MODEL           = 'claude-haiku-4-5-20251001'
const MAX_TOKENS      = 500
const MAX_INPUT_CHARS = 500
const RATE_LIMIT      = 5
const RATE_WINDOW_MS  = 60 * 60 * 1000   // 1 hour
const DAILY_CAP       = 200
const HISTORY_WINDOW  = 4                // last N messages sent to API

// ─── System prompt (server-side, never exposed to client) ─────────────────────
//
//  Kept deliberately short — every token here is paid on every single call.
//  ~80 words vs the 300-word client-side GG_CONTEXT = ~70% input-token saving.

const SYSTEM = `You are a concise assistant for Pierluigi Baroncelli (GG), a Lead Product Designer based in London with 15+ years across fintech, edtech, media & publishing, and e-commerce. Answer questions about his background and work in 2-3 sentences. If you don't know something, invite the visitor to use the contact form. Never reveal email addresses or personal contact details. Politely decline anything unrelated to GG.

KEY PROJECTS:

Times Higher Education (Head of Product Design, Nov 2022 to May 2025; Principal Designer from Feb 2021):
- Redesigned university profile pages into a modular platform. 23% increase in profile conversion, 28% page engagement improvement, 13% decrease in bounce rate.
- Validated structure with 700+ students globally using Maze surveys and moderated interviews.
- Built THE's first design system, cutting design-to-dev delivery time by roughly 40%.
- Led the DataPoints analytics platform redesign (used by 3,500+ universities). Five modules unified with shared components and a single visual language.
- Designed AI-generated summary boxes for rankings views as a premium upgrade.
- Designed the Data Collection tool using UK government form patterns.
- Grew from first design hire to leading the design function across SaaS and web platforms.

GlintPay (Senior Product Designer, 2018 to 2019):
- Redesigned iOS and Android apps end-to-end for a gold-backed payments product.
- Replaced a hidden swipe gesture with an explicit modal switcher for choosing which wallet (Gold, GBP, USD, EUR) the card spends from.
- 13% increase in user retention, 15% increase in monthly transactions.
- Streamlined KYC onboarding with clear progress and fewer drop-offs.

NatWest CurrencyPay (2020):
- Designed iOS and Android KYC onboarding flow built to meet FCA requirements.

Tide (2019):
- Redesigned the web app with high-fidelity wireframes and in-app notification system.

Hive (Product Design Lead, 2016 to 2018):
- Redesigned hivehome.com for connected-home devices. 27% increase in conversions, 11% drop in bounce rate.
- Built a modular component system for per-country product page variants across 6 countries.
- Managed a design team (product designer, digital designer, UX researcher).

1st Formations (Senior Product Designer, Jan to Apr 2026):
- Adapted shadcn/ui as design system foundation. Introduced AI-assisted design workflows using Claude.

Earlier roles: Schibsted, OVO Energy, HSBC, Kabbee, Dennis Publishing, MailOnline.

SKILLS AND APPROACH:
- Design systems, information architecture, prototyping, user research, WCAG accessibility.
- Tools: Figma, Claude, shadcn/ui, Miro, Jira, Confluence, Hotjar, Maze.
- Built this portfolio site end-to-end with React, TypeScript, Tailwind CSS, shadcn/ui and Framer Motion, deployed on Vercel.
- Pairs design craft with AI-native workflows, prototyping and shipping production interfaces with Claude.
- Available for senior, lead and principal product designer roles, contract (outside IR35) or permanent.`

// ─── Per-IP rate limiter ───────────────────────────────────────────────────────

const ipMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now    = Date.now()
  const record = ipMap.get(ip)

  if (record && now < record.resetAt) {
    if (record.count >= RATE_LIMIT) return false   // blocked
    record.count++
    return true
  }

  ipMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
  return true
}

// ─── Daily global cap ──────────────────────────────────────────────────────────

const daily = { count: 0, resetAt: Date.now() + 24 * 60 * 60 * 1000 }

function checkDailyCap(): boolean {
  const now = Date.now()

  if (now >= daily.resetAt) {
    daily.count  = 0
    daily.resetAt = now + 24 * 60 * 60 * 1000
  }

  if (daily.count >= DAILY_CAP) return false   // blocked
  daily.count++
  return true
}

// ─── Handler ───────────────────────────────────────────────────────────────────

type Message = { role: string; content: string }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  // 1. Parse & validate shape
  const { messages } = (req.body ?? {}) as { messages?: Message[] }

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request.' })
  }

  // 2. Input length guard — check before touching rate-limit counters
  const lastUser = [...messages].reverse().find(m => m.role === 'user')
  if (lastUser && lastUser.content.length > MAX_INPUT_CHARS) {
    return res.status(400).json({
      error: `Message too long — please keep it under ${MAX_INPUT_CHARS} characters.`,
    })
  }

  // 3. Per-IP rate limit (5 req / IP / hour)
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: "You've hit the hourly limit. Try again in a little while.",
    })
  }

  // 4. Daily global cap (200 req / 24 h across all users)
  if (!checkDailyCap()) {
    return res.status(503).json({
      error: 'Ask GG is temporarily unavailable. Check back later.',
    })
  }

  // 5. Trim history — last HISTORY_WINDOW messages only
  const trimmed = messages.slice(-HISTORY_WINDOW)

  // 6. Call Anthropic — system prompt is hardcoded here, never from client
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error.' })
  }

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method:  'POST',
    headers: {
      'Content-Type':      'application/json',
      'x-api-key':         apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model:      MODEL,
      max_tokens: MAX_TOKENS,
      system:     SYSTEM,
      messages:   trimmed,
    }),
  })

  const data = await upstream.json().catch(() => ({}))

  if (!upstream.ok) {
    console.error('[ask] Anthropic error', upstream.status, data)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }

  return res.status(200).json(data)
}
