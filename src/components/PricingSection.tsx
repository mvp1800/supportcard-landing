import { useState, useEffect, useRef } from 'react'
import { Rocket, CalendarDays, Zap, Shield, Gift, Star, ChevronDown, Globe } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import type { LucideIcon } from 'lucide-react'

// ─── Currency data ────────────────────────────────────────────────────────────

interface Currency {
  code: string
  symbol: string
  name: string
  flag: string
  rate: number
  decimals: number
}

const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$',   name: 'US Dollar',         flag: '🇺🇸', rate: 1,      decimals: 2 },
  { code: 'GBP', symbol: '£',   name: 'British Pound',     flag: '🇬🇧', rate: 0.79,   decimals: 2 },
  { code: 'EUR', symbol: '€',   name: 'Euro',              flag: '🇪🇺', rate: 0.92,   decimals: 2 },
  { code: 'ZAR', symbol: 'R',   name: 'South African Rand',flag: '🇿🇦', rate: 18.5,   decimals: 0 },
  { code: 'AUD', symbol: 'A$',  name: 'Australian Dollar', flag: '🇦🇺', rate: 1.54,   decimals: 2 },
  { code: 'CAD', symbol: 'C$',  name: 'Canadian Dollar',   flag: '🇨🇦', rate: 1.36,   decimals: 2 },
  { code: 'INR', symbol: '₹',   name: 'Indian Rupee',      flag: '🇮🇳', rate: 83.5,   decimals: 0 },
  { code: 'NGN', symbol: '₦',   name: 'Nigerian Naira',    flag: '🇳🇬', rate: 1620,   decimals: 0 },
]

// ─── Price helpers ────────────────────────────────────────────────────────────

function fmt(usdAmount: number, currency: Currency): string {
  const v = usdAmount * currency.rate
  const prefix = currency.code !== 'USD' ? '~' : ''
  if (currency.decimals === 0) return `${prefix}${currency.symbol}${Math.round(v).toLocaleString()}`
  const rounded = Math.round(v * 100) / 100
  // Skip trailing ".00" for whole-number amounts (e.g. $49, $99 annual prices)
  const formatted = Number.isInteger(rounded) ? rounded.toLocaleString() : rounded.toFixed(currency.decimals)
  return `${prefix}${currency.symbol}${formatted}`
}

interface DisplayPrice { display: string; unit: string; sub?: string }

function getDisplay(monthlyUSD: number, annualUSD: number, isAnnual: boolean, cur: Currency): DisplayPrice {
  if (monthlyUSD === 0) return { display: `${cur.symbol}0`, unit: isAnnual ? '/year' : '/mo' }
  if (isAnnual) {
    const perMo = (annualUSD / 12) * cur.rate
    const prefix = cur.code !== 'USD' ? '~' : ''
    const perMoStr = cur.decimals === 0
      ? `${prefix}${cur.symbol}${Math.round(perMo).toLocaleString()}`
      : `${prefix}${cur.symbol}${perMo.toFixed(cur.decimals)}`
    return {
      display: fmt(annualUSD, cur),
      unit: '/year',
      sub: `${perMoStr}/mo billed annually`,
    }
  }
  return { display: fmt(monthlyUSD, cur), unit: '/mo' }
}

// ─── Plan data (USD) ──────────────────────────────────────────────────────────

interface PlanFeature { text: string; highlight?: boolean }

interface Plan {
  id: string
  name: string
  badge: string
  Icon: LucideIcon
  iconBg: string
  iconColor: string
  iconFilled?: boolean
  desc: string
  monthlyUSD: number
  annualUSD: number
  features: PlanFeature[]
  cta: string
  featured?: boolean
}

