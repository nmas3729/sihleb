import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sihleb.co.za'),
  title: 'SihleB Digital Studio — Web Design + Hosting',
  description: 'Premium web design and development for businesses that want more from their online presence. Design, engineering and hosting from South Africa, online.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'SihleB Digital Studio — Web Design + Hosting',
    description: 'Premium websites for businesses that take their online presence seriously.',
    type: 'website',
    url: 'https://sihleb.co.za',
  },
  twitter: { card: 'summary_large_image', title: 'SihleB Digital Studio — Web Design + Hosting', description: 'Premium websites for businesses that take their online presence seriously.' },
  robots: { index: true, follow: true },
  publisher: 'NMAS INNOVATIONS (Pty) Ltd',
  other: {
    'organization': 'SihleB, a division of NMAS INNOVATIONS (Pty) Ltd',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080A0D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-[#f4f3ee]">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
