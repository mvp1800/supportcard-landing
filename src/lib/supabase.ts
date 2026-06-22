import { createClient } from '@supabase/supabase-js'

const url  = import.meta.env.VITE_SUPABASE_URL  as string
const key  = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!url || url.includes('your-project-id')) {
  console.warn('[SupportCard] VITE_SUPABASE_URL is not set — waitlist submissions will fail.')
}

export const supabase = createClient(url, key)

// ── Types ──────────────────────────────────────────────────────────────────────

export interface WaitlistInsert {
  name:   string
  email:  string
  source?: string
}

export type WaitlistResult =
  | { ok: true }
  | { ok: false; duplicate: boolean; message: string }

// ── Helper ─────────────────────────────────────────────────────────────────────

export async function joinWaitlist(payload: WaitlistInsert): Promise<WaitlistResult> {
  const { error } = await supabase
    .from('waitlist')
    .insert({
      name:   payload.name.trim(),
      email:  payload.email.trim().toLowerCase(),
      source: payload.source ?? 'landing_page',
    })

  if (!error) return { ok: true }

  // Postgres unique-violation code
  const isDuplicate = error.code === '23505'
  return {
    ok:        false,
    duplicate: isDuplicate,
    message:   isDuplicate
      ? "You're already on the list!"
      : 'Something went wrong — please try again.',
  }
}
