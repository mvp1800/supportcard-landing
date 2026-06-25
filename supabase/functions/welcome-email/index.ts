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
</head>
<body style="margin:0;padding:0;background:#EEF5FF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EEF5FF;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;">

        <!-- ═══ HERO HEADER ═══ -->
        <tr><td style="border-radius:20px 20px 0 0;overflow:hidden;background:linear-gradient(135deg,#1A6FFF 0%,#4B9FD8 50%,#2EC4B6 100%);padding:0;">

          <!-- Decorative dot grid overlay -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding:48px 40px 0;text-align:center;position:relative;">

              <!-- Logo pill -->
              <div style="display:inline-block;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.3);border-radius:50px;padding:8px 20px;margin-bottom:32px;">
                <span style="font-size:13px;font-weight:700;color:#fff;letter-spacing:1px;text-transform:uppercase;">SupportCard</span>
              </div>

              <!-- Big confetti emoji -->
              <div style="font-size:64px;line-height:1;margin-bottom:20px;">🎉</div>

              <!-- Hero headline -->
              <h1 style="margin:0 0 10px;font-size:36px;font-weight:900;color:#ffffff;letter-spacing:-1px;line-height:1.1;">
                You're in, ${firstName}!
              </h1>
              <p style="margin:0 0 0;font-size:16px;color:rgba(255,255,255,0.85);font-weight:500;line-height:1.5;">
                Welcome to the SupportCard waitlist
              </p>

            </td></tr>

            <!-- Wave divider -->
            <tr><td style="padding-top:36px;line-height:0;">
              <svg viewBox="0 0 580 48" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;">
                <path d="M0 48 C145 0 435 0 580 48 L580 48 L0 48 Z" fill="#ffffff"/>
              </svg>
            </td></tr>
          </table>
        </td></tr>

        <!-- ═══ BODY CARD ═══ -->
        <tr><td style="background:#ffffff;padding:8px 40px 36px;">

          <!-- Number badge row -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
            <tr>
              <td align="center">
                <div style="display:inline-block;background:linear-gradient(135deg,#EEF5FF,#DCF0FF);border:1px solid #C8E4F8;border-radius:12px;padding:16px 28px;">
                  <span style="font-size:13px;color:#4B9FD8;font-weight:700;letter-spacing:0.5px;">🌟 &nbsp;EARLY SUPPORTER</span>
                </div>
              </td>
            </tr>
          </table>

          <!-- Intro text -->
          <p style="margin:0 0 16px;font-size:15px;color:#4A4A4A;line-height:1.8;">
            Thank you for joining the SupportCard waitlist. You're among the very first to know when we launch — and that means a lot to us.
          </p>
          <p style="margin:0 0 28px;font-size:15px;color:#4A4A4A;line-height:1.8;">
            SupportCard is building the smarter way for co-parents to manage child-related finances together — with clarity, transparency, and tools that actually work.
          </p>

          <!-- Decorative divider with label -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
            <tr>
              <td style="border-top:1px solid #E8F4FB;"></td>
              <td style="padding:0 14px;white-space:nowrap;font-size:11px;font-weight:700;color:#aaa;letter-spacing:1px;text-transform:uppercase;">What happens next</td>
              <td style="border-top:1px solid #E8F4FB;"></td>
            </tr>
          </table>

          <!-- Checklist cards -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
            <tr><td style="padding-bottom:10px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#F0F9FF,#E8F4FB);border-radius:12px;border-left:4px solid #4B9FD8;">
                <tr><td style="padding:14px 18px;">
                  <span style="font-size:18px;">🚀</span>
                  <span style="font-size:14px;font-weight:700;color:#001F3F;margin-left:10px;">First to know when we launch</span>
                  <p style="margin:4px 0 0 32px;font-size:13px;color:#666;line-height:1.5;">You'll get an email the moment we go live — before anyone else.</p>
                </td></tr>
              </table>
            </td></tr>
            <tr><td style="padding-bottom:10px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#F0FFF8,#E6FAF0);border-radius:12px;border-left:4px solid #2ECC71;">
                <tr><td style="padding:14px 18px;">
                  <span style="font-size:18px;">⚡</span>
                  <span style="font-size:14px;font-weight:700;color:#001F3F;margin-left:10px;">Early access before the public</span>
                  <p style="margin:4px 0 0 32px;font-size:13px;color:#666;line-height:1.5;">Get in and explore SupportCard before it opens to everyone.</p>
                </td></tr>
              </table>
            </td></tr>
            <tr><td>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#FFF8F0,#FFF0E0);border-radius:12px;border-left:4px solid #F39C12;">
                <tr><td style="padding:14px 18px;">
                  <span style="font-size:18px;">🔒</span>
                  <span style="font-size:14px;font-weight:700;color:#001F3F;margin-left:10px;">Founder pricing locked in for you</span>
                  <p style="margin:4px 0 0 32px;font-size:13px;color:#666;line-height:1.5;">Special rates reserved exclusively for our earliest supporters.</p>
                </td></tr>
              </table>
            </td></tr>
          </table>

          <!-- Closing note -->
          <p style="margin:0 0 32px;font-size:15px;color:#4A4A4A;line-height:1.8;text-align:center;">
            We're working hard to get SupportCard ready.<br/>
            <strong style="color:#001F3F;">We'll be in touch very soon. 💙</strong>
          </p>

          <!-- CTA button -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td align="center">
              <a href="https://supportcard.co.za"
                 style="display:inline-block;background:linear-gradient(135deg,#1A6FFF,#4B9FD8);color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;padding:16px 40px;border-radius:50px;letter-spacing:0.5px;box-shadow:0 6px 24px rgba(75,159,216,0.4);">
                Visit supportcard.co.za &rarr;
              </a>
            </td></tr>
          </table>

        </td></tr>

        <!-- ═══ STATS STRIP ═══ -->
        <tr><td style="background:linear-gradient(135deg,#001F3F,#003366);padding:24px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="padding:0 12px;border-right:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:22px;font-weight:900;color:#4B9FD8;">100%</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px;letter-spacing:0.5px;">SECURE</div>
              </td>
              <td align="center" style="padding:0 12px;border-right:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:22px;font-weight:900;color:#2EC4B6;">Free</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px;letter-spacing:0.5px;">TO START</div>
              </td>
              <td align="center" style="padding:0 12px;">
                <div style="font-size:22px;font-weight:900;color:#F39C12;">Early</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px;letter-spacing:0.5px;">ACCESS</div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- ═══ FOOTER ═══ -->
        <tr><td style="background:#F7FAFD;border-radius:0 0 20px 20px;padding:24px 40px;text-align:center;border-top:1px solid #E8F4FB;">
          <p style="margin:0 0 8px;font-size:12px;color:#bbb;line-height:1.7;">
            © 2026 SupportCard &nbsp;|&nbsp; South Sphere Tech (Pty) Ltd
          </p>
          <p style="margin:0 0 8px;font-size:12px;color:#bbb;line-height:1.7;">
            You're receiving this because you joined our waitlist.
          </p>
          <a href="https://supportcard.co.za" style="font-size:12px;color:#4B9FD8;text-decoration:none;font-weight:600;">supportcard.co.za</a>
        </td></tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`
}
