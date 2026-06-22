import { useState, useEffect, useRef } from 'react'
import {
  Heart, ShieldCheck, Users, CalendarDays, Receipt, Bell,
  Wallet, MessageSquare, FileText, ArrowRight, Play,
  MessageCircle, CheckCircle2, Sparkles, Shield, Gem,
} from 'lucide-react'
import { useInView } from '../hooks/useInView'

// ─── Chat data ───────────────────────────────────────────────────────────────

const CHAT = [
  { user: true,  text: 'Schedule pickup for Friday at 1:30 PM for Axl.' },
  { user: false, text: 'Scheduled pickup on the shared calendar and notified the other parent.', prefix: 'Dremo ✅' },
  { user: true,  text: 'Log $45 for school shoes.' },
  { user: false, text: 'Expense logged under Clothing for A.J. Would you like to attach a receipt?' },
  { user: true,  text: 'Rewind his message calmly.' },
  { user: false, text: "Here's a calmer version focused on facts, schedule and the child's needs." },
]

// Animation steps: [delay_ms, action, messageIndex | -1]
const SEQ: [number, 'show' | 'think' | 'unthink' | 'reset'][] = [
  [600,  'show'],
  [1000, 'think'],
  [1600, 'unthink'],
  [1650, 'show'],
  [2400, 'show'],
  [2800, 'think'],
  [3400, 'unthink'],
  [3450, 'show'],
  [4200, 'show'],
  [4600, 'think'],
  [5200, 'unthink'],
  [5250, 'show'],
  [10000,'reset'],
]

// ─── Main export ─────────────────────────────────────────────────────────────

export default function MySCAI() {
  return (
    <section
      id="my-scai"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #F0F6FF 0%, #E8F2FF 55%, #F5F0FF 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient orbs */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{
          position:'absolute', top:-80, right:-80, width:560, height:560, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(26,111,255,0.07) 0%, transparent 70%)',
          filter:'blur(40px)', animation:'pulse-orb 8s ease-in-out infinite',
        }}/>
        <div style={{
          position:'absolute', bottom:-80, left:-80, width:480, height:480, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(123,47,255,0.05) 0%, transparent 70%)',
          filter:'blur(40px)', animation:'pulse-orb 10s ease-in-out infinite 3s',
        }}/>
        {[
          {size:5,top:'14%',left:'7%',   d:'drift-1',dur:'7s',  del:'0s'  },
          {size:7,top:'62%',left:'4%',   d:'drift-2',dur:'9s',  del:'1.4s'},
          {size:4,top:'22%',left:'93%',  d:'drift-3',dur:'6s',  del:'0.7s'},
          {size:6,top:'78%',left:'89%',  d:'drift-4',dur:'8s',  del:'2.1s'},
          {size:4,top:'42%',left:'50%',  d:'drift-2',dur:'10s', del:'0.9s'},
          {size:5,top:'88%',left:'34%',  d:'drift-1',dur:'7s',  del:'3.0s'},
        ].map((p,i)=>(
          <div key={i} style={{
            position:'absolute', top:p.top, left:p.left,
            width:p.size, height:p.size, borderRadius:'50%',
            background:'rgba(26,111,255,0.18)', filter:'blur(1px)',
            animation:`${p.d} ${p.dur} ease-in-out ${p.del} infinite`,
          }}/>
        ))}
      </div>

      <HeroIntro />
      <BenefitsBar />
      <HowItWorks />
      <WhatItCanDo />
      <AvailableOn />
    </section>
  )
}

// ─── Part 1: Hero ────────────────────────────────────────────────────────────

