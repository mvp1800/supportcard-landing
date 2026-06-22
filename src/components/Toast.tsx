import { useEffect } from 'react'
import { CheckCircle, X } from 'lucide-react'

interface ToastProps {
  name: string
  email: string
  onClose: () => void
}

export default function Toast({ name, email, onClose }: ToastProps) {
  useEffect(() => {
    const id = setTimeout(onClose, 5000)
    return () => clearTimeout(id)
  }, [onClose])

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 animate-slide-in-right flex items-start gap-3 max-w-sm w-full rounded-xl px-5 py-4 shadow-lg"
      style={{ background: '#2ECC71', color: '#fff' }}
    >
      <CheckCircle size={20} strokeWidth={2} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm leading-snug">
          {name}, welcome to the waitlist!
        </p>
        <p className="text-sm opacity-90 truncate mt-0.5">
          Check {email} for updates.
        </p>
      </div>
      <button onClick={onClose} aria-label="Dismiss" className="flex-shrink-0 mt-0.5 opacity-70 hover:opacity-100 transition-opacity">
        <X size={16} strokeWidth={2.5} />
      </button>
    </div>
  )
}
