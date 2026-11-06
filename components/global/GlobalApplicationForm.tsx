'use client'

import { useMemo, useRef, useState } from 'react'

const marketOptions = ['Eastern Europe', 'Australia', 'Other country'] as const
const priceOptionsByMarket: Record<(typeof marketOptions)[number], string[]> = {
  'Eastern Europe': ['€750 — Eastern Europe'],
  Australia: ['A$1,250 — Australia'],
  'Other country': ['Custom quote to be confirmed'],
}

type Market = (typeof marketOptions)[number]

type FormValues = {
  name: string
  businessName: string
  email: string
  businessWebsite: string
  market: Market
  businessType: string
  existingWebsite: string
  projectNeeds: string
  preferredPackage: string
  brandAssetsReady: string
  timeline: string
  authorisedToDiscuss: boolean
  canApprove: boolean
  understandsPrice: boolean
  paymentAfterApproval: boolean
  contentReady: boolean
  website: string
}

const initialValues: FormValues = {
  name: '',
  businessName: '',
  email: '',
  businessWebsite: '',
  market: 'Eastern Europe',
  businessType: '',
  existingWebsite: '',
  projectNeeds: '',
  preferredPackage: '€750 — Eastern Europe',
  brandAssetsReady: 'I have what I need',
  timeline: '',
  authorisedToDiscuss: false,
  canApprove: false,
  understandsPrice: false,
  paymentAfterApproval: false,
  contentReady: false,
  website: '',
}

