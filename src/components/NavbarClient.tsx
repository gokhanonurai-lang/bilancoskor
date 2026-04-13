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
  const [drawerOpen, setDrawerOpen] = useState(false)

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
    <>
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

          {/* SOL: Sandviç (sadece mobil) + Logo */}
          <div className="flex items-center gap-3">
            {!loading && !user && (
              <button
                className="md:hidden p-1.5 rounded hover:bg-gray-100 transition"
                onClick={() => setDrawerOpen(true)}
                aria-label="Menüyü aç"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            )}
            <Link href="/" className="font-semibold text-base tracking-tight">
              Bilanco<span className="text-brand-400">Skor</span>
            </Link>
          </div>

          {/* ORTA: Masaüstü linkleri (sadece giriş yapmamış) */}
          {!loading && !user && (
            <div className="hidden md:flex items-center gap-6">
              <a href="/#ornek-rapor" className="text-sm text-gray-600 hover:text-gray-900 transition">Örnek Rapor</a>
              <Link href="/hakkimizda" className="text-sm text-gray-600 hover:text-gray-900 transition">Hakkımızda</Link>
              <Link href="/sss" className="text-sm text-gray-600 hover:text-gray-900 transition">SSS</Link>
              <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition">Blog</Link>
              <a href="mailto:destek@bilancoskor.com" className="text-sm text-gray-600 hover:text-gray-900 transition">İletişim</a>
            </div>
          )}

          {/* SAĞ: Auth */}
          <div className="flex items-center gap-2">
            {!loading && (
              user ? (
                <>
                  <span className="text-sm text-gray-400 hidden md:inline">{user.email}</span>
                  <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition hidden md:inline">Hesabım</Link>
                  <Link href="/analyze" className="btn-primary text-sm py-2 px-4">Yeni Rapor</Link>
                  <button onClick={cikis} className="text-sm text-gray-500 hover:text-gray-800 transition hidden md:inline">Çıkış</button>
                </>
              ) : (
                <>
                  <Link href="/auth?tab=login" className="text-sm text-gray-600 hover:text-gray-900 transition hidden md:inline">Giriş yap</Link>
                  <Link href="/auth?tab=register" className="btn-primary text-sm py-2 px-4">Üye ol</Link>
                </>
              )
            )}
          </div>

        </div>
      </nav>

      {/* DRAWER — sadece giriş yapmamış mobil kullanıcı */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="absolute top-0 left-0 h-full w-72 bg-white shadow-xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-14 flex items-center justify-between px-5 border-b border-gray-100">
              <Link href="/" className="font-semibold text-base tracking-tight" onClick={() => setDrawerOpen(false)}>
                Bilanco<span className="text-brand-400">Skor</span>
              </Link>
              <button
                className="p-1.5 rounded hover:bg-gray-100 transition"
                onClick={() => setDrawerOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col py-4 px-3 gap-1">
              {[
                { href: '/#ornek-rapor', label: 'Örnek Rapor' },
                { href: '/hakkimizda', label: 'Hakkımızda' },
                { href: '/sss', label: 'SSS' },
                { href: '/blog', label: 'Blog' },
                { href: '/iletisim', label: 'İletişim' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setDrawerOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="mt-auto px-4 py-5 border-t border-gray-100">
              <Link
                href="/auth?tab=login"
                className="block w-full text-center text-sm text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setDrawerOpen(false)}
              >
                Giriş yap
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
