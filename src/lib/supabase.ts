import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

const memStore: Record<string, string> = {}
const safeStorage = {
  getItem: (k: string) => { try { return sessionStorage.getItem(k) } catch { return memStore[k] ?? null } },
  setItem: (k: string, v: string) => { try { sessionStorage.setItem(k, v) } catch { memStore[k] = v } },
  removeItem: (k: string) => { try { sessionStorage.removeItem(k) } catch { delete memStore[k] } },
}

export const supabase = createClient(url, key, {
  auth: { storage: safeStorage, persistSession: true },
})
