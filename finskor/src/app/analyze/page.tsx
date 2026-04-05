'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

type Step = 'upload' | 'preview' | 'payment' | 'processing'

const MOCK_USER = { email: 'ahmet@firma.com' }

export default function AnalyzePage() {
  const [step, setStep] = useState<Step>('upload')
  const [sektor, setSektor] = useState('ticaret')
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cardForm, setCardForm] = useState({
    no: '', ad: '', tarih: '', cvv: ''
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    if (!f.name.endsWith('.xlsx') && !f.name.endsWith('.xls')) {
      alert('Lütfen Excel (.xlsx) dosyası yükleyin.')
      return
    }
    setFile(f)
  }

  const handleAnaliz = async () => {
    if (!file) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setLoading(false)
    setStep('preview')
  }

  const handleOdeme = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep('processing')
    await new Promise(r => setTimeout(r, 2500))
    window.location.href = '/report/demo-123'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={MOCK_USER} />

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Adım göstergesi */}
        <div className="flex items-center gap-2 mb-10">
          {[
            { key: 'upload', label: 'Mizan yükle' },
            { key: 'preview', label: 'Ön izleme' },
            { key: 'payment', label: 'Ödeme' },
          ].map((s, i) => {
            const steps = ['upload', 'preview', 'payment', 'processing']
            const current = steps.indexOf(step)
            const idx = steps.indexOf(s.key)
            const done = current > idx
            const active = current === idx
            return (
              <div key={s.key} className="flex items-center gap-2 flex-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 transition-colors ${
                  done ? 'bg-brand-400 text-white' : active ? 'bg-brand-400 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {done ? (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : i + 1}
                </div>
                <span className={`text-xs font-medium ${active ? 'text-gray-900' : done ? 'text-brand-400' : 'text-gray-400'}`}>
                  {s.label}
                </span>
                {i < 2 && <div className={`flex-1 h-px ${done ? 'bg-brand-400' : 'bg-gray-200'} ml-1`} />}
              </div>
            )
          })}
        </div>

        {/* ADIM 1: UPLOAD */}
        {step === 'upload' && (
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Mizanınızı yükleyin</h2>
            <p className="text-sm text-gray-500 mb-6">Excel formatındaki mizanınızı yükleyin. Analiz otomatik yapılacaktır.</p>

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => {
                e.preventDefault()
                setDragging(false)
                const f = e.dataTransfer.files[0]
                if (f) handleFile(f)
              }}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
                dragging ? 'border-brand-400 bg-brand-50' : file ? 'border-brand-400 bg-brand-50' : 'border-gray-200 hover:border-gray-300 bg-gray-50'
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              {file ? (
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{file.name}</div>
                  <div className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB · Excel</div>
                  <button
                    onClick={e => { e.stopPropagation(); setFile(null) }}
                    className="text-xs text-red-400 hover:text-red-500 mt-2 transition"
                  >
                    Kaldır
                  </button>
                </div>
              ) : (
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Sürükleyip bırakın</div>
                  <div className="text-xs text-gray-400">veya tıklayarak dosya seçin</div>
                  <div className="text-xs text-gray-400 mt-1">Excel (.xlsx) · Maks. 10 MB</div>
                </div>
              )}
            </div>

            {/* Sektör seçimi */}
            <div className="mt-5">
              <label className="label">Sektör</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'ticaret', label: 'Ticaret' },
                  { value: 'uretim', label: 'Üretim' },
                  { value: 'hizmet', label: 'Hizmet' },
                ].map(s => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSektor(s.value)}
                    className={`py-3 text-sm font-medium rounded-xl border transition-all ${
                      sektor === s.value
                        ? 'border-brand-400 text-brand-600 bg-brand-50'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gizlilik notu */}
            <div className="flex items-start gap-2 mt-5 p-4 bg-gray-50 rounded-xl">
              <div className="w-4 h-4 rounded-full bg-brand-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-relaxed">
                Mizanınız yalnızca analiz süresince kullanılır. İşlem tamamlandığında sunucularımızdan kalıcı olarak silinir. Verileriniz üçüncü taraflarla paylaşılmaz.
              </p>
            </div>

            <button
              onClick={handleAnaliz}
              disabled={!file || loading}
              className="btn-primary w-full mt-5 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity=".3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Analiz yapılıyor...
                </span>
              ) : 'Analiz et'}
            </button>
          </div>
        )}

        {/* ADIM 2: ÖN İZLEME */}
        {step === 'preview' && (
          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Bilanço skoru hazır</h2>
                <span className="text-xs bg-brand-50 text-brand-600 px-2.5 py-1 rounded-lg font-medium">Ön izleme</span>
              </div>

              {/* Skor */}
              <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl mb-5">
                <div className="w-20 h-20 rounded-full border-[3px] border-brand-400 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-semibold text-brand-400 leading-none">68</span>
                  <span className="text-sm font-medium text-brand-400">A</span>
                </div>
                <div>
                  <div className="text-base font-semibold text-gray-900 mb-1">İyi — Kredi onayı büyük olasılıkla</div>
                  <div className="text-sm text-gray-500 mb-1">Teminat: Kefalet + çek temliki / KGF</div>
                  <div className="text-sm text-brand-400 font-medium">Tahmini limit: 740,000 ₺</div>
                </div>
              </div>

              {/* Kilitli içerik */}
              <div className="space-y-2 mb-5">
                <div className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
                  Tam rapor içeriği (kilitli)
                </div>
                {['19 rasyo analizi + sektör karşılaştırması', 'Senaryo motoru — hangi aksiyon kaç puan katar', 'Kredi limit tahmini ve teminat detayı', 'Banka görüşme soruları ve hazır cevaplar', 'Aksiyon planı ve zaman çizelgesi', 'Banka başvuru belge listesi'].map(item => (
                  <div key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <span className="text-xs text-gray-400">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep('payment')}
                className="btn-primary w-full py-3.5"
              >
                Tam raporu satın al — 600 ₺
              </button>
              <button
                onClick={() => setStep('upload')}
                className="btn-outline w-full mt-2 py-3"
              >
                Geri dön
              </button>
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
                <div className="text-sm font-medium text-gray-900">FinSkor Raporu</div>
                <div className="text-xs text-gray-500">Tek seferlik · PDF çıktı · 3 gün erişim</div>
              </div>
              <div className="text-lg font-semibold text-gray-900">600 ₺</div>
            </div>

            <form onSubmit={handleOdeme} className="space-y-4">
              <div>
                <label className="label">Kart numarası</label>
                <input
                  className="input font-mono tracking-widest"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={cardForm.no}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g, '').slice(0, 16)
                    const fmt = v.replace(/(.{4})/g, '$1 ').trim()
                    setCardForm(p => ({ ...p, no: fmt }))
                  }}
                  required
                />
              </div>
              <div>
                <label className="label">Kart üzerindeki ad</label>
                <input
                  className="input"
                  placeholder="AHMET YILMAZ"
                  style={{ textTransform: 'uppercase' }}
                  value={cardForm.ad}
                  onChange={e => setCardForm(p => ({ ...p, ad: e.target.value.toUpperCase() }))}
                  required
                />
              </div>
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
                  <input
                    className="input"
                    placeholder="123"
                    maxLength={4}
                    type="password"
                    value={cardForm.cvv}
                    onChange={e => setCardForm(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className="text-xs text-gray-500">256-bit SSL şifrelemeli güvenli ödeme</span>
              </div>

              <button type="submit" className="btn-primary w-full py-3.5">
                600 ₺ öde ve raporu indir
              </button>
            </form>

            <button
              onClick={() => setStep('preview')}
              className="btn-outline w-full mt-3 py-3"
            >
              Geri dön
            </button>
          </div>
        )}

        {/* ADIM 4: İŞLENİYOR */}
        {step === 'processing' && (
          <div className="card text-center py-12">
            <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-5">
              <svg className="animate-spin w-8 h-8 text-brand-400" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#E1F5EE" strokeWidth="3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Ödeme onaylanıyor</h2>
            <p className="text-sm text-gray-500">Raporunuz hazırlanıyor, lütfen bekleyin...</p>
          </div>
        )}
      </div>
    </div>
  )
}
