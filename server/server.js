require('dotenv').config()
const express = require('express')
const cors = require('cors')
const crypto = require('node:crypto')
const fs = require('node:fs/promises')
const path = require('node:path')

const app = express()
const port = Number(process.env.PORT || 5000)
const dataFile = path.join(__dirname, 'data', 'blogs.json')
const sessionName = 'blabber_admin'
const sessionDuration = 12 * 60 * 60 * 1000
const loginAttempts = new Map()
let reviewCache = { expires: 0, data: null }

app.disable('x-powered-by')
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '24kb' }))

function parseCookie(req, name) {
  const part = (req.headers.cookie || '').split(';').map(v => v.trim()).find(v => v.startsWith(`${name}=`))
  return part ? decodeURIComponent(part.slice(name.length + 1)) : null
}
function sign(value) { return crypto.createHmac('sha256', process.env.SESSION_SECRET).update(value).digest('hex') }
function isAdmin(req) {
  if (!process.env.SESSION_SECRET || !process.env.BLOG_ADMIN_PASSWORD) return false
  const token = parseCookie(req, sessionName)
  if (!token) return false
  const [expiry, mac] = token.split('.')
  if (!expiry || !mac || !/^\d+$/.test(expiry) || Number(expiry) < Date.now()) return false
  const expected = Buffer.from(sign(expiry), 'hex')
  const given = Buffer.from(mac, 'hex')
  return given.length === expected.length && crypto.timingSafeEqual(given, expected)
}
function requireAdmin(req, res, next) { if (!isAdmin(req)) return res.status(401).json({ error: 'Sign in required' }); next() }
async function readBlogs() { try { return JSON.parse(await fs.readFile(dataFile, 'utf8')) } catch (error) { if (error.code === 'ENOENT') return []; throw error } }
async function writeBlogs(blogs) { await fs.mkdir(path.dirname(dataFile), { recursive: true }); const temp = `${dataFile}.tmp`; await fs.writeFile(temp, JSON.stringify(blogs, null, 2)); await fs.rename(temp, dataFile) }
function slugify(text) { return text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) }

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.get('/api/blogs', async (_req, res) => { try { res.json(await readBlogs()) } catch { res.status(500).json({ error: 'Could not load stories' }) } })
app.get('/api/blogs/:slug', async (req, res) => { try { const blog = (await readBlogs()).find(b => b.slug === req.params.slug); if (!blog) return res.status(404).json({ error: 'Story not found' }); res.json(blog) } catch { res.status(500).json({ error: 'Could not load story' }) } })
app.get('/api/admin/session', (req, res) => isAdmin(req) ? res.json({ authenticated: true }) : res.status(401).json({ authenticated: false }))
app.post('/api/admin/login', (req, res) => {
  if (!process.env.BLOG_ADMIN_PASSWORD || !process.env.SESSION_SECRET) return res.status(503).json({ error: 'Admin access is not configured' })
  const key = req.ip || 'unknown', recent = (loginAttempts.get(key) || []).filter(t => Date.now() - t < 15 * 60 * 1000)
  if (recent.length >= 10) return res.status(429).json({ error: 'Try again later' })
  const supplied = crypto.createHash('sha256').update(String(req.body?.password || '')).digest()
  const expected = crypto.createHash('sha256').update(process.env.BLOG_ADMIN_PASSWORD).digest()
  if (!crypto.timingSafeEqual(supplied, expected)) { recent.push(Date.now()); loginAttempts.set(key, recent); return res.status(401).json({ error: 'Invalid password' }) }
  loginAttempts.delete(key)
  const expiry = String(Date.now() + sessionDuration)
  res.cookie(sessionName, `${expiry}.${sign(expiry)}`, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: sessionDuration, path: '/api' })
  res.json({ authenticated: true })
})
app.post('/api/admin/logout', (_req, res) => { res.clearCookie(sessionName, { path: '/api' }); res.json({ ok: true }) })
app.post('/api/blogs', requireAdmin, async (req, res) => {
  const { title, category, excerpt, body, image } = req.body || {}
  if (![title, category, excerpt, body, image].every(v => typeof v === 'string' && v.trim()) || title.length > 140 || excerpt.length > 240 || body.length > 20000 || !['Food & drink', 'Spaces'].includes(category) || !(/^\/images\/[a-z0-9-]+\.webp$/.test(image) || /^https:\/\//.test(image))) return res.status(400).json({ error: 'Invalid story' })
  try {
    const blogs = await readBlogs()
    const base = slugify(title)
    const slug = blogs.some(b => b.slug === base) ? `${base}-${Date.now()}` : base
    const blog = { slug, title: title.trim(), category, excerpt: excerpt.trim(), body: body.trim(), image, date: new Date().toISOString().slice(0, 10), readTime: `${Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 220))} min read` }
    blogs.unshift(blog); await writeBlogs(blogs); res.status(201).json(blog)
  } catch { res.status(500).json({ error: 'Could not publish story' }) }
})

// Google Places API (New) Place Details. Configure one or more verified outlet Place IDs.
app.get('/api/reviews', async (_req, res) => {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeIds = [process.env.GOOGLE_PLACE_ID_JUHU, process.env.GOOGLE_PLACE_ID_BORIVALI, process.env.GOOGLE_PLACE_ID_THANE].filter(Boolean)
  if (!key || !placeIds.length) return res.status(503).json({ error: 'Google reviews are not configured' })
  if (Date.now() < reviewCache.expires) return res.json(reviewCache.data)
  try {
    const responses = await Promise.all(placeIds.map(async id => {
      const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`, { headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'id,displayName,reviews,googleMapsUri' } })
      if (!response.ok) throw new Error(`Google Places returned ${response.status}`)
      return response.json()
    }))
    const reviews = responses.flatMap(place => (place.reviews || []).filter(r => r.text?.text).map(r => ({ author: r.authorAttribution?.displayName || 'Google reviewer', rating: r.rating, text: r.text.text.slice(0, 390), url: r.googleMapsUri || place.googleMapsUri, outlet: place.displayName?.text }))).slice(0, 3)
    reviewCache = { expires: Date.now() + 60 * 60 * 1000, data: { reviews } }
    res.json(reviewCache.data)
  } catch (error) { console.error('Google reviews:', error.message); res.status(502).json({ error: 'Reviews are temporarily unavailable' }) }
})

app.listen(port, () => console.log(`Blabber API listening on ${port}`))
