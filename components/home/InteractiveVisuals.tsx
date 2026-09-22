'use client'

import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export function HeroInteractive({ children }: { children: React.ReactNode }) {
  const [signalStage, setSignalStage] = useState(0)
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false })

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(4, Math.max(0, Math.floor((window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 5)))
      setSignalStage(progress)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <section id="top" className="hero dark-section" onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY, visible: true })} onMouseLeave={() => setCursor((current) => ({ ...current, visible: false }))}>
    <div className="hero-grid" /><div className="hero-field-label field-label-a">SOUTH AFRICA / ONLINE</div><div className="hero-field-label field-label-b">SIGNAL / 00{signalStage + 1}</div><div className="hero-marker marker-a" /><div className="hero-marker marker-b" /><div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><div className="scan-line" /><div className={`signal-cursor ${cursor.visible ? 'is-visible' : ''}`} style={{ left: cursor.x, top: cursor.y }}><span /></div>
    {children}
    <div className="hero-footer"><span>EST. 2023 / SOUTH AFRICA</span><span>SCROLL TO EXPLORE <ArrowDownRight size={15} /></span></div>
  </section>
}

export function PortfolioInteractive({ children }: { children: React.ReactNode }) {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false })

  return <section id="work" className="portfolio dark-section" onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY, visible: true })} onMouseLeave={() => setCursor((current) => ({ ...current, visible: false }))}>
    <div className={`portfolio-cursor ${cursor.visible ? 'is-visible' : ''}`} style={{ left: cursor.x, top: cursor.y }}>VIEW PROJECT <ArrowUpRight size={12} /></div>
    {children}
  </section>
}

export function WhyVisual() {
  const [signalStage, setSignalStage] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(4, Math.max(0, Math.floor((window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 5)))
      setSignalStage(progress)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="why-visual"><div className="role role-a">DESIGN</div><div className="role role-b">BUILD</div><div className="role role-c">HOST</div><div className="signal-path"><span className={`signal-dot stage-${signalStage}`} /></div><div className="why-s">S<span>B</span></div><div className="online-lockup"><i /> ONLINE</div></div>
}
