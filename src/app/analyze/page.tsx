'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { naceKodlari } from '@/data/naceKodlari'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ymjwtntlfioexudvacsj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltand0bnRsZmlvZXh1ZHZhY3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzODY5NTQsImV4cCI6MjA5MDk2Mjk1NH0.xW8XVjr0q7LQ_UStIf0s8q8MoYOsnJyg5ALkDAbT-CI'
)

const API_URL = 'https://positive-adventure-production-f3cf.up.railway.app'

type Step = 'upload' | 'preview' | 'payment' | 'processing'

type AnalizSonuc = {
  skor: number
  harf: string
  kredi_band: string
  kredi_limit_aciklama: string
  teminat_aciklama: string
  firma_ozet: any
  rasyolar: any[]
  kirmizi_bayraklar: any[]
  aksiyon_listesi: any[]
  likidite_puan: number
  sermaye_puan: number
  karlilik_puan: number
  faaliyet_puan: number
  borc_puan: number
}

const BANT_RENK: Record<string, string> = {
  AAA: 'text-brand-400', AA: 'text-brand-400', A: 'text-brand-400',
  BBB: 'text-amber-500', BB: 'text-amber-500',
  B: 'text-red-400', D: 'text-red-500',
}

export default function AnalyzePage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('upload')
  const [naceKodu, setNaceKodu] = useState('')
  const [naceSearch, setNaceSearch] = useState('')
  const [naceOpen, setNaceOpen] = useState(false)
  const naceRef = useRef<HTMLDivElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const loadingTimerRef = useRef<any>(null)
  const [cardForm, setCardForm] = useState({ ad: '', no: '', tarih: '', cvv: '' })
  const [error, setError] = useState('')
  const [sonuc, setSonuc] = useState<AnalizSonuc | null>(null)
  const [user, setUser] = useState<any>(null)
  const [rapor_fiyati, setRaporFiyati] = useState<number | null>(null)

  useEffect(() => {
    supabase.from('settings').select('value').eq('key', 'rapor_fiyati').single()
      .then(({ data }) => { if (data) setRaporFiyati(parseInt(data.value) || 600) })
  }, [])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/auth'); return }
      setUser(session.user)
      // Ana sayfadan gelen ön-analiz sonucunu oku
      const cached = sessionStorage.getItem('analiz_sonucu_cached')
      if (cached) {
        try {
          const { data, sektor: s } = JSON.parse(cached)
          sessionStorage.removeItem('analiz_sonucu_cached')
          setSonuc(data)
          if (s) setNaceKodu(s)
          setStep('preview')
        } catch {}
      }
    })
  }, [router])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (naceRef.current && !naceRef.current.contains(e.target as Node)) {
        setNaceOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleFile = (f: File) => {
    if (f.size > 10 * 1024 * 1024) {
      setError("Dosya boyutu 10MB sinirini asiyor.")
      return
    }
    if (!f.name.endsWith('.xlsx') && !f.name.endsWith('.xls')) {
      setError('Lütfen Excel (.xlsx) dosyası yükleyin.')
      return
    }
    setError('')
    setFile(f)
  }

  const handleAnaliz = async () => {
    if (!file) return
    setLoading(true)
    setLoadingStep(0)
    setError('')
    const stepTimes = [1500, 3000, 5000, 10000]
    stepTimes.forEach((t, i) => {
      loadingTimerRef.current = setTimeout(() => setLoadingStep(i + 1), t)
    })
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('sektor', naceKodu || 'ticaret')
      formData.append('sirket_adi', file.name.replace('.xlsx', '').replace('.xls', ''))

      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token || ''
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 600_000)
      let res: Response
      try {
        res = await fetch(`${API_URL}/analyze`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
          signal: controller.signal,
        })
      } finally {
        clearTimeout(timeoutId)
      }

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || 'Analiz sırasında hata oluştu.')
      }

      const data = await res.json()
      setSonuc(data)
      setStep('preview')
    } catch (err: any) {
      setError(err.message || 'API bağlantı hatası. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
      setLoadingStep(0)
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current)
    }
  }

  const handleOdeme = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!sonuc || !user) return
    setStep('processing')

    try {
      // Raporu Supabase'e kaydet
      const { data: settingsRow } = await supabase.from("settings").select("value").eq("key", "rapor_erisim_gun").single()
      const erisimGun = parseInt(settingsRow?.value || "3")
      const expires = new Date()
      expires.setDate(expires.getDate() + erisimGun)

      const { data: rapor, error } = await supabase.from('reports').insert({
        id: sonuc.rapor_id,
        user_id: user.id,
        firma_adi: sonuc.firma_ozet?.sirket_adi || 'Rapor',
        sektor: naceKodu || 'ticaret',
        skor: sonuc.skor,
        harf: sonuc.harf,
        rapor_json: sonuc,
        expires_at: expires.toISOString(),
      }).select().single()

      if (error) throw error

      // Ödeme kaydı — geçici olarak devre dışı
      // await supabase.from('payments').insert({
      //   user_id: user.id,
      //   report_id: rapor.id,
      //   tutar: rapor_fiyati || 600,
      //   durum: 'tamamlandi',
      // })

      router.push(`/report/${rapor.id}`)
    } catch (err: any) {
      setError('Kayıt hatası: ' + err.message)
      setStep('preview')
    }
  }

  const LOADING_STEPS = [
    'Mizan dosyası okunuyor...',
    'Finansal rasyolar hesaplanıyor...',
    'Kredi skoru belirleniyor...',
    'Yönetici özeti yazılıyor...',
    'Rapor hazırlanıyor...',
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 w-full max-w-sm mx-4">
            <div className="flex flex-col items-center mb-8">
              <svg className="animate-spin w-10 h-10 text-brand-400 mb-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              <div className="text-base font-semibold text-gray-900">Rapor Hazırlanıyor</div>
              <div className="text-xs text-gray-400 mt-1">Bu işlem genellikle 2–4 dakika sürer. Sayfayı kapatmayın, raporunuz hazırlanıyor.</div>
            </div>
            <div className="space-y-3">
              {LOADING_STEPS.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  {loadingStep > i ? (
                    <div className="w-5 h-5 rounded-full bg-brand-400 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                  ) : loadingStep === i ? (
                    <div className="w-5 h-5 rounded-full border-2 border-brand-400 flex-shrink-0 animate-pulse"/>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-200 flex-shrink-0"/>
                  )}
                  <span className={`text-sm ${loadingStep > i ? 'text-brand-600 font-medium' : loadingStep === i ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Adım göstergesi */}
        <div className="flex items-center gap-2 mb-10">
          {[{key:'upload',label:'Mizan yükle'},{key:'preview',label:'Ön izleme'},{key:'payment',label:'Ödeme'}].map((s, i) => {
            const steps = ['upload','preview','payment','processing']
            const current = steps.indexOf(step)
            const idx = steps.indexOf(s.key)
            const done = current > idx
            const active = current === idx
            return (
              <div key={s.key} className="flex items-center gap-2 flex-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 transition-colors ${done?'bg-brand-400 text-white':active?'bg-brand-400 text-white':'bg-gray-200 text-gray-500'}`}>
                  {done ? <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg> : i+1}
                </div>
                <span className={`text-xs font-medium ${active?'text-gray-900':done?'text-brand-400':'text-gray-400'}`}>{s.label}</span>
                {i < 2 && <div className={`flex-1 h-px ${done?'bg-brand-400':'bg-gray-200'} ml-1`}/>}
              </div>
            )
          })}
        </div>

        {/* ADIM 1: UPLOAD */}
        {step === 'upload' && (
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Mizanınızı yükleyin</h2>
            <p className="text-sm text-gray-500 mb-6">Excel formatındaki mizanınızı yükleyin. Analiz otomatik yapılacaktır.</p>

            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${dragging?'border-brand-400 bg-brand-50':file?'border-brand-400 bg-brand-50':'border-gray-200 hover:border-gray-300 bg-gray-50'}`}
            >
              <input ref={inputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}/>
              {file ? (
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{file.name}</div>
                  <div className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB · Excel</div>
                  <button onClick={e => { e.stopPropagation(); setFile(null) }} className="text-xs text-red-400 hover:text-red-500 mt-2 transition">Kaldır</button>
                </div>
              ) : (
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Sürükleyip bırakın</div>
                  <div className="text-xs text-gray-400">veya tıklayarak dosya seçin · Excel (.xlsx, .xls)</div>
                </div>
              )}
            </div>

            <div className="mt-5" ref={naceRef}>
              <label className="label">Sektör / NACE Kodu</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNaceOpen(o => !o)}
                  className="w-full text-sm px-3 py-3 rounded-xl border border-gray-200 text-left flex items-center justify-between gap-2 hover:border-gray-300 transition"
                >
                  <span className={naceKodu ? 'text-gray-700' : 'text-gray-400'}>
                    {naceKodu
                      ? `${naceKodu} — ${naceKodlari.find(n => n.kod === naceKodu)?.tanim ?? ''}`
                      : 'NACE kodu seçin'}
                  </span>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {naceOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    <div className="p-2 border-b border-gray-100">
                      <input
                        autoFocus
                        type="text"
                        value={naceSearch}
                        onChange={e => setNaceSearch(e.target.value)}
                        placeholder="Kod veya faaliyet adı ara…"
                        className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-brand-400"
                      />
                    </div>
                    <ul className="max-h-52 overflow-y-auto">
                      <li>
                        <button type="button" onClick={() => { setNaceKodu(''); setNaceSearch(''); setNaceOpen(false) }}
                          className="w-full text-left text-sm px-3 py-2.5 text-gray-400 hover:bg-gray-50">
                          — Seçim yok (genel)
                        </button>
                      </li>
                      {naceKodlari
                        .filter(n => !naceSearch || n.kod.includes(naceSearch) || n.tanim.toLowerCase().includes(naceSearch.toLowerCase()))
                        .slice(0, 80)
                        .map(n => (
                          <li key={n.kod}>
                            <button type="button" onClick={() => { setNaceKodu(n.kod); setNaceSearch(''); setNaceOpen(false) }}
                              className={`w-full text-left text-sm px-3 py-2.5 hover:bg-brand-50 ${naceKodu === n.kod ? 'bg-brand-50 text-brand-600' : 'text-gray-600'}`}>
                              <span className="font-mono text-xs text-gray-400 mr-2">{n.kod}</span>{n.tanim}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2 mt-5 p-4 bg-gray-50 rounded-xl">
              <div className="w-4 h-4 rounded-full bg-brand-400 flex-shrink-0 mt-0.5"/>
              <p className="text-xs text-gray-500 leading-relaxed">Mizanınız yalnızca analiz süresince kullanılır. İşlem tamamlandığında sunucularımızdan kalıcı olarak silinir.</p>
            </div>

            {error && <div className="mt-3 text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</div>}

            <button onClick={handleAnaliz} disabled={!file || !naceKodu || loading} className="btn-primary w-full mt-5 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity=".3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>
                  Analiz yapılıyor...
                </span>
              ) : 'Analiz et'}
            </button>
          </div>
        )}

        {/* ADIM 2: ÖN İZLEME — GERÇEK VERİ */}
        {step === 'preview' && sonuc && (
          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Bilanço skoru hazır</h2>
                <span className="text-xs bg-brand-50 text-brand-600 px-2.5 py-1 rounded-lg font-medium">Ön izleme</span>
              </div>

              {/* Skor */}
              <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl mb-5">
                <div className="w-20 h-20 rounded-full border-[3px] border-brand-400 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-semibold text-brand-400 leading-none">{sonuc.skor}</span>
                  <span className={`text-sm font-medium ${BANT_RENK[sonuc.harf] || 'text-gray-400'}`}>{sonuc.harf}</span>
                </div>
                <div>
                  <div className="text-base font-semibold text-gray-900 mb-1">{sonuc.kredi_band}</div>
                  <div className="text-sm text-gray-500 mb-1">{sonuc.teminat_aciklama}</div>
                  <div className="text-sm text-brand-400 font-medium">{sonuc.kredi_limit_aciklama}</div>
                </div>
              </div>

              {/* Kategori puanları */}
              <div className="grid grid-cols-5 gap-2 mb-5 text-center">
                {[
                  {k:'Likidite', p: sonuc.likidite_puan, m:22},
                  {k:'Sermaye', p: sonuc.sermaye_puan, m:24},
                  {k:'Kârlılık', p: sonuc.karlilik_puan, m:26},
                  {k:'Faaliyet', p: sonuc.faaliyet_puan, m:18},
                  {k:'Borç öd.', p: sonuc.borc_puan, m:16},
                ].map(x => (
                  <div key={x.k} className="bg-gray-50 rounded-xl p-2.5">
                    <div className="text-xs text-gray-400 mb-1">{x.k}</div>
                    <div className="text-sm font-semibold text-gray-900">{x.p}</div>
                    <div className="text-xs text-gray-400">/{x.m}</div>
                  </div>
                ))}
              </div>

              {/* Kırmızı bayraklar */}
              {sonuc.kirmizi_bayraklar.length > 0 && (
                <div className="mb-4 space-y-2">
                  {sonuc.kirmizi_bayraklar.map((b: any, i: number) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-red-50 rounded-xl">
                      <div className="w-3.5 h-3.5 rounded-full bg-red-400 flex-shrink-0 mt-0.5"/>
                      <span className="text-xs text-red-600">{b.mesaj}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Kilitli içerik */}
              <div className="space-y-2 mb-5">
                <div className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Tam rapor içeriği (kilitli)</div>
                {['19 rasyo analizi + sektör karşılaştırması','Senaryo motoru — hangi aksiyon kaç puan katar','Kredi limit tahmini ve teminat detayı','Banka görüşme soruları ve hazır cevaplar','Aksiyon planı ve zaman çizelgesi'].map(item => (
                  <div key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span className="text-xs text-gray-400">{item}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => handleOdeme()} className="btn-primary w-full py-3.5">Tam raporu al</button>
              <p className="text-center text-xs text-brand-500 font-medium mt-2">🎉 İlk raporunuz ücretsiz</p>
              <button onClick={() => setStep('upload')} className="btn-outline w-full mt-2 py-3">Geri dön</button>
            </div>
          </div>
        )}

        {/* ADIM 3: ÖDEME */}
        {step === 'payment' && (
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Ödeme bilgileri</h2>
            <p className="text-sm text-gray-500 mb-6">Güvenli ödeme. Kartınız 256-bit SSL ile korunur.</p>

            {/* Sipariş özeti */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">BilancoSkor Raporu</div>
                <div className="text-xs text-gray-500">Tek seferlik · PDF çıktı · 3 gün erişim</div>
              </div>
              <div className="text-lg font-semibold text-gray-900">{rapor_fiyati ? rapor_fiyati + " ₺" : "..."}</div>
            </div>

            <form onSubmit={handleOdeme} className="space-y-4">
              {/* Ad Soyad */}
              <div>
                <label className="label">Ad Soyad</label>
                <input
                  className="input"
                  placeholder="AHMET YILMAZ"
                  style={{ textTransform: 'uppercase' }}
                  value={cardForm.ad}
                  onChange={e => setCardForm(p => ({ ...p, ad: e.target.value.toUpperCase() }))}
                  required
                />
              </div>

              {/* Kart numarası */}
              <div>
                <label className="label">Kart numarası</label>
                <div className="relative">
                  <input
                    className="input font-mono tracking-widest pr-12"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    value={cardForm.no}
                    onChange={e => {
                      const v = e.target.value.replace(/\D/g, '').slice(0, 16)
                      const fmt = v.replace(/(.{4})/g, '$1 ').trim()
                      setCardForm(p => ({ ...p, no: fmt }))
                    }}
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    <div className="w-6 h-4 bg-red-500 rounded-sm opacity-80"/>
                    <div className="w-6 h-4 bg-amber-400 rounded-sm opacity-80 -ml-3"/>
                  </div>
                </div>
              </div>

              {/* Son kullanma + CVV */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Son kullanma tarihi</label>
                  <input
                    className="input"
                    placeholder="AA/YY"
                    maxLength={5}
                    value={cardForm.tarih}
                    onChange={e => {
                      const v = e.target.value.replace(/\D/g, '').slice(0, 4)
                      const fmt = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v
                      setCardForm(p => ({ ...p, tarih: fmt }))
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="label">CVV</label>
                  <div className="relative">
                    <input
                      className="input pr-10"
                      placeholder="•••"
                      maxLength={4}
                      type="password"
                      value={cardForm.cvv}
                      onChange={e => setCardForm(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      required
                    />
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                </div>
              </div>

              {/* Güvenlik notu */}
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span className="text-xs text-gray-500">256-bit SSL şifrelemeli güvenli ödeme · iyzico altyapısı</span>
              </div>

              <div className="bg-gray-50 rounded-xl p-3">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 flex-shrink-0 accent-brand-400" required />
                  <span className="text-xs text-gray-500 leading-relaxed">
                    <a href="/sozlesmeler/mesafeli-satis" target="_blank" className="text-brand-500 hover:underline">Mesafeli Satış Sözleşmesi</a>'ni okudum ve kabul ediyorum. Dijital içeriğin ifasına başlanmasıyla cayma hakkımın sona ereceğini anlıyorum.
                  </span>
                </label>
              </div>

              {error && <div className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</div>}

              <button type="submit" className="btn-primary w-full py-3.5 text-base font-semibold">
                {rapor_fiyati ? rapor_fiyati + " ₺" : "..."} öde ve raporu indir
              </button>
            </form>

            <button onClick={() => setStep('preview')} className="btn-outline w-full mt-3 py-3">Geri dön</button>
          </div>
        )}

        {/* ADIM 4: İŞLENİYOR */}
        {step === 'processing' && (
          <div className="card text-center py-12">
            <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-5">
              <svg className="animate-spin w-8 h-8" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#E1F5EE" strokeWidth="3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Rapor kaydediliyor</h2>
            <p className="text-sm text-gray-500">Raporunuz hazırlanıyor, lütfen bekleyin...</p>
          </div>
        )}
      </div>
    </div>
  )
}
