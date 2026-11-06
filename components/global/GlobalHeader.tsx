'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const navigationItems = [
  { label: 'Markets', href: '#markets' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export function GlobalHeader({ whatsappUrl }: { whatsappUrl: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080a0d]/90 text-white backdrop-blur-xl">
      <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3" role="group" aria-label="SihleB Digital Studio — International">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c7ff3d]/70 bg-white/5 text-[11px] font-black uppercase tracking-[0.2em] text-[#c7ff3d]" aria-hidden="true">
            SB
          </span>
          <span className="flex min-w-0 flex-col gap-1 leading-none">
            <span className="truncate text-[10px] font-bold uppercase tracking-[0.13em] text-white/80">SihleB</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c7ff3d]">International</span>
          </span>
        </div>

        <nav className="hidden items-center justify-center gap-5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70 lg:flex xl:gap-7" aria-label="International page navigation">
          {navigationItems.map(item => (
            <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center whitespace-nowrap px-1 transition hover:text-[#c7ff3d]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="col-start-2 row-start-1 flex shrink-0 items-center justify-self-end gap-2 sm:gap-3 lg:col-start-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with SihleB Digital Studio on WhatsApp"
            className="inline-flex min-h-11 min-w-20 items-center justify-center whitespace-nowrap rounded-full border border-[#25D366]/70 px-3 text-[9px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#25D366] sm:min-w-24 sm:px-4"
          >
            WhatsApp
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/20 text-white transition hover:border-[#c7ff3d] hover:text-[#c7ff3d] lg:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="global-mobile-navigation"
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        <nav
          id="global-mobile-navigation"
          className={`${menuOpen ? 'grid' : 'hidden'} absolute inset-x-0 top-full gap-1 border-b border-white/10 bg-[#080a0d] px-4 py-3 shadow-xl sm:px-6 lg:hidden`}
          aria-label="International page navigation"
        >
          {navigationItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-11 items-center border-b border-white/10 px-2 text-xs font-bold uppercase tracking-[0.15em] text-white/80 transition last:border-0 hover:text-[#c7ff3d]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
