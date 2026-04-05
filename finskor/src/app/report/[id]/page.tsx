'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const MOCK_USER = { email: 'ahmet@firma.com' }

const RASYO_MOCK = [
  { ad: 'Cari oran', deger: '1.14x', bant: 'zayif', sektör_ort: '1.65x', kategori: 'Likidite' },
  { ad: 'Asit-test', deger: '0.85x', bant: 'zayif', sektör_ort: '1.10x', kategori: 'Likidite' },
  { ad: 'Nakit oranı', deger: '0.21x', bant: 'iyi', sektör_ort: '0.28x', kategori: 'Likidite' },
  { ad: 'Borç / Özkaynak', deger: '2.05x', bant: 'zayif', sektör_ort: '1.80x', kategori: 'Sermaye' },
  { ad: 'FAVÖK marjı', deger: '%15.0', bant: 'mukemmel', sektör_ort: '%9.0', kategori: 'Kârlılık' },
  { ad: 'ROE', deger: '%25.9', bant: 'mukemmel', sektör_ort: '%15.0', kategori: 'Kârlılık' },
  { ad: 'Net kâr marjı', deger: '%3.5', bant: 'iyi', sektör_ort: '%4.0', kategori: 'Kârlılık' },
  { ad: 'Stok devir hızı', deger: '14.57x', bant: 'mukemmel', sektör_ort: '9.00x', kategori: 'Faaliyet' },
  { ad: 'Faiz karşılama', deger: '5.00x', bant: 'mukemmel', sektör_ort: '3.20x', kategori: 'Borç' },
  { ad: 'Net Borç/FAVÖK', deger: '1.03x', bant: 'mukemmel', sektör_ort: '2.80x', kategori: 'Borç' },
]

const BANT: Record<string, { label: string; color: string; dot: string }> = {
  mukemmel: { label: 'Mükemmel', color: 'text-brand-400', dot: 'bg-brand-400' },
  iyi:      { label: 'İyi',      color: 'text-blue-500',  dot: 'bg-blue-400'  },
  zayif:    { label: 'Zayıf',    color: 'text-amber-500', dot: 'bg-amber-400' },
  kotu:     { label: 'Kötü',     color: 'text-red-400',   dot: 'bg-red-400'   },
}

const SENARYOLAR = [
  { aciklama: 'Ortaklar cari hesabını (331) sermayeye ekle (280,000 ₺)', yeni_skor: 79, harf: 'AA', delta: 14 },
  { aciklama: 'KV borcun yarısını uzun vadeye çevir (300,000 ₺)',         yeni_skor: 73, harf: 'A',  delta: 8  },
  { aciklama: 'Vadesi geçmiş alacakları tahsil et (350,000 ₺)',           yeni_skor: 71, harf: 'A',  delta: 6  },
  { aciklama: 'Stokları erit, nakde çevir (105,000 ₺)',                   yeni_skor: 69, harf: 'A',  delta: 4  },
]

