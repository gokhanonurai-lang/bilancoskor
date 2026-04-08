'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ResetPasswordPage() {
  const router = useRouter()
  const [sifre, setSifre] = useState('')
  const [sifre2, setSifre2] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true)
      }
    })
    // URL'de token varsa zaten session kurulmuş olabilir
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sifre !== sifre2) { setError('Şifreler eşleşmiyor.'); return }
    if (sifre.length < 6) { setError('Şifre en az 6 karakter olmalı.'); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: sifre })
    setLoading(false)
    if (error) { setError('Bir hata oluştu. Lütfen tekrar deneyin.') }
    else { setDone(true); setTimeout(() => router.push('/dashboard'), 2000) }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="font-semibold text-2xl tracking-tight mb-1">
            Bilanco<span className="text-brand-400">Skor</span>
          </div>
          <p className="text-sm text-gray-500">Yeni şifrenizi belirleyin</p>
        </div>
        <div className="card">
          {done ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Şifreniz güncellendi!</p>
              <p className="text-xs text-gray-500 mt-1">Hesabınıza yönlendiriliyorsunuz...</p>
            </div>
          ) : !ready ? (
            <div className="text-center py-8">
              <svg className="animate-spin w-6 h-6 mx-auto text-brand-400" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              <p className="text-sm text-gray-500 mt-3">Doğrulanıyor...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Yeni şifre</label>
                <input type="password" className="input" placeholder="En az 6 karakter" value={sifre} onChange={e => setSifre(e.target.value)} required minLength={6} />
              </div>
              <div>
                <label className="label">Yeni şifre (tekrar)</label>
                <input type="password" className="input" placeholder="Şifrenizi tekrar girin" value={sifre2} onChange={e => setSifre2(e.target.value)} required minLength={6} />
              </div>
              {error && <div className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</div>}
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
                {loading ? 'Güncelleniyor...' : 'Şifremi Güncelle'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
