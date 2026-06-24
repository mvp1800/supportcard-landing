import LegalLayout from '../components/LegalLayout'

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 22, 2026">
      <Section title="1. Introduction">
        <p>Support Card ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. Please read it carefully. By using Support Card, you consent to the practices described here.</p>
      </Section>

      <Section title="2. Information We Collect">
        <p><strong>Information you provide directly:</strong></p>
        <ul>
          <li>Account registration details (name, email address, password)</li>
          <li>Co-parenting arrangement data (schedules, expense records, messages)</li>
          <li>Payment information (processed securely by our payment provider — we do not store card details)</li>
          <li>Communications you send to us (support requests, feedback)</li>
        </ul>
        <p><strong>Information collected automatically:</strong></p>
        <ul>
          <li>Usage data (pages visited, features used, session duration)</li>
          <li>Device and browser information</li>
          <li>IP address and approximate location</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </Section>

      <Section title="3. How We Use Your Information">
        <p>We use your information to:</p>
        <ul>
          <li>Provide, operate, and improve the Service</li>
          <li>Process transactions and manage your subscription</li>
          <li>Send transactional emails (receipts, account alerts)</li>
          <li>Send product updates and announcements (you can opt out)</li>
          <li>Respond to support requests</li>
          <li>Monitor for fraud, abuse, and security threats</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>We do <strong>not</strong> sell your personal data to third parties.</p>
      </Section>

      <Section title="4. Data Sharing">
        <p>We may share your information with:</p>
        <ul>
          <li><strong>Service providers:</strong> Trusted third parties who assist in operating the platform (e.g., hosting, payment processing, email delivery). These providers are contractually obligated to protect your data.</li>
          <li><strong>Co-parent connections:</strong> If you invite another co-parent to a shared arrangement, certain information (e.g., expenses, calendar events) will be visible to them as intended by the platform's design.</li>
          <li><strong>Legal requirements:</strong> If required by law, court order, or to protect the rights and safety of our users or others.</li>
        </ul>
      </Section>

      <Section title="5. Cookies">
        <p>We use cookies and similar technologies to keep you logged in, remember your preferences, and understand how you use the Service. You can control cookie settings through your browser, though disabling cookies may affect functionality.</p>
      </Section>

      <Section title="6. Data Retention">
        <p>We retain your personal data for as long as your account is active or as needed to provide the Service. If you delete your account, we will delete or anonymize your data within 90 days, except where we are required to retain it for legal or compliance purposes.</p>
      </Section>

      <Section title="7. Data Security">
        <p>We implement industry-standard security measures including encryption in transit (TLS), encrypted storage, and access controls. However, no system is completely secure. You use the Service at your own risk and should take steps to protect your own account (e.g., using a strong password).</p>
      </Section>

      <Section title="8. Children's Privacy">
        <p>The Service is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it promptly.</p>
      </Section>

      <Section title="9. Your Rights">
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to or restrict certain processing</li>
          <li>Data portability</li>
        </ul>
        <p>To exercise these rights, contact us at <a href="mailto:supportcard.global@gmail.com">supportcard.global@gmail.com</a>.</p>
      </Section>

      <Section title="10. Third-Party Links">
        <p>The Service may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies before providing any personal information.</p>
      </Section>

      <Section title="11. Changes to This Policy">
        <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a notice on the platform. The "last updated" date at the top reflects the most recent revision.</p>
      </Section>

      <Section title="12. Contact Us">
        <p>If you have questions or concerns about this Privacy Policy, please contact us at <a href="mailto:supportcard.global@gmail.com">supportcard.global@gmail.com</a>.</p>
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
