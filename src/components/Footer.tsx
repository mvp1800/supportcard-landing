import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ background: 'rgba(255,255,255,0.55)', borderColor: '#dde8f0' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Top row: branding + contact columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand blurb */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div style={{ width:28, height:28, background:'#4B9FD8', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg viewBox="0 0 24 24" fill="white" width={14} height={14}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span style={{ fontSize:15, fontWeight:700, color:'#001F3F' }}>Support Card</span>
            </div>
            <p style={{ fontSize:13, color:'#999', lineHeight:1.6, maxWidth:220 }}>
              A tool for co-parents — not a substitute for legal advice.
            </p>
          </div>

          {/* Find us */}
          <div>
            <p style={{ fontSize:11, fontWeight:700, color:'#001F3F', letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:14 }}>
              Find Us
            </p>
            <div className="flex flex-col gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com/supportcard.za"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                style={{ textDecoration:'none' }}
              >
                <div style={{
                  width:30, height:30, borderRadius:8, flexShrink:0,
                  background:'linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(131,58,180,0.4)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  <InstagramIcon />
                </div>
                <span style={{ fontSize:13, color:'#555', fontWeight:500, transition:'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#001F3F')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#555')}>
                  @supportcard.za
                </span>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@supportcard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
                style={{ textDecoration:'none' }}
              >
                <div style={{
                  width:30, height:30, borderRadius:8, flexShrink:0,
                  background:'#010101',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  <TikTokIcon />
                </div>
                <span style={{ fontSize:13, color:'#555', fontWeight:500, transition:'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#001F3F')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#555')}>
                  @supportcard
                </span>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize:11, fontWeight:700, color:'#001F3F', letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:14 }}>
              Contact
            </p>
            <a
              href="mailto:supportcard.global@gmail.com"
              className="flex items-center gap-3"
              style={{ textDecoration:'none' }}
            >
              <div style={{
                width:30, height:30, borderRadius:8, flexShrink:0,
                background:'#4B9FD8',
                display:'flex', alignItems:'center', justifyContent:'center',
                transition:'transform 0.25s ease, box-shadow 0.25s ease',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(75,159,216,0.45)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <EnvelopeIcon />
              </div>
              <span style={{ fontSize:13, color:'#555', fontWeight:500, transition:'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#001F3F')}
                onMouseLeave={e => (e.currentTarget.style.color = '#555')}>
                supportcard.global@gmail.com
              </span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height:1, background:'linear-gradient(90deg, transparent, #dde8f0 30%, #dde8f0 70%, transparent)', marginBottom:16 }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p style={{ fontSize:12, color:'#bbb' }}>
            © 2026 Support Card. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms"   style={{ fontSize:12, color:'#aaa', textDecoration:'none' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#4B9FD8')}
              onMouseLeave={e=>(e.currentTarget.style.color='#aaa')}>Terms</Link>
            <Link to="/privacy" style={{ fontSize:12, color:'#aaa', textDecoration:'none' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#4B9FD8')}
              onMouseLeave={e=>(e.currentTarget.style.color='#aaa')}>Privacy</Link>
            <Link to="/refunds" style={{ fontSize:12, color:'#aaa', textDecoration:'none' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#4B9FD8')}
              onMouseLeave={e=>(e.currentTarget.style.color='#aaa')}>Refunds</Link>
          </div>
          <p style={{ fontSize:12, color:'#bbb' }}>
            Built for co-parents, by people who get it.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 24 28" fill="white">
      <path d="M21 6.5A5.5 5.5 0 0 1 15.5 1H11v18a3.5 3.5 0 1 1-3.5-3.5c.32 0 .63.05.93.13V11.1A8.5 8.5 0 1 0 17 19.5V11.2A11.5 11.5 0 0 0 21 12V6.5z"/>
    </svg>
  )
}

function EnvelopeIcon() {
  return (
    <svg width="15" height="12" viewBox="0 0 24 20" fill="none">
      <rect x="1" y="1" width="22" height="18" rx="3" stroke="white" strokeWidth="1.8"/>
      <path d="M1 5l11 8 11-8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}
