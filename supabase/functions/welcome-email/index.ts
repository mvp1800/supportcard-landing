import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!

serve(async (req: Request) => {
  try {
    const payload = await req.json()

    // Supabase webhook sends { type, table, record, ... }
    const record = payload?.record
    if (!record?.email) {
      return new Response('No email in record', { status: 400 })
    }

    const firstName = (record.name as string).split(' ')[0]
    const email     = record.email as string

    const html = buildEmail(firstName)

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'SupportCard <hello@supportcard.co.za>',
        to:      [email],
        subject: "You're on the list! SupportCard is coming 🎉",
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return new Response(`Resend error: ${err}`, { status: 500 })
    }

    return new Response('Email sent', { status: 200 })
  } catch (err) {
    console.error('Edge function error:', err)
    return new Response('Internal error', { status: 500 })
  }
})

// ── Email template ─────────────────────────────────────────────────────────────

function buildEmail(firstName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the SupportCard waitlist!</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #F0F6FF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .wrapper { max-width: 580px; margin: 40px auto; padding: 0 16px 40px; }
    .card { background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(75,159,216,0.10); }
    .header { background: linear-gradient(135deg, #4B9FD8 0%, #3A8BC4 100%); padding: 36px 40px 32px; text-align: center; }
    .logo { font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
    .logo span { opacity: 0.85; }
    .body { padding: 40px 40px 32px; }
    .emoji { font-size: 40px; display: block; text-align: center; margin-bottom: 16px; }
    h1 { font-size: 28px; font-weight: 800; color: #001F3F; text-align: center; margin-bottom: 8px; letter-spacing: -0.5px; }
    .subtitle { font-size: 15px; color: #4B9FD8; text-align: center; font-weight: 600; margin-bottom: 28px; }
    .divider { height: 1px; background: #E8F4FB; margin: 24px 0; }
    p { font-size: 15px; color: #4A4A4A; line-height: 1.75; margin-bottom: 16px; }
    .checklist { list-style: none; margin: 20px 0 24px; }
    .checklist li { font-size: 15px; color: #001F3F; font-weight: 500; padding: 10px 14px; background: #F0F9FF; border-radius: 8px; margin-bottom: 8px; border-left: 3px solid #4B9FD8; }
    .cta-wrap { text-align: center; margin: 32px 0 8px; }
    .cta { display: inline-block; background: linear-gradient(135deg, #4B9FD8, #3A8BC4); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; padding: 14px 32px; border-radius: 50px; letter-spacing: 0.3px; box-shadow: 0 4px 16px rgba(75,159,216,0.35); }
    .footer { background: #F7FAFD; border-top: 1px solid #E8F4FB; padding: 24px 40px; text-align: center; }
    .footer p { font-size: 12px; color: #aaa; line-height: 1.7; margin: 0; }
    .footer a { color: #4B9FD8; text-decoration: none; }
    @media (max-width: 480px) {
      .body { padding: 28px 24px 24px; }
      h1 { font-size: 24px; }
      .footer { padding: 20px 24px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">

      <!-- Header -->
      <div class="header">
        <div class="logo">Support<span>Card</span></div>
      </div>

      <!-- Body -->
      <div class="body">
        <span class="emoji">🎉</span>
        <h1>You're in, ${firstName}!</h1>
        <p class="subtitle">Welcome to the SupportCard waitlist</p>

        <p>Thank you for joining the SupportCard waitlist. You're among the first to know when we launch.</p>

        <p>SupportCard is building the smarter way for co-parents to manage child-related finances together — with clarity, transparency, and tools that actually work.</p>

        <div class="divider"></div>

        <p><strong>Here's what happens next:</strong></p>
        <ul class="checklist">
          <li>✅ &nbsp;You'll be first to know when we launch</li>
          <li>✅ &nbsp;Early access before the public</li>
          <li>✅ &nbsp;Founder pricing locked in for you</li>
        </ul>

        <p>We're working hard to get SupportCard ready. We'll be in touch soon.</p>

        <div class="cta-wrap">
          <a href="https://supportcard.co.za" class="cta">Visit supportcard.co.za</a>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>
          © 2026 SupportCard &nbsp;|&nbsp; South Sphere Tech (Pty) Ltd<br/>
          You're receiving this because you joined our waitlist.<br/>
          <a href="https://supportcard.co.za">supportcard.co.za</a>
        </p>
      </div>

    </div>
  </div>
</body>
</html>`
}
