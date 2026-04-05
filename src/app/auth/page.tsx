'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'login' | 'register'>('register')
  const [sozlesmeKabul, setSozlesmeKabul] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ ad: '', soyad: '', email: '', sifre: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (tab === 'register') {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.sifre,
          options: { data: { ad: form.ad, soyad: form.soyad } }
        })
        if (error) throw error
        router.push('/analyze')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.sifre,
        })
        if (error) throw error
        router.push('/dashboard')
      }
    } catch (err: any) {
      const msg = err.message || 'Bir hata oluştu'
      if (msg.includes('Invalid login')) setError('E-posta veya şifre hatalı.')
      else if (msg.includes('already registered')) setError('Bu e-posta zaten kayıtlı.')
      else if (msg.includes('Password should be')) setError('Şifre en az 6 karakter olmalı.')
      else setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <Link href="/" className="font-semibold text-xl tracking-tight">
            Fin<span className="text-brand-400">Skor</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-gray-100 p-1 rounded-2xl flex mb-6">
            {(['register', 'login'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all ${
                  tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}>
                {t === 'register' ? 'Üye ol' : 'Giriş yap'}
              </button>
            ))}
          </div>

          <div className="card">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-gray-900 mb-1">
                {tab === 'register' ? 'Hesap oluştur' : 'Tekrar hoş geldiniz'}
              </h1>
              <p className="text-sm text-gray-500">
                {tab === 'register' ? 'Üye olun ve bilanço raporunuzu oluşturun.' : 'Hesabınıza giriş yapın.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Ad</label>
                    <input className="input" placeholder="Ahmet" value={form.ad}
                      onChange={e => setForm(p => ({ ...p, ad: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="label">Soyad</label>
                    <input className="input" placeholder="Yılmaz" value={form.soyad}
                      onChange={e => setForm(p => ({ ...p, soyad: e.target.value }))} required />
                  </div>
                </div>
              )}
              <div>
                <label className="label">E-posta</label>
                <input type="email" className="input" placeholder="ahmet@firma.com" value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
              </div>
              <div>
                <label className="label">Şifre</label>
                <input type="password" className="input" placeholder="En az 6 karakter" value={form.sifre}
                  onChange={e => setForm(p => ({ ...p, sifre: e.target.value }))} required minLength={6} />
              </div>
              {tab === 'register' && (
                <div className="bg-gray-50 rounded-xl p-3">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 flex-shrink-0 accent-brand-400" checked={sozlesmeKabul}
                      onChange={e => setSozlesmeKabul(e.target.checked)} required />
                    <span className="text-xs text-gray-500 leading-relaxed">
                      <a href="/sozlesmeler/kullanici-sozlesmesi" target="_blank" className="text-brand-500 hover:underline">Kullanıcı Sözleşmesi</a>'ni,{' '}
                      <a href="/sozlesmeler/gizlilik-politikasi" target="_blank" className="text-brand-500 hover:underline">Gizlilik Politikası</a>'nı ve{' '}
                      <a href="/sozlesmeler/aydinlatma-metni" target="_blank" className="text-brand-500 hover:underline">KVKK Aydınlatma Metni</a>'ni okudum ve kabul ediyorum.
                    </span>
                  </label>
                </div>
              )}
              {error && (
                <div className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</div>
              )}
              <button type="submit" disabled={loading || (tab === 'register' && !sozlesmeKabul)}
                className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity=".3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Devam ediliyor...
                  </span>
                ) : tab === 'register' ? 'Üye ol ve devam et' : 'Giriş yap'}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                {tab === 'register' ? 'Zaten hesabınız var mı?' : 'Hesabınız yok mu?'}{' '}
                <button onClick={() => setTab(tab === 'register' ? 'login' : 'register')}
                  className="text-brand-400 hover:text-brand-600 font-medium transition">
                  {tab === 'register' ? 'Giriş yap' : 'Üye ol'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
