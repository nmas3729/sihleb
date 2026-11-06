import { Resend } from 'resend'

export const runtime = 'nodejs'

const destination = 'hello@sihleb.co.za'
const rateWindowMs = 10 * 60 * 1000
const rateLimit = new Map<string, number[]>()
export const processedRequestIds = new Set<string>()

export const marketOptions = ['Eastern Europe', 'Australia', 'Other country'] as const
export const packageByMarket = {
  'Eastern Europe': '€750 — Eastern Europe',
  Australia: 'A$1,250 — Australia',
  'Other country': 'Custom quote to be confirmed',
} as const

export function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] || character)
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isValidUrl(value: string) {
  if (!value) return true

  try {
    const parsed = new URL(value)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

export function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (rateLimit.get(ip) || []).filter(timestamp => now - timestamp < rateWindowMs)
  recent.push(now)
  rateLimit.set(ip, recent)
  return recent.length > 5
}

export function resolveMarketPrice(market: string) {
  const value = clean(market)
  return value && value in packageByMarket ? packageByMarket[value as keyof typeof packageByMarket] : null
}

export function validateApplication(payload: Partial<Record<string, unknown>>) {
  const name = clean(payload.name)
  const businessName = clean(payload.businessName)
  const email = clean(payload.email)
  const businessWebsite = clean(payload.businessWebsite)
  const market = clean(payload.market)
  const businessType = clean(payload.businessType)
  const existingWebsite = clean(payload.existingWebsite)
  const projectNeeds = clean(payload.projectNeeds)
  const preferredPackage = clean(payload.preferredPackage)
  const brandAssetsReady = clean(payload.brandAssetsReady)
  const timeline = clean(payload.timeline)
  const requestId = clean(payload.requestId)
  const authorisedToDiscuss = Boolean(payload.authorisedToDiscuss)
  const canApprove = Boolean(payload.canApprove)
  const understandsPrice = Boolean(payload.understandsPrice)
  const paymentAfterApproval = Boolean(payload.paymentAfterApproval)
  const contentReady = Boolean(payload.contentReady)

  if (!name || !businessName || !email || !market || !businessType || !projectNeeds || !preferredPackage || !brandAssetsReady || !timeline || !requestId) {
    return { error: 'invalid_fields' as const }
  }

  const isKnownMarket = marketOptions.includes(market as (typeof marketOptions)[number])
  if (!isValidEmail(email) || !isKnownMarket || name.length > 120 || businessName.length > 160 || businessType.length > 160 || projectNeeds.length > 3500 || timeline.length > 120 || requestId.length > 100) {
    return { error: 'invalid_fields' as const }
  }

  if (businessWebsite && !isValidUrl(businessWebsite)) {
    return { error: 'invalid_fields' as const }
  }

  if (existingWebsite && !isValidUrl(existingWebsite)) {
    return { error: 'invalid_fields' as const }
  }

  if (market === 'Eastern Europe' && preferredPackage !== packageByMarket['Eastern Europe']) {
    return { error: 'invalid_fields' as const }
  }

  if (market === 'Australia' && preferredPackage !== packageByMarket.Australia) {
    return { error: 'invalid_fields' as const }
  }

  if (market === 'Other country' && preferredPackage !== packageByMarket['Other country']) {
    return { error: 'invalid_fields' as const }
  }

  if (!authorisedToDiscuss || !canApprove || !understandsPrice || !paymentAfterApproval || !contentReady) {
    return { error: 'invalid_fields' as const }
  }

  return {
    name,
    businessName,
    email,
    businessWebsite,
    market,
    businessType,
    existingWebsite,
    projectNeeds,
    preferredPackage,
    brandAssetsReady,
    timeline,
    requestId,
    authorisedToDiscuss,
    canApprove,
    understandsPrice,
    paymentAfterApproval,
    contentReady,
  }
}

export function resolveSubmissionStatus(internalEmailSent: boolean, acknowledgementSent: boolean) {
  if (internalEmailSent && acknowledgementSent) return 'application_received'
  if (internalEmailSent && !acknowledgementSent) return 'application_received_confirmation_failed'
  return 'application_failed'
}

function applicationEmail(application: ReturnType<typeof validateApplication> & {
  name: string
  businessName: string
  email: string
  businessWebsite: string
  market: string
  businessType: string
  existingWebsite: string
  projectNeeds: string
  preferredPackage: string
  brandAssetsReady: string
  timeline: string
  requestId: string
  authorisedToDiscuss: boolean
  canApprove: boolean
  understandsPrice: boolean
  paymentAfterApproval: boolean
  contentReady: boolean
}) {
  const rows = [
    ['Full name', application.name],
    ['Business name', application.businessName],
    ['Business email', application.email],
    ['Business website', application.businessWebsite || 'Not provided'],
    ['Target market', application.market],
    ['Package', application.preferredPackage],
    ['Business type', application.businessType],
    ['Existing website', application.existingWebsite || 'Not provided'],
    ['Brand content status', application.brandAssetsReady],
    ['Project timeline', application.timeline],
    ['Authorised to discuss', application.authorisedToDiscuss ? 'Yes' : 'No'],
    ['Can approve project', application.canApprove ? 'Yes' : 'No'],
    ['Understands price', application.understandsPrice ? 'Yes' : 'No'],
    ['Payment after approval', application.paymentAfterApproval ? 'Yes' : 'No'],
    ['Content ready', application.contentReady ? 'Yes' : 'No'],
    ['Request ID', application.requestId],
  ]

  const body = rows
    .map(([label, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #d8d6cf;vertical-align:top;font-weight:700;color:#080a0d;">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #d8d6cf;vertical-align:top;color:#080a0d;">${escapeHtml(value as string)}</td></tr>`)
    .join('')

  return `<!doctype html><html><body style="margin:0;background:#f4f3ee;color:#080a0d;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:760px;margin:0 auto;padding:40px 28px;background:#f4f3ee;">
      <div style="border-top:4px solid #c7ff3d;padding-top:18px;">
        <p style="margin:0;color:#626970;font-size:11px;font-weight:700;letter-spacing:2px;">SIHLEB</p>
        <h1 style="margin:14px 0 24px;font-size:30px;line-height:1.1;color:#080a0d;">INTERNATIONAL WEBSITE APPLICATION</h1>
        <div style="padding:18px;background:#ffffff;border:1px solid #d8d6cf;line-height:1.7;font-size:14px;">
          <table style="width:100%;border-collapse:collapse;">
            ${body}
          </table>
        </div>
        <p style="margin:18px 0 0;padding-top:18px;border-top:1px solid #d8d6cf;color:#626970;font-size:12px;">Application details for the new international landing page enquiry.</p>
      </div>
    </div>
  </body></html>`
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  if (isRateLimited(ip)) {
    return Response.json({ error: 'rate_limited', message: 'Too many applications from this IP. Please wait a moment and try again.' }, { status: 429 })
  }

  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'invalid_request', message: 'The request was invalid.' }, { status: 400 })
  }

  const honeypot = clean(payload.website)
  if (honeypot) {
    return Response.json({ ok: true, status: 'ignored_honeypot', message: 'Application received.' })
  }

  const valid = validateApplication(payload)
  if ('error' in valid) {
    return Response.json({ error: valid.error, message: 'Please review the required fields and try again.' }, { status: 400 })
  }

  if (processedRequestIds.has(valid.requestId)) {
    return Response.json({ error: 'duplicate_request', message: 'This application has already been received.' }, { status: 409 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !from) {
    console.error('International enquiry email is not configured: RESEND_API_KEY and RESEND_FROM_EMAIL are required.')
    return Response.json({ error: 'email_not_configured', message: 'Application could not be accepted right now.' }, { status: 500 })
  }

  try {
    const resend = new Resend(apiKey)
    const html = applicationEmail(valid)

    const result = await resend.emails.send({
      from,
      to: destination,
      replyTo: valid.email,
      subject: `New International Application — ${valid.businessName}`,
      html,
      text: `SIHLEB
INTERNATIONAL WEBSITE APPLICATION

Full name: ${valid.name}
Business name: ${valid.businessName}
Business email: ${valid.email}
Business website: ${valid.businessWebsite || 'Not provided'}
Target market: ${valid.market}
Package: ${valid.preferredPackage}
Business type: ${valid.businessType}
Existing website: ${valid.existingWebsite || 'Not provided'}
Brand content status: ${valid.brandAssetsReady}
Project timeline: ${valid.timeline}
Project needs:
${valid.projectNeeds}

Authorised to discuss: ${valid.authorisedToDiscuss ? 'Yes' : 'No'}
Can approve project: ${valid.canApprove ? 'Yes' : 'No'}
Understands price: ${valid.understandsPrice ? 'Yes' : 'No'}
Payment after approval: ${valid.paymentAfterApproval ? 'Yes' : 'No'}
Content ready: ${valid.contentReady ? 'Yes' : 'No'}
Request ID: ${valid.requestId}`,
    })

    if (result.error) {
      console.error('Resend international enquiry failed:', result.error.name)
      return Response.json({ error: 'email_failed', message: 'Application could not be accepted right now.' }, { status: 500 })
    }

    processedRequestIds.add(valid.requestId)
    if (processedRequestIds.size > 1000) {
      const first = processedRequestIds.values().next().value as string | undefined
      if (first) processedRequestIds.delete(first)
    }

    const confirmation = await resend.emails.send({
      from,
      to: valid.email,
      subject: 'Application received — SihleB Digital Studio',
      html: `<div style="max-width:600px;padding:32px;background:#f4f3ee;color:#080a0d;font-family:Arial,Helvetica,sans-serif;"><div style="border-top:4px solid #c7ff3d;padding-top:18px;"><p style="font-size:11px;font-weight:700;letter-spacing:2px;">SIHLEB</p><h1 style="font-size:28px;">Thanks for your application.</h1><p style="font-size:16px;line-height:1.6;">We’ve received your international website application and will review your project details soon.</p><p style="font-size:16px;line-height:1.6;">If your request fits the scope, we’ll be in touch with next steps.</p><p style="margin-top:32px;font-size:13px;line-height:1.7;">SihleB Digital Studio<br /><strong>DESIGN. BUILD. HOST.</strong><br />hello@sihleb.co.za</p></div></div>`,
      text: `Hi ${valid.name},

Thanks for your application.

We’ve received your international website application and will review your project details soon.

If your request fits the scope, we’ll be in touch with next steps.

SihleB Digital Studio
DESIGN. BUILD. HOST.
hello@sihleb.co.za`,
    })

    const status = resolveSubmissionStatus(true, !confirmation.error)
    if (confirmation.error) {
      console.error('Resend international acknowledgement failed:', confirmation.error.name)
      return Response.json({ ok: true, status, message: 'Application received. We could not send the confirmation email, but your enquiry has been logged for review.' })
    }

    return Response.json({ ok: true, status, message: 'Application received. SihleB will review your project details soon.' })
  } catch (error) {
    console.error('International enquiry request failed:', error instanceof Error ? error.message : 'unknown error')
    return Response.json({ error: 'email_failed', message: 'Application could not be accepted right now.' }, { status: 500 })
  }
}
