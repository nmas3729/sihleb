import { Resend } from 'resend'

const destination = 'hello@sihleb.co.za'
export const runtime = 'nodejs'
const maxMessageLength = 5000
const services = new Set(['Web Design', 'Web Development', 'E-commerce', 'SEO Foundations', 'Hosting', 'Website Care', 'Not sure yet — I’d like some guidance.'])
const budgets = new Set(['Not sure yet', 'R9,500 Launch', 'R18,500 Growth', 'R32,000 Signature'])
const rateWindowMs = 10 * 60 * 1000
const rateLimit = new Map<string, number[]>()
const processedRequestIds = new Set<string>()

type Enquiry = {
  name: string
  business: string
  email: string
  service: string
  budget: string
  message: string
  phone: string
  currentWebsite: string
  timeframe: string
  website: string
  requestId: string
}

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string) {
  return value.replace(/[&<>\"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '\"': '&quot;',
    "'": '&#39;',
  })[character] || character)
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (rateLimit.get(ip) || []).filter(timestamp => now - timestamp < rateWindowMs)
  recent.push(now)
  rateLimit.set(ip, recent)
  return recent.length > 5
}

function enquiryEmail(enquiry: Enquiry) {
  const name = escapeHtml(enquiry.name)
  const business = escapeHtml(enquiry.business)
  const email = escapeHtml(enquiry.email)
  const service = escapeHtml(enquiry.service)
  const budget = escapeHtml(enquiry.budget)
  const message = escapeHtml(enquiry.message).replace(/\n/g, '<br />')

  return `<!doctype html>
<html><body style="margin:0;background:#f4f3ee;color:#080a0d;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:40px 28px;background:#f4f3ee;">
    <div style="border-top:4px solid #c7ff3d;padding-top:18px;">
      <p style="margin:0;color:#626970;font-size:11px;font-weight:700;letter-spacing:2px;">SIHLEB</p>
      <h1 style="margin:14px 0 34px;font-size:30px;line-height:1;color:#080a0d;">NEW PROJECT ENQUIRY</h1>
      <p style="margin:0 0 10px;color:#626970;font-size:11px;font-weight:700;letter-spacing:2px;">CONTACT</p>
      <div style="padding:18px;background:#ffffff;border:1px solid #d8d6cf;line-height:1.7;font-size:14px;">
        <strong>Name:</strong> ${name}<br />
        <strong>Business:</strong> ${business}<br />
        <strong>Email:</strong> ${email}
          <br /><strong>Phone / WhatsApp:</strong> ${escapeHtml(enquiry.phone) || 'Not provided'}
          <br /><strong>Current website:</strong> ${escapeHtml(enquiry.currentWebsite) || 'Not provided'}
      </div>
      <p style="margin:28px 0 10px;color:#626970;font-size:11px;font-weight:700;letter-spacing:2px;">PROJECT</p>
      <div style="padding:18px;background:#ffffff;border:1px solid #d8d6cf;line-height:1.7;font-size:14px;">
        <strong>Service:</strong> ${service}<br />
        <strong>Budget:</strong> ${budget}
        <br /><strong>Timeframe:</strong> ${escapeHtml(enquiry.timeframe) || 'Not sure yet'}
        <p style="margin:18px 0 0;padding-top:18px;border-top:1px solid #d8d6cf;"><strong>Message:</strong><br />${message}</p>
      </div>
      <p style="margin:28px 0 0;color:#626970;font-size:12px;">Submitted via: sihleb.co.za</p>
    </div>
  </div>
</body></html>`
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  if (isRateLimited(ip)) {
    return Response.json({ error: 'rate_limited' }, { status: 429 })
  }

  let payload: Partial<Enquiry>
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'invalid_request' }, { status: 400 })
  }

  const enquiry: Enquiry = {
    name: clean(payload.name),
    business: clean(payload.business),
    email: clean(payload.email),
    service: clean(payload.service),
    budget: clean(payload.budget),
    message: clean(payload.message),
    phone: clean(payload.phone),
    currentWebsite: clean(payload.currentWebsite),
    timeframe: clean(payload.timeframe),
    website: clean(payload.website),
    requestId: clean(payload.requestId),
  }

  if (enquiry.website) {
    return Response.json({ ok: true })
  }

  if (!enquiry.name || !enquiry.business || !enquiry.email || !services.has(enquiry.service) || !budgets.has(enquiry.budget) || !enquiry.message || !enquiry.requestId || !isValidEmail(enquiry.email) || enquiry.name.length > 120 || enquiry.business.length > 160 || enquiry.email.length > 254 || enquiry.message.length > maxMessageLength || enquiry.phone.length > 40 || enquiry.currentWebsite.length > 300 || enquiry.timeframe.length > 80 || enquiry.requestId.length > 100) {
    return Response.json({ error: 'invalid_fields' }, { status: 400 })
  }

  if (processedRequestIds.has(enquiry.requestId)) {
    return Response.json({ error: 'duplicate_request' }, { status: 409 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !from) {
    console.error('Project enquiry email is not configured: RESEND_API_KEY and RESEND_FROM_EMAIL are required.')
    return Response.json({ error: 'email_not_configured' }, { status: 500 })
  }

  try {
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from,
      to: destination,
      replyTo: enquiry.email,
      subject: `New Project Enquiry — ${enquiry.business || enquiry.name}`,
      html: enquiryEmail(enquiry),
      text: `SIHLEB\nNEW PROJECT ENQUIRY\n\nCONTACT\nName: ${enquiry.name}\nBusiness: ${enquiry.business}\nEmail: ${enquiry.email}\n\nPROJECT\nService: ${enquiry.service}\nBudget: ${enquiry.budget}\n\nMessage:\n${enquiry.message}\n\nSubmitted via: sihleb.co.za`,
    })

    if (result.error) {
      console.error('Resend project enquiry failed:', result.error.name)
      return Response.json({ error: 'email_failed' }, { status: 500 })
    }

    processedRequestIds.add(enquiry.requestId)
    if (processedRequestIds.size > 1000) processedRequestIds.delete(processedRequestIds.values().next().value as string)

    const confirmation = await resend.emails.send({
      from,
      to: enquiry.email,
      subject: 'We received your project enquiry — SihleB',
      html: `<div style="max-width:600px;padding:32px;background:#f4f3ee;color:#080a0d;font-family:Arial,Helvetica,sans-serif;"><div style="border-top:4px solid #c7ff3d;padding-top:18px;"><p style="font-size:11px;font-weight:700;letter-spacing:2px;">SIHLEB</p><h1 style="font-size:28px;">Thanks for reaching out, ${escapeHtml(enquiry.name)}.</h1><p style="font-size:16px;line-height:1.6;">We’ve received your project enquiry and will take a look at what you’re building.</p><p style="font-size:16px;line-height:1.6;">We’ll be in touch soon.</p><p style="margin-top:32px;font-size:13px;line-height:1.7;">SihleB<br />Web Design + Hosting<br /><strong>DESIGN. BUILD. HOST.</strong><br />hello@sihleb.co.za</p></div></div>`,
      text: `Hi ${enquiry.name},\n\nThanks for reaching out to SihleB.\n\nWe’ve received your project enquiry and will take a look at what you’re building.\n\nWe’ll be in touch soon.\n\nSihleB\nWeb Design + Hosting\nDESIGN. BUILD. HOST.\nhello@sihleb.co.za`,
    })

    if (confirmation.error) console.error('Resend confirmation email failed:', confirmation.error.name)
    return Response.json({ ok: true })
  } catch (error) {
    console.error('Resend project enquiry request failed:', error instanceof Error ? error.message : 'unknown error')
    return Response.json({ error: 'email_failed' }, { status: 500 })
  }
}
