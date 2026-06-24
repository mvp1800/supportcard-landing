import { Link } from 'react-router-dom'
import Logo from './Logo'

interface LegalLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div style={{ minHeight: '100vh', background: '#F7FAFD' }}>
      {/* Nav */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.9)',
        borderBottom: '1px solid #dde8f0',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo size="sm" />
          </Link>
          <Link to="/" style={{ fontSize: 13, color: '#4B9FD8', fontWeight: 600, textDecoration: 'none' }}>
            ← Back to home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px 80px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#001F3F', marginBottom: 8, letterSpacing: '-0.5px' }}>
          {title}
        </h1>
        <p style={{ fontSize: 13, color: '#aaa', marginBottom: 48 }}>
          Last updated: {lastUpdated}
        </p>
        <div className="legal-body">
          {children}
        </div>
      </main>

      {/* Footer strip */}
      <div style={{ borderTop: '1px solid #dde8f0', background: '#fff', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#bbb', marginBottom: 8 }}>
          © 2026 Support Card. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/terms"   style={{ fontSize: 12, color: '#4B9FD8', textDecoration: 'none' }}>Terms</Link>
          <Link to="/privacy" style={{ fontSize: 12, color: '#4B9FD8', textDecoration: 'none' }}>Privacy</Link>
          <Link to="/refunds" style={{ fontSize: 12, color: '#4B9FD8', textDecoration: 'none' }}>Refunds</Link>
        </div>
      </div>
    </div>
  )
}
