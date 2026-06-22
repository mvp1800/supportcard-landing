import Logo from './Logo'
import WaitlistForm from './WaitlistForm'
import { useInView } from '../hooks/useInView'

interface BottomCTASectionProps {
  onWaitlistSuccess: (name: string, email: string) => void
}

export default function BottomCTASection({ onWaitlistSuccess }: BottomCTASectionProps) {
  const { ref, inView } = useInView(0.1)

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div
          className="rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-center"
          style={{
            background: 'rgba(255,255,255,0.72)',
            border: '1px solid rgba(75,159,216,0.18)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 24px rgba(75,159,216,0.06)',
          }}
        >
          {/* Logo */}
          <div
            className={inView ? 'anim-fade-up' : 'opacity-0'}
            style={inView ? { animationDelay:'0ms', animationFillMode:'both' } : {}}
          >
            <Logo size="lg" stacked />
          </div>

          {/* Message — left border */}
          <div
            className={`md:pl-10 ${inView ? 'anim-fade-up' : 'opacity-0'}`}
            style={{
              borderLeft: '1px solid rgba(75,159,216,0.2)',
              ...(inView ? { animationDelay:'120ms', animationFillMode:'both' } : {}),
            }}
          >
            <p
              className="text-[13px] font-semibold uppercase tracking-[0.1em] mb-2"
              style={{ color: '#4B9FD8' }}
            >
              Be the first to know
            </p>
            <h2
              className="font-bold leading-snug mb-3"
              style={{ fontSize:'clamp(20px,2.5vw,28px)', color:'#001F3F' }}
            >
              Join the waitlist and get early access.
            </h2>
            <p style={{ fontSize:15, color:'#4A4A4A', lineHeight:1.7 }}>
              Support Card is launching soon. Sign up today and be among the
              first to experience a better way to manage child-related expenses.
            </p>
          </div>

          {/* Form */}
          <div
            className={inView ? 'anim-fade-up' : 'opacity-0'}
            style={inView ? { animationDelay:'240ms', animationFillMode:'both' } : {}}
          >
            <WaitlistForm onSuccess={onWaitlistSuccess} />
          </div>
        </div>
      </div>
    </section>
  )
}
