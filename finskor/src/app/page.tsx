import Link from 'next/link'
import Navbar from '@/components/Navbar'

const VALUE_CARDS = [
  { title: 'Bilanço skoru + harf notu', desc: '0–100 puan, AAA\'dan D\'ye harf notu. Banka metodolojisine yakın skorlama.' },
  { title: '19 rasyo analizi', desc: 'Likidite, sermaye yapısı, kârlılık ve borç kapasitesi. Sektör ortalamasıyla karşılaştırma.' },
  { title: 'Senaryo motoru', desc: '"Ortaklar cariyi sermayeye eklersen +14 puan" gibi somut, hesaplanmış aksiyon önerileri.' },
  { title: 'Kredi limit tahmini', desc: 'Mevcut yapınızla kullanabileceğiniz tahmini limit ve teminat yapısı detayı.' },
  { title: 'Banka görüşme rehberi', desc: 'Bankacının soracağı sorular ve hazır cevap şablonları. Görüşmeye hazırlıklı gidin.' },
  { title: 'Aksiyon planı', desc: 'Hemen / kısa / orta vadeli adımlar. Her aksiyonun skor etkisi hesaplanmış.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-0 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          KOBİ finansal analiz platformu
        </div>
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 mb-5 leading-[1.15]">
          Bankanız sizi nasıl<br />
          <span className="text-brand-400">görüyor?</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-3 leading-relaxed">
          Mizanınızı yükleyin, bilanço skorunuzu öğrenin. Teminatlarınızı düşürmenin
          ve banka limitinizi artırmanın yolunu keşfedin.
        </p>
        <p className="text-sm text-gray-400 italic max-w-md mx-auto mb-10">
          "Bilmediğinizi yönetemezsiniz — finansal tablonuzu banka gözüyle görün, hazırlıklı gidin."
        </p>

        {/* UPLOAD ZONE */}
        <UploadZone />

        {/* Gizlilik notu */}
        <div className="flex items-center justify-center gap-2 mt-5 mb-16 text-xs text-gray-400">
          <div className="w-2 h-2 rounded-full bg-brand-400" />
          Mizanınız analiz sonrası sunucularımızdan silinir, saklanmaz veya paylaşılmaz
        </div>
      </section>

      {/* 3 ADIM */}
      <section className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 divide-x divide-gray-100">
          {[
            { n: '1', title: 'Mizan yükle', desc: 'Excel formatındaki mizanınızı sürükleyip bırakın. Logo, Luca, Mikro, Netsis uyumlu.' },
            { n: '2', title: 'Bilanço skoru al', desc: '19 rasyo, sektör karşılaştırması ve banka skoru otomatik hesaplanır.' },
            { n: '3', title: 'PDF indir', desc: 'Ödeme sonrası tam raporunuz hazır. Bankanıza götürün veya dashboard\'da saklayın.' },
          ].map(s => (
            <div key={s.n} className="py-8 px-8 text-center">
              <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold flex items-center justify-center mx-auto mb-3">
                {s.n}
              </div>
              <div className="text-sm font-medium text-gray-900 mb-2">{s.title}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DEĞER KARTLARI */}
      <section className="border-t border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-widest text-center mb-8">
            Rapor içeriği
          </div>
          <div className="grid grid-cols-3 gap-3">
            {VALUE_CARDS.map(c => (
              <div key={c.title} className="bg-gray-50 rounded-2xl p-5">
                <div className="text-sm font-medium text-gray-900 mb-2">{c.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÖRNEK RAPOR */}
      <section className="border-t border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-widest text-center mb-8">
            Örnek rapor önizlemesi
          </div>
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
              <div className="text-xs text-gray-400 mb-3">Tam raporu görmek için satın alın</div>
              <Link href="/auth" className="btn-primary">Rapor satın al — 600 ₺</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FİYAT */}
      <section className="border-t border-gray-100 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-8">
            Fiyatlandırma
          </div>
          <div className="inline-block card text-left max-w-sm w-full">
            <div className="text-4xl font-semibold text-gray-900 mb-1">600 ₺</div>
            <div className="text-sm text-gray-400 mb-5">tek seferlik · KDV dahil</div>
            <ul className="space-y-2.5 mb-6">
              {[
                'Tam finansal analiz raporu (PDF)',
                '19 rasyo + sektör karşılaştırması',
                'Senaryo motoru ve aksiyon planı',
                'Banka görüşme rehberi',
                '3 gün dashboard erişimi',
                'Mizan analiz sonrası silinir',
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <div className="w-4 h-4 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/auth" className="btn-primary w-full">Rapor oluştur</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="font-semibold text-sm">
            Fin<span className="text-brand-400">Skor</span>
          </div>
          <div className="flex gap-5">
            {['Gizlilik politikası', 'Kullanım şartları', 'Yasal uyarı', 'İletişim'].map(l => (
              <a key={l} href="#" className="text-xs text-gray-400 hover:text-gray-600 transition">{l}</a>
            ))}
          </div>
          <div className="text-xs text-gray-400 w-full">
            © 2025 FinSkor · Bu platform yalnızca bilgilendirme amaçlıdır, banka kararını garanti etmez.
          </div>
        </div>
      </footer>
    </div>
  )
}

function UploadZone() {
  return (
    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 mx-auto max-w-2xl hover:border-brand-400 transition-colors cursor-pointer bg-gray-50/50 group">
      <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-100 transition-colors">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </div>
      <div className="text-base font-medium text-gray-900 mb-1.5">Mizanınızı buraya sürükleyin</div>
      <div className="text-sm text-gray-500 mb-1">veya bilgisayarınızdan seçin</div>
      <div className="text-xs text-gray-400 mb-6">Excel (.xlsx) · Logo, Luca, Mikro, Netsis uyumlu</div>
      <Link href="/auth" className="btn-primary">
        Dosya seç ve devam et
      </Link>
      <div className="flex items-center justify-center gap-3 mt-5">
        <span className="text-xs text-gray-400">Sektör:</span>
        {['Ticaret', 'Üretim', 'Hizmet'].map((s, i) => (
          <span key={s} className={`text-xs px-3 py-1 rounded-lg border cursor-pointer transition ${i === 0 ? 'border-brand-400 text-brand-600 bg-brand-50' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
