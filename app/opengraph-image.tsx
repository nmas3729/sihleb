import { ImageResponse } from 'next/og'

export const alt = 'SihleB Web Design + Hosting'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        background: '#080a0d',
        color: '#ffffff',
        fontFamily: 'Arial',
      }}
    >
      <div style={{ display: 'flex', color: '#c7ff3d', fontSize: 24, letterSpacing: 5 }}>
        SIHLEB / SOUTH AFRICA
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>
          WEB DESIGN + HOSTING
        </div>
        <div style={{ display: 'flex', color: '#b9c6d8', fontSize: 28 }}>
          Thoughtful websites, dependable technology and ongoing support.
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#858a91', fontSize: 18, letterSpacing: 3 }}>
        <span>DESIGN. BUILD. HOST.</span>
        <span>SIHLEB.CO.ZA</span>
      </div>
    </div>,
    { ...size },
  )
}
