import { useState, useEffect, useRef } from 'react'
import {
  Home, Bell, MessageCircle, MoreHorizontal,
  ClipboardCheck, CalendarDays, BarChart2,
  ShoppingBag, BookOpen, Receipt, Plus,
  Sparkles, FolderLock,
} from 'lucide-react'
import { useInView } from '../hooks/useInView'

// ─── Count-up hook ───────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number, active: boolean, delay = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setValue(Math.round(target * ease * 100) / 100)
        if (p < 1) requestAnimationFrame(tick)
        else setValue(target)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [active, target, duration, delay])
  return value
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function PhoneMockup() {
  const { ref, inView } = useInView(0.15)

  // Count-up values
  const totalSpent  = useCountUp(832.45, 1100, inView, 250)
  const budgetPct   = useCountUp(62,     1000, inView, 350)
  const pending     = useCountUp(2,       600, inView, 450)
  const msgCount    = useCountUp(3,       600, inView, 550)

  // Sparkline draw
  const sparkRef = useRef<SVGPathElement>(null)
  const [sparkLen, setSparkLen] = useState(500)
  useEffect(() => {
    if (sparkRef.current) setSparkLen(sparkRef.current.getTotalLength())
  }, [])

  // Bell dot pop
  const [bellPopped, setBellPopped] = useState(false)
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setBellPopped(true), 800)
      return () => clearTimeout(t)
    }
  }, [inView])

  const pill = (i: number, dir: 'left' | 'right') => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : `translateX(${dir === 'left' ? -28 : 28}px)`,
    transition: `opacity 0.55s ease ${i * 90}ms, transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${i * 90}ms`,
  })

  const card = (i: number, delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
    transition: `opacity 0.5s ease ${delay + i * 70}ms, transform 0.5s cubic-bezier(0.4,0,0.2,1) ${delay + i * 70}ms`,
  })

  return (
    <div ref={ref} className="relative animate-float" style={{ width: 265 }}>

      {/* Radial glow */}
      <div className="absolute -inset-20 -z-10 rounded-full" style={{
        background: 'radial-gradient(circle, rgba(75,159,216,0.22) 0%, transparent 70%)',
        animationName: 'pulse-orb',
        animationDuration: '5s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
      }} />

      {/* ── Floating feature pills (left, lg+ only) ── */}
      <div className="hidden lg:flex flex-col gap-2.5 absolute" style={{ right: 278, top: 60, width: 148 }}>
        {[
          { label: 'Shared Calendar', Icon: CalendarDays   },
          { label: 'Budgeting',       Icon: BarChart2      },
          { label: 'Requests',        Icon: ClipboardCheck },
          { label: 'Secure Messaging',Icon: MessageCircle  },
        ].map(({ label, Icon }, i) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 11px',
            background: 'rgba(255,255,255,0.84)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderRadius: 12,
            border: '1px solid rgba(75,159,216,0.15)',
            boxShadow: '0 3px 14px rgba(0,0,0,0.07)',
            ...pill(i, 'left'),
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: 7, flexShrink: 0,
              background: 'linear-gradient(135deg, #4B9FD8, #6CBAE8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={12} color="white" strokeWidth={1.75} />
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 600, color: '#001F3F' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── Floating side cards (right, xl+ only) ── */}
      <div className="hidden xl:flex flex-col gap-3 absolute" style={{ left: 278, top: 90, width: 134 }}>
        {/* SCAI Assistant */}
        <div style={{
          padding: '11px',
          background: 'rgba(255,255,255,0.86)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderRadius: 14,
          border: '1px solid rgba(75,159,216,0.15)',
          boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
          ...pill(0, 'right'),
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, marginBottom: 7,
            background: 'linear-gradient(135deg, #4B9FD8 0%, #9DD0F0 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(75,159,216,0.45)',
          }}>
            <Sparkles size={16} color="white" strokeWidth={1.75} />
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: '#001F3F', marginBottom: 2 }}>SCAI Assistant</div>
          <div style={{ fontSize: 8.5, color: '#999', marginBottom: 7 }}>SCAI can help you</div>
          {['Schedule pickups','Log requests','Organize routines'].map((item, i) => (
            <div key={item} style={{
              display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(10px)',
              transition: `opacity 0.4s ease ${500 + i * 80}ms, transform 0.4s ease ${500 + i * 80}ms`,
            }}>
              <div style={{ width: 11, height: 11, background: '#EBF5FB', borderRadius: 3, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="7" height="7" viewBox="0 0 7 7"><path d="M1 3.5l1.8 1.8L6 1" stroke="#4B9FD8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </div>
              <span style={{ fontSize: 8.5, color: '#555' }}>{item}</span>
            </div>
          ))}
        </div>
        {/* Document Vault */}
        <div style={{
          padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.86)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderRadius: 12,
          border: '1px solid rgba(75,159,216,0.15)',
          boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
          ...pill(1, 'right'),
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: 'linear-gradient(135deg, #4B9FD8, #6CBAE8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FolderLock size={13} color="white" strokeWidth={1.75} />
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#001F3F', lineHeight: 1.2 }}>Document Vault</div>
            <div style={{ fontSize: 8, color: '#999' }}>12 documents</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
              <div style={{ width: 5, height: 5, background: '#2ECC71', borderRadius: '50%' }} />
              <span style={{ fontSize: 7.5, color: '#2ECC71', fontWeight: 500 }}>All files secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Phone frame ── */}
      <div style={{
        position: 'relative',
        width: 265,
        background: 'linear-gradient(160deg, #E8E8ED 0%, #D4D4DB 50%, #C8C8CE 100%)',
        borderRadius: 48,
        padding: 12,
        boxShadow: `
          0 0 0 1px rgba(255,255,255,0.55) inset,
          0 0 0 2px rgba(0,0,0,0.08) inset,
          0 32px 80px rgba(0,0,0,0.22),
          0 8px 20px rgba(0,0,0,0.1)
        `,
      }}>
        {/* Side buttons */}
        <div style={{ position:'absolute', right:-4, top:150, width:4, height:70, background:'linear-gradient(180deg,#d0d0d7,#e0e0e7)', borderRadius:'0 4px 4px 0' }} />
        {[88, 136].map(top => (
          <div key={top} style={{ position:'absolute', left:-4, top, width:4, height:38, background:'linear-gradient(180deg,#d0d0d7,#e0e0e7)', borderRadius:'4px 0 0 4px' }} />
        ))}

        {/* ── Screen ── */}
        <div style={{
          background: '#F4F6FA',
          borderRadius: 38,
          overflow: 'hidden',
          height: 590,
          display: 'flex',
          flexDirection: 'column',
        }}>

          {/* Status bar with Dynamic Island */}
          <div style={{ background:'#fff', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 18px 5px', flexShrink:0 }}>
            <span style={{ fontSize:11, fontWeight:700, color:'#001F3F', fontVariantNumeric:'tabular-nums' }}>9:41</span>
            <div style={{ width:90, height:26, background:'#000', borderRadius:13 }} />
            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
              <SignalBars /><WifiIcon /><BatteryIcon />
            </div>
          </div>

          {/* App header */}
          <div style={{ background:'#fff', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'3px 14px 9px', borderBottom:'1px solid #f0f0f0', flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:7 }}>
              <div style={{ width:32, height:32, background:'#4B9FD8', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg viewBox="0 0 24 24" fill="white" width={16} height={16}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:'#4B9FD8', lineHeight:1.1 }}>Support</div>
                <div style={{ fontSize:12, fontWeight:700, color:'#4B9FD8', lineHeight:1.1 }}>Card</div>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:7 }}>
              <div style={{ position:'relative', width:28, height:28, background:'#F0F4F8', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Bell size={13} color="#666" strokeWidth={1.8} />
                {/* Notification dot with entrance pop */}
                <div style={{
                  position:'absolute', top:3, right:4, width:7, height:7,
                  background:'#FF6B35', borderRadius:'50%', border:'1.5px solid #F0F4F8',
                  animation: bellPopped ? 'bell-dot-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
                  opacity: bellPopped ? 1 : 0,
                }} />
              </div>
              <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#ffb3a7,#ff8070)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                <svg viewBox="0 0 24 24" fill="rgba(170,50,40,0.75)" width={20} height={20}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
            </div>
          </div>

          {/* ── Scrollable content ── */}
          <div style={{ flex:1, overflowY:'hidden', display:'flex', flexDirection:'column' }}>
            <div style={{ flex:1, overflowY:'hidden', padding:'8px 10px', display:'flex', flexDirection:'column', gap:6 }}>

              {/* Overview card */}
              <div style={{
                background:'linear-gradient(135deg, #4B9FD8 0%, #6CBAE8 100%)',
                borderRadius:14, padding:'11px 13px', color:'#fff', flexShrink:0,
                ...card(0, 100),
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:3 }}>
                  <span style={{ fontSize:11, fontWeight:700 }}>Overview</span>
                  <span style={{ fontSize:8, background:'rgba(255,255,255,0.2)', padding:'2px 7px', borderRadius:8 }}>This month ▾</span>
                </div>
                <div style={{ fontSize:8.5, opacity:0.8, marginBottom:1 }}>Total Spent</div>
                {/* Animated dollar amount */}
                <div style={{ fontSize:22, fontWeight:800, lineHeight:1.1, fontVariantNumeric:'tabular-nums' }}>
                  ${totalSpent.toFixed(2)}
                </div>
                <div style={{ fontSize:8.5, color:'rgba(255,255,255,0.75)', marginTop:2, marginBottom:6 }}>+12% vs last month</div>
                {/* Sparkline with draw animation */}
                <svg viewBox="0 0 230 30" width="100%" height={30} style={{ display:'block' }}>
                  <defs>
                    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="white" stopOpacity="0.28"/>
                      <stop offset="100%" stopColor="white" stopOpacity="0.02"/>
                    </linearGradient>
                  </defs>
                  {/* Fill area — fades in */}
                  <path
                    d="M0,26 C18,24 35,20 55,18 C75,16 85,21 100,15 C115,9 135,8 155,5 C175,2 195,6 215,3 L230,1 L230,30 L0,30Z"
                    fill="url(#sg)"
                    style={{
                      opacity: inView ? 1 : 0,
                      transition: 'opacity 0.8s ease 1.2s',
                    }}
                  />
                  {/* Line — draws left to right */}
                  <path
                    ref={sparkRef}
                    d="M0,26 C18,24 35,20 55,18 C75,16 85,21 100,15 C115,9 135,8 155,5 C175,2 195,6 215,3 L230,1"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.9"
                    style={{
                      strokeDasharray: sparkLen,
                      strokeDashoffset: inView ? 0 : sparkLen,
                      transition: inView ? 'stroke-dashoffset 1.1s cubic-bezier(0.4,0,0.2,1) 0.5s' : 'none',
                    }}
                  />
                  {/* Trailing dot */}
                  <circle
                    cx="230" cy="1" r="3"
                    fill="white"
                    style={{
                      opacity: inView ? 0.9 : 0,
                      transition: 'opacity 0.3s ease 1.5s',
                    }}
                  />
                </svg>
              </div>

              {/* 2×2 stat grid */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, flexShrink:0 }}>
                {/* Budget Used */}
                <div style={{ background:'#fff', borderRadius:11, padding:'9px 10px', boxShadow:'0 1px 4px rgba(0,0,0,0.04)', ...card(0, 300) }}>
                  <div style={{ fontSize:8.5, color:'#aaa', marginBottom:2 }}>Budget Used</div>
                  <div style={{ fontSize:16, fontWeight:800, color:'#001F3F', lineHeight:1, fontVariantNumeric:'tabular-nums' }}>
                    {Math.round(budgetPct)}%
                  </div>
                  <div style={{ fontSize:7.5, color:'#ccc', margin:'2px 0 5px' }}>$832.45 of $1,350</div>
                  <div style={{ height:3, background:'#EEF2F8', borderRadius:2 }}>
                    <div style={{
                      width: `${Math.round(budgetPct)}%`,
                      height:'100%',
                      background:'linear-gradient(90deg,#4B9FD8,#6CBAE8)',
                      borderRadius:2,
                      transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
                    }} />
                  </div>
                </div>
                {/* Pending Requests */}
                <div style={{ background:'#fff', borderRadius:11, padding:'9px 10px', boxShadow:'0 1px 4px rgba(0,0,0,0.04)', ...card(1, 300) }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div>
                      <div style={{ fontSize:8.5, color:'#aaa', marginBottom:2 }}>Pending</div>
                      <div style={{ fontSize:16, fontWeight:800, color:'#001F3F', lineHeight:1, fontVariantNumeric:'tabular-nums' }}>
                        {Math.round(pending)}
                      </div>
                      <div style={{ fontSize:7.5, color:'#bbb', marginTop:2 }}>Needs approval</div>
                    </div>
                    <div style={{ width:22, height:22, background:'#EBF5FB', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <ClipboardCheck size={11} color="#4B9FD8" strokeWidth={1.75} />
                    </div>
                  </div>
                </div>
                {/* Upcoming Pickup */}
                <div style={{ background:'#fff', borderRadius:11, padding:'9px 10px', boxShadow:'0 1px 4px rgba(0,0,0,0.04)', ...card(2, 300) }}>
                  <div style={{ fontSize:8.5, color:'#aaa', marginBottom:4 }}>Upcoming Pickup</div>
                  <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <div style={{ width:20, height:20, background:'#EBF5FB', borderRadius:5, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <CalendarDays size={10} color="#4B9FD8" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div style={{ fontSize:8.5, fontWeight:600, color:'#001F3F', lineHeight:1.2 }}>Today, 4:30 PM</div>
                      <div style={{ fontSize:7.5, color:'#666', lineHeight:1.2 }}>School Pickup</div>
                    </div>
                  </div>
                  <div style={{ fontSize:7.5, color:'#999', marginTop:4 }}>With Jordan</div>
                </div>
                {/* Unread Messages */}
                <div style={{ background:'#fff', borderRadius:11, padding:'9px 10px', boxShadow:'0 1px 4px rgba(0,0,0,0.04)', ...card(3, 300) }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div>
                      <div style={{ fontSize:8.5, color:'#aaa', marginBottom:2 }}>Messages</div>
                      <div style={{ fontSize:16, fontWeight:800, color:'#001F3F', lineHeight:1, fontVariantNumeric:'tabular-nums' }}>
                        {Math.round(msgCount)}
                      </div>
                      <div style={{ fontSize:7.5, color:'#bbb', marginTop:2 }}>New messages</div>
                    </div>
                    <div style={{ position:'relative', width:22, height:22, background:'#EBF5FB', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <MessageCircle size={11} color="#4B9FD8" strokeWidth={1.75} />
                      <div className="badge-ping" style={{
                        position:'absolute', top:-3, right:-3, width:10, height:10,
                        background:'#EF4444', borderRadius:'50%', border:'1.5px solid #fff',
                        display:'flex', alignItems:'center', justifyContent:'center',
                      }}>
                        <span style={{ fontSize:5.5, color:'#fff', fontWeight:700 }}>
                          {Math.round(msgCount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar + Child Profiles */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, flexShrink:0 }}>
                {/* Shared Calendar */}
                <div style={{ background:'#fff', borderRadius:11, padding:'9px 10px', boxShadow:'0 1px 4px rgba(0,0,0,0.04)', ...card(0, 600) }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:7 }}>
                    <span style={{ fontSize:9, fontWeight:700, color:'#001F3F' }}>Calendar</span>
                    <span style={{ fontSize:7.5, color:'#4B9FD8', fontWeight:600 }}>View all</span>
                  </div>
                  {/* Day strip */}
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
                    {[
                      { d:'T', n:'15', active:true  },
                      { d:'W', n:'16', active:false },
                      { d:'T', n:'17', active:false },
                      { d:'F', n:'18', active:false },
                    ].map(({ d, n, active }, i) => (
                      <div key={n} style={{
                        display:'flex', flexDirection:'column', alignItems:'center', gap:2,
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(6px)',
                        transition: `opacity 0.4s ease ${700 + i * 60}ms, transform 0.4s ease ${700 + i * 60}ms`,
                      }}>
                        <span style={{ fontSize:6.5, color: active ? '#4B9FD8' : '#bbb', fontWeight:600 }}>{d}</span>
                        <div style={{ width:17, height:17, borderRadius:'50%', background: active ? '#4B9FD8' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <span style={{ fontSize:7.5, color: active ? '#fff' : '#777', fontWeight: active ? 700 : 400 }}>{n}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Events */}
                  {['4:30 PM School Pickup', 'May 18 Soccer Game'].map((ev, i) => (
                    <div key={i} style={{
                      display:'flex', alignItems:'flex-start', gap:4, marginTop: i > 0 ? 4 : 0,
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateX(0)' : 'translateX(-8px)',
                      transition: `opacity 0.4s ease ${900 + i * 80}ms, transform 0.4s ease ${900 + i * 80}ms`,
                    }}>
                      <div style={{ width:4, height:4, background:'#4B9FD8', borderRadius:'50%', flexShrink:0, marginTop:2 }} />
                      <span style={{ fontSize:7.5, color:'#555', lineHeight:1.35 }}>{ev}</span>
                    </div>
                  ))}
                </div>

                {/* Child Profiles */}
                <div style={{ background:'#fff', borderRadius:11, padding:'9px 10px', boxShadow:'0 1px 4px rgba(0,0,0,0.04)', ...card(1, 600) }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                    <span style={{ fontSize:9, fontWeight:700, color:'#001F3F' }}>Profiles</span>
                    <span style={{ fontSize:7.5, color:'#4B9FD8', fontWeight:600 }}>View all</span>
                  </div>
                  <div style={{ textAlign:'center' }}>
                    <div style={{
                      width:42, height:42, borderRadius:'50%',
                      background:'linear-gradient(135deg,#f9c8a0,#f5a870)',
                      margin:'0 auto 5px', display:'flex', alignItems:'center', justifyContent:'center',
                      border:'2px solid rgba(75,159,216,0.2)',
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'scale(1)' : 'scale(0.7)',
                      transition: 'opacity 0.5s ease 750ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 750ms',
                    }}>
                      <svg viewBox="0 0 24 24" fill="rgba(150,70,15,0.7)" width={24} height={24}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <div style={{ fontSize:10, fontWeight:700, color:'#001F3F' }}>Alex</div>
                    <div style={{ fontSize:8, color:'#aaa', marginBottom:3 }}>Age 10</div>
                    <div style={{ fontSize:8, color:'#4B9FD8', fontWeight:600 }}>Profile details</div>
                    <div style={{ display:'flex', justifyContent:'center', gap:3, marginTop:6 }}>
                      {[true,false,false].map((a,i) => (
                        <div key={i} style={{ width:5, height:5, borderRadius:'50%', background: a ? '#4B9FD8' : '#DDD' }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity + Reports/Reminders */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, flexShrink:0 }}>
                {/* Recent Activity */}
                <div style={{ background:'#fff', borderRadius:11, padding:'9px 10px', boxShadow:'0 1px 4px rgba(0,0,0,0.04)', ...card(0, 800) }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                    <span style={{ fontSize:9, fontWeight:700, color:'#001F3F' }}>Activity</span>
                    <span style={{ fontSize:7.5, color:'#4B9FD8', fontWeight:600 }}>View all</span>
                  </div>
                  {[
                    { Icon: ShoppingBag, label:'Grocery Store',   amt:'-$125.40', green:false },
                    { Icon: BookOpen,    label:'School Supplies', amt:'-$86.35',  green:false },
                    { Icon: Receipt,     label:'Summer Camp',     amt:'+$250.00', green:true  },
                  ].map(({ Icon, label, amt, green }, i) => (
                    <div key={label} style={{
                      display:'flex', alignItems:'center', justifyContent:'space-between',
                      marginTop: i > 0 ? 5 : 0, paddingTop: i > 0 ? 5 : 0,
                      borderTop: i > 0 ? '1px solid #f5f5f5' : 'none',
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateX(0)' : 'translateX(-10px)',
                      transition: `opacity 0.4s ease ${1000 + i * 100}ms, transform 0.4s ease ${1000 + i * 100}ms`,
                    }}>
                      <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                        <div style={{ width:18, height:18, background:'#EBF5FB', borderRadius:5, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <Icon size={9} color="#4B9FD8" strokeWidth={1.75} />
                        </div>
                        <span style={{ fontSize:8, color:'#333', lineHeight:1.2 }}>{label}</span>
                      </div>
                      <span style={{ fontSize:8, fontWeight:700, color: green ? '#2ECC71' : '#001F3F' }}>{amt}</span>
                    </div>
                  ))}
                </div>

                {/* Reports & Smart Reminders stacked */}
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {/* Reports & Records */}
                  <div style={{ background:'#fff', borderRadius:11, padding:'9px 10px', flex:1, boxShadow:'0 1px 4px rgba(0,0,0,0.04)', ...card(1, 800) }}>
                    <div style={{ width:24, height:24, background:'#EBF5FB', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:5 }}>
                      <BarChart2 size={12} color="#4B9FD8" strokeWidth={1.75} />
                    </div>
                    <div style={{ fontSize:9, fontWeight:700, color:'#001F3F', marginBottom:2 }}>Reports</div>
                    <div style={{ fontSize:7.5, color:'#aaa', lineHeight:1.4, marginBottom:4 }}>Expense summaries & records</div>
                    <span style={{ fontSize:8, color:'#4B9FD8', fontWeight:600 }}>View reports</span>
                  </div>
                  {/* Smart Reminders */}
                  <div style={{ background:'#fff', borderRadius:11, padding:'9px 10px', flex:1, boxShadow:'0 1px 4px rgba(0,0,0,0.04)', ...card(2, 800) }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:4 }}>
                      <div style={{ width:20, height:20, background:'#EBF5FB', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <Bell size={10} color="#4B9FD8" strokeWidth={1.75} />
                      </div>
                      <div style={{ fontSize:9, fontWeight:700, color:'#001F3F' }}>Reminders</div>
                    </div>
                    <div style={{ fontSize:7.5, color:'#aaa', marginBottom:3 }}>2 upcoming reminders</div>
                    <span style={{ fontSize:8, color:'#4B9FD8', fontWeight:600 }}>View all</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Bottom nav ── */}
            <div style={{ background:'#fff', borderTop:'1px solid #f0f0f0', display:'flex', alignItems:'center', justifyContent:'space-around', padding:'6px 8px 8px', flexShrink:0 }}>
              <NavBtn label="Overview" active>
                <Home size={16} strokeWidth={1.6} />
              </NavBtn>
              <NavBtn label="Requests">
                <ClipboardCheck size={16} strokeWidth={1.6} />
              </NavBtn>
              {/* Centre + button */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, marginTop:-16 }}>
                <div style={{ width:36, height:36, background:'linear-gradient(135deg,#3A8BC4,#4B9FD8)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 3px 10px rgba(75,159,216,0.45)' }}>
                  <Plus size={18} color="white" strokeWidth={2.5} />
                </div>
              </div>
              {/* Messages with badge */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                <div style={{ position:'relative' }}>
                  <MessageCircle size={16} strokeWidth={1.6} color="#C4C4C4" />
                  <div className="badge-ping" style={{
                    position:'absolute', top:-3, right:-5, width:11, height:11,
                    background:'#EF4444', borderRadius:'50%', border:'1.5px solid #fff',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <span style={{ fontSize:6, color:'#fff', fontWeight:700 }}>3</span>
                  </div>
                </div>
                <span style={{ fontSize:7, color:'#C4C4C4' }}>Messages</span>
              </div>
              <NavBtn label="More">
                <MoreHorizontal size={16} strokeWidth={1.6} />
              </NavBtn>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function NavBtn({ children, label, active = false }: { children: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
      <div style={{ color: active ? '#4B9FD8' : '#C4C4C4' }}>{children}</div>
      <span style={{ fontSize:7, color: active ? '#4B9FD8' : '#C4C4C4', fontWeight: active ? 600 : 400 }}>{label}</span>
    </div>
  )
}

function SignalBars() {
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:2 }}>
      {[3,5,7,9].map((h,i) => <div key={i} style={{ width:3, height:h, background:'#001F3F', borderRadius:1 }} />)}
    </div>
  )
}

function WifiIcon() {
  return (
    <svg width="14" height="11" viewBox="0 0 20 15" fill="none">
      <circle cx="10" cy="13.5" r="1.5" fill="#001F3F"/>
      <path d="M6.5 10C7.6 8.9 8.7 8.3 10 8.3s2.4.6 3.5 1.7" stroke="#001F3F" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M3 6.5C5 4.5 7.4 3.3 10 3.3s5 1.2 7 3.2" stroke="#001F3F" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function BatteryIcon() {
  return (
    <div style={{ display:'flex', alignItems:'center' }}>
      <div style={{ width:20, height:11, border:'1.5px solid #001F3F', borderRadius:3, display:'flex', alignItems:'center', padding:'1.5px' }}>
        <div style={{ width:'75%', height:'100%', background:'#001F3F', borderRadius:1 }} />
      </div>
      <div style={{ width:2, height:5, background:'#001F3F', borderRadius:'0 2px 2px 0', marginLeft:1 }} />
    </div>
  )
}