const PLANS: Plan[] = [
  {
    id: 'preview', name: 'Preview', badge: 'Tiny trial access',
    Icon: Rocket, iconBg: 'linear-gradient(135deg, #E8F2FF, #F0F7FE)', iconColor: '#4B9FD8',
    desc: 'For testing the basics.',
    monthlyUSD: 0, annualUSD: 0,
    features: [
      { text: '1 child profile' }, { text: '5 calendar events total' },
      { text: '3 expense requests / month' }, { text: '30 parent messages / month' },
      { text: '3 stored documents' }, { text: 'No My SCAI' },
    ],
    cta: 'Start Preview',
  },
  {
    id: 'essential', name: 'Essential', badge: 'Basic capped use',
    Icon: CalendarDays, iconBg: 'linear-gradient(135deg, #E8F2FF, #F0F7FE)', iconColor: '#4B9FD8',
    desc: 'For simple structure without AI.',
    monthlyUSD: 4.99, annualUSD: 49,
    features: [
      { text: '1 child profile' }, { text: '40 calendar events / month' },
      { text: '20 expense requests / month' }, { text: '500 parent messages / month' },
      { text: '25 stored documents' }, { text: 'No My SCAI' },
    ],
    cta: 'Get Organised',
  },
  {
    id: 'plus', name: 'Plus', badge: 'Advanced features',
    Icon: Zap, iconBg: 'linear-gradient(135deg, #4B9FD8, #2ecc71)', iconColor: '#fff', iconFilled: true,
    desc: 'The smart co-parenting system.',
    monthlyUSD: 9.99, annualUSD: 99,
    features: [
      { text: 'Up to 3 child profiles' }, { text: '150 calendar events / month' },
      { text: '100 expense requests / month' }, { text: '2,500 parent messages / month' },
      { text: '5 PDF exports / month' }, { text: 'My SCAI included', highlight: true },
    ],
    cta: 'Choose Plus',
    featured: true,
  },
  {
    id: 'premium', name: 'Premium', badge: 'Advanced records',
    Icon: Shield, iconBg: 'linear-gradient(135deg, #E8F2FF, #F0F7FE)', iconColor: '#4B9FD8',
    desc: 'For stronger proof and reports.',
    monthlyUSD: 14.99, annualUSD: 149,
    features: [
      { text: '2 co-parenting circles' }, { text: 'Unlimited fair-use activity' },
      { text: '25 GB document storage' }, { text: '25 PDF exports / month' },
      { text: 'Professional access' }, { text: 'Advanced My SCAI' },
    ],
    cta: 'Protect Records',
  },
]

