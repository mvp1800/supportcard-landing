import type { LucideIcon } from 'lucide-react'
import {
  Bot, CalendarDays, Receipt, PieChart, Send, MessageSquare,
  FolderLock, Users, Bell, Clock, BarChart2, ShieldCheck,
  Sparkles, Heart,
} from 'lucide-react'
import { useInView } from '../hooks/useInView'

interface Feature { Icon: LucideIcon; title: string; description: string }

const FEATURES: Feature[] = [
  { Icon: Bot,          title: 'SCAI AI Assistant',       description: 'Automates schedules, requests, and reminders'              },
  { Icon: CalendarDays, title: 'Shared Calendar',          description: 'Pickups, school events, and routines in one place'         },
  { Icon: Receipt,      title: 'Expense Tracking',         description: 'Track child-related spending clearly'                      },
  { Icon: PieChart,     title: 'Shared Budgeting',         description: 'Plan and manage monthly child expenses'                    },
  { Icon: Send,         title: 'Requests & Approvals',     description: 'Send, review, and approve expense requests'               },
  { Icon: MessageSquare,title: 'Secure Messaging',         description: 'Co-parent communication in one organized space'            },
  { Icon: FolderLock,   title: 'Document Vault',           description: 'Store court orders, receipts, and child records'          },
  { Icon: Users,        title: 'Child Profiles',           description: 'Keep each child\'s details, events, and documents organized' },
  { Icon: Bell,         title: 'Smart Reminders',          description: 'Never miss pickups, payments, or appointments'             },
  { Icon: Clock,        title: 'Activity Timeline',        description: 'A clear record of co-parenting activity'                  },
  { Icon: BarChart2,    title: 'Reports & Records',        description: 'Summaries for expenses, schedules, and agreements'        },
  { Icon: ShieldCheck,  title: 'Privacy by Design',        description: 'Secure handling of parent, child, and financial data'     },
]

export default function FeaturesSection() {
  const { ref, inView } = useInView(0.05)

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── Section header ── */}
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div
            className="anim-scale-bounce inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(75,159,216,0.3)',
              color: '#4B9FD8',
              fontSize: 14,
              fontWeight: 600,
              animationDelay: '0ms',
              animationFillMode: 'both',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Sparkles size={14} strokeWidth={1.75} />
            Core features
          </div>

          {/* Heading */}
          <h2
            className="anim-fade-up font-bold leading-tight"
            style={{
              fontSize: 'clamp(28px,4vw,42px)',
              color: '#001F3F',
              maxWidth: 600,
              animationDelay: '120ms',
              animationFillMode: 'both',
            }}
          >
            Everything you need for smoother co-parenting
          </h2>

          {/* Heart separator */}
          <div
            className="anim-fade-up flex items-center gap-3 mt-5 mb-10"
            style={{ animationDelay:'240ms', animationFillMode:'both' }}
          >
            <div style={{ width:48, height:1, background:'rgba(75,159,216,0.25)', borderRadius:1 }} />
            <Heart
              size={16}
              fill="#4B9FD8"
              color="#4B9FD8"
              className="animate-heart-beat"
            />
            <div style={{ width:48, height:1, background:'rgba(75,159,216,0.25)', borderRadius:1 }} />
          </div>
        </div>

        {/* ── 12-card grid ── */}
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 16,
          }}
          className="sm:grid-cols-3 lg:grid-cols-6"
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={inView ? 'anim-card-in' : 'opacity-0'}
              style={inView ? { animationDelay:`${i * 55}ms`, animationFillMode:'both' } : {}}
            >
              <FeatureCard feature={f} />
            </div>
          ))}
        </div>

        {/* ── Section footer pill ── */}
        <div
          className="anim-fade-up flex justify-center mt-12"
          style={{ animationDelay:'700ms', animationFillMode:'both' }}
        >
          <div
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(75,159,216,0.25)',
              backdropFilter: 'blur(8px)',
              fontSize: 14,
              color: '#4A4A4A',
            }}
          >
            <ShieldCheck size={16} color="#4B9FD8" strokeWidth={1.75} />
            <span>
              <strong style={{ color:'#001F3F' }}>Built for modern co-parents.</strong>
              {' '}Trusted. Organized. Focused on what matters most — your children.
            </span>
            <Heart size={14} fill="#4B9FD8" color="#4B9FD8" />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature: { Icon, title, description } }: { feature: Feature }) {
  return (
    <div
      className="feature-card relative flex flex-col gap-4 rounded-[12px] p-5 h-full"
      style={{
        background: 'rgba(255,255,255,0.62)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.35)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)',
        minHeight: 175,
      }}
    >
      {/* Icon */}
      <div
        className="card-icon w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(75,159,216,0.10)' }}
      >
        <Icon size={20} strokeWidth={1.6} color="#4B9FD8" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 flex-1">
        <h3 style={{ fontSize:14, fontWeight:700, color:'#001F3F', lineHeight:1.35 }}>
          {title}
        </h3>
        <p style={{ fontSize:12.5, color:'#888', lineHeight:1.6 }}>
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 20,
          width: 28,
          height: 3,
          background: '#4B9FD8',
          borderRadius: 2,
          opacity: 0.5,
        }}
      />
    </div>
  )
}
