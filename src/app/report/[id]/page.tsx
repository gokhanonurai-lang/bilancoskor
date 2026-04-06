'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ymjwtntlfioexudvacsj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltand0bnRsZmlvZXh1ZHZhY3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzODY5NTQsImV4cCI6MjA5MDk2Mjk1NH0.xW8XVjr0q7LQ_UStIf0s8q8MoYOsnJyg5ALkDAbT-CI'
)

const BANT_STYLE: Record<string, { label: string; cls: string }> = {
  mukemmel: { label: 'Mükemmel', cls: 'bg-brand-50 text-brand-600' },
  iyi:      { label: 'İyi',      cls: 'bg-blue-50 text-blue-600'   },
  orta:     { label: 'Orta',     cls: 'bg-gray-100 text-gray-600'  },
  zayif:    { label: 'Zayıf',    cls: 'bg-amber-50 text-amber-600' },
  kotu:     { label: 'Kötü',     cls: 'bg-red-50 text-red-500'     },
}

const HARF_CLS: Record<string, string> = {
  AAA:'text-brand-400',AA:'text-brand-400',A:'text-brand-400',
  BBB:'text-amber-500',BB:'text-amber-500',B:'text-red-400',D:'text-red-500',
}

const KAT_TR: Record<string, string> = {
  likidite: 'Likidite',
  sermaye: 'Sermaye Yapısı',
  'sermaye yapısı': 'Sermaye Yapısı',
  karlilik: 'Kârlılık',
  faaliyet: 'Faaliyet Etkinliği',
  'faaliyet etkinliği': 'Faaliyet Etkinliği',
  borc: 'Borç Ödeme Kapasitesi',
  'borç ödeme kapasitesi': 'Borç Ödeme Kapasitesi',
}

function gun(exp: string) {
  return Math.max(0, Math.ceil((new Date(exp).getTime() - Date.now()) / 86400000))
}

function fmt(n: number) {
  return n?.toLocaleString('tr-TR') || '—'
}

function Bolum({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-7 h-7 rounded-full bg-brand-400 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">{num}</div>
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  )
}