// ─── Section ──────────────────────────────────────────────────────────────────

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0])
  const { ref, inView } = useInView(0.05)

  return (
    <section id="pricing" className="py-20 md:py-28" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col items-center text-center">

          {/* Logo badge */}
          <div className={inView ? 'anim-scale-bounce' : 'opacity-0'}
            style={inView ? { animationDelay: '0ms', animationFillMode: 'both' } : {}}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 20px',
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              borderRadius: 50,
              border: '1px solid rgba(75,159,216,0.2)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              marginBottom: 20,
            }}>
              <svg viewBox="0 0 24 24" fill="#4B9FD8" width={16} height={16}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#4B9FD8', fontFamily: 'Inter, sans-serif' }}>SupportCard</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className={inView ? 'anim-fade-up' : 'opacity-0'} style={{
            fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 800, color: '#001F3F',
            lineHeight: 1.15, maxWidth: 700,
            ...(inView ? { animationDelay: '100ms', animationFillMode: 'both' } : {}),
          }}>
            Choose your{' '}
            <span className="gradient-text" style={{ filter: 'drop-shadow(0 0 18px rgba(75,159,216,0.2))' }}>
              SupportCard
            </span>{' '}
            plan
          </h2>

          {/* Subheading */}
          <p className={inView ? 'anim-fade-up' : 'opacity-0'} style={{
            fontSize: 16, color: '#666', lineHeight: 1.7, maxWidth: 600, marginTop: 16,
            ...(inView ? { animationDelay: '200ms', animationFillMode: 'both' } : {}),
          }}>
            Everything you need to manage co-parenting with clarity and confidence.<br />
            Schedules, expenses, documents, and records — all in one secure place.
          </p>

          {/* Toggle row */}
          <div className={inView ? 'anim-fade-up' : 'opacity-0'}
            style={{ marginTop: 40, ...(inView ? { animationDelay: '300ms', animationFillMode: 'both' } : {}) }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4, padding: 5,
                background: 'rgba(255,255,255,0.82)',
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                borderRadius: 50, border: '1px solid rgba(75,159,216,0.15)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}>
                <button onClick={() => setIsAnnual(false)} style={{
                  padding: '10px 22px', borderRadius: 50, border: 'none', cursor: 'pointer',
                  fontSize: 14, fontWeight: 600, fontFamily: 'Inter, sans-serif',
                  background: !isAnnual ? '#4B9FD8' : 'transparent',
                  color: !isAnnual ? 'white' : '#666',
                  boxShadow: !isAnnual ? '0 4px 12px rgba(75,159,216,0.3)' : 'none',
                  transition: 'all 300ms cubic-bezier(0.34,1.56,0.64,1)',
                }}>Monthly</button>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#4B9FD8', flexShrink: 0, opacity: 0.6 }} />
                <button onClick={() => setIsAnnual(true)} style={{
                  padding: '10px 22px', borderRadius: 50, border: 'none', cursor: 'pointer',
                  fontSize: 14, fontWeight: 600, fontFamily: 'Inter, sans-serif',
                  background: isAnnual ? '#4B9FD8' : 'transparent',
                  color: isAnnual ? 'white' : '#666',
                  boxShadow: isAnnual ? '0 4px 12px rgba(75,159,216,0.3)' : 'none',
                  transition: 'all 300ms cubic-bezier(0.34,1.56,0.64,1)',
                }}>Annual</button>
              </div>

              {/* "Annual saves 2 months" annotation */}
              {!isAnnual && (
                <div style={{
                  position: 'absolute', right: -172, top: -4,
                  display: 'flex', alignItems: 'center', gap: 6,
                  pointerEvents: 'none', animation: 'fade-in-up 0.35s ease forwards',
                }}>
                  <svg width="38" height="28" viewBox="0 0 38 28" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M36 4 C28 4 18 10 14 18 C11 24 6 26 2 26" stroke="#4B9FD8" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
                    <path d="M36 4 l-4 5 M36 4 l-6 1" stroke="#4B9FD8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#4B9FD8', whiteSpace: 'nowrap' }}>Annual saves 2 months</span>
                </div>
              )}
            </div>
          </div>

          {/* Currency picker — own row, below toggle */}
          <div className={inView ? 'anim-fade-up' : 'opacity-0'}
            style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8,
              ...(inView ? { animationDelay: '380ms', animationFillMode: 'both' } : {}) }}>
            <span style={{ fontSize: 12, color: '#aaa', fontWeight: 500 }}>View prices in</span>
            <CurrencyPicker currency={currency} onChange={setCurrency} />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12" style={{ alignItems: 'start' }}>
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} isAnnual={isAnnual} currency={currency} inView={inView} delay={i * 80} />
          ))}
        </div>

        {/* Founder banner */}
        <FounderBanner inView={inView} currency={currency} />

        {/* Rate disclaimer */}
        {currency.code !== 'USD' && (
          <p style={{
            textAlign: 'center', fontSize: 11.5, color: '#bbb', marginTop: 16,
            animation: 'fade-in-up 0.4s ease forwards',
          }}>
            ~ Approximate conversion from USD. Actual charges processed in USD.
          </p>
        )}
      </div>
    </section>
  )
}

// ─── Currency Picker ──────────────────────────────────────────────────────────

