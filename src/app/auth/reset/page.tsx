'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ymjwtntlfioexudvacsj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltand0bnRsZmlvZXh1ZHZhY3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzODY5NTQsImV4cCI6MjA5MDk2Mjk1NH0.xW8XVjr0q7LQ_UStIf0s8q8MoYOsnJyg5ALkDAbT-CI'
)

export default function ResetPage() {
  const router = useRouter()
  const [sifre, setSifre] = useState('')
  const [sifre2, setSifre2] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (sifre !== sifre2) { setError('Şifreler eşleşmiyor.'); return }
    if (sifre.length < 6) { setError('Şifre en az 6 karakter olmalı.'); return }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.updateUser({ password: sifre })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSuccess(true)
    setTimeout(() => router.push('/dashboard'), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <Link href="/" className="font-semibold text-xl tracking-tight">Bilanco<span className="text-brand-400">Skor</span></Link>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="card">
            {success ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Şifre güncellendi</h2>
                <p className="text-sm text-gray-500">Hesabınıza yönlendiriliyorsunuz...</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h1 className="text-xl font-semibold text-gray-900 mb-1">Yeni şifre belirle</h1>
                  <p className="text-sm text-gray-500">Hesabınız için yeni bir şifre oluşturun.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="label">Yeni şifre</label>
                    <input type="password" className="input" placeholder="En az 6 karakter" value={sifre} onChange={e => setSifre(e.target.value)} required minLength={6} />
                  </div>
                  <div>
                    <label className="label">Şifre tekrar</label>
                    <input type="password" className="input" placeholder="Şifreyi tekrar girin" value={sifre2} onChange={e => setSifre2(e.target.value)} required minLength={6} />
                  </div>
                  {error && <div className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</div>}
                  <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
                    {loading ? 'Güncelleniyor...' : 'Şifreyi güncelle'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