export default function ReportPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [rapor, setRapor] = useState<any>(null)
  const [meta, setMeta] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const handlePrint = () => {
    const title = document.title
    document.title = (meta?.firma_adi || 'Rapor') + ' — BilancoSkor Raporu'
    window.print()
    setTimeout(() => { document.title = title }, 1000)
  }
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/auth'); return }
      const { data, error } = await supabase.from('reports').select('*').eq('id', params.id).eq('user_id', session.user.id).single()
      if (error || !data) { setError('Rapor bulunamadı.'); setLoading(false); return }
      setMeta(data)
      setRapor(data.rapor_json)
      setLoading(false)
    }
    load()
  }, [params.id, router])

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="3"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    </div>
  )

  if (error || !rapor) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center"><p className="text-gray-500 mb-4">{error || 'Rapor yüklenemedi.'}</p><Link href="/dashboard" className="btn-primary">Hesabıma dön</Link></div>
    </div>
  )

  const oz = rapor.firma_ozet || {}
  const gunKaldi = meta?.expires_at ? gun(meta.expires_at) : 0
  const kategoriler = ['likidite', 'sermaye yapısı', 'kârlılık', 'faaliyet etkinliği', 'borç ödeme kapasitesi']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">

        {/* BAŞLIK */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{meta?.firma_adi || oz.sirket_adi || 'Rapor'}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {meta?.sektor?.charAt(0).toUpperCase() + meta?.sektor?.slice(1)} sektörü ·{' '}
            {new Date(meta?.created_at).toLocaleDateString('tr-TR')} ·{' '}
            <span className={gunKaldi <= 1 ? 'text-red-400 font-medium' : 'text-amber-500'}>{gunKaldi} gün erişim kaldı</span>
          </p>
        </div>

        {/* 1. YÖNETİCİ ÖZETİ */}
        <div className="card">
          <Bolum num="1" title="Yönetici Özeti" />
          <div className="flex items-center gap-6 p-5 bg-gray-50 rounded-2xl mb-5">
            <div className="w-24 h-24 rounded-full border-[3px] border-brand-400 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-4xl font-semibold text-brand-400 leading-none">{rapor.skor}</span>
              <span className={`text-sm font-semibold ${HARF_CLS[rapor.harf] || 'text-gray-500'}`}>{rapor.harf}</span>
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold text-gray-900 mb-1">{rapor.kredi_band}</div>
              <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                {rapor.skor >= 85 ? 'Finansal yapınız mükemmel düzeydedir. Bankalar en iyi koşullarla kredi açar.' :
                 rapor.skor >= 75 ? 'Finansal yapınız güçlüdür. Uygun koşullarda kredi kullanabilirsiniz.' :
                 rapor.skor >= 65 ? 'Finansal yapınız iyi düzeydedir. Bankalar kredi açar ancak teminat talep edebilir.' :
                 rapor.skor >= 55 ? 'Finansal yapınızda iyileştirme alanları var. Teminat zorunluluğu olacaktır.' :
                 'Finansal yapınızda önemli zayıflıklar var. İyileştirme yapılması önerilir.'}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span>Tahmini limit: <strong className="text-brand-400">{rapor.kredi_limit_aciklama}</strong></span>
                <span className="text-gray-300">·</span>
                <span>Teminat: <strong className="text-gray-700">{rapor.teminat_aciklama}</strong></span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center">
            {[
              {k:'Likidite',p:rapor.likidite_puan,m:22},
              {k:'Sermaye',p:rapor.sermaye_puan,m:24},
              {k:'Kârlılık',p:rapor.karlilik_puan,m:26},
              {k:'Faaliyet',p:rapor.faaliyet_puan,m:18},
              {k:'Borç öd.',p:rapor.borc_puan,m:16},
            ].map(x => (
              <div key={x.k} className="bg-white border border-gray-100 rounded-xl p-3">
                <div className="text-xs text-gray-400 mb-1">{x.k}</div>
                <div className="text-base font-semibold text-gray-900">{x.p}</div>
                <div className="text-xs text-gray-400">/ {x.m}</div>
                <div className="mt-1.5 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-brand-400 rounded-full transition-all" style={{width:`${Math.min(100,(x.p/x.m)*100)}%`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. GÜÇLÜ YÖNLER */}
        {rapor.guclu_yonler?.length > 0 && (
          <div className="card">
            <Bolum num="2" title="Güçlü Yönler" />
            <div className="space-y-2">
              {rapor.guclu_yonler.map((g: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-brand-50 rounded-xl">
                  <div className="w-5 h-5 rounded-full bg-brand-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <span className="text-sm text-gray-700">{typeof g === 'string' ? g : g.baslik || g.aciklama}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. ZAYIF YÖNLER */}
        {rapor.zayif_yonler?.length > 0 && (
          <div className="card">
            <Bolum num="3" title="Zayıf Yönler / Uyarılar" />
            <div className="space-y-3">
              {rapor.kirmizi_bayraklar?.map((b: any, i: number) => (
                <div key={`kb-${i}`} className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                  <div className="flex items-start gap-3"><div className="w-4 h-4 rounded-full bg-red-400 flex-shrink-0 mt-0.5"/><span className="text-sm font-medium text-red-700">{b.mesaj}</span></div>
                </div>
              ))}
              {rapor.zayif_yonler.map((z: any, i: number) => {
                const mesaj = typeof z === 'string' ? z : z.mesaj
                const adimlar = typeof z === 'object' ? (z.nasil_duzeltilir || z.iyilestir || []) : []
                const seviye = typeof z === 'object' ? z.seviye : ''
                return (
                  <div key={i} className={`p-4 rounded-2xl border ${seviye === 'kritik' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`w-4 h-4 rounded-full flex-shrink-0 mt-0.5 ${seviye === 'kritik' ? 'bg-red-400' : 'bg-amber-400'}`}/>
                      <span className="text-sm text-gray-700">{mesaj}</span>
                    </div>
                    {adimlar.length > 0 && (
                      <div className="ml-7 mt-2">
                        <div className="text-xs font-medium text-gray-500 mb-1.5">Nasıl düzeltilir:</div>
                        <ul className="space-y-1">
                          {adimlar.map((a: string, j: number) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                              <span className="text-brand-400 mt-0.5">·</span>{a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 4. SKOR BANDI */}
        <div className="card">
          <Bolum num="4" title="Skor Bandı — Kredi Limiti ve Teminat Yapısı" />
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-4 text-xs font-medium text-gray-400 bg-gray-50 px-4 py-2.5">
              <span>Bant / Skor</span><span>Limit hesabı</span><span>Teminat yapısı</span><span>KGF</span>
            </div>
            {[
              ['AAA','85–100','FAVÖK × 3','Kişisel kefalet','Opsiyonel'],
              ['AA','75–84','FAVÖK × 2.5','Kefalet + POS/çek','Opsiyonel'],
              ['A','65–74','FAVÖK × 2','Kefalet + çek temliki','Önerilen'],
              ['BBB','55–64','Teminat bazlı','KGF + kısmi ipotek','Zorunlu'],
              ['BB','45–54','Teminat bazlı','1. derece ipotek','Zorunlu'],
              ['B','35–44','Teminat bazlı','Tam ipotek + bloke','Zorunlu'],
              ['D','0–34','—','Kredi verilmez','—'],
            ].map(([b,s,l,t,k]) => {
              const aktif = rapor.harf === b
              return (
                <div key={b} className={`grid grid-cols-4 text-xs px-4 py-3 border-t border-gray-50 ${aktif ? 'bg-brand-50' : ''}`}>
                  <span className={`font-semibold ${aktif ? 'text-brand-600' : 'text-gray-700'}`}>{b} {aktif && '◄'} {s}</span>
                  <span className="text-gray-600">{l}</span>
                  <span className="text-gray-500">{t}</span>
                  <span className="text-gray-500">{k}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 5. KREDİ TÜRÜ ÖNERİSİ */}
        {rapor.kredi_turu && (
          <div className="card">
            <Bolum num="5" title="Kredi Türü Önerisi" />
            <div className="p-5 bg-brand-50 border border-brand-100 rounded-2xl mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-brand-600 bg-brand-100 px-2.5 py-1 rounded-full">Önerilen</span>
                <span className="text-base font-semibold text-gray-900">{rapor.kredi_turu.birincil_tur}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">{rapor.kredi_turu.birincil_aciklama}</p>
              {rapor.kredi_turu.birincil_miktar && (
                <div className="text-sm font-medium text-brand-600">{rapor.kredi_turu.birincil_miktar}</div>
              )}
              {rapor.kredi_turu.neden && (
                <p className="text-xs text-gray-500 mt-2">{rapor.kredi_turu.neden}</p>
              )}
            </div>
            {rapor.kredi_turu.alternatif_turler?.length > 0 && (
              <div className="space-y-2">
                {rapor.kredi_turu.alternatif_turler.map((a: any, i: number) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">Alternatif</span>
                      <span className="text-sm font-semibold text-gray-900">{a.tur}</span>
                    </div>
                    <p className="text-xs text-gray-500">{a.aciklama}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. NAKİT AKIŞ ANALİZİ */}
        {rapor.nakit_akis && (
          <div className="card">
            <Bolum num="6" title="Nakit Akış ve Borç Servisi Analizi" />
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                ['Aylık işletme kârı (FAVÖK/12)', rapor.nakit_akis.aylik_favok_fmt],
                ['Mevcut aylık borç servisi', rapor.nakit_akis.mevcut_borc_servisi_fmt],
              ].map(([k,v]) => (
                <div key={k} className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-1">{k}</div>
                  <div className="text-lg font-semibold text-gray-900">{v}</div>
                </div>
              ))}
            </div>
            <div className={`p-4 rounded-2xl border ${
              rapor.nakit_akis.kapasite_degerlendirmesi === 'kritik' ? 'bg-red-50 border-red-100' :
              rapor.nakit_akis.kapasite_degerlendirmesi === 'uyari' ? 'bg-amber-50 border-amber-100' :
              'bg-brand-50 border-brand-100'
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-xl">{rapor.nakit_akis.kapasite_degerlendirmesi === 'kritik' ? '⚠' : rapor.nakit_akis.kapasite_degerlendirmesi === 'uyari' ? '⚠' : '✓'}</span>
                <p className="text-sm text-gray-700">{rapor.nakit_akis.yorum}</p>
              </div>
            </div>
          </div>
        )}

        {/* 7. RASYO ANALİZLERİ */}
        {rapor.rasyolar?.length > 0 && (
          <div className="card">
            <Bolum num="7" title={`Rasyo Analizleri — ${rapor.rasyolar.length} Rasyo, Kategori Bazlı`} />
            <div className="space-y-3">
              {['likidite','sermaye yapısı','kârlılık','faaliyet etkinliği','borç ödeme kapasitesi'].map(kat => {
                const liste = rapor.rasyolar.filter((r: any) => {
                  const k = (r.kategori || '').toLowerCase()
                  return k === kat || k === kat.replace(' yapısı','').replace(' etkinliği','').replace(' ödeme kapasitesi','') ||
                    (kat === 'sermaye yapısı' && k === 'sermaye') ||
                    (kat === 'faaliyet etkinliği' && k === 'faaliyet') ||
                    (kat === 'borç ödeme kapasitesi' && k === 'borc') ||
                    (kat === 'kârlılık' && k === 'karlilik')
                })
                if (!liste.length) return null
                const puan = liste.reduce((s: number, r: any) => s + (r.puan || 0), 0)
                const maxPuan = liste.reduce((s: number, r: any) => s + (r.max_puan || 0), 0)
                return (
                  <div key={kat} className="border border-gray-100 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                      <span className="text-sm font-semibold text-gray-900">{KAT_TR[kat] || kat}</span>
                      <span className="text-sm font-semibold text-brand-400">{Math.round(puan)}/{maxPuan}p</span>
                    </div>
                    {liste.map((r: any, i: number) => {
                      const bs = BANT_STYLE[r.bant] || BANT_STYLE.orta
                      return (
                        <div key={i} className="px-4 py-4 border-t border-gray-50">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium text-gray-900">{r.ad}</span>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-sm font-semibold text-gray-900">{r.deger_fmt}</span>
                              {r.sektor_ort && <span className="text-xs text-gray-400">ort: {r.sektor_ort}</span>}
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${bs.cls}`}>{bs.label}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{r.aciklama}</p>
                          {r.iyilestirme_adimlari?.length > 0 && (
                            <ul className="space-y-0.5">
                              {r.iyilestirme_adimlari.slice(0, 2).map((a: string, j: number) => (
                                <li key={j} className="flex items-start gap-2 text-xs text-gray-400">
                                  <span className="text-brand-400 flex-shrink-0">·</span>{a}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 8. SENARYO MOTORU */}
        {rapor.senaryolar?.length > 0 && (
          <div className="card">
            <Bolum num="8" title="Senaryo Motoru" />
            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 mb-5">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Mevcut</div>
                <div className="text-3xl font-semibold text-gray-400">{rapor.skor}</div>
                <div className="text-sm text-gray-400">{rapor.harf}</div>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div className="h-px flex-1 bg-gray-200"/>
                <span className="text-xs text-gray-400">aksiyonlar</span>
                <div className="h-px flex-1 bg-brand-400"/>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Potansiyel</div>
                <div className="text-3xl font-semibold text-brand-400">
                  {Math.min(100, rapor.skor + rapor.senaryolar.reduce((s: number, a: any) => s + (a.skor_delta || 0), 0))}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {rapor.senaryolar.map((s: any, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100">
                  <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold flex items-center justify-center flex-shrink-0">{i+1}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-0.5">{s.aciklama}</div>
                    {s.yeni_limit_aciklama && <div className="text-xs text-gray-400">Yeni limit: {s.yeni_limit_aciklama}</div>}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-semibold text-brand-400">+{s.skor_delta}</div>
                    <div className="text-xs text-gray-400">{s.yeni_harf}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. BANKA GÖRÜŞME SORULARI */}
        {rapor.banka_sorulari?.length > 0 && (
          <div className="card">
            <Bolum num="9" title="Banka Görüşme Soruları" />
            <div className="space-y-4">
              {rapor.banka_sorulari.map((s: any, i: number) => (
                <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-600">{s.kategori}</span>
                    {s.skor_etkisi && <span className="text-xs text-brand-500">{s.skor_etkisi}</span>}
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">{s.soru}</p>
                    <div className="bg-amber-50 rounded-xl p-3 mb-3">
                      <div className="text-xs font-medium text-amber-700 mb-1">Bankacının amacı:</div>
                      <p className="text-xs text-gray-600">{s.bankacinin_amaci}</p>
                    </div>
                    <div className="bg-brand-50 rounded-xl p-3">
                      <div className="text-xs font-medium text-brand-600 mb-1">Hazır cevap:</div>
                      <p className="text-xs text-gray-600">{s.hazir_cevap}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. BANKA BAŞVURU HAZIRLIĞI */}
        {rapor.banka_hazirlik && (
          <div className="card">
            <Bolum num="10" title="Banka Başvuru Hazırlığı" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Hazırlanacak Belgeler</div>
                <ul className="space-y-2">
                  {(rapor.banka_hazirlik.belgeler || []).map((b: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Dikkat Edilecekler</div>
                <ul className="space-y-2">
                  {(rapor.banka_hazirlik.dikkat_edilecekler || []).map((d: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-amber-500 font-bold flex-shrink-0">!</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 11. AKSİYON ZAMAN ÇİZELGESİ */}
        {rapor.zaman_cizelgesi?.length > 0 && (
          <div className="card">
            <Bolum num="11" title="Aksiyon Zaman Çizelgesi" />
            <div className="space-y-4">
              {rapor.zaman_cizelgesi.map((z: any, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-brand-400 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">{i+1}</div>
                    {i < rapor.zaman_cizelgesi.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-2"/>}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="text-sm font-semibold text-gray-900 mb-2">{z.donem}</div>
                    <ul className="space-y-1 mb-2">
                      {(z.aksiyonlar || []).map((a: string, j: number) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="text-brand-400 mt-0.5">→</span>{a}
                        </li>
                      ))}
                    </ul>
                    {z.beklenen_etki && (
                      <div className="text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1.5 rounded-lg inline-block">
                        Beklenen etki: {z.beklenen_etki}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. BİLANÇO ÖZETİ */}
        {oz && (
          <div className="card">
            <Bolum num="6" title="Bilanço Özeti" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                ['Toplam Aktif', oz.toplam_aktif],
                ['Net Satışlar', oz.net_satislar],
                ['FAVÖK', oz.favok],
                ['Net Kâr', oz.net_kar],
                ['Dönen Varlıklar', oz.donen_varliklar],
                ['Duran Varlıklar', oz.duran_varliklar],
                ['KV Borçlar', oz.kv_borclar],
                ['UV Borçlar', oz.uv_borclar],
                ['Özkaynaklar', oz.ozkaynaklar],
                ['Nakit', oz.nakit],
              ].filter(([,v]) => v).map(([k,v]) => (
                <div key={k as string} className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-500 mb-1">{k}</div>
                  <div className="text-sm font-semibold text-gray-900">{fmt(v as number)} ₺</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 12. YASAL UYARI */}
        <div className="bg-gray-50 rounded-2xl p-5 text-xs text-gray-400 leading-relaxed space-y-1">
          <p className="font-semibold text-gray-500 mb-2">12 · Yasal Uyarı</p>
          <p>1. Tahmini analiz: KrediSkor ve limit tahminleri herhangi bir bankanın kararını temsil etmez.</p>
          <p>2. Banka bağımsızlığı: Her bankanın kendi metodolojisi ve risk iştahı farklıdır.</p>
          <p>3. Veri doğruluğu: Analizin kalitesi yüklenen mizanın doğruluğuna bağlıdır.</p>
          <p>4. Mali müşavir: Bu rapor SMMM veya YMM görüşünün yerine geçmez.</p>
          <p>5. Nitel faktörler: Yönetim kalitesi ve sektör görünümü de kredi kararını etkiler.</p>
          <p>6. Güncellik: Bu analiz raporun üretildiği tarih itibarıyla geçerlidir.</p>
        </div>

        {/* ALT BUTONLAR */}
        <div className="flex gap-3 pb-10 print:hidden">
          <button onClick={handlePrint} className="btn-primary flex-1 py-3 flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            PDF indir
          </button>
          <Link href="/dashboard" className="btn-outline flex-1 py-3 text-center">Hesabıma dön</Link>
        </div>

      </div>
    </div>
  )
}
