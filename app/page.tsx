'use client'

import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Menu, X } from 'lucide-react'

const services = [
  ['01', 'Web design', 'A distinctive visual direction built around the business, not a template.'],
  ['02', 'Web development', 'Responsive, production-ready engineering for real-world use.'],
  ['03', 'E-commerce', 'Digital experiences that move customers from discovery to purchase.'],
  ['04', 'Hosting', 'A reliable home for your website after launch, with SSL and backups.'],
  ['05', 'Support', 'Human technical support when changes, questions or improvements are needed.'],
]

const standards = [
  ['01', 'Fast', 'Performance is part of the build, not an afterthought.'],
  ['02', 'Responsive', 'Designed and tested across phones, tablets and desktops.'],
  ['03', 'Search ready', 'Strong technical foundations for search engines.'],
  ['04', 'Secure', 'Modern security practices from development through deployment.'],
  ['05', 'Maintainable', 'Built so the website can evolve with the business.'],
]

const projects = [
  { name: 'Travel Class SA', type: 'Luxury Travel', description: 'A premium travel website designed and developed by SihleB Digital Studio.', className: 'project-travel' },
  { name: 'After Dark', type: 'Hospitality', description: 'A bold digital presence for a hospitality brand with a late-night point of view.', className: 'project-dark' },
  { name: 'Field Notes', type: 'Consulting', description: 'A considered editorial system for ideas, expertise and useful perspective.', className: 'project-paper' },
  { name: 'The Good Work', type: 'Creative studio', description: 'A clear, expressive home for a studio that cares about the details.', className: 'project-lime' },
]

const plans = [
  { number: '01', name: 'Starter', price: 'R7,500', description: 'For businesses that need a sharp, professional online presence without unnecessary complexity.', features: ['Up to 3 pages', 'Custom website design', 'Mobile-first experience', 'WhatsApp/contact integration', 'Basic SEO setup', 'Contact/enquiry form', 'SSL and launch support'], action: 'GET STARTED' },
  { number: '02', name: 'Business', price: 'R14,500', description: 'For businesses that need a stronger website to support enquiries and growth.', features: ['Up to 7 pages', 'Custom website design', 'Content structure', 'SEO foundations', 'Lead/contact forms', 'Analytics setup', 'WhatsApp integration', 'Launch support'], action: 'CHOOSE BUSINESS', featured: true },
  { number: '03', name: 'Signature', price: 'R25,000', description: 'For brands that need a completely tailored digital experience.', features: ['Fully custom website', 'Advanced functionality', 'E-commerce options', 'Advanced forms/integrations', 'Strategy and advanced SEO', 'Performance optimisation', 'Priority support'], action: 'START A CONVERSATION' },
]

