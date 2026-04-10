'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function NavbarClient() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? { email: session.user.email! } : null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { email: session.user.email! } : null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const cikis = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl tracking-tight">
          Bilanco<span className="text-brand-400">Skor</span>
        </Link>
        <div className="flex items-center gap-4">
          {!loading && (
            user ? (
              <>
                <span className="text-sm text-gray-400">{user.email}</span>
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition">Hesabım</Link>
                <Link href="/analyze" className="btn-primary text-sm py-2 px-4">Yeni Rapor</Link>
                <button onClick={cikis} className="text-sm text-gray-500 hover:text-gray-800 transition">Çıkış</button>
              </>
            ) : (
              <>
                <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-800 transition">Blog</Link>
                <Link href="/sss" className="text-sm text-gray-500 hover:text-gray-800 transition">SSS</Link>
                <Link href="/hakkimizda" className="text-sm text-gray-500 hover:text-gray-800 transition">Hakkımızda</Link>
                <a href="mailto:destek@bilancoskor.com" className="text-sm text-gray-500 hover:text-gray-800 transition">İletişim</a>
                <a href="/#ornek-rapor" className="text-sm font-bold text-white bg-brand-400 hover:bg-brand-500 transition rounded-xl px-4 py-2">Örnek Rapor</a>
                <Link href="/auth?tab=login" className="text-sm text-gray-600 hover:text-gray-900 transition border border-gray-200 rounded-xl px-4 py-2">Giriş yap</Link>
                <Link href="/auth?tab=register" className="btn-primary text-sm py-2 px-4">Üye ol</Link>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  )
}
