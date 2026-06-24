import LegalLayout from '../components/LegalLayout'

export default function Refunds() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="June 22, 2026">
      <Section title="Overview">
        <p>We want you to feel confident using Support Card. This Refund Policy explains when and how you can request a refund for paid subscriptions. By subscribing to any paid plan, you agree to this policy.</p>
      </Section>

      <Section title="14-Day Money-Back Guarantee">
        <p>If you are not satisfied with your paid subscription, you may request a full refund within <strong>14 days</strong> of your initial purchase or renewal date. To qualify:</p>
        <ul>
          <li>Your refund request must be submitted within 14 days of the charge date</li>
          <li>This applies to both monthly and annual plans</li>
          <li>The guarantee applies once per account — it cannot be used repeatedly across billing cycles</li>
        </ul>
        <p>To request a refund, email us at <a href="mailto:supportcard.global@gmail.com">supportcard.global@gmail.com</a> with the subject line "Refund Request" and include the email address associated with your account.</p>
      </Section>

      <Section title="Annual Plan Refunds">
        <p>For annual subscriptions, you may request a full refund within 14 days of purchase. After 14 days, annual subscriptions are non-refundable. We do not offer pro-rated refunds for the unused portion of an annual plan if you cancel mid-year.</p>
        <p>If you are on an annual plan and wish to cancel, your access will continue until the end of the billing year.</p>
      </Section>

      <Section title="Monthly Plan Refunds">
        <p>For monthly subscriptions, you may request a full refund within 14 days of any billing cycle. After 14 days, the charge for that cycle is non-refundable. Cancelling a monthly subscription stops future charges but does not generate a refund for the current month.</p>
      </Section>

      <Section title="Free Plan">
        <p>The Preview (free) plan has no associated charges and is therefore not eligible for — or in need of — a refund.</p>
      </Section>

      <Section title="Exceptions">
        <p>We reserve the right to deny refund requests in the following cases:</p>
        <ul>
          <li>Abuse of the refund policy (multiple refund requests across accounts)</li>
          <li>Accounts terminated due to violations of our <a href="/terms">Terms of Service</a></li>
          <li>Requests submitted more than 14 days after the charge date</li>
        </ul>
        <p>We will always use reasonable judgment and handle refund requests fairly. If you believe your situation warrants an exception, please reach out and explain your circumstances.</p>
      </Section>

      <Section title="How Refunds Are Processed">
        <p>Approved refunds are issued to the original payment method within 5–10 business days, depending on your bank or card provider. You will receive an email confirmation once the refund has been processed.</p>
      </Section>

      <Section title="Cancellation vs. Refund">
        <p>Cancelling your subscription and requesting a refund are two separate actions. Cancelling stops future billing but does not automatically trigger a refund. You must explicitly request a refund via email if you believe you are entitled to one under this policy.</p>
      </Section>

      <Section title="Contact">
        <p>For refund requests or questions about billing, contact us at <a href="mailto:supportcard.global@gmail.com">supportcard.global@gmail.com</a>. Please include your account email and the date of the charge in question.</p>
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
