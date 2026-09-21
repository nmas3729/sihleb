import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Web Design South Africa | Websites That Generate Enquiries | SihleB',
  description: 'SihleB designs, builds and supports high-quality websites for South African businesses that want to look credible, get found and generate better enquiries.',
  metadataBase: new URL('https://sihleb.co.za'),
  alternates: { canonical: '/' },
  keywords: ['web design South Africa', 'website design', 'web development', 'e-commerce websites', 'website hosting', 'website maintenance', 'website support'],
  openGraph: {
    title: 'Web Design South Africa | Websites That Generate Enquiries | SihleB',
    description: 'Web design, development, SEO foundations, hosting and support for South African businesses.',
    type: 'website',
    url: 'https://sihleb.co.za',
    siteName: 'SihleB Web Design + Hosting',
    locale: 'en_ZA',
    images: [{ url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SihleB-Logo-JpSPCq41GEy8rmSC4pNgsNT35LqblJ.jpeg', alt: 'SihleB Web Design + Hosting' }],
  },
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
    <html lang="en" className="bg-[#f4f3ee]" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6FX0L2L9GN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6FX0L2L9GN');
          `}
        </Script>
      </body>
    </html>
  )
}
