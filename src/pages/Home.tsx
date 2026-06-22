import { useState, useCallback } from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import MySCAI from '../components/MySCAI'
import PricingSection from '../components/PricingSection'
import BottomCTASection from '../components/BottomCTASection'
import Footer from '../components/Footer'
import Toast from '../components/Toast'
import type { ToastState } from '../types'

export default function Home() {
  const [toast, setToast] = useState<ToastState | null>(null)

  const handleSuccess  = useCallback((name: string, email: string) => { setToast({ name, email }) }, [])
  const dismissToast   = useCallback(() => setToast(null), [])

  return (
    <>
      <Background />
      <Header />
      <main className="flex-1">
        <HeroSection onWaitlistSuccess={handleSuccess} />
        <FeaturesSection />
        <MySCAI />
        <PricingSection />
        <BottomCTASection onWaitlistSuccess={handleSuccess} />
      </main>
      <Footer />
      {toast && (
        <Toast name={toast.name} email={toast.email} onClose={dismissToast} />
      )}
    </>
  )
}
