// Vercel Edge Function — contact form
// Before deploying, add RESEND_API_KEY to Vercel:
//   vercel env add RESEND_API_KEY production
// Or via the Vercel dashboard: Project → Settings → Environment Variables

import type { VercelRequest, VercelResponse } from '@vercel/node'

// ─── Rate limiting (in-memory, per-instance) ──────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT    = 3
const RATE_WINDOW   = 60 * 60 * 1000 // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now    = Date.now()
  const record = rateLimitMap.get(ip)

  if (record && now < record.resetAt) {
    if (record.count >= RATE_LIMIT) return true
    record.count++
    return false
  }

  rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
  return false
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message, website } = req.body ?? {}

  // Honeypot — silently discard without revealing detection
  if (website) {
    return res.status(200).json({ ok: true })
  }

  // Basic validation
  if (!name || !email || !subject) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }

  // Rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please try again later.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error.' })
  }

  const html = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    ${message ? `<p><strong>Message:</strong></p><p style="white-space:pre-wrap">${message}</p>` : '<p><em>No message provided.</em></p>'}
  `

  const response = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from:    'Portfolio Contact <onboarding@resend.dev>',
      to:      'pierluigi.baroncelli@gmail.com',
      subject: `New message from ${name} — ${subject}`,
      html,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send message. Please try again.' })
  }

  return res.status(200).json({ ok: true })
}
