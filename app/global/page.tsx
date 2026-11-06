import type { Metadata } from 'next'
import Link from 'next/link'
import { Schema } from '@/components/Schema'
import { GlobalHeader } from '@/components/global/GlobalHeader'
import { GlobalApplicationForm } from '@/components/global/GlobalApplicationForm'
import { organizationSchema } from '@/lib/seo'

const whatsappUrl = 'https://wa.me/27714664935'

export const metadata: Metadata = {
  title: 'Custom-Coded Websites for International Small Businesses | SihleB Digital Studio',
  description: 'SihleB Digital Studio builds custom-coded websites for ambitious small businesses in Eastern Europe and Australia. Applications are reviewed before acceptance. €0 upfront.',
  metadataBase: new URL('https://sihleb.co.za'),
  alternates: { canonical: '/global' },
  openGraph: {
    title: 'Custom-Coded Websites for International Small Businesses | SihleB Digital Studio',
    description: 'SihleB Digital Studio builds custom-coded websites for ambitious small businesses in Eastern Europe and Australia. Applications are reviewed before acceptance. €0 upfront.',
    url: 'https://sihleb.co.za/global',
    siteName: 'SihleB Digital Studio',
    locale: 'en_ZA',
    type: 'website',
  },
}

const trustPoints = [
  { title: 'Custom-coded development', copy: 'A clearly defined website scope shaped around your business.' },
  { title: 'Mobile-first design', copy: 'A considered experience for customers browsing on different devices.' },
  { title: 'Fixed project pricing', copy: 'A clear market price for the agreed package and scope.' },
  { title: 'Approval before payment', copy: 'No upfront project payment; the fee is invoiced after approval of agreed work.' },
  { title: 'Reviewed applications', copy: 'Applications are reviewed and the written scope is agreed before development.' },
  { title: 'Direct communication', copy: 'Speak directly with the developer building your website.' },
]

const processSteps = [
  { title: 'Apply', copy: 'Share your goals, market, current website, and what the new site needs to achieve.' },
  { title: 'Review', copy: 'SihleB Digital Studio reviews the application and confirms whether the project is a suitable fit and scope.' },
  { title: 'Scope agreement', copy: 'The written scope, timing, revision allowance, price, and launch terms are agreed before build begins.' },
  { title: 'Build', copy: 'The agreed website is custom-developed within the confirmed package and timeline.' },
  { title: 'Private preview', copy: 'A private staging link lets you review the working version and submit consolidated feedback.' },
  { title: 'Included revisions', copy: 'The agreed revision rounds are handled before sign-off, with additional work priced separately if required.' },
  { title: 'Approve & invoice', copy: 'Once the agreed deliverables are approved, the fixed fee is invoiced for payment.' },
  { title: 'Launch', copy: 'After payment, the approved website is deployed and connected to your domain.' },
]

const pricing = [
  {
    market: 'Eastern Europe',
    price: '€750',
    note: 'Fixed project price',
    description: 'For service businesses and growth-focused brands in Eastern Europe seeking a clear online presence without an upfront project payment.',
  },
  {
    market: 'Australia',
    price: 'A$1,250',
    note: 'Fixed project price',
    description: 'For Australian small businesses seeking a polished, conversion-focused web presence with approval before payment.',
  },
]

const faqItems = [
  { question: 'Why is there no upfront payment?', answer: 'The offer is designed to reduce risk for both sides: you submit an application, SihleB Digital Studio reviews the fit and scope, and the project proceeds only after the written scope and approval process is agreed.' },
  { question: 'When do I pay?', answer: 'Payment is due only after the agreed website is reviewed and approved. The exact milestone, included revision rounds, and approval point are confirmed before work begins in the written scope.' },
  { question: 'What happens if I do not approve the website?', answer: 'The project remains scoped to the agreed deliverables and approved review process. If the result is not approved, the next steps are discussed before any extra work is undertaken.' },
  { question: 'What is included in the fixed price?', answer: 'The package covers the agreed website build within the defined scope, including a responsive design, technical SEO basics, staging review, and the agreed revision rounds. Additional work is separate unless it is explicitly agreed in writing.' },
  { question: 'How many pages or sections are included?', answer: 'The standard proposal is based on one custom landing page with up to six agreed content sections, plus a contact or enquiry form and mobile-ready layout. Additional pages or features require a separate quote.' },
  { question: 'How many revisions are included?', answer: 'The current proposal assumes two consolidated revision rounds, subject to final business approval. Additional work beyond the agreed scope is treated separately.' },
  { question: 'How long does development take?', answer: 'Timelines depend on the clarity of the brief, the speed of feedback, and content readiness. The timeline is agreed in writing before build starts.' },
  { question: 'What happens if I need extra features?', answer: 'Extra features, additional pages, integrations, or content work are discussed after the agreed package is defined and then quoted or scoped separately.' },
  { question: 'Who owns the website and source code?', answer: 'The final ownership position is confirmed in the relevant project agreement. The business should treat this as a recommended proposal until the final written terms are approved.' },
  { question: 'Who owns the domain?', answer: 'The client supplies and owns the domain. SihleB Digital Studio can assist with the launch and DNS setup once the project is approved and payment is complete.' },
  { question: 'What happens after 12 months of hosting?', answer: 'Hosting renewal, support, and any post-year-one terms are confirmed before launch and remain subject to the final agreed hosting terms.' },
  { question: 'Can I apply without an existing website?', answer: 'Yes. A business without an existing website can still apply. The scope is shaped around the goals, content readiness, and project needs that are agreed before build begins.' },
]

