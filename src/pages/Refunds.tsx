import LegalLayout from '../components/LegalLayout'

export default function Refunds() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="June 22, 2026">
      <Section title="30-Day Money-Back Guarantee">
        <p>All purchases are eligible for a full refund within <strong>30 days</strong> of purchase — no questions asked.</p>
        <p>Refunds are processed by our payment processor, <strong>Paddle</strong>.</p>
        <p>To request a refund, contact us at <a href="mailto:support@supportcard.co.za">support@supportcard.co.za</a> with your order details and we will arrange your refund promptly.</p>
      </Section>
    </LegalLayout>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#001F3F', marginBottom: 12 }}>{title}</h2>
      <div style={{ fontSize: 15, color: '#4A4A4A', lineHeight: 1.8 }}>{children}</div>
    </section>
  )
}
