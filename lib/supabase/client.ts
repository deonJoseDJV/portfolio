import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

// Returns a Supabase client, or null if the env vars aren't configured.
// Callers should guard on null so a missing config degrades gracefully
// instead of throwing during render.
export const createClient = (): SupabaseClient | null => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    if (typeof window !== 'undefined') {
      console.warn(
        'Supabase env vars missing — guestbook & booking features are disabled.'
      )
    }
    return null
  }

  return createBrowserClient(url, anonKey)
}
