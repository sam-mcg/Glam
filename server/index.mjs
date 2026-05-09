import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import Anthropic from '@anthropic-ai/sdk'

const PORT = Number(process.env.PORT ?? 8787)
const apiKey = process.env.VITE_ANTHROPIC_API_KEY

const anthropic = new Anthropic({ apiKey })
const app = express()

app.use(cors())
app.use(express.json({ limit: '1mb' }))

function safeJsonParse(text) {
  try {
    return { ok: true, value: JSON.parse(text) }
  } catch {
    return { ok: false, value: null }
  }
}

function extractFirstJsonObject(text) {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  const slice = text.slice(start, end + 1)
  const parsed = safeJsonParse(slice)
  return parsed.ok ? parsed.value : null
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, hasKey: Boolean(apiKey) })
})

app.post('/api/generate-look', async (req, res) => {
  try {
    if (!apiKey) {
      res.status(500).json({ error: 'Server missing VITE_ANTHROPIC_API_KEY' })
      return
    }

    const products = Array.isArray(req.body?.products) ? req.body.products : []
    const theme = typeof req.body?.theme === 'string' ? req.body.theme.trim() : ''

    const userContent = {
      products,
      theme: theme || null,
    }

    const system = [
      'You are a pro makeup artist and educator.',
      'Generate a cohesive makeup look using ONLY the provided inventory products where possible; if a step needs a tool and no tool is present in inventory, recommend a generic tool.',
      'Return STRICT JSON only (no markdown, no commentary) matching this TypeScript shape:',
      '{ "look_name": string, "vibe": string, "steps": Array<{ "product": string, "tool": string, "technique": string, "density": "sheer"|"light"|"medium"|"full", "opacity": "low"|"medium"|"high", "directions": string }> }',
      'Keep steps practical (6-12 steps). Use short, clear directions.',
    ].join('\n')

    const msg = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 900,
      temperature: 0.7,
      system,
      messages: [
        {
          role: 'user',
          content: [{ type: 'text', text: JSON.stringify(userContent) }],
        },
      ],
    })

    const text = msg.content
      .map((c) => (c.type === 'text' ? c.text : ''))
      .filter(Boolean)
      .join('\n')

    const parsed = safeJsonParse(text)
    const value = parsed.ok ? parsed.value : extractFirstJsonObject(text)

    if (!value) {
      res.status(502).json({ error: 'Claude returned non-JSON', raw: text })
      return
    }

    res.json(value)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    res.status(500).json({ error: message })
  }
})

app.post('/api/ask', async (req, res) => {
  try {
    if (!apiKey) {
      res.status(500).json({ error: 'Server missing VITE_ANTHROPIC_API_KEY' })
      return
    }

    const question = typeof req.body?.question === 'string' ? req.body.question.trim() : ''
    const products = Array.isArray(req.body?.products) ? req.body.products : []

    if (!question) {
      res.status(400).json({ error: 'Missing question' })
      return
    }

    const system = [
      'You are Glam AI, a friendly, safe makeup assistant.',
      'Answer makeup questions clearly and practically.',
      'If product inventory is provided, prefer recommending products from it.',
      'Avoid medical claims; suggest patch tests and professional help for irritation.',
    ].join('\n')

    const payload = { question, products }

    const msg = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 700,
      temperature: 0.5,
      system,
      messages: [{ role: 'user', content: [{ type: 'text', text: JSON.stringify(payload) }] }],
    })

    const answer = msg.content
      .map((c) => (c.type === 'text' ? c.text : ''))
      .filter(Boolean)
      .join('\n')
      .trim()

    res.json({ answer })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    res.status(500).json({ error: message })
  }
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`AI server listening on http://localhost:${PORT}`)
})