function HeroIntro() {
  const { ref, inView } = useInView(0.12)
  return (
    <div ref={ref} className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left */}
        <div>
          <div className={inView ? 'anim-scale-bounce' : 'opacity-0'}
            style={inView ? {animationDelay:'0ms',animationFillMode:'both'} : {}}>
            <ScaiOrb />
          </div>

          <h2 className={inView ? 'anim-fade-up' : 'opacity-0'} style={{
            fontSize:'clamp(36px,5vw,62px)', fontWeight:800, color:'#001F3F',
            lineHeight:1.1, marginTop:24,
            ...(inView ? {animationDelay:'80ms',animationFillMode:'both'} : {}),
          }}>
            Meet <span className="scai-gradient-text">My SCAI</span>
          </h2>

          <p className={inView ? 'anim-fade-up' : 'opacity-0'} style={{
            fontSize:18, fontWeight:700, color:'#001F3F', marginTop:14,
            ...(inView ? {animationDelay:'180ms',animationFillMode:'both'} : {}),
          }}>
            Your intelligent co-parenting assistant.
          </p>

          <p className={inView ? 'anim-fade-up' : 'opacity-0'} style={{
            fontSize:16, color:'#4A4A4A', lineHeight:1.7, marginTop:8,
            ...(inView ? {animationDelay:'260ms',animationFillMode:'both'} : {}),
          }}>
            Schedules, expenses, reminders, and communication—handled for you.
          </p>

          <div className={`${inView ? 'anim-fade-up' : 'opacity-0'} flex flex-wrap items-center gap-4 mt-8`}
            style={inView ? {animationDelay:'360ms',animationFillMode:'both'} : {}}>
            <a href="#pricing" className="scai-btn-primary">
              Unlock My SCAI with Plus
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>
            <button className="scai-btn-ghost">
              <span style={{
                width:20, height:20, borderRadius:'50%',
                border:'1.5px solid #1A6FFF',
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              }}>
                <Play size={7} fill="#1A6FFF" color="#1A6FFF" style={{marginLeft:1}} />
              </span>
              See how it works
            </button>
          </div>
        </div>

        {/* Right: phone + floating badges */}
        <div className="relative flex justify-center">
          <FloatingBadge
            icon={<CalendarDays size={13} color="#1A6FFF" strokeWidth={1.75}/>}
            label="Calendar updated"
            floatClass="scai-badge-float-1"
            style={{position:'absolute', left:-8, top:'14%', zIndex:2,
              opacity: inView ? 1 : 0, transition:'opacity 0.5s ease 0.5s'}}
          />
          <FloatingBadge
            icon={<Receipt size={13} color="#1A6FFF" strokeWidth={1.75}/>}
            label="Expense logged"
            floatClass="scai-badge-float-2"
            style={{position:'absolute', left:-4, bottom:'18%', zIndex:2,
              opacity: inView ? 1 : 0, transition:'opacity 0.5s ease 0.7s'}}
          />
          <FloatingBadge
            icon={<Bell size={13} color="#1A6FFF" strokeWidth={1.75}/>}
            label="Reminder created"
            floatClass="scai-badge-float-3"
            style={{position:'absolute', right:-8, top:'32%', zIndex:2,
              opacity: inView ? 1 : 0, transition:'opacity 0.5s ease 0.9s'}}
          />
          <ScaiChatPhone inView={inView} />
        </div>
      </div>
    </div>
  )
}

// ─── SCAI Orb ────────────────────────────────────────────────────────────────

function ScaiOrb() {
  return (
    <div style={{position:'relative', width:120, height:120}}>
      {/* Background glow */}
      <div style={{
        position:'absolute', inset:-50, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(26,111,255,0.14) 0%, transparent 70%)',
        filter:'blur(24px)', animation:'pulse-orb 4s ease-in-out infinite',
      }}/>
      {/* Outer dashed rotating ring */}
      <div style={{
        position:'absolute', inset:0, borderRadius:'50%',
        border:'2px dashed rgba(0,212,255,0.45)',
        animation:'spin 8s linear infinite',
      }}/>
      {/* Middle glass ring (counter-rotates) */}
      <div style={{
        position:'absolute', inset:14, borderRadius:'50%',
        background:'rgba(26,111,255,0.06)',
        backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
        border:'1px solid rgba(255,255,255,0.35)',
        animation:'spin 12s linear infinite reverse',
      }}/>
      {/* Inner orb */}
      <div className="scai-breathe" style={{
        position:'absolute', inset:28, borderRadius:'50%',
        background:'radial-gradient(circle at 33% 28%, #00D4FF, #1A6FFF 48%, #7B2FFF)',
      }}>
        <svg viewBox="0 0 40 40" width="100%" height="100%" style={{position:'absolute',inset:0}}>
          {/* Eyes */}
          <circle cx="14" cy="17" r="3.2" fill="white" opacity="0.92"/>
          <circle cx="26" cy="17" r="3.2" fill="white" opacity="0.92"/>
          <circle cx="15" cy="15.5" r="1.3" fill="rgba(26,111,255,0.55)"/>
          <circle cx="27" cy="15.5" r="1.3" fill="rgba(26,111,255,0.55)"/>
          {/* Smile */}
          <path d="M14 25 Q20 30.5 26 25" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.88"/>
          {/* Sheen */}
          <ellipse cx="13.5" cy="10" rx="4.5" ry="2.5" fill="rgba(255,255,255,0.22)"/>
        </svg>
      </div>
      {/* Orbiting sparkles */}
      {[
        {anim:'scai-orbit-1', dur:'5s',  size:6,  color:'#00D4FF'},
        {anim:'scai-orbit-2', dur:'7.5s',size:8,  color:'#1A6FFF'},
        {anim:'scai-orbit-3', dur:'9s',  size:5,  color:'#7B2FFF'},
      ].map(({anim,dur,size,color},i)=>(
        <div key={i} style={{position:'absolute',top:'50%',left:'50%',width:0,height:0,
          animation:`${anim} ${dur} linear infinite`}}>
          <div style={{
            width:size, height:size, borderRadius:'50%',
            background:color, transform:'translate(-50%,-50%)',
            boxShadow:`0 0 7px ${color}88`,
          }}/>
        </div>
      ))}
    </div>
  )
}

