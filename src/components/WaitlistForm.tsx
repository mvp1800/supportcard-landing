import { useState, type FormEvent } from 'react'
import { User, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react'
import { joinWaitlist } from '../lib/supabase'

interface WaitlistFormProps {
  onSuccess: (name: string, email: string) => void
  buttonLabel?: string
  source?: string
}

export default function WaitlistForm({
  onSuccess,
  buttonLabel = 'Join the Prelaunch Waitlist',
  source = 'landing_page',
}: WaitlistFormProps) {
  const [name,      setName]      = useState('')
  const [email,     setEmail]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [success,   setSuccess]   = useState(false)
  const [errorMsg,  setErrorMsg]  = useState<string | null>(null)
  const [fieldErrs, setFieldErrs] = useState<{ name?: string; email?: string }>({})

  const validate = () => {
    const e: typeof fieldErrs = {}
    if (!name.trim())  e.name  = 'Name is required'
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email'
    return e
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrs(errs); return }
    setFieldErrs({})
    setErrorMsg(null)
    setLoading(true)

    const result = await joinWaitlist({ name, email, source })

    setLoading(false)

    if (result.ok) {
      const n = name, em = email
      setName('')
      setEmail('')
      setSuccess(true)
      onSuccess(n, em)
    } else {
      setErrorMsg(result.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <InputField
        icon={<User size={15} strokeWidth={1.75} />}
        type="text"
        placeholder="Full name"
        value={name}
        onChange={v => { setName(v); if (fieldErrs.name) setFieldErrs(p => ({ ...p, name: undefined })) }}
        error={fieldErrs.name}
      />
      <InputField
        icon={<Mail size={15} strokeWidth={1.75} />}
        type="email"
        placeholder="Email address"
        value={email}
        onChange={v => { setEmail(v); if (fieldErrs.email) setFieldErrs(p => ({ ...p, email: undefined })) }}
        error={fieldErrs.email}
      />

      {/* Error banner (duplicate or server error) */}
      {errorMsg && (
        <div
          className="flex items-center gap-2 rounded-[6px] px-3 py-2.5 text-[13px] font-medium"
          style={{
            background: errorMsg.includes('already') ? 'rgba(75,159,216,0.08)' : 'rgba(231,76,60,0.08)',
            border:     errorMsg.includes('already') ? '1px solid rgba(75,159,216,0.3)' : '1px solid rgba(231,76,60,0.3)',
            color:      errorMsg.includes('already') ? '#2980b9' : '#c0392b',
          }}
        >
          <AlertCircle size={14} strokeWidth={2} style={{ flexShrink: 0 }} />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || success}
        className="btn-gradient w-full py-[14px] text-white font-semibold rounded-[8px]"
        style={{
          fontSize: 15,
          letterSpacing: '0.4px',
          background: success
            ? 'linear-gradient(135deg, #27ae60 0%, #2ECC71 100%)'
            : undefined,
          boxShadow: success
            ? '0 0 24px rgba(46,204,113,0.45), 0 6px 16px rgba(46,204,113,0.25)'
            : undefined,
          animation: success ? 'success-pop 0.4s cubic-bezier(0.34,1.56,0.64,1)' : undefined,
        }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin-custom" width={16} height={16} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
              <path d="M4 12a8 8 0 018-8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            Signing up…
          </span>
        ) : success ? (
          <span className="flex items-center justify-center gap-2">
            <CheckCircle size={17} strokeWidth={2} />
            You're on the list!
          </span>
        ) : buttonLabel}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-[13px]" style={{ color: '#999' }}>
        <Lock size={12} strokeWidth={2} />
        We respect your privacy. No spam, ever.
      </p>
    </form>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function InputField({
  icon, type, placeholder, value, onChange, error,
}: {
  icon: React.ReactNode
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <div>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#bbb' }}>
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`input-field w-full pl-10 pr-4 py-3.5 border rounded-[6px] text-[15px] placeholder:text-gray-400 ${error ? 'border-red-400' : 'border-gray-200'}`}
          style={{
            color: '#001F3F',
            background: 'linear-gradient(160deg, #ffffff, #fafbfe)',
          }}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
