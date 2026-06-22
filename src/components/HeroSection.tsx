import WaitlistForm from './WaitlistForm'
import PhoneMockup from './PhoneMockup'

interface HeroSectionProps {
  onWaitlistSuccess: (name: string, email: string) => void
}

const AVATARS = [
  'linear-gradient(135deg,#FF6B9D,#FF8EAD)',
  'linear-gradient(135deg,#4B9FD8,#6BBAE8)',
  'linear-gradient(135deg,#2ECC71,#4DD882)',
]

const DOTS = [
  { size:5, opacity:0.12, top:'8%',  left:'3%',  delay:0    },
  { size:4, opacity:0.08, top:'18%', left:'48%', delay:0.6  },
  { size:6, opacity:0.10, top:'70%', left:'6%',  delay:1.2  },
  { size:3, opacity:0.14, top:'55%', left:'52%', delay:0.3  },
  { size:5, opacity:0.09, top:'30%', left:'88%', delay:0.9  },
  { size:4, opacity:0.11, top:'82%', left:'80%', delay:1.5  },
  { size:3, opacity:0.08, top:'12%', left:'72%', delay:0.4  },
  { size:6, opacity:0.07, top:'42%', left:'24%', delay:1.1  },
]

export default function HeroSection({ onWaitlistSuccess }: HeroSectionProps) {
  return (
    <section id="waitlist" className="relative overflow-hidden">
      {/* Animated background orb */}
      <div
        className="animate-pulse-orb pointer-events-none absolute -top-40 -right-32 -z-0"
        style={{
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75,159,216,0.18) 0%, transparent 70%)',
        }}
      />
      {/* Second softer orb bottom-left */}
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 -z-0"
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46,204,113,0.08) 0%, transparent 70%)',
          animation: 'pulse-orb 6s ease-in-out infinite 2s',
        }}
      />
      {/* Dot particles */}
      {DOTS.map((d, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full -z-0"
          style={{
            width: d.size, height: d.size,
            background: '#4B9FD8',
            opacity: d.opacity,
            top: d.top, left: d.left,
            animation: `pulse-orb ${3 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}

      <div className="relative z-0 max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left column ── */}
          <div>
            {/* Headline */}
            <h1
              className="anim-fade-up font-extrabold leading-tight tracking-tight"
              style={{ fontSize:'clamp(32px, 5vw, 56px)', color:'#001F3F', animationDelay:'0ms', animationFillMode:'both' }}
            >
              Co-parenting,{' '}
              <br className="hidden sm:block" />
              made{' '}
              <span className="gradient-text" style={{ filter:'drop-shadow(0 0 20px rgba(75,159,216,0.25))' }}>
                clearer
              </span>
              <br />
              and{' '}
              <span className="gradient-text" style={{ filter:'drop-shadow(0 0 20px rgba(75,159,216,0.25))' }}>
                easier.
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="anim-fade-up mt-5 max-w-md"
              style={{
                fontSize: 16,
                color: '#4A4A4A',
                lineHeight: 1.75,
                animationDelay: '150ms',
                animationFillMode: 'both',
              }}
            >
              Support Card helps co-parents manage child-related money with
              transparency, budgeting, and secure shared tools—so you can
              focus on what matters most.
            </p>

            {/* Form */}
            <div
              className="anim-fade-up mt-8 max-w-[420px]"
              style={{ animationDelay:'300ms', animationFillMode:'both' }}
            >
              <WaitlistForm onSuccess={onWaitlistSuccess} />
            </div>

            {/* Social proof */}
            <div
              className="anim-fade-up mt-8 flex items-center gap-4"
              style={{ animationDelay:'450ms', animationFillMode:'both' }}
            >
              <div className="flex -space-x-2.5">
                {AVATARS.map((bg, i) => (
                  <div
                    key={i}
                    className="rounded-full border-2 border-white"
                    style={{ width:36, height:36, background:bg }}
                  />
                ))}
              </div>
              <div>
                <div className="flex leading-none mb-1" style={{ color:'#FFB800', fontSize:15 }} aria-label="5 stars">
                  ★★★★★
                </div>
                <p style={{ fontSize:13, color:'#888' }}>
                  Built for co-parents, by people who get it.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right column: phone ── */}
          <div
            className="anim-fade-up flex justify-center"
            style={{ animationDelay:'200ms', animationFillMode:'both' }}
          >
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
