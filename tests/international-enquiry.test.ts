import assert from 'node:assert/strict'
import test from 'node:test'

import {
  POST,
  isRateLimited,
  processedRequestIds,
  resolveMarketPrice,
  resolveSubmissionStatus,
  validateApplication,
} from '../app/api/international-enquiry/route'

const validEasternEurope = {
  name: 'Jane Doe',
  businessName: 'Northline Studio',
  email: 'jane@northline.example',
  businessWebsite: 'https://northline.example',
  market: 'Eastern Europe',
  businessType: 'Creative studio',
  existingWebsite: 'https://old.northline.example',
  projectNeeds: 'We need a new site to attract clients and explain our services.',
  preferredPackage: '€750 — Eastern Europe',
  brandAssetsReady: 'I have what I need',
  timeline: 'Within 3-4 weeks',
  requestId: 'east-001',
  authorisedToDiscuss: true,
  canApprove: true,
  understandsPrice: true,
  paymentAfterApproval: true,
  contentReady: true,
  website: '',
}

const validAustralia = {
  ...validEasternEurope,
  name: 'Oliver Smith',
  businessName: 'Harbour Health',
  email: 'oliver@harbourhealth.example',
  market: 'Australia',
  preferredPackage: 'A$1,250 — Australia',
  requestId: 'aus-001',
}

const validCustomQuote = {
  ...validEasternEurope,
  market: 'Other country',
  preferredPackage: 'Custom quote to be confirmed',
  requestId: 'global-001',
}

test('valid Eastern Europe applications pass validation', () => {
  const result = validateApplication(validEasternEurope)
  assert.equal('error' in result, false)
  assert.equal(result.market, 'Eastern Europe')
  assert.equal(result.preferredPackage, '€750 — Eastern Europe')
})

test('valid Australian applications pass validation', () => {
  const result = validateApplication(validAustralia)
  assert.equal('error' in result, false)
  assert.equal(result.market, 'Australia')
  assert.equal(result.preferredPackage, 'A$1,250 — Australia')
})

test('other-country custom quote is accepted as the documented custom-quote path', () => {
  const result = validateApplication(validCustomQuote)
  assert.equal('error' in result, false)
  assert.equal(resolveMarketPrice('Other country'), 'Custom quote to be confirmed')
})

test('missing required fields are rejected', () => {
  const result = validateApplication({
    ...validEasternEurope,
    businessName: '',
  })
  assert.equal('error' in result, true)
  assert.equal(result.error, 'invalid_fields')
})

test('invalid email addresses and URLs are rejected', () => {
  const invalidEmail = validateApplication({
    ...validEasternEurope,
    email: 'not-an-email',
  })
  assert.equal('error' in invalidEmail, true)
  assert.equal(invalidEmail.error, 'invalid_fields')

  const invalidUrl = validateApplication({
    ...validEasternEurope,
    businessWebsite: 'not a url',
  })
  assert.equal('error' in invalidUrl, true)
  assert.equal(invalidUrl.error, 'invalid_fields')
})

test('commercial acknowledgements must be confirmed', () => {
  const result = validateApplication({
    ...validEasternEurope,
    paymentAfterApproval: false,
  })
  assert.equal('error' in result, true)
  assert.equal(result.error, 'invalid_fields')
})

test('client-side price tampering is rejected by the server', () => {
  const result = validateApplication({
    ...validEasternEurope,
    preferredPackage: 'A$1,250 — Australia',
  })
  assert.equal('error' in result, true)
  assert.equal(result.error, 'invalid_fields')
})

test('duplicate request IDs are rejected', async () => {
  const id = 'duplicate-123'
  processedRequestIds.add(id)

  const response = await POST(
    new Request('http://localhost/api/international-enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...validEasternEurope,
        requestId: id,
      }),
    }),
  )

  assert.equal(response.status, 409)
  const data = await response.json()
  assert.equal(data.error, 'duplicate_request')
})

test('rate limiting blocks repeated requests after the threshold', () => {
  const ip = `rate-${Date.now()}-${Math.random().toString(16).slice(2)}`
  const results = Array.from({ length: 6 }, () => isRateLimited(ip))

  assert.equal(results.slice(0, 5).every(value => value === false), true)
  assert.equal(results[5], true)
})

test('submission status distinguishes between accepted and failed acknowledgement delivery', () => {
  assert.equal(resolveSubmissionStatus(true, true), 'application_received')
  assert.equal(resolveSubmissionStatus(true, false), 'application_received_confirmation_failed')
  assert.equal(resolveSubmissionStatus(false, true), 'application_failed')
})

test('invalid JSON or malformed requests are rejected safely', async () => {
  const response = await POST(
    new Request('http://localhost/api/international-enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{not valid json}',
    }),
  )

  assert.equal(response.status, 400)
  const data = await response.json()
  assert.equal(data.error, 'invalid_request')
})

test('missing Resend configuration fails gracefully without claiming success', async () => {
  delete process.env.RESEND_API_KEY
  delete process.env.RESEND_FROM_EMAIL

  const response = await POST(
    new Request('http://localhost/api/international-enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(validEasternEurope),
    }),
  )

  assert.equal(response.status, 500)
  const data = await response.json()
  assert.equal(data.error, 'email_not_configured')
})

test('honeypot submissions are ignored safely without exposing bot detection', async () => {
  const response = await POST(
    new Request('http://localhost/api/international-enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...validEasternEurope,
        website: 'https://spambot.example',
      }),
    }),
  )

  assert.equal(response.status, 200)
  const data = await response.json()
  assert.equal(data.ok, true)
  assert.equal(data.status, 'ignored_honeypot')
  assert.equal(data.message, 'Application received.')
})

test('server rejects all cross-market pricing tampering combinations', () => {
  // Australia tampering with Eastern Europe price
  const ausTampered = validateApplication({
    ...validAustralia,
    preferredPackage: '€750 — Eastern Europe',
  })
  assert.equal('error' in ausTampered, true)
  assert.equal(ausTampered.error, 'invalid_fields')

  // Other country tampering with fixed prices
  const otherTamperedEuro = validateApplication({
    ...validCustomQuote,
    preferredPackage: '€750 — Eastern Europe',
  })
  assert.equal('error' in otherTamperedEuro, true)
  assert.equal(otherTamperedEuro.error, 'invalid_fields')

  const otherTamperedAus = validateApplication({
    ...validCustomQuote,
    preferredPackage: 'A$1,250 — Australia',
  })
  assert.equal('error' in otherTamperedAus, true)
  assert.equal(otherTamperedAus.error, 'invalid_fields')
})

test('error responses do not expose secrets, stack traces, or internal paths', async () => {
  const response = await POST(
    new Request('http://localhost/api/international-enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...validEasternEurope, email: 'bad' }),
    }),
  )

  assert.equal(response.status, 400)
  const data = await response.json()
  assert.equal(typeof data.error, 'string')
  assert.equal(typeof data.message, 'string')
  assert.equal('stack' in data, false)
  assert.equal('apiKey' in data, false)
  assert.equal(JSON.stringify(data).includes('/home/'), false)
  assert.equal(JSON.stringify(data).includes('RESEND'), false)
})
