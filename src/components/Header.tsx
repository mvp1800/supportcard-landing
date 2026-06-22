import { useState } from 'react'
import Logo from './Logo'

const NAV = [
  { label: 'Features', href: '#features' },
  { label: 'My SCAI',  href: '#my-scai'  },
  { label: 'Pricing',  href: '#pricing'  },
  { label: 'FAQ',      href: '#faq'      },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      {/* gradient bottom border */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(75,159,216,0.6) 50%, transparent 100%)',
      }} />

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-[15px] font-medium transition-colors"
              style={{ color: '#4A4A4A' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#001F3F')}
              onMouseLeave={e => (e.currentTarget.style.color = '#4A4A4A')}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="hidden md:inline-flex items-center px-6 py-2.5 text-white text-[14px] font-semibold rounded-[8px] btn-gradient"
            style={{ letterSpacing: '0.3px' }}
          >
            Join Waitlist
          </a>

          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: '#666' }}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open
              ? <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              : <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden px-6 py-5 flex flex-col gap-4 border-t"
          style={{ background: 'rgba(255,255,255,0.97)', borderColor: '#f0f0f0' }}
        >
          {NAV.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium"
              style={{ color: '#4A4A4A' }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="w-full text-center py-3 text-white text-[14px] font-semibold rounded-[8px] btn-gradient"
            onClick={() => setOpen(false)}
          >
            Join Waitlist
          </a>
        </div>
      )}
    </header>
  )
}
