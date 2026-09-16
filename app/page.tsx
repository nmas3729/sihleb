'use client'

import { FormEvent, useEffect, useState } from 'react'
import { track } from '@vercel/analytics'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SihleB-Logo-JpSPCq41GEy8rmSC4pNgsNT35LqblJ.jpeg'
const whatsappUrl = 'https://wa.me/27674877278?text=Hi%20SihleB%2C%20I%27d%20like%20to%20chat%20about%20a%20website%20project.'

function handleWhatsAppClick() {
  track('whatsapp_click')
}

const services = [
  ['01', 'Web Design', 'A considered structure, visual direction and user experience built around how your customers decide.'],
  ['02', 'Web Development', 'A fast, maintainable build that works across devices and gives your business room to grow.'],
  ['03', 'E-commerce', 'A clearer path from product discovery to purchase, with the content and functionality customers need.'],
  ['04', 'Hosting', 'Reliable hosting, SSL, backups and security handled by the team that built your website.'],
  ['05', 'Support', 'A real person for updates, questions and practical help after launch.'],
]

const plans = [
  { name: 'Launch', price: 'R9,500', intro: 'For businesses getting properly online.', features: ['Up to 5 pages', 'Custom visual direction', 'Mobile-first build', 'Contact + WhatsApp integration', 'Launch support'], action: 'PLAN MY WEBSITE' },
  { name: 'Growth', price: 'R18,500', intro: 'For businesses ready to generate more from their website.', features: ['Up to 10 pages', 'Content + page structure', 'Conversion-focused CTAs', 'SEO foundations', 'Lead tracking + analytics', 'Post-launch support'], action: 'CHOOSE GROWTH', featured: true },
  { name: 'Signature', price: 'R32,000', intro: 'For brands requiring a fully bespoke digital experience.', features: ['Bespoke strategy + UX', 'Custom design system', 'Advanced functionality', 'E-commerce + integrations', 'SEO architecture', 'Priority support'], action: 'START A CONVERSATION' },
]

const process = ['A good conversation', 'A clear direction', 'A first impression', 'The build', 'The handover', 'A long-term home']

const faqs = [
  ['How much does a website cost?', 'Projects start from R9,500 for a focused business website. Larger websites, ecommerce, integrations and strategy are quoted according to scope.'],
  ['How long does a website take?', 'Most focused business websites take approximately 3–6 weeks once content, feedback and approvals are available.'],
  ['Do you provide copywriting?', 'We can help structure and refine your content. Full copywriting and photography can be added where needed.'],
  ['Will my website be SEO-friendly?', 'Every website includes technical SEO foundations. Ongoing search growth requires content, authority and continuous optimisation.'],
  ['Can I host elsewhere?', 'Yes. SihleB hosting gives you one point of contact for performance, security and support, but you are not locked into it.'],
  ['What happens after launch?', 'We provide handover support and offer hosting, maintenance and growth plans so the website remains useful after it goes live.'],
  ['Do you work outside Johannesburg?', 'Yes. SihleB can work remotely across South Africa.'],
]