const process = [
  ['01', 'Discover', 'Understand the business, audience and objectives.'],
  ['02', 'Define', 'Establish structure, content and direction.'],
  ['03', 'Design', 'Create the visual language and experience.'],
  ['04', 'Engineer', 'Turn the design into a responsive production-ready website.'],
  ['05', 'Refine', 'Test responsiveness, performance, accessibility and details.'],
  ['06', 'Launch', 'Deploy the website and provide support where required.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main className="site-shell">
      <nav className={`site-nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Primary navigation">
        <a className="nav-brand" href="#top" aria-label="SihleB Digital Studio home"><img src="/sihleb-log.webp" alt="SihleB logo" width="500" height="500" /><span>Digital Studio</span></a>
        <div className="nav-links"><a href="#services">Services</a><a href="#work">Work</a><a href="#hosting">Hosting</a><a href="#about">About</a></div>
        <a className="nav-cta" href="#contact">START A PROJECT <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      {menuOpen && <div className="mobile-menu"><a href="#services" onClick={closeMenu}>Services</a><a href="#work" onClick={closeMenu}>Work</a><a href="#hosting" onClick={closeMenu}>Hosting</a><a href="#about" onClick={closeMenu}>About</a><a className="button button-lime" href="#contact" onClick={closeMenu}>START A PROJECT <ArrowUpRight size={16} /></a></div>}

      <section id="top" className="hero">
        <div className="hero-grid" aria-hidden="true" /><div className="hero-index">01 <span>/ 06</span></div>
        <div className="hero-content"><p className="eyebrow"><span>DESIGN / ENGINEERING / HOSTING</span></p><h1>WEBSITES<br />BUILT TO<br /><em>BE TAKEN</em><br />SERIOUSLY.</h1><p className="hero-copy">Premium web design and development for businesses that want more from their online presence.</p><div className="hero-actions"><a className="button button-lime" href="#contact">START A PROJECT <ArrowUpRight size={16} /></a><a className="link-arrow" href="#work">SEE THE WORK <ArrowDownRight size={17} /></a></div></div>
        <div className="hero-bottom"><span>SIHLEB DIGITAL STUDIO</span><span>SCROLL TO EXPLORE <ArrowDownRight size={15} /></span></div>
      </section>

      <section className="intro section-paper"><p className="section-label">[ THE POINT ]</p><div className="split-heading"><h2>YOUR WEBSITE<br />IS OFTEN THE<br /><em>FIRST DECISION.</em></h2><div><p className="lead">Before a customer calls, visits or enquires, they are deciding whether your business feels credible.</p><p className="body-copy">SihleB builds the part of your business people meet first: distinctive websites, engineered properly and looked after beyond launch.</p></div></div></section>

      <section id="services" className="services section-paper"><div className="section-intro"><div><p className="section-label">[ WHAT WE DO ]</p><h2>DESIGN.<br />BUILD.<br /><em>HOST.</em></h2></div><p className="body-copy">One team from first conversation to the website&apos;s long-term home.</p></div><div className="service-list">{services.map(([number, name, description]) => <a className="service-row" href="#contact" key={number}><span>{number}</span><h3>{name}</h3><p>{description}</p><ArrowUpRight className="row-arrow" size={20} /></a>)}</div></section>

      <section id="work" className="work section-ink"><div className="section-intro work-heading"><div><p className="section-label">[ SELECTED WORK ]</p><h2>BUILT WITH<br /><em>INTENTION.</em></h2></div><p className="body-copy">A selection of websites designed and developed by SihleB Digital Studio.</p></div><div className="project-grid">{projects.map((project, index) => <a className={`project ${project.className} ${index === 0 ? 'project-featured' : ''}`} href={project.className === 'project-travel' ? 'https://prototype.nmas.site' : '#contact'} target={project.className === 'project-travel' ? '_blank' : undefined} rel={project.className === 'project-travel' ? 'noopener noreferrer' : undefined} key={project.name}><div className="project-art"><span className="project-number">0{index + 1}</span><strong>{project.name}</strong><ArrowUpRight className="project-art-arrow" size={27} /></div><div className="project-meta"><div><span>{project.type}</span><h3>{project.name}</h3><p>{project.description}</p></div><span className="view-project">VIEW PROJECT <ArrowUpRight size={15} /></span></div></a>)}</div></section>

      <section className="why section-paper"><div className="why-mark" aria-hidden="true"><span>DESIGN</span><b>+</b><span>ENGINEER</span><b>+</b><span>HOST</span></div><div><p className="section-label">[ WHY SIHLEB ]</p><h2>NOT JUST A<br />DESIGNER.<br /><em>NOT JUST A<br />DEVELOPER.</em></h2><p className="lead">One person who understands both.</p><p className="body-copy">Good design gets attention. Good engineering makes it work. SihleB brings both together, creating websites that look considered, load quickly, work beautifully across devices and are built around how real customers use them.</p></div><div className="pillars">{[['01', 'Design', 'Distinctive visual direction built around the business.'], ['02', 'Development', 'Clean, responsive engineering underneath the experience.'], ['03', 'Performance', 'Lightweight pages and optimised assets from the start.'], ['04', 'Care', 'Hosting, security, backups and support after launch.']].map(([number, title, text]) => <div className="pillar" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

      <section className="standard section-sand"><div className="section-intro"><div><p className="section-label">[ THE SIHLEB STANDARD ]</p><h2>BUILT FOR<br /><em>THE REAL WORLD.</em></h2></div><p className="body-copy">A website can be beautiful and dependable. That is the standard.</p></div><div className="standard-grid">{standards.map(([number, title, text]) => <div className="standard-item" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

      <section className="confidence section-ink"><p className="section-label">[ THE BIG IDEA ]</p><h2>YOU&apos;RE NOT<br />BUYING A<br /><em>WEBSITE.</em></h2><p className="confidence-copy">You&apos;re buying confidence that when someone searches for your business, they find something that reflects the quality of what you actually do. Confidence that it works on the phone in someone&apos;s hand, loads quickly, explains what you offer and has someone there when you need help.</p></section>

      <section id="hosting" className="hosting section-sand"><div><p className="section-label">[ AFTER LAUNCH ]</p><h2>LAUNCH<br />ISN&apos;T<br /><em>THE END.</em></h2></div><div className="hosting-copy"><p className="lead">Your website shouldn&apos;t become someone else&apos;s problem the moment it goes live.</p><p className="body-copy">SihleB can provide the hosting, security, backups and technical support that keep your website healthy after launch.</p><div className="hosting-offer"><div><span>WEBSITE HOSTING + SUPPORT</span><strong>R149 <small>/ MONTH</small></strong></div><ul><li>Reliable hosting</li><li>SSL included</li><li>Website backups</li><li>Security monitoring</li><li>Website maintenance</li><li>Human technical support</li></ul></div><a className="link-arrow" href="mailto:hello@sihleb.co.za?subject=Hosting%20and%20support">VIEW HOSTING <ArrowUpRight size={16} /></a></div></section>

      <section id="plans" className="plans section-paper"><div className="section-intro"><div><p className="section-label">[ WEBSITE INVESTMENT ]</p><h2>START<br />SOMEWHERE<br /><em>GOOD.</em></h2></div><p className="body-copy">Prices shown are starting points. Final pricing depends on scope, content, functionality and integrations required.</p></div><div className="plan-grid">{plans.map(plan => <article className={`plan ${plan.featured ? 'featured' : ''}`} key={plan.name}><div className="plan-top"><span>{plan.number} / {plan.name}</span>{plan.featured && <b>MOST POPULAR</b>}</div><strong className="price">{plan.price}</strong><p>{plan.description}</p><ul>{plan.features.map(feature => <li key={feature}><Check size={15} />{feature}</li>)}</ul><a className={`button ${plan.featured ? 'button-lime' : 'button-outline'}`} href="#contact">{plan.action} <ArrowUpRight size={15} /></a></article>)}</div></section>

      <section className="process section-white"><p className="section-label">[ HOW IT WORKS ]</p><div className="section-intro"><h2>FROM FIRST<br />CONVERSATION<br /><em>TO LAUNCH.</em></h2><p className="body-copy">Simple, professional and transparent. Every stage has a purpose.</p></div><div className="process-grid">{process.map(([number, title, text]) => <div className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

      <section id="about" className="about section-paper"><div className="about-stamp">SB<span>/</span></div><div><p className="section-label">[ ABOUT SIHLEB ]</p><h2>THE PERSON<br />BEHIND THE<br /><em>WEBSITE.</em></h2><p className="lead">SihleB is the web design and hosting division of NMAS INNOVATIONS (Pty) Ltd.</p><p className="body-copy">Helping businesses show up properly online with thoughtful design, dependable technology and ongoing support.</p></div></section>

      <section id="contact" className="contact section-ink"><p className="section-label">[ START HERE ]</p><h2>READY TO BE<br /><em>TAKEN SERIOUSLY</em><br />ONLINE?</h2><p className="lead">Tell us where you&apos;re going. We&apos;ll help you build the way there.</p><div className="hero-actions"><a className="button button-lime" href="mailto:hello@sihleb.co.za?subject=Start%20a%20project">START A PROJECT <ArrowUpRight size={16} /></a><a className="link-arrow light-link" href="mailto:hello@sihleb.co.za">TALK TO SIHLEB <ArrowRight size={17} /></a></div></section>

      <footer className="footer section-ink"><div className="footer-main"><a className="wordmark" href="#top"><span>SIHLEB</span><small>DIGITAL STUDIO</small></a><p>WEB DESIGN + HOSTING<br /><span>BUILT PROPERLY. CARED FOR AFTER.</span></p></div><div className="footer-bottom"><span>© 2026 NMAS INNOVATIONS (Pty) Ltd.</span><a href="mailto:hello@sihleb.co.za">HELLO@SIHLEB.CO.ZA</a><a href="#top">BACK TO TOP ↑</a></div></footer>
    </main>
  )
}
