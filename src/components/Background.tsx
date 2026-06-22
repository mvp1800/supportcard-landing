// Fixed full-page background: animated gradient + blurred orbs + drifting particles.
// Rendered once in Home.tsx, sits at z-index -10 behind everything.

const ORBS = [
  { size: 480, top: '-120px', right: '-120px', delay: '0s',  duration: '8s'  },
  { size: 380, bottom: '-90px', left: '-90px', delay: '4s',  duration: '11s' },
  { size: 300, top: '38%',  right: '18%',      delay: '2s',  duration: '9s'  },
]

const PARTICLES = [
  { size: 12, top: '14%',  left: '7%',   anim: 'drift-1', dur: '9s',   delay: '0s'   },
  { size: 8,  top: '62%',  left: '4%',   anim: 'drift-2', dur: '11s',  delay: '1.4s' },
  { size: 16, top: '22%',  left: '86%',  anim: 'drift-3', dur: '8s',   delay: '0.7s' },
  { size: 7,  top: '78%',  left: '76%',  anim: 'drift-4', dur: '13s',  delay: '3.2s' },
  { size: 10, top: '48%',  left: '52%',  anim: 'drift-2', dur: '10s',  delay: '1.9s' },
  { size: 9,  top: '88%',  left: '28%',  anim: 'drift-1', dur: '9s',   delay: '4.1s' },
  { size: 14, top: '8%',   left: '56%',  anim: 'drift-3', dur: '12s',  delay: '0.9s' },
  { size: 6,  top: '35%',  left: '15%',  anim: 'drift-4', dur: '14s',  delay: '5.0s' },
]

export default function Background() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Animated gradient layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(-45deg, #E8F4FB, #F5FAFE, #E0F0FF, #EBF6FC)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 16s ease infinite',
        }}
      />

      {/* Large blurred orbs */}
      {ORBS.map((o, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width:  o.size,
            height: o.size,
            top:    o.top,
            right:  o.right,
            bottom: o.bottom,
            left:   o.left,
            background: 'rgba(75,159,216,0.09)',
            borderRadius: '50%',
            filter: 'blur(64px)',
            animation: `pulse-orb ${o.duration} ease-in-out infinite`,
            animationDelay: o.delay,
          }}
        />
      ))}

      {/* Small drifting particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width:  p.size,
            height: p.size,
            top:    p.top,
            left:   p.left,
            background: `rgba(75,159,216,${0.07 + (i % 4) * 0.02})`,
            borderRadius: '50%',
            filter: 'blur(2.5px)',
            animation: `${p.anim} ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