function isValidUrl(value: string) {
  if (!value.trim()) return true
  try {
    const parsed = new URL(value)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

function validateStep(step: number, values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {}

  if (step === 1) {
    if (!values.name.trim()) errors.name = 'Please enter your full name.'
    if (!values.businessName.trim()) errors.businessName = 'Please enter your business name.'
    if (!values.email.trim()) {
      errors.email = 'Please enter your business email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errors.email = 'Please enter a valid business email address.'
    }
    if (values.businessWebsite.trim() && !isValidUrl(values.businessWebsite)) {
      errors.businessWebsite = 'Please provide a valid website URL or leave this blank.'
    }
    if (!values.market) errors.market = 'Please select a target market.'
    if (!values.businessType.trim()) errors.businessType = 'Please tell us your business type or industry.'
  }

  if (step === 2) {
    if (values.existingWebsite.trim() && !isValidUrl(values.existingWebsite)) {
      errors.existingWebsite = 'Please provide a valid website URL or leave this blank.'
    }
    if (!values.projectNeeds.trim()) errors.projectNeeds = 'Please describe what the new website needs to achieve.'
    if (!values.preferredPackage.trim()) errors.preferredPackage = 'Please choose the package or market option.'
    if (!values.brandAssetsReady.trim()) errors.brandAssetsReady = 'Please tell us whether your content and brand assets are ready.'
    if (!values.timeline.trim()) errors.timeline = 'Please tell us your desired project timeline.'
  }

  if (step === 3) {
    if (!values.authorisedToDiscuss) errors.authorisedToDiscuss = 'Please confirm that you are authorised to discuss the project.'
    if (!values.canApprove) errors.canApprove = 'Please confirm that you can approve the project and arrange payment.'
    if (!values.understandsPrice) errors.understandsPrice = 'Please acknowledge the applicable fixed price.'
    if (!values.paymentAfterApproval) errors.paymentAfterApproval = 'Please confirm that payment is due after approval of the agreed deliverables.'
    if (!values.contentReady) errors.contentReady = 'Please confirm that required content and assets can be provided within the agreed timeline.'
  }

  return errors
}

export function GlobalApplicationForm() {
  const [step, setStep] = useState(1)
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const submissionInProgress = useRef(false)

  const currentPackageLabel = useMemo(() => {
    if (values.market === 'Eastern Europe') return '€750 — Eastern Europe'
    if (values.market === 'Australia') return 'A$1,250 — Australia'
    return 'Custom quote to be confirmed'
  }, [values.market])

  const stepTitles = ['Business details', 'Project requirements', 'Qualification', 'Review & submit']
  const compactStepTitles = ['Business', 'Project', 'Qualify', 'Review']

  const updateValue = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues(current => ({ ...current, [field]: value }))
    setErrors(current => ({ ...current, [field]: undefined }))
  }

  const handleMarketChange = (market: Market) => {
    setValues(current => ({
      ...current,
      market,
      preferredPackage: priceOptionsByMarket[market][0],
    }))
    setErrors(current => ({ ...current, market: undefined, preferredPackage: undefined }))
  }

  const goToNextStep = () => {
    const nextErrors = validateStep(step, values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      document.getElementById(Object.keys(nextErrors)[0])?.focus()
      return
    }
    setStep(current => Math.min(current + 1, 4))
  }

  const goToPreviousStep = () => {
    setStep(current => Math.max(current - 1, 1))
    setStatus('idle')
    setSubmitMessage('')
  }

  const submitApplication = async () => {
    if (submissionInProgress.current) return

    const step1Errors = validateStep(1, values)
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors)
      setStep(1)
      setStatus('error')
      setSubmitMessage('Please review the required business details before submitting.')
      document.getElementById(Object.keys(step1Errors)[0])?.focus()
      return
    }

    const step2Errors = validateStep(2, values)
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors)
      setStep(2)
      setStatus('error')
      setSubmitMessage('Please review the required project requirements before submitting.')
      document.getElementById(Object.keys(step2Errors)[0])?.focus()
      return
    }

    const step3Errors = validateStep(3, values)
    if (Object.keys(step3Errors).length > 0) {
      setErrors(step3Errors)
      setStep(3)
      setStatus('error')
      setSubmitMessage('Please confirm every qualification requirement before submitting.')
      document.getElementById(Object.keys(step3Errors)[0])?.focus()
      return
    }

    submissionInProgress.current = true
    setStatus('submitting')
    setSubmitMessage('')

    try {
      const requestId = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `req-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`

      const response = await fetch('/api/international-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          requestId,
          preferredPackage: currentPackageLabel,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.ok) {
        throw new Error(data.message || data.error || 'The application could not be submitted right now.')
      }

      const message = typeof data.message === 'string' ? data.message : 'Thank you. Your application has been received and the SihleB Digital Studio team will review it soon.'

      setStatus('success')
      setSubmitMessage(message)
    } catch (error) {
      setStatus('error')
      setSubmitMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again later.')
    } finally {
      submissionInProgress.current = false
    }
  }

  return (
    <div className="rounded-[28px] border border-[#d8d6cf] bg-[#f9f8f4] p-4 shadow-[0_30px_80px_rgba(8,10,13,0.12)] sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-3 border-b border-[#d8d6cf] pb-5 sm:mb-8 sm:items-center sm:gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#080a0d]/65">Application</p>
          <h3 className="mt-2 text-xl font-black leading-tight tracking-[-0.05em] text-[#080a0d] sm:text-2xl">International website enquiry</h3>
        </div>
        <div className="mt-4 shrink-0 rounded-full border border-[#c7ff3d] bg-[#c7ff3d]/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#080a0d] sm:mt-0 sm:text-[10px] sm:tracking-[0.18em]">
          Step {step} / 4
        </div>
      </div>

      <ol className="mb-8 grid grid-cols-4 gap-1 rounded-2xl border border-[#e7e4dc] bg-white/70 px-2 py-3 sm:gap-2 sm:px-4 sm:py-4" aria-label="Application progress">
        {stepTitles.map((title, index) => (
          <li key={title} aria-current={index + 1 === step ? 'step' : undefined} className="flex min-w-0 flex-col items-center gap-2 text-center">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold ${index + 1 === step ? 'bg-[#c7ff3d] text-[#080a0d]' : 'bg-[#e7e4dc] text-[#080a0d]/70'}`}>
              {index + 1}
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.04em] text-[#080a0d]/70 sm:hidden">{compactStepTitles[index]}</span>
            <span className="hidden text-center text-[9px] font-bold uppercase tracking-[0.08em] text-[#080a0d]/70 sm:block md:text-[10px] md:tracking-[0.12em]">{title}</span>
          </li>
        ))}
      </ol>

      {status === 'success' ? (
        <div className="rounded-2xl border border-[#c7ff3d] bg-[#f3f8dc] p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#080a0d]/70">Application received</p>
          <h4 className="mt-3 text-2xl font-black tracking-[-0.06em] text-[#080a0d]">Thanks for your application.</h4>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#080a0d]/80">{submitMessage}</p>
        </div>
      ) : (
        <>
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#080a0d]/70">Full name</label>
                  <input id="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} value={values.name} onChange={event => updateValue('name', event.target.value)} className="min-h-[52px] w-full rounded-xl border border-[#d8d6cf] bg-white px-4 py-3 text-base text-[#080a0d] outline-none transition focus:border-[#c7ff3d] focus:ring-2 focus:ring-[#c7ff3d]/40" placeholder="Your full name" />
                  {errors.name && <p id="name-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="businessName" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#080a0d]/70">Business name</label>
                  <input id="businessName" aria-invalid={Boolean(errors.businessName)} aria-describedby={errors.businessName ? 'businessName-error' : undefined} value={values.businessName} onChange={event => updateValue('businessName', event.target.value)} className="min-h-[52px] w-full rounded-xl border border-[#d8d6cf] bg-white px-4 py-3 text-base text-[#080a0d] outline-none transition focus:border-[#c7ff3d] focus:ring-2 focus:ring-[#c7ff3d]/40" placeholder="Business name" />
                  {errors.businessName && <p id="businessName-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.businessName}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#080a0d]/70">Business email</label>
                  <input id="email" type="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} value={values.email} onChange={event => updateValue('email', event.target.value)} className="min-h-[52px] w-full rounded-xl border border-[#d8d6cf] bg-white px-4 py-3 text-base text-[#080a0d] outline-none transition focus:border-[#c7ff3d] focus:ring-2 focus:ring-[#c7ff3d]/40" placeholder="name@business.com" />
                  {errors.email && <p id="email-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="businessWebsite" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#080a0d]/70">Business website</label>
                  <input id="businessWebsite" aria-invalid={Boolean(errors.businessWebsite)} aria-describedby={errors.businessWebsite ? 'businessWebsite-error' : undefined} value={values.businessWebsite} onChange={event => updateValue('businessWebsite', event.target.value)} className="min-h-[52px] w-full rounded-xl border border-[#d8d6cf] bg-white px-4 py-3 text-base text-[#080a0d] outline-none transition focus:border-[#c7ff3d] focus:ring-2 focus:ring-[#c7ff3d]/40" placeholder="https://example.com" />
                  {errors.businessWebsite && <p id="businessWebsite-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.businessWebsite}</p>}
                </div>
                <div>
                  <label htmlFor="market" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#080a0d]/70">Target market / region</label>
                  <select id="market" aria-invalid={Boolean(errors.market)} aria-describedby={errors.market ? 'market-error' : undefined} value={values.market} onChange={event => handleMarketChange(event.target.value as Market)} className="min-h-[52px] w-full rounded-xl border border-[#d8d6cf] bg-white px-4 py-3 text-base text-[#080a0d] outline-none transition focus:border-[#c7ff3d] focus:ring-2 focus:ring-[#c7ff3d]/40">
                    {marketOptions.map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                  <p className="mt-2 text-xs leading-5 text-[#080a0d]/65">Other countries are reviewed separately and may require a custom quote.</p>
                  {errors.market && <p id="market-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.market}</p>}
                </div>
                <div>
                  <label htmlFor="businessType" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#080a0d]/70">Business type</label>
                  <input id="businessType" aria-invalid={Boolean(errors.businessType)} aria-describedby={errors.businessType ? 'businessType-error' : undefined} value={values.businessType} onChange={event => updateValue('businessType', event.target.value)} className="min-h-[52px] w-full rounded-xl border border-[#d8d6cf] bg-white px-4 py-3 text-base text-[#080a0d] outline-none transition focus:border-[#c7ff3d] focus:ring-2 focus:ring-[#c7ff3d]/40" placeholder="Law firm, e-commerce, service business..." />
                  {errors.businessType && <p id="businessType-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.businessType}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="existingWebsite" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#080a0d]/70">Existing website</label>
                <input id="existingWebsite" aria-invalid={Boolean(errors.existingWebsite)} aria-describedby={errors.existingWebsite ? 'existingWebsite-error' : undefined} value={values.existingWebsite} onChange={event => updateValue('existingWebsite', event.target.value)} className="min-h-[52px] w-full rounded-xl border border-[#d8d6cf] bg-white px-4 py-3 text-base text-[#080a0d] outline-none transition focus:border-[#c7ff3d] focus:ring-2 focus:ring-[#c7ff3d]/40" placeholder="https://current-website.com (optional)" />
                {errors.existingWebsite && <p id="existingWebsite-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.existingWebsite}</p>}
              </div>

              <div>
                <label htmlFor="projectNeeds" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#080a0d]/70">What do you need the new website to do?</label>
                <textarea id="projectNeeds" aria-invalid={Boolean(errors.projectNeeds)} aria-describedby={errors.projectNeeds ? 'projectNeeds-error' : undefined} rows={5} value={values.projectNeeds} onChange={event => updateValue('projectNeeds', event.target.value)} className="min-h-[132px] w-full rounded-xl border border-[#d8d6cf] bg-white px-4 py-3 text-base text-[#080a0d] outline-none transition focus:border-[#c7ff3d] focus:ring-2 focus:ring-[#c7ff3d]/40" placeholder="Describe your business goals, visitors, offers, and what success looks like." />
                {errors.projectNeeds && <p id="projectNeeds-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.projectNeeds}</p>}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="preferredPackage" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#080a0d]/70">Preferred package</label>
                  <select id="preferredPackage" aria-invalid={Boolean(errors.preferredPackage)} aria-describedby={errors.preferredPackage ? 'preferredPackage-error' : undefined} value={values.preferredPackage} onChange={event => updateValue('preferredPackage', event.target.value)} className="min-h-[52px] w-full rounded-xl border border-[#d8d6cf] bg-white px-4 py-3 text-base text-[#080a0d] outline-none transition focus:border-[#c7ff3d] focus:ring-2 focus:ring-[#c7ff3d]/40">
                    {priceOptionsByMarket[values.market].map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                  {errors.preferredPackage && <p id="preferredPackage-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.preferredPackage}</p>}
                </div>
                <div>
                  <label htmlFor="brandAssetsReady" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#080a0d]/70">Brand content status</label>
                  <select id="brandAssetsReady" aria-invalid={Boolean(errors.brandAssetsReady)} aria-describedby={errors.brandAssetsReady ? 'brandAssetsReady-error' : undefined} value={values.brandAssetsReady} onChange={event => updateValue('brandAssetsReady', event.target.value)} className="min-h-[52px] w-full rounded-xl border border-[#d8d6cf] bg-white px-4 py-3 text-base text-[#080a0d] outline-none transition focus:border-[#c7ff3d] focus:ring-2 focus:ring-[#c7ff3d]/40">
                    <option value="I have what I need">I have what I need</option>
                    <option value="I need help preparing content">I need help preparing content</option>
                    <option value="I have some materials but need refinement">I have some materials but need refinement</option>
                  </select>
                  {errors.brandAssetsReady && <p id="brandAssetsReady-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.brandAssetsReady}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="timeline" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#080a0d]/70">Desired project timeline</label>
                <input id="timeline" aria-invalid={Boolean(errors.timeline)} aria-describedby={errors.timeline ? 'timeline-error' : undefined} value={values.timeline} onChange={event => updateValue('timeline', event.target.value)} className="min-h-[52px] w-full rounded-xl border border-[#d8d6cf] bg-white px-4 py-3 text-base text-[#080a0d] outline-none transition focus:border-[#c7ff3d] focus:ring-2 focus:ring-[#c7ff3d]/40" placeholder="e.g. within 4-6 weeks" />
                {errors.timeline && <p id="timeline-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.timeline}</p>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#d8d6cf] bg-white p-4">
                <label className="flex items-start gap-3 text-sm leading-6 text-[#080a0d]">
                  <input id="authorisedToDiscuss" type="checkbox" aria-invalid={Boolean(errors.authorisedToDiscuss)} aria-describedby={errors.authorisedToDiscuss ? 'authorisedToDiscuss-error' : undefined} checked={values.authorisedToDiscuss} onChange={event => updateValue('authorisedToDiscuss', event.target.checked)} className="mt-1 h-4 w-4 rounded border-[#d8d6cf] text-[#080a0d] focus:ring-[#c7ff3d]" />
                  <span>I represent the business or am authorised to discuss this project.</span>
                </label>
                {errors.authorisedToDiscuss && <p id="authorisedToDiscuss-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.authorisedToDiscuss}</p>}
              </div>

              <div className="rounded-2xl border border-[#d8d6cf] bg-white p-4">
                <label className="flex items-start gap-3 text-sm leading-6 text-[#080a0d]">
                  <input id="canApprove" type="checkbox" aria-invalid={Boolean(errors.canApprove)} aria-describedby={errors.canApprove ? 'canApprove-error' : undefined} checked={values.canApprove} onChange={event => updateValue('canApprove', event.target.checked)} className="mt-1 h-4 w-4 rounded border-[#d8d6cf] text-[#080a0d] focus:ring-[#c7ff3d]" />
                  <span>I have authority to approve the project and arrange payment under the agreed scope.</span>
                </label>
                {errors.canApprove && <p id="canApprove-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.canApprove}</p>}
              </div>

              <div className="rounded-2xl border border-[#d8d6cf] bg-white p-4">
                <label className="flex items-start gap-3 text-sm leading-6 text-[#080a0d]">
                  <input id="understandsPrice" type="checkbox" aria-invalid={Boolean(errors.understandsPrice)} aria-describedby={errors.understandsPrice ? 'understandsPrice-error' : undefined} checked={values.understandsPrice} onChange={event => updateValue('understandsPrice', event.target.checked)} className="mt-1 h-4 w-4 rounded border-[#d8d6cf] text-[#080a0d] focus:ring-[#c7ff3d]" />
                  <span>I understand the fixed price for my selected market: <strong>{currentPackageLabel}</strong>. Additional work requires a written agreement and is not included unless confirmed in advance.</span>
                </label>
                {errors.understandsPrice && <p id="understandsPrice-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.understandsPrice}</p>}
              </div>

              <div className="rounded-2xl border border-[#d8d6cf] bg-white p-4">
                <label className="flex items-start gap-3 text-sm leading-6 text-[#080a0d]">
                  <input id="paymentAfterApproval" type="checkbox" aria-invalid={Boolean(errors.paymentAfterApproval)} aria-describedby={errors.paymentAfterApproval ? 'paymentAfterApproval-error' : undefined} checked={values.paymentAfterApproval} onChange={event => updateValue('paymentAfterApproval', event.target.checked)} className="mt-1 h-4 w-4 rounded border-[#d8d6cf] text-[#080a0d] focus:ring-[#c7ff3d]" />
                  <span>I understand that applications are reviewed before acceptance, written scope agreement is required before build begins, and payment is due only after the agreed deliverables are approved.</span>
                </label>
                {errors.paymentAfterApproval && <p id="paymentAfterApproval-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.paymentAfterApproval}</p>}
              </div>

              <div className="rounded-2xl border border-[#d8d6cf] bg-white p-4">
                <label className="flex items-start gap-3 text-sm leading-6 text-[#080a0d]">
                  <input id="contentReady" type="checkbox" aria-invalid={Boolean(errors.contentReady)} aria-describedby={errors.contentReady ? 'contentReady-error' : undefined} checked={values.contentReady}  onChange={event => updateValue('contentReady', event.target.checked)} className="mt-1 h-4 w-4 rounded border-[#d8d6cf] text-[#080a0d] focus:ring-[#c7ff3d]" />
                  <span>I understand that required content and brand assets must be ready within the agreed timeframe, and any delay or change will be aligned in writing.</span>
                </label>
                {errors.contentReady && <p id="contentReady-error" className="mt-2 text-sm text-[#b33636]" role="alert">{errors.contentReady}</p>}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-[#d8d6cf] bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#080a0d]/60">Application summary</p>
                <dl className="mt-4 space-y-3 text-sm text-[#080a0d]">
                  <div className="flex flex-col gap-1 border-b border-[#d8d6cf] pb-3 sm:flex-row sm:justify-between"><dt className="font-bold uppercase tracking-[0.12em] text-[#080a0d]/60">Name</dt><dd className="break-words sm:text-right">{values.name}</dd></div>
                  <div className="flex flex-col gap-1 border-b border-[#d8d6cf] pb-3 sm:flex-row sm:justify-between"><dt className="font-bold uppercase tracking-[0.12em] text-[#080a0d]/60">Business</dt><dd className="break-words sm:text-right">{values.businessName}</dd></div>
                  <div className="flex flex-col gap-1 border-b border-[#d8d6cf] pb-3 sm:flex-row sm:justify-between"><dt className="font-bold uppercase tracking-[0.12em] text-[#080a0d]/60">Email</dt><dd className="break-all sm:text-right">{values.email}</dd></div>
                  {values.businessWebsite && (
                    <div className="flex flex-col gap-1 border-b border-[#d8d6cf] pb-3 sm:flex-row sm:justify-between"><dt className="font-bold uppercase tracking-[0.12em] text-[#080a0d]/60">Business website</dt><dd className="break-all sm:text-right">{values.businessWebsite}</dd></div>
                  )}
                  <div className="flex flex-col gap-1 border-b border-[#d8d6cf] pb-3 sm:flex-row sm:justify-between"><dt className="font-bold uppercase tracking-[0.12em] text-[#080a0d]/60">Market</dt><dd className="break-words sm:text-right">{values.market}</dd></div>
                  <div className="flex flex-col gap-1 border-b border-[#d8d6cf] pb-3 sm:flex-row sm:justify-between"><dt className="font-bold uppercase tracking-[0.12em] text-[#080a0d]/60">Price</dt><dd className="break-words sm:text-right">{currentPackageLabel}</dd></div>
                  <div className="rounded-2xl border border-[#d8d6cf] bg-[#f9f8f4] p-3 text-xs leading-6 text-[#080a0d]/75">Applications are reviewed before acceptance, and the final scope, revision allowance, hosting terms, and launch steps are confirmed in writing before build begins.</div>
                  <div className="flex flex-col gap-1 border-b border-[#d8d6cf] pb-3 sm:flex-row sm:justify-between"><dt className="font-bold uppercase tracking-[0.12em] text-[#080a0d]/60">Business type</dt><dd className="break-words sm:text-right">{values.businessType}</dd></div>
                  {values.existingWebsite && (
                    <div className="flex flex-col gap-1 border-b border-[#d8d6cf] pb-3 sm:flex-row sm:justify-between"><dt className="font-bold uppercase tracking-[0.12em] text-[#080a0d]/60">Existing website</dt><dd className="break-all sm:text-right">{values.existingWebsite}</dd></div>
                  )}
                  <div className="flex flex-col gap-1 border-b border-[#d8d6cf] pb-3 sm:flex-row sm:justify-between"><dt className="font-bold uppercase tracking-[0.12em] text-[#080a0d]/60">Brand content status</dt><dd className="break-words sm:text-right">{values.brandAssetsReady}</dd></div>
                  <div className="flex flex-col gap-1 border-b border-[#d8d6cf] pb-3 sm:flex-row sm:justify-between"><dt className="font-bold uppercase tracking-[0.12em] text-[#080a0d]/60">Timeline</dt><dd className="break-words sm:text-right">{values.timeline}</dd></div>
                  <div className="pt-1"><dt className="font-bold uppercase tracking-[0.12em] text-[#080a0d]/60">Project needs</dt><dd className="mt-2 whitespace-pre-line text-[#080a0d]">{values.projectNeeds || 'Not provided yet.'}</dd></div>
                </dl>
              </div>
              <input type="text" value={values.website} onChange={event => updateValue('website', event.target.value)} className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" name="website" />
            </div>
          )}

          {status === 'error' && submitMessage && (
            <p className="mt-4 rounded-xl border border-[#ef4444]/20 bg-[#fff1f1] px-4 py-3 text-sm text-[#b33636]" aria-live="polite" role="alert">{submitMessage}</p>
          )}

          <div className="mt-8 flex flex-row gap-3 border-t border-[#d8d6cf] pt-6 sm:items-center sm:justify-between">
            <button type="button" onClick={goToPreviousStep} disabled={step === 1 || status === 'submitting'} className="min-h-12 w-1/2 rounded-full border border-[#080a0d]/20 bg-transparent px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#080a0d] transition hover:border-[#080a0d]/40 disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto sm:px-5 sm:tracking-[0.18em]">
              Back
            </button>

            <div className="flex w-1/2 items-center gap-3 sm:w-auto">
              {step < 4 ? (
                <button type="button" onClick={goToNextStep} className="min-h-12 w-full rounded-full bg-[#c7ff3d] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#080a0d] transition hover:translate-y-[-1px] hover:bg-[#d9ff73] sm:w-auto sm:px-5 sm:tracking-[0.18em]">
                  Continue
                </button>
              ) : (
                <button type="button" onClick={submitApplication} disabled={status === 'submitting'} className="min-h-12 w-full rounded-full bg-[#080a0d] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#121518] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-5 sm:tracking-[0.18em]">
                  {status === 'submitting' ? 'Submitting...' : 'Submit application'}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