export default function GlobalPage() {
  return (
    <main className="global-page min-h-screen bg-[#f4f3ee] text-[#080a0d]">
      <Schema data={organizationSchema} />
      <GlobalHeader whatsappUrl={whatsappUrl} />

      <section className="relative overflow-hidden bg-[#080a0d] text-white pb-16 pt-28 sm:pt-32 lg:pb-20">
        <div className="hero-grid" aria-hidden="true" />
        <div className="absolute inset-0 opacity-40" aria-hidden="true">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(199,255,61,0.18),_transparent_35%)]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#c7ff3d]/35 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c7ff3d]">
              Custom-coded websites for ambitious businesses
            </p>
            <div className="mt-6 rounded-full border border-[#c7ff3d]/30 bg-[#c7ff3d]/8 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#dffca3] sm:inline-flex">
              €0 upfront. Pay only when you approve.
            </div>
            <h1 className="global-hero-title mt-6 max-w-3xl font-black text-white">
              Your Next Website.<br />
              <span className="text-[#c7ff3d]">Custom-Built.</span><br />
              Zero Upfront.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Custom-coded websites for ambitious small businesses in Eastern Europe and Australia. Applications are reviewed before acceptance; development starts only after we agree on the written scope.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="#application" className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[#c7ff3d] px-6 py-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#080a0d] transition hover:bg-[#d9ff73] sm:w-auto">
                Apply for your website
              </Link>
              <Link href="#process" className="inline-flex min-h-11 w-full items-center justify-center px-6 py-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:text-[#c7ff3d] sm:w-auto">
                See how it works
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
              <span>Fixed scope</span>
              <span>Custom build</span>
              <span>Managed hosting</span>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6 lg:self-center">
            <div className="rounded-[20px] border border-[#c7ff3d]/40 bg-[#0f1418] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c7ff3d]">Project model</p>
              <div className="mt-5 space-y-5 text-sm text-white/80">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <span>Eastern Europe</span>
                  <strong className="text-[#c7ff3d]">€750</strong>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <span>Australia</span>
                  <strong className="text-[#c7ff3d]">A$1,250</strong>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">Process</p>
                  <p className="mt-2 leading-6">Apply → review → agree scope → build → preview → approve → invoice → launch.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#080a0d]/60">Why businesses choose SihleB Digital Studio</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.08em] text-[#080a0d] sm:text-5xl">A custom web presence built for growth.</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {trustPoints.map(point => (
            <div key={point.title} className="h-full rounded-[24px] border border-[#d8d6cf] bg-white p-5 shadow-[0_14px_40px_rgba(8,10,13,0.05)] sm:p-6">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#c7ff3d] text-[#080a0d]">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2.5">
                  <path d="m5 12 4 4L19 6" />
                </svg>
              </div>
              <h3 className="text-lg font-black tracking-[-0.04em] text-[#080a0d]">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#080a0d]/70">{point.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className="bg-[#080a0d] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c7ff3d]">How it works</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.08em] text-white sm:text-5xl">A clear path from enquiry to launch.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#c7ff3d]/50 bg-[#c7ff3d]/10 text-[11px] font-bold uppercase tracking-[0.18em] text-[#c7ff3d]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-black tracking-[-0.05em] text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/75">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div id="markets" className="max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#080a0d]/60">Fixed pricing</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.08em] text-[#080a0d] sm:text-5xl">Clear pricing for two key markets.</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {pricing.map(plan => (
            <div key={plan.market} className="rounded-[28px] border border-[#d8d6cf] bg-white p-6 shadow-[0_18px_50px_rgba(8,10,13,0.06)] sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#080a0d]/60">{plan.market}</p>
              <div className="mt-4 flex flex-col items-start gap-2">
                <span className="text-4xl font-black tracking-[-0.07em] text-[#080a0d] sm:text-5xl">{plan.price}</span>
                <span className="rounded-full border border-[#d8d6cf] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#080a0d]/65">{plan.note}</span>
              </div>
              <p className="mt-4 text-base leading-7 text-[#080a0d]/75">{plan.description}</p>
              <ul className="mt-6 space-y-4 border-t border-[#d8d6cf] pt-6 text-sm leading-6 text-[#080a0d]/80">
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#657d18] text-[11px] font-bold text-[#40520d]">✓</span><span>Applications reviewed before acceptance</span></li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#657d18] text-[11px] font-bold text-[#40520d]">✓</span><span>Written scope agreed before development</span></li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#657d18] text-[11px] font-bold text-[#40520d]">✓</span><span>No upfront project payment</span></li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#657d18] text-[11px] font-bold text-[#40520d]">✓</span><span>Invoice after approval of agreed deliverables</span></li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[24px] border border-[#d8d6cf] bg-[#f8f6f1] p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#080a0d]/60">Proposed base package</p>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.06em] text-[#080a0d]">Proposed inclusions and exclusions</h3>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#080a0d]/65">Proposed inclusions</h4>
              <ul className="space-y-3 text-sm leading-6 text-[#080a0d]/80">
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#40520d]" />One custom-coded, responsive landing page</li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#40520d]" />Up to six agreed content sections</li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#40520d]" />Contact or enquiry form within the agreed scope</li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#40520d]" />Basic technical SEO and metadata</li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#40520d]" />Mobile, tablet, and desktop layouts</li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#40520d]" />Two consolidated revision rounds</li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#40520d]" />Private staging preview before payment</li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#40520d]" />Domain connection and deployment after payment</li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#40520d]" />12 months of hosting under agreed usage limits</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#080a0d]/65">Not included unless separately agreed</h4>
              <ul className="space-y-3 text-sm leading-6 text-[#080a0d]/80">
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full border border-[#080a0d]/60" />E-commerce and payment processing</li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full border border-[#080a0d]/60" />Membership systems, dashboards, and custom backends</li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full border border-[#080a0d]/60" />Complex integrations and additional pages</li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full border border-[#080a0d]/60" />Copywriting, branding, logo design, and photography</li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full border border-[#080a0d]/60" />Unlimited revisions or ongoing development</li>
                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full border border-[#080a0d]/60" />Paid third-party services and domain registration fees</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[24px] border border-[#d8d6cf] bg-[#f8f6f1] p-5 text-sm leading-7 text-[#080a0d]/80">
          <strong>Important:</strong> These package terms are a proposed scope for review and confirmation. Final inclusions, revision limits, hosting terms, ownership, and launch responsibilities remain subject to the agreed written project terms.
        </div>
      </section>

      <section className="bg-[#f0f1eb] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#080a0d]/60">Technology and performance</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.08em] text-[#080a0d]">Why Next.js and custom development.</h2>
            <p className="mt-5 text-base leading-8 text-[#080a0d]/75">
              SihleB Digital Studio builds modern websites using Next.js and custom code that prioritise clarity, maintainability, and a strong user experience. That means a business gets a website that can be updated, expanded, and supported without relying on an overly rigid template system.
            </p>
            <p className="mt-5 text-base leading-8 text-[#080a0d]/75">
              The result is a digital presence focused on a clear structure, a well-paced user journey, useful content hierarchy, and a clean technical foundation that works well for fast-loading mobile browsing.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#d8d6cf] bg-white p-6 shadow-[0_14px_40px_rgba(8,10,13,0.05)]">
            <div className="space-y-5 text-sm text-[#080a0d]/80">
              <div className="rounded-2xl border border-[#d8d6cf] bg-[#f9f8f4] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#080a0d]/60">Custom design</p>
                <p className="mt-2 leading-7">Tailored around your business story, goals, and customer journey rather than a generic template.</p>
              </div>
              <div className="rounded-2xl border border-[#d8d6cf] bg-[#f9f8f4] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#080a0d]/60">Clean code</p>
                <p className="mt-2 leading-7">A maintainable build with straightforward structure, making future changes easier to handle.</p>
              </div>
              <div className="rounded-2xl border border-[#d8d6cf] bg-[#f9f8f4] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#080a0d]/60">SEO-ready foundations</p>
                <p className="mt-2 leading-7">Clear page structure, semantic HTML, and technical foundations that support search visibility.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[28px] border border-[#d8d6cf] bg-white p-6 shadow-[0_18px_50px_rgba(8,10,13,0.06)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#080a0d]/60">Time-zone advantage</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.08em] text-[#080a0d]">Working with Europe.</h2>
            <p className="mt-5 text-base leading-8 text-[#080a0d]/75">
              For clients in Eastern Europe, SihleB Digital Studio can often align around convenient communication windows and provide regular progress updates through a practical working rhythm. Time-zone overlap varies through the year, so delivery commitments are always defined by the agreed project plan rather than a generic schedule claim.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#d8d6cf] bg-[#080a0d] p-6 text-white shadow-[0_20px_60px_rgba(8,10,13,0.16)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c7ff3d]">Australia</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.08em]">The Overnight Sprint.</h2>
            <p className="mt-5 text-base leading-8 text-white/75">
              Requests submitted near the end of an Australian client’s workday may be reviewed during SihleB Digital Studio’s South African daytime, creating a useful workflow advantage. This is a practical delivery benefit, not a guarantee that every request will be completed overnight.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f0f1eb] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#080a0d]/60">Hosting and domain setup</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.08em] text-[#080a0d]">Included hosting, client-owned domain, and a clear launch plan.</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-[#d8d6cf] bg-white p-6">
              <p className="text-base leading-8 text-[#080a0d]/75">
                The package includes 12 months of managed cloud hosting on SihleB Digital Studio’s hosting infrastructure, subject to the actual deployment setup that is agreed for the project. The hosting period starts at a defined launch milestone and is intentionally tied to the project handoff rather than a vague indefinite promise.
              </p>
            </div>
            <div className="rounded-[28px] border border-[#d8d6cf] bg-white p-6">
              <p className="text-base leading-8 text-[#080a0d]/75">
                The client supplies and owns their domain. SihleB Digital Studio assists with DNS setup and deployment once the website is approved. Hosting renewals, backups, usage limits, and post-year-one pricing should be confirmed in the final project details before they are treated as contractual commitments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="application" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#080a0d]/60">Qualification and application</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.08em] text-[#080a0d] sm:text-5xl">Tell us a little about the business you want to grow.</h2>
          <p className="mt-5 text-base leading-8 text-[#080a0d]/75">
            This service is best suited to small businesses that want a professional online presence, a clear path to enquiries, and a defined website scope. New businesses are welcome if they have a clear idea of the website’s purpose and offer, subject to application review and a written scope agreement.
          </p>
        </div>
        <GlobalApplicationForm />
      </section>

      <section id="faq" className="bg-[#080a0d] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c7ff3d]">Frequently asked questions</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.08em] text-white sm:text-5xl">A few practical answers before you apply.</h2>
          <div className="mt-10 space-y-4">
            {faqItems.map(item => (
              <details key={item.question} className="rounded-[24px] border border-white/10 bg-white/5 p-5 text-left text-white/85">
                <summary className="cursor-pointer list-none text-lg font-black tracking-[-0.04em] text-white">{item.question}</summary>
                <p className="mt-4 text-sm leading-7 text-white/70">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#d8d6cf] bg-[#080a0d] p-8 text-white shadow-[0_30px_80px_rgba(8,10,13,0.18)] md:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c7ff3d]">Ready to talk?</p>
          <h2 className="mt-4 max-w-xl text-4xl font-black tracking-[-0.08em] text-white sm:text-5xl">Your next website starts with a clear conversation.</h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="#application" className="inline-flex min-h-11 items-center rounded-sm bg-[#c7ff3d] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#080a0d] transition hover:bg-[#d9ff73]">
              Apply for your website
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#25D366]/70 px-5 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#25D366] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
              aria-label="Chat with SihleB Digital Studio on WhatsApp at plus 27 71 466 4935"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-[#25D366]">
                <path d="M12.04 2a9.92 9.92 0 0 0-8.48 15.08L2.2 22l5.06-1.33A10 10 0 1 0 12.04 2Zm0 18.18a8.17 8.17 0 0 1-4.17-1.14l-.3-.18-3 .79.8-2.92-.2-.31a8.18 8.18 0 1 1 6.87 3.76Zm4.49-6.13c-.25-.13-1.47-.73-1.7-.81-.23-.09-.4-.13-.57.13-.17.25-.65.81-.8.98-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.23-.75-.67-1.26-1.49-1.41-1.74-.15-.25-.02-.39.11-.52.12-.11.25-.29.38-.43.13-.15.17-.25.25-.42.09-.17.04-.32-.02-.45-.06-.12-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.43h-.48c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.52.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d8d6cf] bg-[#f4f3ee]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-[#080a0d]/70 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="space-y-2">
            <p className="font-black uppercase tracking-[0.14em] text-[#080a0d]">SihleB Digital Studio</p>
            <p className="mt-2">Web Design + Hosting</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-0 lg:gap-x-10">
            <a href="mailto:hello@sihleb.co.za" className="inline-flex min-h-11 items-center gap-1.5 font-bold underline decoration-[#c7ff3d] underline-offset-4 transition hover:text-[#080a0d]">
              <span>Email:</span>
              <span>hello@sihleb.co.za</span>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-bold underline decoration-[#c7ff3d] underline-offset-4 transition hover:text-[#080a0d]" aria-label="Message SihleB Digital Studio on WhatsApp at plus 27 71 466 4935">
              WhatsApp: +27 71 466 4935
            </a>
          </div>
        </div>
      </footer>

    </main>
  )
}