// ─── Floating Badge ───────────────────────────────────────────────────────────

function FloatingBadge({icon, label, floatClass, style}: {
  icon: React.ReactNode; label: string; floatClass: string; style?: React.CSSProperties
}) {
  return (
    <div className={floatClass} style={{...style}}>
      <div style={{
        display:'flex', alignItems:'center', gap:8,
        padding:'9px 13px',
        background:'rgba(255,255,255,0.78)',
        backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
        borderRadius:12,
        border:'1px solid rgba(255,255,255,0.5)',
        boxShadow:'0 4px 20px rgba(26,111,255,0.1), inset 0 1px 0 rgba(255,255,255,0.7)',
        whiteSpace:'nowrap' as const,
      }}>
        <div style={{
          width:28, height:28, borderRadius:8, flexShrink:0,
          background:'rgba(26,111,255,0.08)',
          border:'1px solid rgba(26,111,255,0.15)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          {icon}
        </div>
        <span style={{fontSize:12, fontWeight:600, color:'#001F3F'}}>{label}</span>
        <div style={{width:6, height:6, borderRadius:'50%', background:'#2ECC71', flexShrink:0,
          boxShadow:'0 0 4px rgba(46,204,113,0.6)'}}/>
      </div>
    </div>
  )
}

// ─── Chat Phone ───────────────────────────────────────────────────────────────

function ScaiChatPhone({ inView }: { inView: boolean }) {
  const [visible, setVisible] = useState<number[]>([])
  const [thinking, setThinking] = useState(false)
  const [loopKey, setLoopKey] = useState(0)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!inView) return
    setVisible([])
    setThinking(false)

    const timers: ReturnType<typeof setTimeout>[] = []
    const T = (fn: ()=>void, ms: number) => { const t = setTimeout(fn, ms); timers.push(t) }

    let msgIdx = -1
    const add = () => { msgIdx++; setVisible(v => [...v, msgIdx]) }

    T(add,  600)           // user msg 0
    T(()=>setThinking(true),  1000)
    T(()=>setThinking(false), 1600)
    T(add,  1660)          // scai msg 1
    T(add,  2400)          // user msg 2
    T(()=>setThinking(true),  2800)
    T(()=>setThinking(false), 3400)
    T(add,  3460)          // scai msg 3
    T(add,  4200)          // user msg 4
    T(()=>setThinking(true),  4600)
    T(()=>setThinking(false), 5200)
    T(add,  5260)          // scai msg 5
    T(()=>{ setVisible([]); setThinking(false); setLoopKey(k=>k+1) }, 10000)

    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, loopKey])

  // Auto-scroll chat to bottom
  useEffect(()=>{
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [visible, thinking])

  const phoneVisible = inView

  return (
    <div style={{
      opacity: phoneVisible ? 1 : 0,
      transform: phoneVisible ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.92)',
      transition:'opacity 0.7s ease, transform 0.7s cubic-bezier(0.4,0,0.2,1)',
      animation: phoneVisible ? 'float 4.5s ease-in-out 0.7s infinite' : 'none',
      position:'relative', zIndex:1,
    }}>
      {/* Phone glow */}
      <div style={{
        position:'absolute', inset:-40, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(26,111,255,0.1) 0%, transparent 70%)',
        filter:'blur(30px)', animation:'pulse-orb 5s ease-in-out infinite',
      }}/>
      {/* Phone frame */}
      <div style={{
        position:'relative', width:285,
        background:'linear-gradient(160deg,#1a1a1a,#111)',
        borderRadius:44, padding:11,
        boxShadow:'0 30px 80px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,255,255,0.08)',
      }}>
        {/* Power button */}
        <div style={{position:'absolute',right:-3,top:140,width:3,height:60,
          background:'#2a2a2a',borderRadius:'0 3px 3px 0'}}/>
        {[80,124].map(top=>(
          <div key={top} style={{position:'absolute',left:-3,top,width:3,height:36,
            background:'#2a2a2a',borderRadius:'3px 0 0 3px'}}/>
        ))}

        {/* Screen */}
        <div style={{
          background:'#fff', borderRadius:34, overflow:'hidden',
          height:600, display:'flex', flexDirection:'column',
        }}>
          {/* Status bar */}
          <div style={{background:'#fff',display:'flex',alignItems:'center',
            justifyContent:'space-between',padding:'12px 18px 4px',flexShrink:0}}>
            <span style={{fontSize:11,fontWeight:700,color:'#001F3F'}}>9:41</span>
            <div style={{width:88,height:26,background:'#000',borderRadius:13}}/>
            <div style={{display:'flex',alignItems:'center',gap:4}}>
              <svg width="12" height="10" viewBox="0 0 16 12" fill="#001F3F">
                <rect x="0" y="8" width="3" height="4" rx="0.5"/>
                <rect x="4.5" y="5" width="3" height="7" rx="0.5"/>
                <rect x="9" y="2" width="3" height="10" rx="0.5"/>
                <rect x="13.5" y="0" width="2.5" height="12" rx="0.5"/>
              </svg>
              <svg width="13" height="10" viewBox="0 0 20 15" fill="none">
                <circle cx="10" cy="13.5" r="1.5" fill="#001F3F"/>
                <path d="M6.5 10C7.6 8.9 8.7 8.3 10 8.3s2.4.6 3.5 1.7" stroke="#001F3F" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M3 6.5C5 4.5 7.4 3.3 10 3.3s5 1.2 7 3.2" stroke="#001F3F" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <div style={{display:'flex',alignItems:'center'}}>
                <div style={{width:18,height:10,border:'1.5px solid #001F3F',borderRadius:2.5,
                  display:'flex',alignItems:'center',padding:'1.5px'}}>
                  <div style={{width:'75%',height:'100%',background:'#001F3F',borderRadius:1}}/>
                </div>
                <div style={{width:2,height:5,background:'#001F3F',borderRadius:'0 2px 2px 0',marginLeft:1}}/>
              </div>
            </div>
          </div>

          {/* Chat header */}
          <div style={{
            background:'#fff', display:'flex', alignItems:'center',
            gap:10, padding:'6px 14px 10px',
            borderBottom:'1px solid #f0f0f0', flexShrink:0,
          }}>
            <div style={{width:28,height:28,borderRadius:'50%',display:'flex',
              alignItems:'center',justifyContent:'center',
              background:'rgba(26,111,255,0.08)',
              border:'1px solid rgba(26,111,255,0.15)',
              color:'#1A6FFF',flexShrink:0,cursor:'pointer'}}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 2L4 6l4 4" stroke="#1A6FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* Mini orb avatar */}
            <div style={{
              width:34,height:34,borderRadius:'50%',flexShrink:0,
              background:'radial-gradient(circle at 33% 28%, #00D4FF, #1A6FFF 48%, #7B2FFF)',
              display:'flex',alignItems:'center',justifyContent:'center',
              boxShadow:'0 0 8px rgba(26,111,255,0.4)',
            }}>
              <svg viewBox="0 0 20 20" width={20} height={20}>
                <circle cx="7" cy="9" r="1.8" fill="white" opacity="0.9"/>
                <circle cx="13" cy="9" r="1.8" fill="white" opacity="0.9"/>
                <path d="M7 13 Q10 15.5 13 13" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.85"/>
              </svg>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'center',gap:5}}>
                <span style={{fontSize:13,fontWeight:700,color:'#001F3F'}}>My SCAI</span>
                <div style={{width:7,height:7,borderRadius:'50%',background:'#2ECC71',
                  boxShadow:'0 0 4px rgba(46,204,113,0.6)'}}/>
              </div>
              <div style={{fontSize:10.5,color:'#999'}}>Your co-parenting assistant.</div>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatRef} style={{
            flex:1, overflowY:'auto', padding:'12px 12px 8px',
            display:'flex', flexDirection:'column', gap:8,
            scrollBehavior:'smooth',
          }}>
            {CHAT.map((msg, i) => {
              const show = visible.includes(i)
              return (
                <div key={i} style={{
                  display:'flex', flexDirection:'column',
                  alignItems: msg.user ? 'flex-end' : 'flex-start',
                  opacity: show ? 1 : 0,
                  transform: show
                    ? 'translateX(0)'
                    : msg.user ? 'translateX(16px)' : 'translateX(-16px)',
                  transition:'opacity 0.35s ease, transform 0.35s ease',
                }}>
                  {!msg.user && (
                    <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:3}}>
                      <div style={{
                        width:20,height:20,borderRadius:'50%',
                        background:'radial-gradient(circle at 33% 28%, #00D4FF, #1A6FFF 48%, #7B2FFF)',
                        flexShrink:0,
                      }}/>
                      <span style={{fontSize:9.5,fontWeight:600,color:'#1A6FFF'}}>My SCAI</span>
                    </div>
                  )}
                  <div style={{
                    maxWidth:'78%',
                    padding:'9px 12px',
                    borderRadius: msg.user ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                    background: msg.user
                      ? 'linear-gradient(135deg, #1A6FFF, #2B7FFF)'
                      : 'rgba(26,111,255,0.06)',
                    border: msg.user ? 'none' : '1px solid rgba(26,111,255,0.12)',
                    fontSize:11.5, lineHeight:1.5,
                    color: msg.user ? '#fff' : '#001F3F',
                  }}>
                    {'prefix' in msg && msg.prefix && (
                      <span style={{fontWeight:700,color:'#1A6FFF',display:'block',marginBottom:2,fontSize:10.5}}>
                        {msg.prefix}
                      </span>
                    )}
                    {msg.text}
                  </div>
                  <span style={{
                    fontSize:9, marginTop:3,
                    color: msg.user ? 'rgba(26,111,255,0.6)' : '#bbb',
                  }}>
                    9:41 AM ✓
                  </span>
                </div>
              )
            })}

            {/* Thinking dots */}
            {thinking && (
              <div style={{display:'flex',alignItems:'flex-start',gap:5}}>
                <div style={{
                  width:20,height:20,borderRadius:'50%',
                  background:'radial-gradient(circle at 33% 28%, #00D4FF, #1A6FFF 48%, #7B2FFF)',
                  flexShrink:0,
                }}/>
                <div style={{
                  padding:'10px 14px',
                  background:'rgba(26,111,255,0.06)',
                  border:'1px solid rgba(26,111,255,0.12)',
                  borderRadius:'4px 16px 16px 16px',
                  display:'flex', gap:4, alignItems:'center',
                }}>
                  {[0, 0.18, 0.36].map((delay,i)=>(
                    <div key={i} style={{
                      width:6,height:6,borderRadius:'50%',background:'#1A6FFF',
                      animation:`thinking-dot 1.1s ease-in-out ${delay}s infinite`,
                    }}/>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div style={{
            padding:'8px 10px 12px', flexShrink:0,
            borderTop:'1px solid #f0f0f0', background:'#fff',
          }}>
            <div style={{
              display:'flex', alignItems:'center', gap:8,
              background:'#F5F7FA', borderRadius:50,
              border:'1px solid #E8E8E8', padding:'8px 14px',
            }}>
              <span style={{flex:1,fontSize:11.5,color:'#bbb'}}>Ask My SCAI anything…</span>
              <div style={{
                width:28,height:28,borderRadius:'50%',flexShrink:0,
                background:'linear-gradient(135deg,#1A6FFF,#00D4FF)',
                display:'flex',alignItems:'center',justifyContent:'center',
                boxShadow:'0 2px 8px rgba(26,111,255,0.4)',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Part 2: Benefits Bar ─────────────────────────────────────────────────────

function BenefitsBar() {
  const { ref, inView } = useInView(0.15)
  return (
    <div className="max-w-[1100px] mx-auto px-6 pb-16">
      <div
        ref={ref}
        className={inView ? 'anim-fade-up' : 'opacity-0'}
        style={{
          ...(inView ? {animationFillMode:'both'} : {}),
          background:'rgba(255,255,255,0.65)',
          backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,0.35)',
          borderRadius:20, padding:'28px 32px',
          boxShadow:'0 8px 40px rgba(26,111,255,0.06), inset 0 1px 0 rgba(255,255,255,0.75)',
          display:'grid',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            { Icon:Heart,       title:'Less stress.',                desc:'Let My SCAI handle the details.'    },
            { Icon:ShieldCheck, title:'Better communication.',       desc:'Calm, clear messages every time.'   },
            { Icon:Users,       title:'More time for what matters.', desc:'Focus on your child, not the chaos.'},
          ].map(({Icon,title,desc},i)=>(
            <div
              key={title}
              className={inView ? 'anim-fade-up' : 'opacity-0'}
              style={{
                ...(inView ? {animationDelay:`${i*80}ms`,animationFillMode:'both'} : {}),
                display:'flex', alignItems:'center', gap:14,
                padding:'12px 20px',
                borderRight: i < 2 ? '1px solid rgba(0,0,0,0.07)' : 'none',
              }}
            >
              <div style={{
                width:42,height:42,borderRadius:12,flexShrink:0,
                background:'rgba(26,111,255,0.07)',
                border:'1px solid rgba(26,111,255,0.12)',
                display:'flex',alignItems:'center',justifyContent:'center',
              }}>
                <Icon size={20} color="#1A6FFF" strokeWidth={1.6}/>
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:'#001F3F',marginBottom:2}}>{title}</div>
                <div style={{fontSize:13,color:'#666',lineHeight:1.5}}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Part 3: How It Works ────────────────────────────────────────────────────

function HowItWorks() {
  const { ref, inView } = useInView(0.12)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if (inView && lineRef.current) {
      lineRef.current.style.animation = 'scai-step-line 1s cubic-bezier(0.4,0,0.2,1) forwards'
    }
  }, [inView])

  const STEPS = [
    { Icon:MessageCircle, num:1, title:'Ask',        desc:'Type what you need in natural language.'      },
    { Icon:Sparkles,      num:2, title:'Understand',  desc:'My SCAI handles the details instantly.'      },
    { Icon:CheckCircle2,  num:3, title:'Update',      desc:'Records, reminders, and messages—done.'      },
  ]

  return (
    <div className="py-20">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Heading */}
        <div className={`${inView ? 'anim-fade-up' : 'opacity-0'} text-center mb-14`}
          style={inView ? {animationFillMode:'both'} : {}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16}}>
            <span style={{fontSize:11,color:'rgba(26,111,255,0.5)',fontWeight:700}}>✦</span>
            <h3 style={{fontSize:'clamp(24px,3vw,36px)',fontWeight:700,color:'#001F3F',margin:0}}>
              How My SCAI works
            </h3>
            <span style={{fontSize:11,color:'rgba(26,111,255,0.5)',fontWeight:700}}>✦</span>
          </div>
        </div>

        {/* Steps */}
        <div ref={ref} style={{position:'relative'}}>
          {/* Connector line */}
          <div style={{
            position:'absolute', top:40, left:'17%', right:'17%', height:2,
            background:'rgba(26,111,255,0.1)', borderRadius:1,
            overflow:'hidden',
          }}>
            <div ref={lineRef} style={{
              height:'100%', width:0,
              background:'linear-gradient(90deg, #1A6FFF, #00D4FF)',
              borderRadius:1,
            }}/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map(({Icon,num,title,desc},i)=>(
              <div key={title}
                className={inView ? 'anim-card-in' : 'opacity-0'}
                style={{
                  ...(inView ? {animationDelay:`${i*150}ms`,animationFillMode:'both'} : {}),
                  display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:0,
                }}>
                {/* Numbered icon */}
                <div style={{position:'relative', marginBottom:16}}>
                  {/* Number badge */}
                  <div style={{
                    position:'absolute', top:-8, left:-8, zIndex:2,
                    width:22, height:22, borderRadius:'50%',
                    background:'#1A6FFF', color:'white',
                    fontSize:11, fontWeight:700,
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>{num}</div>
                  {/* Icon circle */}
                  <div className="scai-step-icon" style={{
                    width:80, height:80, borderRadius:'50%',
                    background:'rgba(255,255,255,0.75)',
                    backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
                    border:'1.5px solid rgba(26,111,255,0.2)',
                    boxShadow:'0 4px 16px rgba(26,111,255,0.1)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <Icon size={32} color="#1A6FFF" strokeWidth={1.5}/>
                  </div>
                </div>
                <div style={{fontSize:15,fontWeight:700,color:'#001F3F',marginBottom:6}}>{title}</div>
                <div style={{fontSize:13,color:'#666',lineHeight:1.6,maxWidth:180}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Part 4: What It Can Do ──────────────────────────────────────────────────

function WhatItCanDo() {
  const { ref, inView } = useInView(0.1)
  const CAPS = [
    { Icon:CalendarDays,  title:'Smart Scheduling',   desc:'Coordinate pickups, exchanges, and more.'  },
    { Icon:Wallet,        title:'Expense Logging',     desc:'Log and categorize costs with ease.'       },
    { Icon:MessageSquare, title:'Calm Communication',  desc:'Rewrite tense messages into calm ones.'    },
    { Icon:FileText,      title:'Record Summaries',    desc:'Summarize activities, expenses, and chats.'},
  ]
  return (
    <div className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Heading */}
        <div className={`${inView ? 'anim-fade-up' : 'opacity-0'} text-center mb-12`}
          style={inView ? {animationFillMode:'both'} : {}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16}}>
            <span style={{fontSize:11,color:'rgba(26,111,255,0.5)',fontWeight:700}}>✦</span>
            <h3 style={{fontSize:'clamp(24px,3vw,36px)',fontWeight:700,color:'#001F3F',margin:0}}>
              What My SCAI can do
            </h3>
            <span style={{fontSize:11,color:'rgba(26,111,255,0.5)',fontWeight:700}}>✦</span>
          </div>
        </div>
        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CAPS.map(({Icon,title,desc},i)=>(
            <div key={title}
              className={`scai-cap-card ${inView ? 'anim-card-in' : 'opacity-0'}`}
              style={{
                ...(inView ? {animationDelay:`${i*80}ms`,animationFillMode:'both'} : {}),
                background:'rgba(255,255,255,0.65)',
                backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
                border:'1px solid rgba(255,255,255,0.4)',
                borderRadius:16, padding:'26px 20px',
                boxShadow:'0 8px 32px rgba(26,111,255,0.06), inset 0 1px 0 rgba(255,255,255,0.65)',
              }}>
              <div style={{
                width:52,height:52,borderRadius:12,marginBottom:16,
                background:'linear-gradient(135deg, rgba(26,111,255,0.1), rgba(0,212,255,0.07))',
                border:'1px solid rgba(26,111,255,0.15)',
                display:'flex',alignItems:'center',justifyContent:'center',
              }}>
                <Icon size={26} color="#1A6FFF" strokeWidth={1.6}/>
              </div>
              <div style={{fontSize:15,fontWeight:700,color:'#001F3F',marginBottom:6}}>{title}</div>
              <div style={{fontSize:13,color:'#666',lineHeight:1.6}}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Part 5: Available On ────────────────────────────────────────────────────

function AvailableOn() {
  const { ref, inView } = useInView(0.12)
  return (
    <div className="py-16 pb-24">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Eyebrow */}
        <div className={`${inView ? 'anim-fade-up' : 'opacity-0'} text-center mb-6`}
          style={inView ? {animationFillMode:'both'} : {}}>
          <span style={{fontSize:12,fontWeight:600,color:'#1A6FFF',letterSpacing:'0.5px',textTransform:'uppercase'}}>
            Available on
          </span>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plus card */}
          <div
            className={inView ? 'anim-fade-up' : 'opacity-0'}
            style={{
              ...(inView ? {animationDelay:'80ms',animationFillMode:'both'} : {}),
              background:'rgba(255,255,255,0.72)',
              backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
              border:'1px solid rgba(26,111,255,0.22)',
              borderRadius:20, padding:28,
              boxShadow:'0 12px 40px rgba(26,111,255,0.08), inset 0 1px 0 rgba(255,255,255,0.75)',
            }}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <div style={{
                width:52,height:52,borderRadius:'50%',flexShrink:0,
                background:'linear-gradient(135deg,#1A6FFF,#00D4FF)',
                display:'flex',alignItems:'center',justifyContent:'center',
                boxShadow:'0 4px 16px rgba(26,111,255,0.4)',
              }}>
                <Shield size={24} color="white" strokeWidth={2} fill="rgba(255,255,255,0.2)"/>
              </div>
              <div style={{fontSize:18,fontWeight:700,color:'#001F3F'}}>My SCAI on Plus</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
              {['Schedules & reminders','Log expenses','Draft calm messages','Send to co-parents','Summarize recent activity'].map(f=>(
                <div key={f} style={{display:'flex',alignItems:'center',gap:7}}>
                  <ScaiCheck color="#1A6FFF"/>
                  <span style={{fontSize:13,color:'#4A4A4A'}}>{f}</span>
                </div>
              ))}
            </div>
            <a href="#pricing" style={{
              display:'inline-flex', alignItems:'center', gap:6,
              padding:'11px 20px', borderRadius:50, border:'none', cursor:'pointer',
              background:'linear-gradient(135deg,#1A6FFF,#00D4FF)',
              color:'white', fontSize:13, fontWeight:700,
              textDecoration:'none',
              boxShadow:'0 4px 16px rgba(26,111,255,0.3)',
              transition:'box-shadow 0.3s ease, transform 0.3s ease',
            }}
              onMouseEnter={e=>{
                (e.currentTarget as HTMLElement).style.boxShadow='0 8px 28px rgba(26,111,255,0.5)'
                ;(e.currentTarget as HTMLElement).style.transform='translateY(-2px)'
              }}
              onMouseLeave={e=>{
                (e.currentTarget as HTMLElement).style.boxShadow='0 4px 16px rgba(26,111,255,0.3)'
                ;(e.currentTarget as HTMLElement).style.transform='translateY(0)'
              }}
            >
              Get SupportCard Plus <ArrowRight size={14} strokeWidth={2.5}/>
            </a>
          </div>

          {/* Premium card */}
          <div
            className={inView ? 'anim-fade-up' : 'opacity-0'}
            style={{
              ...(inView ? {animationDelay:'160ms',animationFillMode:'both'} : {}),
              background:'linear-gradient(135deg, rgba(123,47,255,0.07), rgba(26,111,255,0.05))',
              backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
              border:'1px solid rgba(123,47,255,0.25)',
              borderRadius:20, padding:28,
              boxShadow:'0 12px 40px rgba(123,47,255,0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
            }}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <div style={{
                width:52,height:52,borderRadius:'50%',flexShrink:0,
                background:'linear-gradient(135deg,#7B2FFF,#1A6FFF)',
                display:'flex',alignItems:'center',justifyContent:'center',
                boxShadow:'0 0 20px rgba(123,47,255,0.45), 0 4px 16px rgba(123,47,255,0.3)',
              }}>
                <Gem size={22} color="white" strokeWidth={1.8}/>
              </div>
              <div style={{fontSize:18,fontWeight:700,color:'#001F3F'}}>Advanced My SCAI on Premium</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
              {['Legal-friendly summaries','Dispute pattern insights ⓘ','Missed pickup summaries','Professional-ready reports'].map(f=>(
                <div key={f} style={{display:'flex',alignItems:'center',gap:7}}>
                  <ScaiCheck color="#7B2FFF"/>
                  <span style={{fontSize:13,color:'#4A4A4A'}}>{f}</span>
                </div>
              ))}
            </div>
            <a href="#pricing" style={{
              display:'inline-flex', alignItems:'center', gap:6,
              padding:'11px 20px', borderRadius:50, border:'none', cursor:'pointer',
              background:'linear-gradient(135deg,#7B2FFF,#1A6FFF)',
              color:'white', fontSize:13, fontWeight:700,
              textDecoration:'none',
              boxShadow:'0 4px 16px rgba(123,47,255,0.35)',
              transition:'box-shadow 0.3s ease, transform 0.3s ease',
            }}
              onMouseEnter={e=>{
                (e.currentTarget as HTMLElement).style.boxShadow='0 8px 28px rgba(123,47,255,0.55)'
                ;(e.currentTarget as HTMLElement).style.transform='translateY(-2px)'
              }}
              onMouseLeave={e=>{
                (e.currentTarget as HTMLElement).style.boxShadow='0 4px 16px rgba(123,47,255,0.35)'
                ;(e.currentTarget as HTMLElement).style.transform='translateY(0)'
              }}
            >
              Explore Premium <ArrowRight size={14} strokeWidth={2.5}/>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function ScaiCheck({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{flexShrink:0}}>
      <circle cx="7.5" cy="7.5" r="6.5" stroke={color} strokeWidth="1.2"/>
      <path d="M4.5 7.5l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