export default function ReportPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={MOCK_USER} />

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Başlık + indir */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">ABC Ticaret A.Ş.</h1>
            <p className="text-sm text-gray-500 mt-1">Ticaret sektörü · 15 Ocak 2025 · 3 gün erişim kaldı</p>
          </div>
          <a
            href={`/api/report/${params.id}/pdf`}
            className="btn-primary flex-shrink-0"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            PDF indir
          </a>
        </div>

        {/* ANA SKOR */}
        <div className="card mb-4">
          <div className="flex items-center gap-6 mb-5">
            <div className="w-24 h-24 rounded-full border-[3px] border-brand-400 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-4xl font-semibold text-brand-400 leading-none">68</span>
              <span className="text-sm font-medium text-brand-400 mt-0.5">A</span>
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-gray-900 mb-1">İyi — Kredi onayı büyük olasılıkla</div>
              <div className="text-sm text-gray-500 mb-3">
                Likidite ve sermaye yapısı iyileştirme gerektiriyor. Kârlılık ve borç ödeme kapasitesi güçlü.
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Tahmini limit: </span>
                  <span className="font-medium text-brand-400">740,000 ₺</span>
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div>
                  <span className="text-gray-400">Teminat: </span>
                  <span className="font-medium text-gray-700">Kefalet + çek temliki</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skor bant tablosu */}
          <div className="border-t border-gray-100 pt-5">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Skor bant tablosu</div>
            <div className="space-y-1.5">
              {[
                ['AAA', '85–100', 'FAVÖK × 3', 'Kişisel kefalet', false],
                ['AA',  '75–84',  'FAVÖK × 2.5', 'Kişisel kefalet + POS/çek', false],
                ['A',   '65–74',  'FAVÖK × 2', 'Kefalet + çek temliki / KGF', true],
                ['BBB', '55–64',  'Teminat değeri bazlı', 'KGF + kısmi ipotek', false],
                ['BB',  '45–54',  'Teminat değeri bazlı', '1. derece ipotek + kefalet', false],
              ].map(([harf, aralik, limit, teminat, aktif]) => (
                <div key={harf as string} className={`grid grid-cols-4 gap-3 px-3 py-2 rounded-xl text-xs ${aktif ? 'bg-brand-50 border border-brand-200' : ''}`}>
                  <span className={`font-semibold ${aktif ? 'text-brand-600' : 'text-gray-700'}`}>{harf} {aktif && '◄ Siz'}</span>
                  <span className="text-gray-500">{aralik}</span>
                  <span className="text-gray-600">{limit}</span>
                  <span className="text-gray-500">{teminat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KATEGORİ PUANLARI */}
        <div className="card mb-4">
          <div className="text-sm font-semibold text-gray-900 mb-4">Kategori puanları</div>
          <div className="space-y-3">
            {[
              { kat: 'Likidite', puan: 8.3, max: 22 },
              { kat: 'Sermaye yapısı', puan: 9.7, max: 24 },
              { kat: 'Kârlılık', puan: 21.4, max: 26 },
              { kat: 'Faaliyet etkinliği', puan: 13.8, max: 18 },
              { kat: 'Borç ödeme kapasitesi', puan: 14.6, max: 16 },
            ].map(k => (
              <div key={k.kat} className="flex items-center gap-3">
                <div className="w-36 text-xs text-gray-600 flex-shrink-0">{k.kat}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-400 transition-all"
                    style={{ width: `${(k.puan / k.max) * 100}%` }}
                  />
                </div>
                <div className="text-xs font-medium text-gray-700 w-16 text-right">
                  {k.puan.toFixed(1)} / {k.max}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RASYO ANALİZLERİ */}
        <div className="card mb-4">
          <div className="text-sm font-semibold text-gray-900 mb-4">Rasyo analizleri</div>
          <div className="space-y-2">
            {RASYO_MOCK.map(r => (
              <div key={r.ad} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <div className="flex-1">
                  <span className="text-sm text-gray-800">{r.ad}</span>
                  <span className="text-xs text-gray-400 ml-2">sektör ort: {r.sektör_ort}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900">{r.deger}</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${BANT[r.bant].dot}`} />
                    <span className={`text-xs font-medium ${BANT[r.bant].color}`}>{BANT[r.bant].label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SENARYO MOTORU */}
        <div className="card mb-4">
          <div className="text-sm font-semibold text-gray-900 mb-1">Senaryo motoru</div>
          <p className="text-xs text-gray-500 mb-4">Bu aksiyonları uygularsanız skorunuz nasıl değişir?</p>
          <div className="space-y-3">
            {SENARYOLAR.map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 text-xs text-gray-700 leading-relaxed">{s.aciklama}</div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-brand-400">{s.yeni_skor} / {s.harf}</div>
                  <div className="text-xs text-brand-400">+{s.delta} puan</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BANKA HAZIRLIĞI */}
        <div className="card mb-4">
          <div className="text-sm font-semibold text-gray-900 mb-4">Banka başvuru hazırlığı</div>
          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium text-gray-500 mb-2">Hazırlanacak belgeler</div>
              {['Son 2 yıl vergi levhası ve beyanname', 'Son dönem mizan veya bilanço', 'Son 3 ay banka hesap özeti (tüm bankalar)', 'Şirket imza sirküleri ve ticaret sicil gazetesi', 'SGK ve vergi borcu yoktur yazısı'].map(b => (
                <div key={b} className="flex items-center gap-2 py-1.5 text-xs text-gray-600">
                  <div className="w-3.5 h-3.5 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <svg width="6" height="5" viewBox="0 0 6 5" fill="none">
                      <path d="M1 2.5L2.5 4L5 1" stroke="#1D9E75" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* YASAL UYARI */}
        <div className="bg-gray-50 rounded-2xl p-5 text-xs text-gray-400 leading-relaxed">
          <span className="font-medium text-gray-500">Yasal uyarı: </span>
          Bu rapor yalnızca bilgilendirme amaçlıdır. KrediSkor ve kredi limit tahminleri herhangi bir bankanın kararını temsil etmez. Banka değerlendirmesi finansal rasyoların yanı sıra nitel faktörleri de içerir. FinSkor bu rapora dayanılarak alınan kararlardan sorumlu tutulamaz.
        </div>

        {/* Alt butonlar */}
        <div className="flex gap-3 mt-6">
          <a href={`/api/report/${params.id}/pdf`} className="btn-primary flex-1 py-3.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            PDF indir
          </a>
          <Link href="/dashboard" className="btn-outline py-3.5 px-5">Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
