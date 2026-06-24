import LegalLayout from '../components/LegalLayout'

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="June 22, 2026">
      <Section title="1. Acceptance of Terms">
        <p>By accessing or using SupportCard ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. These terms apply to all users, including those on free and paid plans.</p>
      </Section>

      <Section title="2. Description of Service">
        <p>SupportCard is a SaaS platform designed to help co-parents manage child-related finances, schedules, expenses, and communications. The Service is provided on a subscription basis with plans ranging from a free tier to paid tiers at $4.99, $9.99, and $14.99 per month.</p>
        <p>SupportCard is a tool to assist co-parents and is <strong>not a substitute for legal advice</strong>. Nothing on this platform constitutes legal, financial, or therapeutic advice. Always consult a qualified professional for legal matters related to your co-parenting arrangement.</p>
      </Section>

      <Section title="3. Eligibility">
        <p>You must be at least 18 years old to use the Service. By using SupportCard, you represent that you are of legal age and have the authority to enter into this agreement. The Service is intended for individuals managing co-parenting arrangements and is not designed for use by children.</p>
      </Section>

      <Section title="4. Account Registration">
        <p>To access most features, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information as needed. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.</p>
        <p>You must notify us immediately at <a href="mailto:supportcard.global@gmail.com">supportcard.global@gmail.com</a> if you suspect any unauthorized use of your account.</p>
      </Section>

      <Section title="5. Subscription Plans and Billing">
        <p>SupportCard offers the following subscription tiers:</p>
        <ul>
          <li><strong>Preview (Free):</strong> Limited access for testing the platform.</li>
          <li><strong>Essential ($4.99/month or $49/year):</strong> Core features for individual co-parents.</li>
          <li><strong>Plus ($9.99/month or $99/year):</strong> Advanced features including SCAI assistance.</li>
          <li><strong>Premium ($14.99/month or $149/year):</strong> Full access including advanced records and priority support.</li>
        </ul>
        <p>Subscriptions are billed in advance on a monthly or annual basis. All prices are in USD. We reserve the right to change pricing with 30 days' notice to existing subscribers.</p>
      </Section>

      <Section title="6. Cancellation">
        <p>You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. You will retain access to paid features until that date. We do not prorate partial months unless required by applicable law. See our <a href="/refunds">Refund Policy</a> for details on refunds.</p>
      </Section>

      <Section title="7. Acceptable Use">
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>Harass, threaten, or harm another user or third party</li>
          <li>Upload false, misleading, or fraudulent information</li>
          <li>Attempt to gain unauthorized access to any part of the platform</li>
          <li>Use the Service for any unlawful purpose</li>
          <li>Reverse engineer, copy, or redistribute any part of the platform</li>
          <li>Introduce malware, viruses, or other harmful code</li>
        </ul>
        <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>
      </Section>

      <Section title="8. Data and Privacy">
        <p>Your use of the Service is also governed by our <a href="/privacy">Privacy Policy</a>, which is incorporated into these Terms by reference. By using SupportCard, you consent to the collection and use of your data as described in the Privacy Policy.</p>
      </Section>

      <Section title="9. Intellectual Property">
        <p>All content, features, and functionality of the Service — including but not limited to text, graphics, logos, and software — are the exclusive property of SupportCard and are protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>
      </Section>

      <Section title="10. Disclaimer of Warranties">
        <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of harmful components. Your use of the Service is at your sole risk.</p>
      </Section>

      <Section title="11. Limitation of Liability">
        <p>To the fullest extent permitted by law, SupportCard shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service. Our total liability to you shall not exceed the amount you paid us in the 12 months preceding the claim.</p>
      </Section>

      <Section title="12. Governing Law">
        <p>These Terms are governed by and construed in accordance with applicable law. Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration or in a court of competent jurisdiction, as applicable.</p>
      </Section>

      <Section title="13. Changes to Terms">
        <p>We reserve the right to update these Terms at any time. We will notify you of material changes via email or a notice on the platform. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>
      </Section>

      <Section title="14. Contact">
        <p>Questions about these Terms? Contact us at <a href="mailto:supportcard.global@gmail.com">supportcard.global@gmail.com</a>.</p>
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
