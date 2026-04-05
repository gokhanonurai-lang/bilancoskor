'use client'
import Link from 'next/link'

export default function SampleReportModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-semibold text-gray-900">Bilanco<span className="text-brand-400">Skor</span></span>
              <span className="text-gray-300 text-xs">·</span>
              <span className="text-xs text-gray-500">Finansal Analiz Raporu</span>
              <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium ml-1">Örnek</span>
            </div>
            <div className="text-xs text-gray-400">ABC Ticaret A.Ş. · Ticaret Sektörü · 2024</div>
          </div>
          <div className="flex items-center gap-3">
            
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* 1. YÖNETİCİ ÖZETİ */}
          <section>
            <ST num="1" title="Yönetici Özeti" />
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-5 mb-5">
                <div className="w-24 h-24 rounded-full border-[3px] border-brand-400 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-4xl font-semibold text-brand-400 leading-none">68</span>
                  <span className="text-sm font-medium text-brand-400">A</span>
                </div>
                <div className="flex-1">
                  <div className="text-base font-semibold text-gray-900 mb-1">İyi — Kredi onayı büyük olasılıkla</div>
                  <div className="text-sm text-gray-500 mb-3 leading-relaxed">Finansal yapı iyi düzeydedir ancak likidite ve sermaye yapısında iyileştirme gereklidir. A notu ile bankalar kredi açacaktır, ancak teminat talep edebilirler.</div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span>Tahmini limit: <strong className="text-brand-400">3,700,000 ₺</strong></span>
                    <span className="text-gray-300">·</span>
                    <span>Teminat: <strong className="text-gray-700">Kefalet + çek temliki</strong></span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 text-center">
                {[{k:'Likidite',p:8.3,m:22},{k:'Sermaye',p:9.7,m:24},{k:'Kârlılık',p:21.4,m:26},{k:'Faaliyet',p:13.8,m:18},{k:'Borç öd.',p:14.6,m:16}].map(x => (
                  <div key={x.k} className="bg-white rounded-xl p-3">
                    <div className="text-xs text-gray-400 mb-1">{x.k}</div>
                    <div className="text-base font-semibold text-gray-900">{x.p}</div>
                    <div className="text-xs text-gray-400">/ {x.m}</div>
                    <div className="mt-2 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div className="h-full bg-brand-400 rounded-full" style={{width:`${(x.p/x.m)*100}%`}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 2. GÜÇLÜ YÖNLER */}
          <section>
            <ST num="2" title="Güçlü Yönler" />
            <div className="space-y-2">
              {[
                'FAVÖK marjı %15.0 — sektör ortalamasının (%9.0) 67% üzerinde. Her 100 ₺ satıştan 15 ₺ işletme kârı kalıyor.',
                'ROE %25.9 — sektör ortalamasının (%15.0) 73% üzerinde. Her 100 ₺ sermaye 25.9 ₺ getiri üretiyor.',
                'Faiz karşılama 5.00x — sektör ortalamasının (3.20x) üzerinde. Borç servisi güvende.',
                'Net Borç/FAVÖK 1.03x — sektör ortalamasının (2.80x) çok altında. Mevcut borçlar 1 yılda kapanabilir.',
                'Stok devir hızı 14.57x — stoklarınız yılda 14.6 kez dönüyor, ortalama 25 günde bir.',
              ].map(g => (
                <div key={g} className="flex items-start gap-3 p-3 bg-brand-50 rounded-xl">
                  <div className="w-4 h-4 rounded-full bg-brand-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">{g}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. ZAYIF YÖNLER */}
          <section>
            <ST num="3" title="Zayıf Yönler / Uyarılar" />
            <div className="space-y-3">
              {[
                { seviye: 'kritik', mesaj: 'Cari oran 1.14x — sektör ortalamasının (1.65x) 31% altında. Kısa vadeli borç karşılama kapasitesi yetersiz.', iyilestir: ['KV kredileri uzun vadeye çevirin','Vadesi geçmiş alacakları tahsil edin','Yavaş dönen stokları eriyin'] },
                { seviye: 'uyari', mesaj: 'Asit-test oranı 0.85x — stoksuz likidite baskısı var.', iyilestir: ['Alacak tahsilatını hızlandırın','Stok seviyesini düşürün'] },
                { seviye: 'kritik', mesaj: 'Borç/Özkaynak 2.05x — sektör ortalamasının (1.80x) üzerinde. Bankalar teminat talep eder.', iyilestir: ['Ortaklar cariyi sermayeye ekleyin — en hızlı yöntem','Kâr dağıtımı yapmayın, özkaynak büyüsün','Nakdi sermaye artırımı yapın'] },
                { seviye: 'uyari', mesaj: 'KV Borç/Toplam Borç %62.8 — her yıl büyük borç yenileme ihtiyacı var.', iyilestir: ['KV kredilerin yarısını uzun vadeye çevirin','Rotatif krediyi yatırım kredisine dönüştürün'] },
                { seviye: 'uyari', mesaj: 'Ortaklar cari toplam pasifin %10\'u — bankalar bu tutarı borç olarak görüyor.', iyilestir: ['Ortaklar cariyi sermayeye ekleyin — hem bu oranı hem Borç/Özkaynak\'ı aynı anda iyileştirir'] },
              ].map((z, i) => (
                <div key={i} className={`rounded-2xl p-4 border ${z.seviye === 'kritik' ? 'border-red-100 bg-red-50' : 'border-amber-100 bg-amber-50'}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${z.seviye === 'kritik' ? 'bg-red-400' : 'bg-amber-400'}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white"/>
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{z.mesaj}</span>
                  </div>
                  {z.iyilestir.length > 0 && (
                    <div className="ml-7 space-y-1.5">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Nasıl düzeltilir:</div>
                      {z.iyilestir.map(adim => (
                        <div key={adim} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="text-brand-400 flex-shrink-0 font-semibold">·</span>
                          {adim}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 4. SKOR BANDI */}
          <section>
            <ST num="4" title="Skor Bandı — Kredi Limiti ve Teminat Yapısı" />
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-4 text-xs font-medium text-gray-400 bg-gray-50 px-4 py-2.5">
                <span>Bant / Skor</span><span>Limit hesabı</span><span>Teminat yapısı</span><span>KGF</span>
              </div>
              {[
                ['AAA  85–100','FAVÖK × 3','Kişisel kefalet','Opsiyonel',false],
                ['AA   75–84','FAVÖK × 2.5','Kefalet + POS/çek','Opsiyonel',false],
                ['A    65–74 ◄','FAVÖK × 2','Kefalet + çek temliki','Önerilen',true],
                ['BBB  55–64','Teminat bazlı','KGF + kısmi ipotek','Zorunlu',false],
                ['BB   45–54','Teminat bazlı','1. derece ipotek','Zorunlu',false],
                ['B    35–44','Teminat bazlı','Tam ipotek + bloke','Zorunlu',false],
                ['D    0–34','—','Kredi verilmez','—',false],
              ].map(([b,l,t,k,a]) => (
                <div key={b as string} className={`grid grid-cols-4 text-xs px-4 py-3 border-t border-gray-50 ${a?'bg-brand-50':''}`}>
                  <span className={`font-semibold ${a?'text-brand-600':'text-gray-700'}`}>{b}</span>
                  <span className="text-gray-600">{l}</span>
                  <span className="text-gray-500">{t}</span>
                  <span className="text-gray-500">{k}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 p-3 bg-brand-50 rounded-xl text-xs text-brand-700">
              Teminat araçları: Kişisel kefalet · Alacak çekleri / senet temliki · Fatura temliki · KGF kefaleti · Araç / iş makinesi rehni
            </div>
          </section>

          {/* 5. KREDİ TÜRÜ */}
          <section>
            <ST num="5" title="Kredi Türü Önerisi" />
            <div className="card mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full">Önerilen</span>
                <span className="text-sm font-semibold text-gray-900">Rotatif (Döner) Kredi</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">Nakit dönüşüm süreniz 41 gün — paranız stok ve alacakta bağlı. Rotatif kredi ihtiyaç duydukça çekip geri ödeyebildiğiniz esnek araçtır. Stok alımı ve işletme giderleri için idealdir.</p>
              <div className="text-sm">Tahmini ihtiyaç: <strong className="text-gray-900">1,770,000 – 2,655,000 ₺</strong></div>
            </div>
            {[
              {tur:'Faktoring', desc:'Ticari alacaklarınız 3,500,000 ₺. Alacakları vadesi gelmeden nakde çevirebilirsiniz.'},
              {tur:'Çek / Senet İskontosu', desc:'Müşteri çeklerini vadesi gelmeden bankaya iskonto ettirerek nakit elde edin.'},
              {tur:'KGF Destekli Kredi', desc:'Teminat yetersizliği durumunda KGF kefaleti ile limiti artırabilirsiniz.'},
            ].map(a => (
              <div key={a.tur} className="flex gap-3 p-3 bg-gray-50 rounded-xl mb-2">
                <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full h-fit flex-shrink-0">Alternatif</span>
                <div><div className="text-sm font-medium text-gray-800 mb-0.5">{a.tur}</div><div className="text-xs text-gray-500">{a.desc}</div></div>
              </div>
            ))}
          </section>

          {/* 6. NAKİT AKIŞ */}
          <section>
            <ST num="6" title="Nakit Akış ve Borç Servisi Analizi" />
            <div className="card">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <M label="Aylık işletme kârı (FAVÖK/12)" value="425,000 ₺" />
                <M label="Mevcut aylık borç servisi (tah.)" value="320,345 ₺" sub="%75 FAVÖK kullanımı" />
                <M label="Yeni kredi aylık taksiti (tah.)" value="182,350 ₺" />
                <M label="Toplam aylık borç servisi" value="502,695 ₺" sub="%118 FAVÖK kullanımı" warn />
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <div className="text-sm font-semibold text-red-600 mb-1">⚠ KRİTİK — Borç servisi kapasitesi aşılıyor</div>
                <div className="text-xs text-red-500 leading-relaxed">Aylık kârınızın %118'i borç servisine gidecek. Önce mevcut borcu azaltmanızı veya FAVÖK'ü artırmanızı öneririz.</div>
              </div>
              <div className="text-xs text-gray-400 mt-2">* 36 ay vade ve tahmini faiz oranı baz alınarak hesaplanmıştır.</div>
            </div>
          </section>

          {/* 7. RASYO ANALİZLERİ */}
          <section>
            <ST num="7" title="Rasyo Analizleri — 19 Rasyo, Kategori Bazlı" />
            <div className="space-y-4">
              <KB baslik="Likidite" puan={8.3} max={22} rasyolar={[
                {ad:'Cari oran',deger:'1.14x',ort:'1.65x',bant:'zayif',desc:'Her 1 ₺ kısa vadeli borca karşı 1.14 ₺ dönen varlık var. Marj çok dar.',iyilestir:['KV kredileri uzun vadeye çevirin','Vadesi geçmiş alacakları tahsil edin']},
                {ad:'Asit-test oranı',deger:'0.85x',ort:'1.10x',bant:'zayif',desc:'Stoksuz kısa vadeli borç karşılama güçleşiyor.',iyilestir:['Alacak tahsilatını hızlandırın']},
                {ad:'Nakit oranı',deger:'0.21x',ort:'0.28x',bant:'iyi',desc:'Nakit pozisyonu makul, acil ödemeleri karşılayabilir.',iyilestir:[]},
              ]}/>
              <KB baslik="Sermaye Yapısı" puan={9.7} max={24} rasyolar={[
                {ad:'Borç / Özkaynak',deger:'2.05x',ort:'1.80x',bant:'zayif',desc:'Her 1 ₺ özkaynağa karşı 2.05 ₺ borç. Bankalar teminat talep eder.',iyilestir:['Ortaklar cariyi sermayeye ekleyin','Kâr dağıtımı yapmayın']},
                {ad:'Finansal kaldıraç',deger:'3.05x',ort:'2.80x',bant:'orta',desc:'Varlıkların %33\'ü özkaynaklardan karşılanıyor.',iyilestir:['Kullanılmayan varlıkları satın']},
                {ad:'KV Borç / Toplam Borç',deger:'%62.8',ort:'%50.0',bant:'zayif',desc:'Borçların büyük kısmı kısa vadeli — yüksek refinansman riski.',iyilestir:['KV kredilerin yarısını UV\'ye çevirin']},
                {ad:'Ortaklar cari / Pasif',deger:'%10.0',ort:'%8.0',bant:'zayif',desc:'Bankalar bu tutarı özkaynak yetersizliği olarak görüyor.',iyilestir:['Ortaklar cariyi sermayeye ekleyin — en hızlı düzelme']},
              ]}/>
              <KB baslik="Kârlılık" puan={21.4} max={26} rasyolar={[
                {ad:'Brüt kâr marjı',deger:'%25.0',ort:'%22.0',bant:'iyi',desc:'Her 100 ₺ satıştan 25 ₺ brüt kâr kalıyor.',iyilestir:[]},
                {ad:'FAVÖK marjı',deger:'%15.0',ort:'%9.0',bant:'mukemmel',desc:'Her 100 ₺ satıştan 15 ₺ FAVÖK — sektörün 67% üzerinde.',iyilestir:[]},
                {ad:'Faaliyet gider oranı',deger:'%10.0',ort:'%12.0',bant:'iyi',desc:'Satışların %10\'u faaliyet giderlerine gidiyor — verimli.',iyilestir:[]},
                {ad:'Net kâr marjı',deger:'%3.5',ort:'%4.0',bant:'orta',desc:'Finansman giderleri net kârı baskılıyor.',iyilestir:['Yüksek faizli kredileri refinanse edin']},
                {ad:'ROE — Özkaynak kârlılığı',deger:'%25.9',ort:'%15.0',bant:'mukemmel',desc:'Her 100 ₺ sermaye 25.9 ₺ getiri üretiyor.',iyilestir:[]},
                {ad:'ROA — Varlık kârlılığı',deger:'%8.5',ort:'%6.0',bant:'iyi',desc:'Her 100 ₺ varlık 8.5 ₺ net kâr üretiyor.',iyilestir:[]},
              ]}/>
              <KB baslik="Faaliyet Etkinliği" puan={13.8} max={18} rasyolar={[
                {ad:'Stok devir hızı',deger:'14.57x',ort:'9.00x',bant:'mukemmel',desc:'Stoklarınız yılda 14.6 kez dönüyor — ortalama 25 günde bir.',iyilestir:[]},
                {ad:'Alacak tahsil süresi',deger:'37 gün',ort:'45 gün',bant:'iyi',desc:'Alacaklar ortalama 37 günde tahsil ediliyor.',iyilestir:[]},
                {ad:'Nakit dönüşüm süresi',deger:'41 gün',ort:'55 gün',bant:'iyi',desc:'Nakit 41 günde tekrar eldeki paraya dönüyor.',iyilestir:[]},
              ]}/>
              <KB baslik="Borç Ödeme Kapasitesi" puan={14.6} max={16} rasyolar={[
                {ad:'Faiz karşılama',deger:'5.00x',ort:'3.20x',bant:'mukemmel',desc:'FAVÖK faiz giderinin 5 katı — borç servisi güvende.',iyilestir:[]},
                {ad:'Net Borç / FAVÖK',deger:'1.03x',ort:'2.80x',bant:'mukemmel',desc:'Mevcut borçlar yaklaşık 1 yılda kapanabilecek düzeyde.',iyilestir:[]},
                {ad:'Finansman gider oranı',deger:'%3.0',ort:'%4.5',bant:'iyi',desc:'Satışların %3\'ü finansman giderine gidiyor — makul.',iyilestir:[]},
              ]}/>
            </div>
          </section>

          {/* 8. SENARYO MOTORU */}
          <section>
            <ST num="8" title="Senaryo Motoru" />
            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 mb-4">
              <div className="text-center"><div className="text-xs text-gray-500 mb-1">Mevcut skor</div><div className="text-4xl font-semibold text-gray-400">68</div><div className="text-sm text-gray-400">A</div></div>
              <div className="flex-1 flex items-center gap-2"><div className="h-px flex-1 bg-gray-200"/><span className="text-xs text-gray-400">aksiyonlar</span><div className="h-px flex-1 bg-brand-400"/></div>
              <div className="text-center"><div className="text-xs text-gray-500 mb-1">Potansiyel</div><div className="text-4xl font-semibold text-brand-400">92</div><div className="text-sm text-brand-400">AAA</div></div>
            </div>
            <div className="space-y-3">
              {[
                {s:1,desc:'Ortaklar cari hesabını sermayeye ekle',tutar:'1,400,000 ₺',yeni:79,harf:'AA',d:14,z:'Düşük'},
                {s:2,desc:'KV borcun yarısını uzun vadeye çevir',tutar:'1,500,000 ₺',yeni:73,harf:'A',d:8,z:'Orta'},
                {s:3,desc:'Vadesi geçmiş alacakları tahsil et',tutar:'1,750,000 ₺',yeni:71,harf:'A',d:6,z:'Orta'},
                {s:4,desc:'Stokları erit, nakde çevir',tutar:'525,000 ₺',yeni:69,harf:'A',d:4,z:'Orta'},
                {s:5,desc:'Tüm aksiyonları birlikte uygula',tutar:'—',yeni:92,harf:'AAA',d:27,z:'Yüksek'},
              ].map(x => (
                <div key={x.s} className={`flex items-center gap-4 p-4 rounded-xl border ${x.s===5?'border-brand-200 bg-brand-50':'border-gray-100'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${x.s===5?'bg-brand-400 text-white':'bg-brand-50 text-brand-600'}`}>{x.s}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-1">{x.desc}</div>
                    <div className="text-xs text-gray-400">
                      {x.tutar !== '—' && <span>Tutar: <strong className="text-gray-600">{x.tutar}</strong> · </span>}
                      Zorluk: {x.z} · Yeni harf: <strong className="text-brand-400">{x.harf}</strong>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-semibold text-brand-400">+{x.d}</div>
                    <div className="text-xs text-gray-400">puan</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 9. BANKA GÖRÜŞME SORULARI */}
          <section>
            <ST num="9" title="Banka Görüşme Soruları" />
            <div className="space-y-3">
              {[
                {o:'kritik',soru:'Ortaklar cari hesabınızda 1,400,000 ₺ görünüyor. Bu tutar ne zaman kapatılacak?',amac:'Tutarı gerçek borç mu özkaynak mı sayacağına karar veriyor. Yüksekse limit düşer.',cevap:"Bu tutar ortağın geçici fonu olup önümüzdeki dönemde sermayeye ilave edilecektir. Aktarıldığında Borç/Özkaynak 2.05x'ten 1.57x'e düşecektir.",etki:'+8 ile +14 puan'},
                {o:'onemli',soru:'Borçlarınızın %62.8\'i kısa vadeli. Uzun vadeye çevirme planınız var mı?',amac:'Refinansman riskini ölçüyor. Yüksek KV borç şirketi faiz artışlarına karşı kırılgan kılar.',cevap:'KV borçlarımızın bir kısmı döner kredi niteliğinde. Yatırım kredisine dönüştürmek için banka görüşmelerimiz devam ediyor.',etki:'+5 ile +8 puan'},
                {o:'onemli',soru:'Teminat olarak ne gösterebilirsiniz?',amac:'Teminat havuzunu ölçüyor. Likit teminatlar bankacıya çekici gelir.',cevap:'Kişisel kefalet, 3,500,000 ₺ alacak temliki, POS blokesi ve KGF kefaleti sunabiliriz. 3,750,000 ₺ maddi duran varlığımız da mevcuttur.',etki:'Limit ve onay oranını artırır'},
                {o:'bilgi',soru:'En büyük 3 müşteriniz cironuzun yüzde kaçını oluşturuyor?',amac:'Müşteri konsantrasyon riskini ölçüyor.',cevap:'En büyük 3 müşterimiz toplam ciromuzun %35\'ini oluşturuyor. Belirli bir müşteriye bağımlılığımız yok, uzun vadeli sözleşmelerimiz mevcut.',etki:'Bankacı güvenini artırır'},
              ].map((s,i) => (
                <div key={i} className={`rounded-2xl p-4 border ${s.o==='kritik'?'border-red-100 bg-red-50':s.o==='onemli'?'border-amber-100 bg-amber-50':'border-gray-100 bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.o==='kritik'?'bg-red-100 text-red-600':s.o==='onemli'?'bg-amber-100 text-amber-600':'bg-gray-200 text-gray-500'}`}>
                      {s.o==='kritik'?'🚨 Kritik':s.o==='onemli'?'⚠ Önemli':'ℹ Bilgi'}
                    </span>
                    <span className="text-xs text-gray-400">{s.etki}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">{s.soru}</div>
                  <div className="text-xs text-gray-500 mb-2"><span className="font-medium">Bankacının amacı:</span> {s.amac}</div>
                  <div className="text-xs text-brand-700 bg-brand-50 rounded-xl px-3 py-2.5 border border-brand-100 leading-relaxed">
                    <span className="font-medium">Hazır cevap:</span> {s.cevap}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 10. BANKA BAŞVURU HAZIRLIĞI */}
          <section>
            <ST num="10" title="Banka Başvuru Hazırlığı" />
            <div className="grid grid-cols-2 gap-4">
              <div className="card">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Hazırlanacak Belgeler</div>
                {['Son 2 yıl vergi levhası ve beyanname','Son dönem mizan veya bilanço','Son 3 ay banka hesap özeti (tüm bankalar)','Şirket imza sirküleri ve ticaret sicil gazetesi','Ortaklar ve yöneticilerin kimlik fotokopisi','SGK ve vergi borcu yoktur yazısı','Son dönem sipariş/sözleşme listesi'].map(b => (
                  <div key={b} className="flex items-center gap-2 py-1.5 text-xs text-gray-600">
                    <div className="w-3.5 h-3.5 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                      <svg width="6" height="5" viewBox="0 0 6 5" fill="none"><path d="M1 2.5L2.5 4L5 1" stroke="#1D9E75" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    </div>
                    {b}
                  </div>
                ))}
              </div>
              <div className="card">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Dikkat Edilecekler</div>
                {['Bankaya gitmeden önce Findeks notunuzu kontrol edin','Tüm ortakların kredi sicili temiz olmalı','Vergi ve SGK borcu varsa başvuru öncesi ödeyin','Birden fazla bankaya aynı anda başvurmayın','Bu raporu destekleyici belge olarak sunabilirsiniz'].map(d => (
                  <div key={d} className="flex items-start gap-2 py-1.5 text-xs text-gray-600">
                    <span className="text-amber-500 flex-shrink-0 font-medium">!</span>{d}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 11. ZAMAN ÇİZELGESİ */}
          <section>
            <ST num="11" title="Aksiyon Zaman Çizelgesi" />
            <div className="space-y-3">
              {[
                {donem:'Hemen (1–4 hafta)',r:'bg-red-50 border-red-100',t:'text-red-600',
                  a:['Findeks raporu al, kişisel kredi sicilini kontrol et','Vergi ve SGK borcu varsa öde veya yapılandır','Banka başvurusu için gerekli belgeler toparla'],
                  e:'Kırmızı bayrakların temizlenmesi'},
                {donem:'Kısa vadeli (1–3 ay)',r:'bg-amber-50 border-amber-100',t:'text-amber-600',
                  a:['Ortaklar cari (1,400,000 ₺) sermayeye ekle','Seçilen 1–2 bankaya ön görüşme talebi ilet','Vadesi geçmiş alacaklar için tahsilat başlat'],
                  e:'Skor A → AA, kredi limiti artışı'},
                {donem:'Orta vadeli (3–6 ay)',r:'bg-blue-50 border-blue-100',t:'text-blue-600',
                  a:['KV borcun yarısını uzun vadeye çevir','Kâr dağıtımı yapmayarak özkaynak büyüt','Sermaye artırımı planını değerlendir'],
                  e:'Sermaye yapısı iyileşmesi'},
                {donem:'Uzun vadeli (6–12 ay)',r:'bg-brand-50 border-brand-100',t:'text-brand-600',
                  a:['Düzenli aylık finansal raporlama sistemi kur','Bir sonraki dönem için AAA hedefle','Limit artırım başvurusu değerlendir'],
                  e:'Sürdürülebilir finansal sağlık'},
              ].map(d => (
                <div key={d.donem} className={`rounded-2xl p-4 border ${d.r}`}>
                  <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${d.t}`}>{d.donem}</div>
                  {d.a.map(x => (
                    <div key={x} className="flex items-start gap-2 text-sm text-gray-700 mb-1.5">
                      <span className="text-gray-400 flex-shrink-0">→</span>{x}
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">Beklenen etki: {d.e}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 12. YASAL UYARI */}
          <section>
            <ST num="12" title="Yasal Uyarı" />
            <div className="bg-gray-50 rounded-2xl p-4 text-xs text-gray-400 leading-relaxed space-y-1.5">
              <p><strong className="text-gray-500">1. Tahmini analiz:</strong> KrediSkor ve limit tahminleri herhangi bir bankanın kararını temsil etmez.</p>
              <p><strong className="text-gray-500">2. Banka bağımsızlığı:</strong> Her bankanın kendi metodolojisi ve risk iştahı farklıdır.</p>
              <p><strong className="text-gray-500">3. Veri doğruluğu:</strong> Analizin kalitesi yüklenen mizanın doğruluğuna bağlıdır.</p>
              <p><strong className="text-gray-500">4. Mali müşavir:</strong> Bu rapor SMMM veya YMM görüşünün yerine geçmez.</p>
              <p><strong className="text-gray-500">5. Nitel faktörler:</strong> Yönetim kalitesi ve sektör görünümü de kredi kararını etkiler.</p>
              <p><strong className="text-gray-500">6. Güncellik:</strong> Bu analiz raporun üretildiği tarih itibarıyla geçerlidir.</p>
              <p className="pt-1 border-t border-gray-200">FinSkor bu rapordaki bilgilere dayanılarak alınan kararlardan sorumlu tutulamaz.</p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-end flex-shrink-0 bg-gray-50">
          <p className="text-xs text-gray-400">Bu bir örnek rapordur. Gerçek raporunuz kendi verilerinizle oluşturulur.</p>
          
        </div>
      </div>
    </div>
  )
}

function ST({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-6 rounded-full bg-brand-400 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">{num}</div>
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      <div className="flex-1 h-px bg-gray-100"/>
    </div>
  )
}

function M({ label, value, sub, warn }: { label: string; value: string; sub?: string; warn?: boolean }) {
  return (
    <div className={`rounded-xl p-3 ${warn ? 'bg-red-50' : 'bg-gray-50'}`}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`text-lg font-semibold ${warn ? 'text-red-500' : 'text-gray-900'}`}>{value}</div>
      {sub && <div className={`text-xs mt-0.5 ${warn ? 'text-red-400' : 'text-gray-400'}`}>{sub}</div>}
    </div>
  )
}

const BANT: Record<string, { bg: string; text: string; label: string }> = {
  mukemmel: { bg: 'bg-brand-50', text: 'text-brand-600', label: 'Mükemmel' },
  iyi:      { bg: 'bg-blue-50',  text: 'text-blue-600',  label: 'İyi'       },
  orta:     { bg: 'bg-gray-100', text: 'text-gray-600',  label: 'Orta'      },
  zayif:    { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Zayıf'     },
  kotu:     { bg: 'bg-red-50',   text: 'text-red-500',   label: 'Kötü'      },
}

function KB({ baslik, puan, max, rasyolar }: {
  baslik: string; puan: number; max: number
  rasyolar: { ad: string; deger: string; ort: string; bant: string; desc: string; iyilestir: string[] }[]
}) {
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3 bg-gray-50">
        <span className="text-sm font-semibold text-gray-900">{baslik}</span>
        <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-brand-400 rounded-full" style={{width:`${(puan/max)*100}%`}}/>
        </div>
        <span className="text-xs text-gray-500 font-medium">{puan}/{max}p</span>
      </div>
      {rasyolar.map(r => (
        <div key={r.ad} className="px-5 py-4 border-t border-gray-50">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-gray-900">{r.ad}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">{r.deger}</span>
              <span className="text-xs text-gray-400">ort: {r.ort}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${BANT[r.bant].bg} ${BANT[r.bant].text}`}>{BANT[r.bant].label}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed mb-1.5">{r.desc}</p>
          {r.iyilestir.length > 0 && (
            <div className="space-y-1">
              {r.iyilestir.map(a => (
                <div key={a} className="flex items-start gap-2 text-xs text-gray-400">
                  <span className="text-brand-400 flex-shrink-0">·</span>{a}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
