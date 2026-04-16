'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import SampleReportModal from '@/components/SampleReportModal'

const RAPOR_BASLIKLARI = [
  { n: '1',  t: 'Yönetici özeti' },
  { n: '2',  t: 'Güçlü yönler' },
  { n: '3',  t: 'Zayıf Yönler / Uyarılar' },
  { n: '4',  t: 'Skor bandı tablosu' },
  { n: '5',  t: 'Finansman Araçları' },
  { n: '6',  t: 'Nakit akış analizi' },
  { n: '7',  t: '19 rasyo detayı' },
  { n: '8',  t: 'Senaryo motoru' },
  { n: '9',  t: 'Banka görüşme soruları' },
  { n: '10', t: 'Banka başvuru hazırlığı' },
  { n: '11', t: 'Model Bazlı İyileştirme Senaryoları' },
  { n: '12', t: 'Model Skorunu Etkileyen Faktörler' },
  { n: '13', t: 'Bilanço özeti' },
  { n: '14', t: 'Yasal uyarı' },
]

export default function LandingPage() {
  const [showSample, setShowSample] = useState(false)
  const [rapor_fiyati, setRaporFiyati] = useState<string | null>(null)

  useEffect(() => {
    // Fiyatı Supabase settings tablosundan oku
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    supabase.from('settings').select('value').eq('key', 'rapor_fiyati').single()
      .then(({ data }) => { if (data) setRaporFiyati(data.value) })
  }, [])

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-0 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          Finansal analiz platformu
        </div>
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 mb-5 leading-[1.15]">
          Bankanız sizi nasıl<br />
          <span className="text-brand-400">görüyor?</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-3 leading-relaxed">
          Mizanınızı yükleyin, finansal profilinizi hemen öğrenin.<br />
          Kredi limitinizi ve teminat yapınızı nelerin engellediğini görün.
        </p>
        <p className="text-sm text-gray-400 italic max-w-md mx-auto mb-10">
          Finansal tablonuzu banka gözüyle görün ve kredi limitinizi artırın.
        </p>

        {/* UPLOAD ZONE */}
        <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-10 mx-auto max-w-2xl hover:border-brand-400 transition-colors cursor-pointer bg-gray-50/50 group">
          {/* Rapor Oluştur badge */}
          <div className="absolute top-4 right-4 bg-brand-400 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            Rapor Oluştur
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-100 transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
          <div className="text-base font-medium text-gray-900 mb-1.5">Mizanınızı buraya sürükleyin</div>
          <div className="text-sm text-gray-500 mb-1">veya bilgisayarınızdan seçin</div>
          <div className="text-xs text-gray-400 mb-6">Excel (.xlsx)</div>
          <Link href="/auth" className="btn-primary">Analizi Başlat</Link>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="text-xs text-gray-400">Sektör:</span>
            {['Ticaret', 'Üretim', 'Hizmet'].map((s, i) => (
              <span key={s} className={`text-xs px-3 py-1 rounded-lg border cursor-pointer transition ${i === 0 ? 'border-brand-400 text-brand-600 bg-brand-50' : 'border-gray-200 text-gray-500'}`}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-5 mb-16 text-xs text-gray-400">
          <div className="w-2 h-2 rounded-full bg-brand-400" />
          Mizanınız analiz sonrası silinir, saklanmaz veya paylaşılmaz
        </div>
      </section>

      {/* PAIN BLOCK */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto text-center">
          {[
            'Kredi başvurularınız beklediğiniz gibi sonuçlanmadı mı?',
            'Limitinizin neden artırılmadığını biliyor musunuz?',
            'Bankalardan net bir cevap alamadınız mı?',
            'Yeni kredi limiti için yüksek teminatlara mı ihtiyacınız var?',
            'POS bloke ve çek karşılığı gibi nakdi teminatlı limitler nakit akışınızı mı etkiliyor?',
          ].map((q) => {
            const govde = q.slice(0, -1)
            return (
              <p key={q} className="py-4 text-2xl font-semibold text-gray-400 leading-snug">
                {govde}<span className="text-brand-400 font-bold">?</span>
              </p>
            )
          })}
          <p className="mt-12 text-xl font-semibold text-brand-400 text-center leading-relaxed">
            Tüm soruların cevabı sizde.<br />
            Siz henüz görmemiş olabilirsiniz.
          </p>
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section className="border-t border-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest text-center mb-10">Nasıl çalışır</p>
          <div className="flex items-start justify-center gap-0">

            {/* ADIM 1 */}
            <div className="flex-1 max-w-[220px] flex flex-col items-center text-center px-3 group">
              <div className="w-[100px] h-[80px] mb-5">
                <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect x="18" y="8" width="48" height="60" rx="5" fill="#E6F1FB" stroke="#378ADD" strokeWidth="1.2"/>
                  <path d="M50 8 L66 24 L50 24 Z" fill="#B5D4F4" stroke="#378ADD" strokeWidth="1"/>
                  <line x1="26" y1="34" x2="58" y2="34" stroke="#378ADD" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                  <line x1="26" y1="41" x2="58" y2="41" stroke="#378ADD" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                  <line x1="26" y1="48" x2="50" y2="48" stroke="#378ADD" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                  <rect x="24" y="54" width="26" height="10" rx="3" fill="#378ADD"/>
                  <text x="37" y="62" textAnchor="middle" fontSize="7" fontWeight="500" fill="#E6F1FB">XLSX</text>
                  <circle cx="78" cy="58" r="13" fill="#EAF3DE" stroke="#639922" strokeWidth="1"/>
                  <path d="M78 65 L78 53 M74 57 L78 53 L82 57" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900 group-hover:-translate-y-1 transition-transform">Mizanınızı yükleyin</p>
            </div>

            {/* CONNECTOR 1 */}
            <div className="flex-shrink-0 pt-8 flex flex-col items-center gap-1">
              <div className="relative w-12 h-3 overflow-hidden rounded-full bg-gray-100">
                <div className="absolute top-[3px] left-[-8px] w-[6px] h-[6px] rounded-full bg-[#378ADD] animate-[flowmove_1.6s_linear_infinite]" />
                <div className="absolute top-[3px] left-[-8px] w-[6px] h-[6px] rounded-full bg-[#378ADD] animate-[flowmove_1.6s_linear_infinite_0.53s]" />
                <div className="absolute top-[3px] left-[-8px] w-[6px] h-[6px] rounded-full bg-[#378ADD] animate-[flowmove_1.6s_linear_infinite_1.06s]" />
              </div>
              <span className="text-gray-300 text-sm">›</span>
            </div>

            {/* ADIM 2 */}
            <div className="flex-1 max-w-[220px] flex flex-col items-center text-center px-3 group">
              <div className="w-[100px] h-[80px] mb-5">
                <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <g style={{transformOrigin:'50px 40px', animation:'spin 8s linear infinite'}}>
                    <circle cx="50" cy="40" r="22" fill="#FAEEDA" stroke="#EF9F27" strokeWidth="1.2"/>
                    <circle cx="50" cy="40" r="10" fill="#EF9F27" opacity="0.25"/>
                    <circle cx="50" cy="40" r="6" fill="#EF9F27" opacity="0.6"/>
                    <rect x="47" y="16" width="6" height="8" rx="2" fill="#EF9F27" opacity="0.7"/>
                    <rect x="47" y="56" width="6" height="8" rx="2" fill="#EF9F27" opacity="0.7"/>
                    <rect x="16" y="37" width="8" height="6" rx="2" fill="#EF9F27" opacity="0.7"/>
                    <rect x="76" y="37" width="8" height="6" rx="2" fill="#EF9F27" opacity="0.7"/>
                    <rect x="25" y="23" width="6" height="8" rx="2" fill="#EF9F27" opacity="0.5" transform="rotate(-45 28 27)"/>
                    <rect x="65" y="23" width="6" height="8" rx="2" fill="#EF9F27" opacity="0.5" transform="rotate(45 68 27)"/>
                    <rect x="25" y="51" width="6" height="8" rx="2" fill="#EF9F27" opacity="0.5" transform="rotate(45 28 55)"/>
                    <rect x="65" y="51" width="6" height="8" rx="2" fill="#EF9F27" opacity="0.5" transform="rotate(-45 68 55)"/>
                  </g>
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900 group-hover:-translate-y-1 transition-transform">Sistem finansal tablonuzu bankacılık kriterleriyle analiz etsin</p>
            </div>

            {/* CONNECTOR 2 */}
            <div className="flex-shrink-0 pt-8 flex flex-col items-center gap-1">
              <div className="relative w-12 h-3 overflow-hidden rounded-full bg-gray-100">
                <div className="absolute top-[3px] left-[-8px] w-[6px] h-[6px] rounded-full bg-[#EF9F27] animate-[flowmove_1.6s_linear_infinite]" />
                <div className="absolute top-[3px] left-[-8px] w-[6px] h-[6px] rounded-full bg-[#EF9F27] animate-[flowmove_1.6s_linear_infinite_0.53s]" />
                <div className="absolute top-[3px] left-[-8px] w-[6px] h-[6px] rounded-full bg-[#EF9F27] animate-[flowmove_1.6s_linear_infinite_1.06s]" />
              </div>
              <span className="text-gray-300 text-sm">›</span>
            </div>

            {/* ADIM 3 */}
            <div className="flex-1 max-w-[220px] flex flex-col items-center text-center px-3 group">
              <div className="w-[100px] h-[80px] mb-5">
                <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect x="15" y="6" width="52" height="66" rx="5" fill="#EAF3DE" stroke="#639922" strokeWidth="1.2"/>
                  <rect x="22" y="14" width="30" height="5" rx="2" fill="#639922" opacity="0.5"/>
                  <circle cx="60" cy="20" r="10" fill="#3B6D11" opacity="0.15" stroke="#3B6D11" strokeWidth="1"/>
                  <text x="60" y="24" textAnchor="middle" fontSize="9" fontWeight="500" fill="#3B6D11">AA</text>
                  <rect x="22" y="30" width="6" height="18" rx="1.5" fill="#639922" opacity="0.7"/>
                  <rect x="31" y="36" width="6" height="12" rx="1.5" fill="#639922" opacity="0.5"/>
                  <rect x="40" y="33" width="6" height="15" rx="1.5" fill="#639922" opacity="0.6"/>
                  <rect x="49" y="28" width="6" height="20" rx="1.5" fill="#3B6D11" opacity="0.8"/>
                  <line x1="22" y1="56" x2="60" y2="56" stroke="#639922" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
                  <line x1="22" y1="62" x2="50" y2="62" stroke="#639922" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
                  <rect x="55" y="52" width="24" height="16" rx="4" fill="#3B6D11"/>
                  <path d="M67 57 L67 64 M64 62 L67 65 L70 62" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900 group-hover:-translate-y-1 transition-transform">Raporunuzu indirin ve sizi nelerin engellediğini öğrenin</p>
            </div>

          </div>
        </div>
        <style>{`
          @keyframes flowmove {
            0% { left: -8px; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 50px; opacity: 0; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </section>

      {/* ÖRNEK RAPOR KARTI */}
      <section className="border-t border-gray-100 py-16">
        <div id="ornek-rapor" className="max-w-5xl mx-auto px-6">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-widest text-center mb-8">Örnek rapor önizlemesi</div>
          <div className="max-w-2xl mx-auto card">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-900">Örnek Firma · Ticaret Sektörü · 2024</div>
              <span className="text-xs bg-amber-50 text-amber-600 px-2 py-1 rounded-lg">Örnek</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-brand-400 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-xl font-semibold text-brand-400 leading-none">77</span>
                <span className="text-xs font-medium text-brand-400">AA</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">Çok iyi — Finansal göstergeler olumlu profil oluştuğuna işaret ediyor</div>
                <div className="text-xs text-gray-500">Faaliyet etkinliği iyileştirilerek AAA bandına ulaşılabilir.</div>
                <div className="text-xs text-brand-400 mt-1">Tahmini limit: 10.300.000 ₺ · Teminat: Kefalet + POS/çek</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['Yönetici özeti','Güçlü yönler','Zayıf Yönler / Uyarılar','Skor bandı','Finansman Araçları','Nakit akış analizi','19 rasyo detayı','Senaryo motoru','Banka soruları','Banka başvuru rehberi','Model Bazlı İyileştirme Senaryoları','Model Skorunu Etkileyen Faktörler','Bilanço özeti','Yasal uyarı'].map(t => (
                <div key={t} className="bg-gray-50 rounded-xl h-9 flex items-center justify-center px-2">
                  <span className="text-xs text-gray-400 text-center">{t}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 text-center">
              <div className="text-xs text-gray-400 mb-3">Satın almadan önce rapor formatını inceleyin</div>
              <button onClick={() => setShowSample(true)} className="btn-primary">Örnek raporu gör</button>
            </div>
          </div>
        </div>
      </section>

      {/* FİYATLANDIRMA */}
      <section className="border-t border-gray-100 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-widest text-center mb-4">Fiyatlandırma</div>
          <p className="text-center text-sm text-gray-500 italic mb-10">"Tek bir finansal hatanın maliyeti, bu raporun fiyatının çok üzerindedir."</p>
          <div className="max-w-2xl mx-auto flex gap-10 items-start">

            {/* Sol: fiyat + buton + notlar */}
            <div className="flex-shrink-0 w-44">
              <div className="text-5xl font-semibold text-gray-900 mb-1 leading-none">{rapor_fiyati ?? "..."} ₺</div>
              <div className="text-sm text-gray-400 mb-6">tek seferlik · KDV dahil</div>
              <Link href="/auth" className="btn-primary w-full block text-center">Rapor Oluştur</Link>
              <div className="mt-4 space-y-2">
                {['Rapor 1 gün hesapta saklanır, sonra kalıcı silinir', 'Mizan analiz sonrası silinir', 'PDF olarak indirilebilir'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-3.5 h-3.5 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                      <svg width="6" height="5" viewBox="0 0 6 5" fill="none"><path d="M1 2.5L2.5 4L5 1" stroke="#1D9E75" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Sağ: rapor başlıkları grid */}
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Rapor içeriği</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {RAPOR_BASLIKLARI.map(r => (
                  <div key={r.n} className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl px-3 py-2.5">
                    <div className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold flex items-center justify-center flex-shrink-0">{r.n}</div>
                    <span className="text-xs font-medium text-gray-800">{r.t}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SON CTA */}
      <section className="border-t border-gray-100 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-3xl font-semibold text-gray-900 leading-snug mb-3">
            Bilmemek sizin için<br />
            <span className="text-brand-400">tercih değil, büyük bir risktir.</span>
          </p>
          <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
            Finansal tablonuzu banka gözüyle görün. Limitinizi ve teminat yapınızı nelerin engellediğini öğrenin.
          </p>
          <Link href="/auth" className="btn-primary text-base px-8 py-3">Hemen Başlayın</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="font-semibold text-lg">Bilanco<span className="text-brand-400">Skor</span></div>
          <div className="flex flex-wrap gap-4">
            <a href="/sozlesmeler/kullanici-sozlesmesi" className="text-xs text-gray-400 hover:text-gray-600 transition">Kullanıcı Sözleşmesi</a>
            <a href="/sozlesmeler/gizlilik-politikasi" className="text-xs text-gray-400 hover:text-gray-600 transition">Gizlilik Politikası</a>
            <a href="/sozlesmeler/mesafeli-satis" className="text-xs text-gray-400 hover:text-gray-600 transition">Mesafeli Satış</a>
            <a href="/sozlesmeler/aydinlatma-metni" className="text-xs text-gray-400 hover:text-gray-600 transition">KVKK Aydınlatma</a>
            <a href="/sozlesmeler/cerez-politikasi" className="text-xs text-gray-400 hover:text-gray-600 transition">Çerez Politikası</a>
            <a href="mailto:destek@bilancoskor.com" className="text-xs text-gray-400 hover:text-gray-600 transition">İletişim</a>
          </div>
          <div className="text-xs text-gray-400 w-full">
            © 2026 BilancoSkor · Bu platform yalnızca bilgilendirme amaçlıdır, banka kararını garanti etmez.
          </div>
        </div>
      </footer>

      {showSample && <SampleReportModal onClose={() => setShowSample(false)} />}
    </div>
  )
}