const clientProjects = [
  { name: 'Travel Class SA', industry: 'Travel management', url: 'https://travelclasssa.com', detail: 'A South African travel-management company coordinating complete journeys.' },
  { name: 'Siko Mining', industry: 'Mining services', url: 'https://sikomining.co.za', detail: 'A mining-services business supporting the junior mining sector.' },
  { name: 'NMAS Innovations', industry: 'Client website', url: 'https://nmas.co.za', detail: 'A genuine SihleB client relationship. Further project detail is not published here without approval.' },
  { name: 'Eclipse Power', industry: 'Solar and energy', url: 'https://eclipsepower.co.za', detail: 'A South African solar and battery systems business.' },
  { name: 'Lolly Beauty Bar', industry: 'Beauty', url: 'https://lollybeautybar.co.za', detail: 'A nail-bar business offering gel manicure and acrylic sculpt services.' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [signalStage, setSignalStage] = useState(0)
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleProjectSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setFormStatus('sending')
    track('project_enquiry_started')

    try {
      const response = await fetch('/api/project-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, requestId: crypto.randomUUID() }),
      })

      if (!response.ok) throw new Error('Project enquiry failed')
      setFormStatus('success')
      track('project_enquiry_submitted')
      form.reset()
    } catch {
      setFormStatus('error')
      track('project_enquiry_failed')
    }
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32)
      const progress = Math.min(4, Math.max(0, Math.floor((window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 5)))
      setSignalStage(progress)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onConversionClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest('a.project')) track('portfolio_project_view')
      else if (target.closest('.editorial-plan .button')) track('pricing_package_click')
      else if (target.closest('#hosting .button')) track('hosting_click')
      else if (target.closest('a[href^="mailto:"]')) track('email_click')
    }
    document.addEventListener('click', onConversionClick)
    return () => document.removeEventListener('click', onConversionClick)
  }, [])

  useEffect(() => {
    const budgetSelect = document.querySelector<HTMLSelectElement>('select[name="budget"]')
    if (!budgetSelect) return
    const options = ['Not sure yet', 'R9,500 Launch', 'R18,500 Growth', 'R32,000 Signature']
    budgetSelect.replaceChildren(...options.map(option => new Option(option)))
    budgetSelect.value = 'Not sure yet'
  }, [])

  return (
    <main className="site-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'Organization', name: 'SihleB Web Design + Hosting', url: 'https://sihleb.co.za', email: 'hello@sihleb.co.za', parentOrganization: { '@type': 'Organization', name: 'NMAS INNOVATIONS (Pty) Ltd' } },
          { '@type': 'WebSite', name: 'SihleB Web Design + Hosting', url: 'https://sihleb.co.za', inLanguage: 'en-ZA' },
          { '@type': 'Service', name: 'Web design, development, hosting and support', provider: { '@type': 'Organization', name: 'SihleB Web Design + Hosting' }, areaServed: 'ZA' },
        ],
      }) }} />
      {formStatus === 'success' && <div className="conversion-confirmation conversion-confirmation-success" role="status"><strong>ENQUIRY SENT.</strong><span>Thanks — we&apos;ve received your project enquiry.<br />We&apos;ll be in touch soon.</span><div><a href="#top">BACK TO HOME</a><a href="#work">VIEW OUR WORK</a></div></div>}
      {formStatus === 'error' && <div className="conversion-confirmation conversion-confirmation-error" role="alert"><strong>SOMETHING WENT WRONG.</strong><span>We couldn&apos;t send your enquiry right now.<br />Please try again or contact us directly:</span><a href="mailto:hello@sihleb.co.za">HELLO@SIHLEB.CO.ZA</a><a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick}>CHAT ON WHATSAPP</a></div>}
      <nav className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`} aria-label="Primary navigation">
        <a href="#top" className="brand-lockup" aria-label="SihleB home">
          <img src={logoUrl} alt="SihleB Web Design + Hosting" />
        </a>
        <div className="nav-links">
          <a href="#services">Services</a><a href="#work">Work</a><a href="#hosting">Hosting</a><a href="#about">About</a>
        </div>
        <div className="nav-end"><span className="online"><i /> ONLINE</span><a className="nav-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick} aria-label="Chat with SihleB on WhatsApp">WHATSAPP</a><a className="nav-cta" href="#contact">START A PROJECT <ArrowUpRight size={14} /></a></div>
        <button type="button" className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>
      {menuOpen && <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation"><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#hosting" onClick={() => setMenuOpen(false)}>Hosting</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a className="button button-blue" href="#contact" onClick={() => setMenuOpen(false)}>START A PROJECT <ArrowUpRight size={15} /></a><a className="mobile-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick} aria-label="Chat with SihleB on WhatsApp">CHAT ON WHATSAPP <ArrowUpRight size={15} /></a><a className="mobile-email" href="mailto:hello@sihleb.co.za">HELLO@SIHLEB.CO.ZA</a></div>}

      <section id="top" className="hero dark-section" onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY, visible: true })} onMouseLeave={() => setCursor((current) => ({ ...current, visible: false }))}>
        <div className="hero-grid" /><div className="hero-field-label field-label-a">SOUTH AFRICA / ONLINE</div><div className="hero-field-label field-label-b">SIGNAL / 00{signalStage + 1}</div><div className="hero-marker marker-a" /><div className="hero-marker marker-b" /><div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><div className="scan-line" /><div className={`signal-cursor ${cursor.visible ? 'is-visible' : ''}`} style={{ left: cursor.x, top: cursor.y }}><span /></div>
        <div className="hero-copy">
          <div className="eyebrow reveal"><span>WEB DESIGN, DEVELOPMENT + SUPPORT / SOUTH AFRICA</span><span className="available"><i /> AVAILABLE FOR NEW PROJECTS</span></div>
          <h1 className="hero-title reveal delay-1">YOUR BUSINESS.<br /><span>BUILT FOR THE WEB.</span></h1>
          <div className="hero-rule reveal delay-2"><i /><i /><i /></div>
          <p className="hero-lede reveal delay-2">Beautiful websites, reliable hosting and ongoing support — without the technical headache.</p>
          <div className="hero-actions reveal delay-3"><a className="button button-blue" href="#contact">START A PROJECT <ArrowUpRight size={16} /></a><a className="text-link" href="#work">VIEW OUR WORK <ArrowDownRight size={16} /></a></div>
        </div>
        <div className="hero-footer"><span>EST. 2023 / SOUTH AFRICA</span><span>SCROLL TO EXPLORE <ArrowDownRight size={15} /></span></div>
      </section>

      <section className="proof-strip section-light" aria-label="SihleB at a glance"><span>DESIGN</span><i /> <span>DEVELOPMENT</span><i /> <span>HOSTING</span><i /> <span>SUPPORT</span><strong>ONE TEAM. ONE POINT OF CONTACT.</strong></section>

      <section className="statement section-light">
        <div className="section-kicker">[ A DIFFERENT KIND OF DIGITAL STUDIO ]</div>
        <div className="statement-layout"><h2>YOUR WEBSITE<br /><em>SHOULD DO MORE.</em></h2><div><p className="large-copy">It should explain what you do, build confidence quickly and give the right people a clear next step.</p><p className="muted-copy">SihleB brings strategy, design, development, SEO foundations, hosting and ongoing support together under one roof, so your website works as part of the business rather than becoming another task to manage.</p><p className="statement-support">CREDIBILITY + VISIBILITY + BETTER ENQUIRIES</p></div></div>
        <div className="blue-dash" />
      </section>

      <section className="credibility section-light"><div><div className="section-kicker">[ BUILT FOR ]</div><h2>BUSINESSES<br /><em>THAT MEAN BUSINESS.</em></h2></div><div className="credibility-copy"><p className="large-copy">We work with South African businesses that have something worth saying and want their online presence to reflect it.</p><div className="audience-list"><span>Professional services</span><span>Hospitality</span><span>Creative businesses</span><span>Growing companies</span><span>Founders</span><span>Established brands</span></div></div><div className="proof-note"><span>THE SIHLEB APPROACH</span><strong>Direct communication, premium design and dependable support from first conversation to long-term website care.</strong></div></section>

      <section id="services" className="services section-light">
        <div className="section-heading"><div><div className="section-kicker">[ WHAT WE DO ]</div><h2>THE RIGHT THINGS.<br /><em>DONE WELL.</em></h2></div><p>One team for the parts of your online presence that matter most.</p></div>
        <div className="service-list">{services.map(([num, title, description]) => <a className="service-row" href="#contact" key={num}><span className="service-num">{num}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight className="row-arrow" size={22} /></a>)}</div>
      </section>

      <section id="work" className="client-portfolio dark-section"><div className="portfolio-head"><div><div className="section-kicker">[ SELECTED WORK ]</div><h2>BUILT FOR REAL<br /><em>BUSINESSES.</em></h2></div><a className="text-link light-link" href="#contact">START A PROJECT <ArrowUpRight size={15} /></a></div><p className="client-portfolio-intro">A selection of genuine client relationships and the public-facing businesses behind them. Detailed case studies, approved testimonials and project outcomes will be added when the relevant information is available.</p><div className="client-project-list">{clientProjects.map((project, index) => <a className="client-project" href={project.url} target="_blank" rel="noreferrer" key={project.name}><span className="service-num">0{index + 1}</span><div><h3>{project.name}</h3><p>{project.industry}</p><small>{project.detail}</small></div><ArrowUpRight className="row-arrow" size={22} /></a>)}</div></section>

      <section id="work" className="portfolio dark-section" onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY, visible: true })} onMouseLeave={() => setCursor((current) => ({ ...current, visible: false }))}><div className={`portfolio-cursor ${cursor.visible ? 'is-visible' : ''}`} style={{ left: cursor.x, top: cursor.y }}>VIEW PROJECT <ArrowUpRight size={12} /></div><div className="portfolio-head"><div><div className="section-kicker">[ SELECTED WORK ]</div><h2>BUILT TO BE<br /><em>REMEMBERED.</em></h2></div><a className="text-link light-link" href="#contact">START A PROJECT <ArrowUpRight size={15} /></a></div><p className="portfolio-note">Selected concept directions for hospitality, consulting and creative businesses. Detailed client case studies will be added with permission as projects are approved for publication.</p><div className="project-grid"><a className="project project-main" href="#contact" aria-label="Discuss an After Dark hospitality concept"><div className="project-art art-one"><span>AFTER<br />DARK</span><b>AD</b></div><div className="project-meta"><span>CONCEPT DIRECTION / HOSPITALITY</span><ArrowUpRight size={19} /></div></a><a className="project project-side" href="#contact" aria-label="Discuss a Field Notes consulting concept"><div className="project-art art-two"><span>FIELD<br />NOTES</span><div className="grid-mark">{'///'}</div></div><div className="project-meta"><span>CONCEPT DIRECTION / CONSULTING</span><ArrowUpRight size={19} /></div></a><a className="project project-wide" href="#contact" aria-label="Discuss a Good Work creative studio concept"><div className="project-art art-three"><span>THE<br />GOOD<br /><i>WORK</i></span><div className="circle-mark">TGW</div></div><div className="project-meta"><span>CONCEPT DIRECTION / CREATIVE STUDIO</span><ArrowUpRight size={19} /></div></a></div></section>

      <section className="why section-light"><div className="why-visual"><div className="role role-a">DESIGN</div><div className="role role-b">BUILD</div><div className="role role-c">HOST</div><div className="signal-path"><span className={`signal-dot stage-${signalStage}`} /></div><div className="why-s">S<span>B</span></div><div className="online-lockup"><i /> ONLINE</div></div><div className="why-copy"><div className="section-kicker">[ WHY SIHLEB ]</div><h2>ONE TEAM.<br /><em>NO TECHNICAL<br />HEADACHE.</em></h2><p className="large-copy">Your website shouldn’t feel like a puzzle you’re responsible for solving. We bring the creative, practical and technical pieces together — so you can get on with your business.</p><p className="why-detail">DESIGN <span>→</span> BUILD <span>→</span> HOST <span>→</span> SUPPORT<br /><strong>ONE TEAM. ONE POINT OF CONTACT.</strong></p><a className="text-link dark-link" href="#about">MEET SIHLEB <ArrowUpRight size={15} /></a></div></section>

      <section className="performance section-white"><div className="section-heading"><div><div className="section-kicker">[ THE SIHLEB STANDARD ]</div><h2>A BETTER<br /><em>FIRST IMPRESSION.</em></h2></div><p>Everything we build is designed to feel good and work hard.</p></div><div className="performance-grid">{[['01','FAST','No waiting around.'],['02','RESPONSIVE','Looks right everywhere.'],['03','SEARCH READY','SEO foundations included.'],['04','SECURE','Peace of mind included.'],['05','RELIABLE','Ready when you are.'],['06','SUPPORTED','A real person when you need one.']].map(([num,title,desc]) => <div className="performance-item" key={num}><span>{num}</span><div className="meter"><i /></div><h3>{title}</h3><p>{desc}</p></div>)}</div></section>

      <section id="hosting" className="hosting dark-section"><div className="hosting-copy"><div className="section-kicker">[ HOSTING + SUPPORT ]</div><h2>A BETTER HOME<br /><em>FOR YOUR WEBSITE.</em></h2><p className="large-copy">Launch day is not the finish line. We keep your site fast, secure and cared for, so you don’t have to think about what’s happening behind the scenes.</p><a className="button button-blue" href="#plans">VIEW HOSTING PLANS <ArrowUpRight size={16} /></a></div><div className="infra"><div className="infra-node">DOMAIN</div><div className="infra-line"><i /></div><div className="infra-node">DESIGN</div><div className="infra-line"><i /></div><div className="infra-node">BUILD</div><div className="infra-line"><i /></div><div className="infra-node active">HOST / SIHLEB</div><div className="infra-line"><i /></div><div className="infra-node online-node">● ONLINE</div></div><div className="hosting-features">{['Reliable hosting','SSL included','Daily backups','Fast delivery','Active security','Human support'].map((item, i) => <span key={item}><b>0{i + 1}</b>{item}</span>)}</div></section>

      <section id="plans" className="plans section-light"><div className="section-heading"><div><div className="section-kicker">[ WEBSITE INVESTMENT ]</div><h2>START SOMEWHERE<br /><em>GOOD.</em></h2></div><p>Every business is different. These are starting points — we&apos;ll recommend what actually makes sense for your business.</p></div><div className="plan-list editorial-plans">{plans.map((plan, index) => <article className={`plan editorial-plan ${plan.featured ? 'featured' : ''}`} key={plan.name}><div className="plan-top"><span>{String(index + 1).padStart(2, '0')} / {plan.name}</span>{plan.featured && <span className="plan-badge">MOST POPULAR</span>}</div><div className="plan-price"><small>FROM</small>{plan.price}</div><p>{plan.intro}</p><ul>{plan.features.map(feature => <li key={feature}><Check size={14} />{feature}</li>)}</ul><a className={`button ${plan.featured ? 'button-blue' : 'button-outline'}`} href="#contact">{plan.action} <ArrowUpRight size={15} /></a></article>)}</div><div className="hosting-offer"><div><div className="section-kicker">[ AFTER LAUNCH ]</div><h3>YOUR WEBSITE<br /><em>NEEDS A HOME.</em></h3><p>Once your website is live, SihleB keeps it fast, secure and cared for.</p></div><div className="hosting-offer-price"><span>HOSTING + SUPPORT</span><strong>R250<small>/ MONTH</small></strong><ul><li>Reliable hosting</li><li>SSL included</li><li>Regular backups</li><li>Security monitoring</li><li>Website maintenance</li><li>Human support</li></ul><a className="text-link dark-link" href="#hosting">VIEW HOSTING <ArrowUpRight size={15} /></a></div></div><div className="investment-statement"><strong>ONE WEBSITE.<br />ONE TEAM.<br /><em>FROM FIRST IDEA<br />TO ONLINE.</em></strong><p>Design, build, hosting and support — without having to manage different people for every part of your website.</p></div><div className="pricing-footer"><span>Prices shown are starting points. Final pricing depends on the scope, content and functionality required.</span><a className="text-link dark-link" href="#contact">NOT SURE WHICH ONE IS RIGHT FOR YOU? TALK TO SIHLEB <ArrowUpRight size={15} /></a></div></section>

      <section className="process section-white"><div className="section-kicker">[ HOW IT WORKS ]</div><div className="process-intro"><h2>FROM “WE SHOULD”<br /><em>TO “WE’RE LIVE.”</em></h2><p className="large-copy">No drawn-out process. No mystery. Just good work, in a straight line.</p></div><div className="process-list">{process.map((step, i) => <div className="process-step" key={step}><span>0{i + 1}</span><i /><h3>{step}</h3></div>)}</div></section>

      <section id="about" className="about section-light"><div className="about-mark">S<span>B</span></div><div><div className="section-kicker">[ ABOUT SIHLEB ]</div><h2>DESIGN.<br />BUILD.<br /><em>HOST.</em></h2><p className="large-copy">SihleB is the web design and hosting division of NMAS INNOVATIONS (Pty) Ltd, helping businesses show up properly online with thoughtful design, dependable hosting and ongoing support.</p><a className="text-link dark-link" href="#contact">MORE ABOUT SIHLEB <ArrowUpRight size={15} /></a></div></section>

      <section id="contact" className="final-cta dark-section"><div className="cta-lines" /><div className="section-kicker">[ LET’S MAKE SOMETHING GOOD ]</div><h2>READY TO GET<br /><em>ONLINE?</em></h2><p>Tell us where you’re going. We’ll help you build the way there.</p><form className="project-form" onSubmit={handleProjectSubmit} aria-busy={formStatus === 'sending'}><div className="form-grid"><label><span>NAME</span><input name="name" type="text" autoComplete="name" required /></label><label><span>BUSINESS</span><input name="business" type="text" autoComplete="organization" required /></label><label><span>EMAIL</span><input name="email" type="email" autoComplete="email" required /></label><label><span>WHAT DO YOU NEED?</span><select name="service" defaultValue="Not sure yet — I’d like some guidance."><option>Web Design</option><option>Web Development</option><option>E-commerce</option><option>Hosting</option><option>Website Care</option><option>Not sure yet — I’d like some guidance.</option></select></label><label><span>BUDGET / STARTING POINT</span><select name="budget" defaultValue="Not sure yet"><option>Not sure yet</option><option>R8,000 Starter</option><option>R13,700 Business</option><option>R24,900 Signature</option></select></label><label className="form-message"><span>MESSAGE</span><textarea name="message" rows={4} required /></label><div className="form-trap" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div></div><div className="hero-actions"><button className="button button-blue" type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'SENDING…' : 'START A PROJECT'} <ArrowUpRight size={16} /></button><a className="text-link light-link" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick} aria-label="Chat with SihleB on WhatsApp">CHAT ON WHATSAPP <ArrowUpRight size={15} /></a><a className="text-link light-link" href="mailto:hello@sihleb.co.za">HELLO@SIHLEB.CO.ZA <ArrowUpRight size={15} /></a></div><div className={`form-status form-status-${formStatus}`} role="status" aria-live="polite">{formStatus === 'success' && <><strong>ENQUIRY SENT.</strong><span>Thanks — we&apos;ve received your project enquiry.<br />We&apos;ll be in touch soon.</span></>}{formStatus === 'error' && <><strong>SOMETHING WENT WRONG.</strong><span>We couldn&apos;t send your enquiry right now. Please try again or <a href="mailto:hello@sihleb.co.za">email hello@sihleb.co.za</a>.</span></>}</div></form></section>

      <footer className="footer dark-section"><div className="footer-top"><div><img src={logoUrl} alt="SihleB Web Design + Hosting" /><p className="footer-division">A division of NMAS INNOVATIONS (Pty) Ltd</p></div><div className="footer-tag">WEB DESIGN + HOSTING<br /><span>BUILT TO PERFORM.<br />HOSTED TO LAST.</span><nav className="footer-nav" aria-label="Footer navigation"><a href="#services">Services</a><a href="#work">Work</a><a href="#hosting">Hosting</a><a href="#about">About</a></nav></div></div><div className="footer-bottom"><div><span>© 2026 NMAS INNOVATIONS (Pty) Ltd. All rights reserved.</span><span>WEB DESIGN + HOSTING</span></div><div><a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick} aria-label="Chat with SihleB on WhatsApp">CHAT ON WHATSAPP</a><a href="mailto:hello@sihleb.co.za">HELLO@SIHLEB.CO.ZA</a><a href="#top">BACK TO TOP ↑</a></div></div></footer>
      <section className="faq section-light"><div className="section-kicker">[ COMMON QUESTIONS ]</div><div className="section-heading"><div><h2>GOOD TO<br /><em>KNOW.</em></h2></div><p>Clear answers before we start, so you know what to expect from the project and the relationship after launch.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={17} /></summary><p>{answer}</p></details>)}</div></section>
      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick} aria-label="Chat with SihleB on WhatsApp"><span>●</span> WHATSAPP <ArrowUpRight size={14} /></a>
    </main>
  )
}