function CurrencyPicker({ currency, onChange }: { currency: Currency; onChange: (c: Currency) => void }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handle = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '10px 16px', borderRadius: 50, cursor: 'pointer',
          background: open ? '#4B9FD8' : 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          border: `1px solid ${open ? '#4B9FD8' : 'rgba(75,159,216,0.2)'}`,
          boxShadow: open ? '0 4px 16px rgba(75,159,216,0.35)' : '0 4px 16px rgba(0,0,0,0.06)',
          color: open ? 'white' : '#4B9FD8',
          fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif',
          transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        <Globe size={14} strokeWidth={2} />
        <span>{currency.flag} {currency.code}</span>
        <ChevronDown
          size={13}
          strokeWidth={2.5}
          style={{ transition: 'transform 0.25s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', zIndex: 200,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(75,159,216,0.18)',
          borderRadius: 16,
          padding: 8,
          boxShadow: '0 16px 48px rgba(0,0,0,0.14), 0 4px 12px rgba(75,159,216,0.08)',
          minWidth: 230,
          animation: 'fade-in-up 0.2s ease forwards',
        }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#bbb', padding: '4px 8px 8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Select currency
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {CURRENCIES.map(c => {
              const active = c.code === currency.code
              return (
                <button
                  key={c.code}
                  onClick={() => { onChange(c); setOpen(false) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '9px 11px', borderRadius: 10,
                    border: `1px solid ${active ? 'rgba(75,159,216,0.4)' : 'transparent'}`,
                    background: active ? 'rgba(75,159,216,0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.18s ease, border-color 0.18s ease',
                    textAlign: 'left' as const,
                  }}
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(75,159,216,0.05)'
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'
                  }}
                >
                  <span style={{ fontSize: 16, lineHeight: 1 }}>{c.flag}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: active ? '#4B9FD8' : '#001F3F', lineHeight: 1.2 }}>
                      {c.code}
                    </div>
                    <div style={{ fontSize: 10, color: '#aaa', lineHeight: 1.2 }}>{c.symbol} · {c.name.split(' ')[0]}</div>
                  </div>
                  {active && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                      <circle cx="6" cy="6" r="5.5" stroke="#4B9FD8" strokeWidth="1.2"/>
                      <path d="M3.5 6l1.8 1.8L8.5 4" stroke="#4B9FD8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Pricing card ─────────────────────────────────────────────────────────────

function PricingCard({ plan, isAnnual, currency, inView, delay }: {
  plan: Plan; isAnnual: boolean; currency: Currency; inView: boolean; delay: number
}) {
  const [displayed, setDisplayed] = useState<DisplayPrice>(() =>
    getDisplay(plan.monthlyUSD, plan.annualUSD, isAnnual, currency)
  )
  const [priceVisible, setPriceVisible] = useState(true)

  useEffect(() => {
    setPriceVisible(false)
    const t = setTimeout(() => {
      setDisplayed(getDisplay(plan.monthlyUSD, plan.annualUSD, isAnnual, currency))
      setPriceVisible(true)
    }, 180)
    return () => clearTimeout(t)
  }, [isAnnual, currency, plan.monthlyUSD, plan.annualUSD])

  const cardBase: React.CSSProperties = plan.featured ? {
    background: 'linear-gradient(155deg, rgba(255,255,255,0.95), rgba(235,247,255,0.92))',
    border: '1.5px solid rgba(75,159,216,0.4)',
    boxShadow: '0 16px 48px rgba(75,159,216,0.2), inset 0 1px 0 rgba(255,255,255,0.9)',
  } : {
    background: 'rgba(255,255,255,0.68)',
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.4)',
    boxShadow: '0 4px 18px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)',
  }

  return (
    <div className={inView ? 'anim-card-in' : 'opacity-0'} style={{
      paddingTop: plan.featured ? 24 : 0,
      ...(inView ? { animationDelay: `${delay}ms`, animationFillMode: 'both' } : {}),
    }}>
      <div style={{
        ...cardBase, borderRadius: 18, padding: '24px 20px 22px',
        display: 'flex', flexDirection: 'column', position: 'relative',
        height: '100%', minHeight: 520,
      }}>
        {/* Most Popular badge */}
        {plan.featured && (
          <div style={{
            position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #3A8BC4, #4B9FD8)', color: 'white',
            borderRadius: 50, padding: '5px 14px', fontSize: 10.5, fontWeight: 700,
            letterSpacing: '0.5px', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const,
            boxShadow: '0 4px 12px rgba(75,159,216,0.4)',
            display: 'flex', alignItems: 'center', gap: 4,
            animation: 'pulse-orb 2s ease-in-out infinite',
          }}>
            <Star size={9} fill="white" color="white" />
            Most Popular
          </div>
        )}

        {/* Icon */}
        <div style={{
          width: 48, height: 48, borderRadius: 12, flexShrink: 0,
          background: plan.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <plan.Icon size={22} color={plan.iconColor} strokeWidth={1.75} fill={plan.iconFilled ? plan.iconColor : 'none'} />
        </div>

        {/* Name */}
        <div style={{ fontSize: plan.featured ? 22 : 20, fontWeight: plan.featured ? 800 : 700, color: '#001F3F', marginTop: 12, lineHeight: 1.2 }}>
          {plan.name}
        </div>

        {/* Badge */}
        <div style={{
          display: 'inline-block', marginTop: 6, padding: '4px 11px', borderRadius: 50,
          fontSize: 11.5, fontWeight: 500,
          background: plan.featured ? 'rgba(75,159,216,0.1)' : '#EAF4FB', color: '#4B9FD8',
          border: '1px solid rgba(75,159,216,0.2)',
        }}>
          {plan.badge}
        </div>

        {/* Animated price */}
        <div style={{
          marginTop: 22, minHeight: 64,
          opacity: priceVisible ? 1 : 0,
          transform: priceVisible ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 0.18s cubic-bezier(0.4,0,0.2,1), transform 0.18s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, flexWrap: 'wrap' as const }}>
            <span style={{
              fontSize: plan.featured ? 40 : 32, fontWeight: 800, lineHeight: 1,
              color: plan.featured ? '#4B9FD8' : '#001F3F',
            }}>
              {displayed.display}
            </span>
            <span style={{ fontSize: 13, color: '#999', fontWeight: 400 }}>{displayed.unit}</span>
          </div>
          {displayed.sub && (
            <div style={{ fontSize: 11, color: '#4B9FD8', marginTop: 4, fontWeight: 500 }}>{displayed.sub}</div>
          )}
        </div>

        {/* Description */}
        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, marginTop: 12, paddingBottom: 14, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          {plan.desc}
        </p>

        {/* Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 16, flex: 1 }}>
          {plan.features.map(({ text, highlight }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <CheckMark />
              <span style={{ fontSize: 13, color: highlight ? '#4B9FD8' : '#4A4A4A', fontWeight: highlight ? 600 : 400, lineHeight: 1.5 }}>
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className={plan.featured ? 'btn-gradient' : 'pricing-outline-btn'}
          style={{
            marginTop: 22, width: '100%',
            padding: plan.featured ? '14px 24px' : '12px 24px',
            borderRadius: 8,
            fontSize: plan.featured ? 14 : 13,
            fontWeight: plan.featured ? 700 : 600,
            letterSpacing: plan.featured ? '0.5px' : '0.3px',
            cursor: 'pointer',
            border: plan.featured ? 'none' : '1.5px solid #001F3F',
            background: plan.featured ? undefined : 'transparent',
            color: plan.featured ? 'white' : '#001F3F',
            boxShadow: plan.featured ? '0 4px 16px rgba(75,159,216,0.4)' : 'none',
          }}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  )
}

// ─── Founder banner ───────────────────────────────────────────────────────────

function FounderBanner({ inView, currency }: { inView: boolean; currency: Currency }) {
  const founderUSD = 6.99
  const founderDisplay = fmt(founderUSD, currency)

  return (
    <div className={inView ? 'anim-fade-up' : 'opacity-0'}
      style={inView ? { animationDelay: '400ms', animationFillMode: 'both' } : {}}>
      <div style={{
        marginTop: 40, padding: '18px 28px',
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        borderRadius: 16, border: '1px solid rgba(75,159,216,0.22)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        display: 'flex', alignItems: 'center', gap: 16,
        animation: 'founder-pulse 3s ease-in-out infinite',
      }}>
        <div style={{
          width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(75,159,216,0.1)', border: '1px solid rgba(75,159,216,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Gift size={20} color="#4B9FD8" strokeWidth={1.75} />
        </div>
        <p style={{ fontSize: 14.5, color: '#1a1a1a', margin: 0, lineHeight: 1.5 }}>
          <strong style={{ color: '#4B9FD8', fontWeight: 700 }}>Founder Offer: </strong>
          SupportCard Plus for{' '}
          <strong style={{ color: '#001F3F' }}>{founderDisplay}/month</strong>
          {' '}for the first 5,000 families — locked for 12 months.
          {currency.code !== 'USD' && (
            <span style={{ fontSize: 12, color: '#aaa', fontWeight: 400 }}> (approx.)</span>
          )}
        </p>
      </div>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function CheckMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="7.5" cy="7.5" r="6.5" stroke="#4B9FD8" strokeWidth="1.2"/>
      <path d="M4.5 7.5l2 2 4-4" stroke="#4B9FD8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

