'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import SampleReportModal from '@/components/SampleReportModal'

const RAPOR_BASLIKLARI = [
  { n: '1',  t: 'Yönetici özeti' },
  { n: '2',  t: 'Güçlü yönler' },
  { n: '3',  t: 'Zayıf yönler + düzeltme' },
  { n: '4',  t: 'Skor bandı tablosu' },
  { n: '5',  t: 'Kredi türü önerisi' },
  { n: '6',  t: 'Nakit akış analizi' },
  { n: '7',  t: '19 rasyo detayı' },
  { n: '8',  t: 'Senaryo motoru' },
  { n: '9',  t: 'Banka görüşme soruları' },
  { n: '10', t: 'Banka başvuru hazırlığı' },
  { n: '11', t: 'Aksiyon zaman çizelgesi' },
  { n: '12', t: 'Yasal uyarı' },
]

export default function LandingPage() {
  const [showSample, setShowSample] = useState(false)

  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="font-semibold text-xl tracking-tight">
            Fin<span className="text-brand-400">Skor</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hover:text-gray-800 transition cursor-pointer">Nasıl çalışır</span>
            <button onClick={() => setShowSample(true)} className="text-sm text-brand-400 font-medium hover:text-brand-600 transition cursor-pointer">
              Örnek rapor
            </button>
            <a href="mailto:destek@bilancoskor.com" className="text-sm text-gray-500 hover:text-gray-800 transition cursor-pointer">İletişim</a>
            <Link href="/auth" className="text-sm text-gray-600 hover:text-gray-900 transition border border-gray-200 rounded-xl px-4 py-2">Giriş yap</Link>
            <Link href="/auth?tab=register" className="btn-primary text-sm py-2 px-4">Üye ol</Link>
          </div>
        </div>
      </nav>

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
          Mizanınızı yükleyin, bilanço skorunuzu öğrenin.<br />
          Banka kredi limitinizi artırmanın yolunu keşfedin.
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
          <Link href="/auth" className="btn-primary">Dosya seç ve devam et</Link>
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

      {/* 3 ADIM */}
      <section className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 divide-x divide-gray-100">
          {[
            { n: '1', title: 'Mizan yükle', desc: 'Excel formatındaki mizanınızı sürükleyip bırakın.' },
            { n: '2', title: 'Bilanço skoru al', desc: 'Bilanço skorunuz hesaplanır ve raporunuz oluşturulur.' },
            { n: '3', title: 'PDF indir', desc: 'Ödeme sonrası raporunuzu indirin.' },
          ].map(s => (
            <div key={s.n} className="py-8 px-8 text-center">
              <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold flex items-center justify-center mx-auto mb-3">{s.n}</div>
              <div className="text-sm font-medium text-gray-900 mb-2">{s.title}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ÖRNEK RAPOR KARTI */}
      <section className="border-t border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-widest text-center mb-8">Örnek rapor önizlemesi</div>
          <div className="max-w-2xl mx-auto card">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-900">ABC Ticaret A.Ş. — FinSkor Raporu</div>
              <span className="text-xs bg-brand-50 text-brand-600 px-2 py-1 rounded-lg">Örnek</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-brand-400 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-xl font-semibold text-brand-400 leading-none">68</span>
                <span className="text-xs text-brand-400">A</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">İyi — Kredi onayı büyük olasılıkla</div>
                <div className="text-xs text-gray-500">Likidite ve sermaye yapısı iyileştirme gerektiriyor.</div>
                <div className="text-xs text-brand-400 mt-1">Tahmini limit: 740,000 ₺ · Teminat: kefalet + çek temliki</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['19 rasyo detayı', 'Senaryo motoru', 'Banka soruları', 'Aksiyon planı', 'Zaman çizelgesi', 'Banka rehberi'].map(t => (
                <div key={t} className="bg-gray-50 rounded-xl h-9 flex items-center justify-center">
                  <span className="text-xs text-gray-400">{t}</span>
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
          <div className="text-xs font-medium text-gray-400 uppercase tracking-widest text-center mb-10">Fiyatlandırma</div>
          <div className="max-w-2xl mx-auto flex gap-10 items-start">

            {/* Sol: fiyat + buton + notlar */}
            <div className="flex-shrink-0 w-44">
              <div className="text-5xl font-semibold text-gray-900 mb-1 leading-none">600 ₺</div>
              <div className="text-sm text-gray-400 mb-6">tek seferlik · KDV dahil</div>
              <Link href="/auth" className="btn-primary w-full block text-center">Rapor oluştur</Link>
              <div className="mt-4 space-y-2">
                {['Rapor 3 gün hesapta saklanır', 'Mizan analiz sonrası silinir', 'PDF olarak indirilebilir'].map(f => (
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
              <div className="grid grid-cols-2 gap-2">
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
