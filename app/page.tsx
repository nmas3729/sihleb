'use client'

import { FormEvent, useEffect, useState } from 'react'
import { track } from '@vercel/analytics'
import {
  ArrowDownRight,
  ArrowRight,
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

function handleEmailClick() {
  track('email_click')
}

function handlePortfolioProjectView() {
  track('portfolio_project_view')
}

function handlePricingPackageClick() {
  track('pricing_package_click')
}

function handleHostingClick() {
  track('hosting_click')
}

const services = [
  ['01', 'Web Design', 'Websites that look like you, sound like you, and make it easier for people to choose you.'],
  ['02', 'Web Development', 'A fast, considered build underneath the design — engineered to perform, scale and stay maintainable.'],
  ['03', 'E-commerce', 'A smoother path from discovery to purchase, designed around how your customers actually buy.'],
  ['04', 'Hosting', 'Fast, reliable hosting with the technical side handled for you.'],
  ['05', 'Support', 'A real person when you need a change, an answer or a fresh idea.'],
]

const plans = [
  { name: 'Starter', price: 'R8,000', intro: 'For businesses getting properly online.', features: ['Up to 3 pages', 'Custom website design', 'Mobile-first experience', 'WhatsApp/contact integration', 'Basic SEO setup', 'Launch support'], action: 'GET STARTED' },
  { name: 'Business', price: 'R13,700', intro: 'For businesses ready to generate more from their website.', features: ['Up to 7 pages', 'Custom website design', 'Content structure', 'SEO foundations', 'Lead/contact forms', 'Analytics setup', 'Launch support'], action: 'CHOOSE BUSINESS', featured: true },
  { name: 'Signature', price: 'R24,900', intro: 'For brands requiring a fully bespoke digital experience.', features: ['Fully custom experience', 'Advanced functionality', 'E-commerce options', 'Strategy', 'SEO', 'Priority support'], action: 'START A CONVERSATION' },
]

const process = ['A good conversation', 'A clear direction', 'A first impression', 'The build', 'The handover', 'A long-term home']

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
          <div className="eyebrow reveal"><span>SIHLEB / DIGITAL STUDIO</span><span className="available"><i /> AVAILABLE FOR NEW PROJECTS</span></div>
          <h1 className="hero-title reveal delay-1">YOUR BUSINESS.<br /><span>BUILT FOR THE WEB.</span></h1>
          <div className="hero-rule reveal delay-2"><i /><i /><i /></div>
          <p className="hero-lede reveal delay-2">Beautiful websites, reliable hosting and ongoing support — without the technical headache.</p>
          <div className="hero-actions reveal delay-3"><a className="button button-blue" href="#contact">START A PROJECT <ArrowUpRight size={16} /></a><a className="text-link" href="#work">VIEW OUR WORK <ArrowDownRight size={16} /></a></div>
        </div>
        <div className="hero-footer"><span>EST. 2023 / SOUTH AFRICA</span><span>SCROLL TO EXPLORE <ArrowDownRight size={15} /></span></div>
      </section>

      <section className="statement section-light">
        <div className="section-kicker">[ A DIFFERENT KIND OF DIGITAL STUDIO ]</div>
        <div className="statement-layout"><h2>GOOD WEBSITES<br /><em>SHOULD DO MORE.</em></h2><div><p className="large-copy">They should make your business feel credible before you say a word. They should turn attention into action — and make running your business feel a little lighter.</p><p className="muted-copy">That’s the space SIHLEB works in: thoughtful design, dependable technology, and a relationship that doesn’t end when the site goes live.</p><p className="statement-support">DESIGN + DEVELOPMENT + HOSTING + SUPPORT</p></div></div>
        <div className="blue-dash" />
      </section>

      <section className="credibility section-light"><div><div className="section-kicker">[ BUILT FOR ]</div><h2>BUSINESSES<br /><em>THAT MEAN BUSINESS.</em></h2></div><div className="credibility-copy"><p className="large-copy">We work with businesses that have something worth saying — and want their online presence to reflect it.</p><div className="audience-list"><span>Professional services</span><span>Hospitality</span><span>Creative businesses</span><span>Growing companies</span><span>Founders</span><span>Established brands</span></div></div><div className="proof-note"><span>THE WORK SPEAKS FIRST</span><strong>Case studies and client stories are being added as each project launches.</strong></div></section>

      <section id="services" className="services section-light">
        <div className="section-heading"><div><div className="section-kicker">[ WHAT WE DO ]</div><h2>THE RIGHT THINGS.<br /><em>DONE WELL.</em></h2></div><p>One team for the parts of your online presence that matter most.</p></div>
        <div className="service-list">{services.map(([num, title, description]) => <a className="service-row" href="#contact" key={num}><span className="service-num">{num}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight className="row-arrow" size={22} /></a>)}</div>
      </section>

      <section id="work" className="portfolio dark-section" onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY, visible: true })} onMouseLeave={() => setCursor((current) => ({ ...current, visible: false }))}><div className={`portfolio-cursor ${cursor.visible ? 'is-visible' : ''}`} style={{ left: cursor.x, top: cursor.y }}>VIEW PROJECT <ArrowUpRight size={12} /></div><div className="portfolio-head"><div><div className="section-kicker">[ SELECTED WORK ]</div><h2>BUILT TO BE<br /><em>REMEMBERED.</em></h2></div><a className="text-link light-link" href="#contact">START A PROJECT <ArrowUpRight size={15} /></a></div><div className="project-grid"><a className="project project-main" href="#contact" aria-label="View After Dark hospitality project"><div className="project-art art-one"><span>AFTER<br />DARK</span><b>AD</b></div><div className="project-meta"><span>AFTER DARK / HOSPITALITY</span><ArrowUpRight size={19} /></div></a><a className="project project-side" href="#contact" aria-label="View Field Notes consulting project"><div className="project-art art-two"><span>FIELD<br />NOTES</span><div className="grid-mark">{'///'}</div></div><div className="project-meta"><span>FIELD NOTES / CONSULTING</span><ArrowUpRight size={19} /></div></a><a className="project project-wide" href="#contact" aria-label="View The Good Work creative studio project"><div className="project-art art-three"><span>THE<br />GOOD<br /><i>WORK</i></span><div className="circle-mark">TGW</div></div><div className="project-meta"><span>THE GOOD WORK / CREATIVE STUDIO</span><ArrowUpRight size={19} /></div></a></div></section>

      <section className="why section-light"><div className="why-visual"><div className="role role-a">DESIGN</div><div className="role role-b">BUILD</div><div className="role role-c">HOST</div><div className="signal-path"><span className={`signal-dot stage-${signalStage}`} /></div><div className="why-s">S<span>B</span></div><div className="online-lockup"><i /> ONLINE</div></div><div className="why-copy"><div className="section-kicker">[ WHY SIHLEB ]</div><h2>ONE TEAM.<br /><em>NO TECHNICAL<br />HEADACHE.</em></h2><p className="large-copy">Your website shouldn’t feel like a puzzle you’re responsible for solving. We bring the creative, practical and technical pieces together — so you can get on with your business.</p><p className="why-detail">DESIGN <span>→</span> BUILD <span>→</span> HOST <span>→</span> SUPPORT<br /><strong>ONE TEAM. ONE POINT OF CONTACT.</strong></p><a className="text-link dark-link" href="#about">MEET SIHLEB <ArrowUpRight size={15} /></a></div></section>

      <section className="performance section-white"><div className="section-heading"><div><div className="section-kicker">[ THE SIHLEB STANDARD ]</div><h2>A BETTER<br /><em>FIRST IMPRESSION.</em></h2></div><p>Everything we build is designed to feel good and work hard.</p></div><div className="performance-grid">{[['01','FAST','No waiting around.'],['02','RESPONSIVE','Looks right everywhere.'],['03','SEARCH READY','SEO foundations included.'],['04','SECURE','Peace of mind included.'],['05','RELIABLE','Ready when you are.'],['06','SUPPORTED','A real person when you need one.']].map(([num,title,desc]) => <div className="performance-item" key={num}><span>{num}</span><div className="meter"><i /></div><h3>{title}</h3><p>{desc}</p></div>)}</div></section>

      <section id="hosting" className="hosting dark-section"><div className="hosting-copy"><div className="section-kicker">[ HOSTING + SUPPORT ]</div><h2>A BETTER HOME<br /><em>FOR YOUR WEBSITE.</em></h2><p className="large-copy">Launch day is not the finish line. We keep your site fast, secure and cared for, so you don’t have to think about what’s happening behind the scenes.</p><a className="button button-blue" href="#plans">VIEW HOSTING PLANS <ArrowUpRight size={16} /></a></div><div className="infra"><div className="infra-node">DOMAIN</div><div className="infra-line"><i /></div><div className="infra-node">DESIGN</div><div className="infra-line"><i /></div><div className="infra-node">BUILD</div><div className="infra-line"><i /></div><div className="infra-node active">HOST / SIHLEB</div><div className="infra-line"><i /></div><div className="infra-node online-node">● ONLINE</div></div><div className="hosting-features">{['Reliable hosting','SSL included','Daily backups','Fast delivery','Active security','Human support'].map((item, i) => <span key={item}><b>0{i + 1}</b>{item}</span>)}</div></section>

      <section id="plans" className="plans section-light"><div className="section-heading"><div><div className="section-kicker">[ WEBSITE INVESTMENT ]</div><h2>START SOMEWHERE<br /><em>GOOD.</em></h2></div><p>Every business is different. These are starting points — we&apos;ll recommend what actually makes sense for your business.</p></div><div className="plan-list editorial-plans">{plans.map((plan, index) => <article className={`plan editorial-plan ${plan.featured ? 'featured' : ''}`} key={plan.name}><div className="plan-top"><span>{String(index + 1).padStart(2, '0')} / {plan.name}</span>{plan.featured && <span className="plan-badge">MOST POPULAR</span>}</div><div className="plan-price"><small>FROM</small>{plan.price}</div><p>{plan.intro}</p><ul>{plan.features.map(feature => <li key={feature}><Check size={14} />{feature}</li>)}</ul><a className={`button ${plan.featured ? 'button-blue' : 'button-outline'}`} href="#contact">{plan.action} <ArrowUpRight size={15} /></a></article>)}</div><div className="hosting-offer"><div><div className="section-kicker">[ AFTER LAUNCH ]</div><h3>YOUR WEBSITE<br /><em>NEEDS A HOME.</em></h3><p>Once your website is live, SihleB keeps it fast, secure and cared for.</p></div><div className="hosting-offer-price"><span>HOSTING + SUPPORT</span><strong>R250<small>/ MONTH</small></strong><ul><li>Reliable hosting</li><li>SSL included</li><li>Regular backups</li><li>Security monitoring</li><li>Website maintenance</li><li>Human support</li></ul><a className="text-link dark-link" href="#hosting">VIEW HOSTING <ArrowUpRight size={15} /></a></div></div><div className="investment-statement"><strong>ONE WEBSITE.<br />ONE TEAM.<br /><em>FROM FIRST IDEA<br />TO ONLINE.</em></strong><p>Design, build, hosting and support — without having to manage different people for every part of your website.</p></div><div className="pricing-footer"><span>Prices shown are starting points. Final pricing depends on the scope, content and functionality required.</span><a className="text-link dark-link" href="#contact">NOT SURE WHICH ONE IS RIGHT FOR YOU? TALK TO SIHLEB <ArrowUpRight size={15} /></a></div></section>

      <section className="process section-white"><div className="section-kicker">[ HOW IT WORKS ]</div><div className="process-intro"><h2>FROM “WE SHOULD”<br /><em>TO “WE’RE LIVE.”</em></h2><p className="large-copy">No drawn-out process. No mystery. Just good work, in a straight line.</p></div><div className="process-list">{process.map((step, i) => <div className="process-step" key={step}><span>0{i + 1}</span><i /><h3>{step}</h3></div>)}</div></section>

      <section id="about" className="about section-light"><div className="about-mark">S<span>B</span></div><div><div className="section-kicker">[ ABOUT SIHLEB ]</div><h2>DESIGN.<br />BUILD.<br /><em>HOST.</em></h2><p className="large-copy">SihleB is the web design and hosting division of NMAS INNOVATIONS (Pty) Ltd, helping businesses show up properly online with thoughtful design, dependable hosting and ongoing support.</p><a className="text-link dark-link" href="#contact">MORE ABOUT SIHLEB <ArrowUpRight size={15} /></a></div></section>

      <section id="contact" className="final-cta dark-section"><div className="cta-lines" /><div className="section-kicker">[ LET’S MAKE SOMETHING GOOD ]</div><h2>READY TO GET<br /><em>ONLINE?</em></h2><p>Tell us where you’re going. We’ll help you build the way there.</p><form className="project-form" onSubmit={handleProjectSubmit} aria-busy={formStatus === 'sending'}><div className="form-grid"><label><span>NAME</span><input name="name" type="text" autoComplete="name" required /></label><label><span>BUSINESS</span><input name="business" type="text" autoComplete="organization" required /></label><label><span>EMAIL</span><input name="email" type="email" autoComplete="email" required /></label><label><span>WHAT DO YOU NEED?</span><select name="service" defaultValue="Not sure yet — I’d like some guidance."><option>Web Design</option><option>Web Development</option><option>E-commerce</option><option>Hosting</option><option>Website Care</option><option>Not sure yet — I’d like some guidance.</option></select></label><label><span>BUDGET / STARTING POINT</span><select name="budget" defaultValue="Not sure yet"><option>Not sure yet</option><option>R8,000 Starter</option><option>R13,700 Business</option><option>R24,900 Signature</option></select></label><label className="form-message"><span>MESSAGE</span><textarea name="message" rows={4} required /></label><div className="form-trap" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div></div><div className="hero-actions"><button className="button button-blue" type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'SENDING…' : 'START A PROJECT'} <ArrowUpRight size={16} /></button><a className="text-link light-link" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick} aria-label="Chat with SihleB on WhatsApp">CHAT ON WHATSAPP <ArrowUpRight size={15} /></a><a className="text-link light-link" href="mailto:hello@sihleb.co.za">HELLO@SIHLEB.CO.ZA <ArrowUpRight size={15} /></a></div><div className={`form-status form-status-${formStatus}`} role="status" aria-live="polite">{formStatus === 'success' && <><strong>ENQUIRY SENT.</strong><span>Thanks — we&apos;ve received your project enquiry.<br />We&apos;ll be in touch soon.</span></>}{formStatus === 'error' && <><strong>SOMETHING WENT WRONG.</strong><span>We couldn&apos;t send your enquiry right now. Please try again or <a href="mailto:hello@sihleb.co.za">email hello@sihleb.co.za</a>.</span></>}</div></form></section>

      <footer className="footer dark-section"><div className="footer-top"><div><img src={logoUrl} alt="SihleB Web Design + Hosting" /><p className="footer-division">A division of NMAS INNOVATIONS (Pty) Ltd</p></div><div className="footer-tag">WEB DESIGN + HOSTING<br /><span>BUILT TO PERFORM.<br />HOSTED TO LAST.</span><nav className="footer-nav" aria-label="Footer navigation"><a href="#services">Services</a><a href="#work">Work</a><a href="#hosting">Hosting</a><a href="#about">About</a></nav></div></div><div className="footer-bottom"><div><span>© 2026 NMAS INNOVATIONS (Pty) Ltd. All rights reserved.</span><span>WEB DESIGN + HOSTING</span></div><div><a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick} aria-label="Chat with SihleB on WhatsApp">CHAT ON WHATSAPP</a><a href="mailto:hello@sihleb.co.za">HELLO@SIHLEB.CO.ZA</a><a href="#top">BACK TO TOP ↑</a></div></div></footer>
      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick} aria-label="Chat with SihleB on WhatsApp"><span>●</span> WHATSAPP <ArrowUpRight size={14} /></a>
    </main>
  )
}
