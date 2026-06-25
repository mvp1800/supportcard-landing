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
        subject: "You're on the SupportCard waitlist",
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
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>You're on the SupportCard waitlist</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" type="text/css"/>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:#EEF5FF;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EEF5FF;">
  <tr><td align="center" style="padding:36px 16px 52px;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">


      <!-- ─────────────────────────────────────────────── -->
      <!-- HEADER — navy, logo left-aligned               -->
      <!-- ─────────────────────────────────────────────── -->
      <tr>
        <td style="background:#001F3F;border-radius:16px 16px 0 0;padding:26px 40px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <!-- Icon square (matches Logo.tsx: blue square + white heart) -->
              <td style="padding-right:11px;vertical-align:middle;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="width:32px;height:32px;background:#4B9FD8;border-radius:8px;text-align:center;vertical-align:middle;">
                      <svg viewBox="0 0 24 24" fill="white" width="16" height="16" style="display:block;margin:0 auto;">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </td>
                  </tr>
                </table>
              </td>
              <!-- Wordmark -->
              <td style="vertical-align:middle;">
                <span style="font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:17px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">SupportCard</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- 3 px brand accent line -->
      <tr><td style="background:#4B9FD8;height:3px;font-size:0;line-height:0;">&zwnj;</td></tr>


      <!-- ─────────────────────────────────────────────── -->
      <!-- BODY — white card                              -->
      <!-- ─────────────────────────────────────────────── -->
      <tr>
        <td style="background:#ffffff;padding:44px 44px 40px;">

          <!-- Eyebrow badge -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
            <tr>
              <td style="background:rgba(75,159,216,0.07);border:1px solid rgba(75,159,216,0.22);border-radius:50px;padding:5px 14px;">
                <span style="font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:10px;font-weight:700;color:#4B9FD8;letter-spacing:1.2px;text-transform:uppercase;">Waitlist Confirmed</span>
              </td>
            </tr>
          </table>

          <!-- Headline -->
          <h1 style="margin:0 0 8px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:27px;font-weight:800;color:#001F3F;letter-spacing:-0.5px;line-height:1.25;">
            You're on the list, ${firstName}.
          </h1>

          <!-- Subline -->
          <p style="margin:0 0 26px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:15px;font-weight:500;color:#4B9FD8;line-height:1.5;">
            Welcome to SupportCard.
          </p>

          <!-- Body text -->
          <p style="margin:0 0 36px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:15px;color:#4A4A4A;line-height:1.8;">
            Thank you for joining us. You're among a small group of early supporters who will shape SupportCard from the beginning — a smarter way for co-parents to manage finances, schedules, and shared responsibilities, together.
          </p>


          <!-- ── "What's next" divider ── -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
            <tr>
              <td style="border-top:1px solid rgba(75,159,216,0.14);font-size:0;line-height:0;">&zwnj;</td>
              <td style="padding:0 16px;white-space:nowrap;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:10px;font-weight:700;color:#c0c8d4;letter-spacing:1.5px;text-transform:uppercase;vertical-align:middle;">What&#x2019;s next</td>
              <td style="border-top:1px solid rgba(75,159,216,0.14);font-size:0;line-height:0;">&zwnj;</td>
            </tr>
          </table>


          <!-- ── Feature row 1 — Bell (first to know) ── -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
            <tr>
              <td style="width:44px;padding-right:16px;vertical-align:top;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="width:44px;height:44px;background:rgba(75,159,216,0.08);border:1px solid rgba(75,159,216,0.16);border-radius:12px;text-align:center;vertical-align:middle;">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#4B9FD8" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" style="display:block;margin:0 auto;">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                      </svg>
                    </td>
                  </tr>
                </table>
              </td>
              <td style="vertical-align:top;padding-top:2px;">
                <p style="margin:0 0 3px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;font-weight:700;color:#001F3F;line-height:1.3;">First to know</p>
                <p style="margin:0 0 10px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;color:#888;line-height:1.6;">You'll hear from us the moment SupportCard goes live — before anyone else.</p>
                <!-- Accent underline (mirrors the 28px bar on website feature cards) -->
                <div style="width:28px;height:3px;background:#4B9FD8;border-radius:2px;opacity:0.35;"></div>
              </td>
            </tr>
          </table>

          <!-- ── Feature row 2 — Zap (early access) ── -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
            <tr>
              <td style="width:44px;padding-right:16px;vertical-align:top;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="width:44px;height:44px;background:rgba(75,159,216,0.08);border:1px solid rgba(75,159,216,0.16);border-radius:12px;text-align:center;vertical-align:middle;">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#4B9FD8" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" style="display:block;margin:0 auto;">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                    </td>
                  </tr>
                </table>
              </td>
              <td style="vertical-align:top;padding-top:2px;">
                <p style="margin:0 0 3px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;font-weight:700;color:#001F3F;line-height:1.3;">Early access</p>
                <p style="margin:0 0 10px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;color:#888;line-height:1.6;">Full access to SupportCard before it opens to the public.</p>
                <div style="width:28px;height:3px;background:#4B9FD8;border-radius:2px;opacity:0.35;"></div>
              </td>
            </tr>
          </table>

          <!-- ── Feature row 3 — Tag (founder pricing) ── -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:40px;">
            <tr>
              <td style="width:44px;padding-right:16px;vertical-align:top;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="width:44px;height:44px;background:rgba(75,159,216,0.08);border:1px solid rgba(75,159,216,0.16);border-radius:12px;text-align:center;vertical-align:middle;">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#4B9FD8" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" style="display:block;margin:0 auto;">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                        <line x1="7" y1="7" x2="7.01" y2="7"/>
                      </svg>
                    </td>
                  </tr>
                </table>
              </td>
              <td style="vertical-align:top;padding-top:2px;">
                <p style="margin:0 0 3px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;font-weight:700;color:#001F3F;line-height:1.3;">Founder pricing</p>
                <p style="margin:0 0 10px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;color:#888;line-height:1.6;">Exclusive rates reserved for our earliest supporters, locked in permanently.</p>
                <div style="width:28px;height:3px;background:#4B9FD8;border-radius:2px;opacity:0.35;"></div>
              </td>
            </tr>
          </table>


          <!-- ── Closing ── -->
          <div style="height:1px;background:rgba(75,159,216,0.12);margin-bottom:30px;"></div>

          <p style="margin:0 0 4px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:15px;color:#4A4A4A;line-height:1.75;">
            We can't wait to show you what we've built.
          </p>
          <p style="margin:0 0 36px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;color:#bbb;">
            &#8212; The SupportCard Team
          </p>

          <!-- CTA button -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <!--[if mso]>
              <td style="border-radius:50px;background:#3A8BC4;">
              <![endif]-->
              <!--[if !mso]><!-->
              <td style="border-radius:50px;background:linear-gradient(135deg,#3A8BC4 0%,#4B9FD8 100%);box-shadow:0 4px 18px rgba(75,159,216,0.32);">
              <!--<![endif]-->
                <a href="https://supportcard.co.za"
                   style="display:inline-block;padding:13px 30px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.2px;border-radius:50px;">
                  Visit supportcard.co.za
                </a>
              </td>
            </tr>
          </table>

        </td>
      </tr>


      <!-- ─────────────────────────────────────────────── -->
      <!-- FOOTER                                         -->
      <!-- ─────────────────────────────────────────────── -->
      <tr>
        <td style="background:#F8FAFB;border-top:1px solid rgba(75,159,216,0.1);border-radius:0 0 16px 16px;padding:22px 44px;text-align:center;">
          <p style="margin:0 0 5px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;color:#c0c8d4;line-height:1.7;">
            &copy; 2026 SupportCard &nbsp;&middot;&nbsp; South Sphere Tech (Pty) Ltd
          </p>
          <p style="margin:0 0 8px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;color:#c0c8d4;line-height:1.7;">
            You received this because you joined our waitlist.
          </p>
          <a href="https://supportcard.co.za" style="font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;font-weight:600;color:#4B9FD8;text-decoration:none;">
            supportcard.co.za
          </a>
        </td>
      </tr>


    </table>
  </td></tr>
</table>

</body>
</html>`
}
