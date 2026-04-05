'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const MOCK_USER = { email: 'ahmet@firma.com', ad: 'Ahmet' }
const MOCK_REPORTS = [
  {
    id: '1',
    firma: 'ABC Ticaret A.Ş.',
    sektor: 'Ticaret',
    skor: 68,
    harf: 'A',
    created_at: '2025-01-15',
    expires_at: '2025-01-18',
    durum: 'hazir',
  },
  {
    id: '2',
    firma: 'XYZ Üretim Ltd.',
    sektor: 'Üretim',
    skor: 54,
    harf: 'BB',
    created_at: '2025-01-10',
    expires_at: '2025-01-13',
    durum: 'suresi_doldu',
  },
]

const HARF_RENK: Record<string, string> = {
  AAA: 'text-brand-400',
  AA: 'text-brand-400',
  A: 'text-brand-400',
  BBB: 'text-amber-500',
  BB: 'text-amber-500',
  B: 'text-red-400',
  D: 'text-red-500',
}

function gunKaldi(expires: string) {
  const fark = Math.ceil((new Date(expires).getTime() - Date.now()) / 86400000)
  return fark
}

export default function DashboardPage() {
  const aktifRaporlar = MOCK_REPORTS.filter(r => r.durum === 'hazir')
  const eskiRaporlar = MOCK_REPORTS.filter(r => r.durum === 'suresi_doldu')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={MOCK_USER} />

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Başlık */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Merhaba, {MOCK_USER.ad}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Raporlarınız aşağıda listelenmiştir.</p>
          </div>
          <Link href="/analyze" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Yeni rapor oluştur
          </Link>
        </div>

        {/* Aktif raporlar */}
        {aktifRaporlar.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
              Aktif raporlar
            </h2>
            <div className="space-y-3">
              {aktifRaporlar.map(r => {
                const gun = gunKaldi(r.expires_at)
                return (
                  <div key={r.id} className="card flex items-center gap-5">
                    {/* Skor dairesi */}
                    <div className="w-14 h-14 rounded-full border-2 border-brand-400 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-lg font-semibold text-brand-400 leading-none">{r.skor}</span>
                      <span className={`text-xs font-medium ${HARF_RENK[r.harf]}`}>{r.harf}</span>
                    </div>

                    {/* Bilgi */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{r.firma}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{r.sektor} · {r.created_at}</div>
                    </div>

                    {/* Süre */}
                    <div className="text-center flex-shrink-0">
                      <div className={`text-xs font-medium ${gun <= 1 ? 'text-red-400' : 'text-amber-500'}`}>
                        {gun > 0 ? `${gun} gün kaldı` : 'Son gün'}
                      </div>
                      <div className="text-xs text-gray-400">erişim süresi</div>
                    </div>

                    {/* Butonlar */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Link href={`/report/${r.id}`} className="btn-primary text-xs py-2 px-4">
                        Görüntüle
                      </Link>
                      <a
                        href={`/api/report/${r.id}/pdf`}
                        className="btn-outline text-xs py-2 px-4"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        PDF
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Eski raporlar */}
        {eskiRaporlar.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
              Süresi dolan raporlar
            </h2>
            <div className="space-y-3">
              {eskiRaporlar.map(r => (
                <div key={r.id} className="card flex items-center gap-5 opacity-50">
                  <div className="w-14 h-14 rounded-full border-2 border-gray-200 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-lg font-semibold text-gray-400 leading-none">{r.skor}</span>
                    <span className="text-xs font-medium text-gray-400">{r.harf}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-700 truncate">{r.firma}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{r.sektor} · {r.created_at}</div>
                  </div>
                  <div className="text-xs text-gray-400">Erişim süresi doldu</div>
                  <Link href="/analyze" className="btn-outline text-xs py-2 px-4">
                    Yeniden analiz et
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Boş durum */}
        {aktifRaporlar.length === 0 && eskiRaporlar.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-2">Henüz rapor yok</h3>
            <p className="text-sm text-gray-500 mb-6">Mizanınızı yükleyin ve ilk raporunuzu oluşturun.</p>
            <Link href="/analyze" className="btn-primary">Rapor oluştur</Link>
          </div>
        )}

        {/* Bilgi kutusu */}
        <div className="bg-brand-50 rounded-2xl p-5 flex gap-3">
          <div className="w-4 h-4 rounded-full bg-brand-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-brand-600 mb-1">Raporlar 3 gün saklanır</div>
            <div className="text-xs text-brand-600 opacity-80 leading-relaxed">
              Raporlarınız oluşturulma tarihinden itibaren 3 gün boyunca erişilebilir durumda kalır.
              Bu süre sonunda raporlar ve mizan verileriniz sistemden kalıcı olarak silinir.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
