'use client'

import Image from 'next/image'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SihleB-Logo-JpSPCq41GEy8rmSC4pNgsNT35LqblJ.jpeg'
const whatsappUrl = 'https://wa.me/+27639180398?text=Hi%20SihleB%2C%20I%27d%20like%20to%20chat%20about%20a%20website%20project.'
const callNumberDisplay = '+27 67 487 7278'
const callNumberHref = 'tel:+27674877278'

function handleWhatsAppClick() {
  track('whatsapp_click')
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <>
    <nav className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`} aria-label="Primary navigation">
      <Link href="/" className="brand-lockup" aria-label="SihleB home">
        <Image src={logoUrl} width={1024} height={1024} alt="SihleB Web Design + Hosting" />
      </Link>
      <div className="nav-links">
        <Link href="/web-design-south-africa">Services</Link><Link href="/web-design-johannesburg">Johannesburg</Link><Link href="/web-development-johannesburg">Development</Link><Link href="/website-hosting-south-africa">Hosting</Link><Link href="/work">Work</Link><Link href="/pricing">Pricing</Link><Link href="/about">About</Link><Link href="/insights">Insights</Link>
      </div>
      <div className="nav-end"><a className="online" href="#plans" aria-label="Go to website investment section"><i /> INVESTMENT</a><a className="nav-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick} aria-label="Chat with SihleB on WhatsApp">WHATSAPP</a><a className="nav-call" href={callNumberHref} aria-label="Call SihleB">{callNumberDisplay}</a><a className="nav-cta" href="#contact">START A PROJECT <ArrowUpRight size={14} /></a></div>
      <button type="button" className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
    </nav>
    {menuOpen && <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation"><Link href="/web-design-south-africa" onClick={() => setMenuOpen(false)}>Services</Link><Link href="/web-design-johannesburg" onClick={() => setMenuOpen(false)}>Johannesburg</Link><Link href="/web-development-johannesburg" onClick={() => setMenuOpen(false)}>Development</Link><Link href="/website-hosting-south-africa" onClick={() => setMenuOpen(false)}>Hosting</Link><Link href="/work" onClick={() => setMenuOpen(false)}>Work</Link><Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link><Link href="/insights" onClick={() => setMenuOpen(false)}>Insights</Link><a className="button button-blue" href="#contact" onClick={() => setMenuOpen(false)}>START A PROJECT <ArrowUpRight size={15} /></a><a className="mobile-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick} aria-label="Chat with SihleB on WhatsApp">CHAT ON WHATSAPP <ArrowUpRight size={15} /></a><a className="mobile-call" href={callNumberHref} aria-label="Call SihleB">CALL {callNumberDisplay}</a><a className="mobile-email" href="mailto:hello@sihleb.co.za">HELLO@SIHLEB.CO.ZA</a></div>}
  </>
}

export function WhatsAppLink({ className, ariaLabel, children }: { className?: string; ariaLabel?: string; children: React.ReactNode }) {
  return <a className={className} href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick} aria-label={ariaLabel}>{children}</a>
}

export { logoUrl, whatsappUrl, callNumberDisplay, callNumberHref }
