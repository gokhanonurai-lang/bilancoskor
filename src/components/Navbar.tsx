'use client'
import Link from 'next/link'

export default function Navbar({ user }: { user?: { email: string } | null }) {
  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-base tracking-tight">
          Bilanco<span className="text-brand-400">Skor</span>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition">
                Hesabım
              </Link>
              <Link href="/analyze" className="btn-primary text-sm py-2 px-4">
                Yeni Rapor
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth?tab=login" className="text-sm text-gray-600 hover:text-gray-900 transition">
                Giriş yap
              </Link>
              <Link href="/auth?tab=register" className="btn-primary text-sm py-2 px-4">
                Üye ol
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
