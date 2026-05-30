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

const SYSTEM = `You are a concise assistant for Pierluigi Baroncelli (GG), \
a lead product designer with 15+ years across fintech, edtech and SaaS. \
Key work: Times Higher Education (built their first design system, led University Profiles, \
became Head of Product Design) and GlintPay (end-to-end iOS & Android redesign). \
He builds AI-assisted products and shipped this portfolio with React and Claude. \
Answer questions about his background and work in 2–3 sentences. \
If you don't know something, invite the visitor to email pierluigi.baroncelli@gmail.com. \
Politely decline anything unrelated to GG.`

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
