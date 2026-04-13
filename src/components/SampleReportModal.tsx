'use client'

const BANT: Record<string, { bg: string; text: string; label: string }> = {
  mukemmel: { bg: 'bg-brand-50', text: 'text-brand-600', label: 'Mükemmel' },
  iyi:      { bg: 'bg-blue-50',  text: 'text-blue-600',  label: 'İyi'       },
  orta:     { bg: 'bg-gray-100', text: 'text-gray-600',  label: 'Orta'      },
  zayif:    { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Zayıf'     },
  kotu:     { bg: 'bg-red-50',   text: 'text-red-500',   label: 'Kötü'      },
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
    <div className={`rounded-xl p-3 ${warn ? 'bg-amber-50' : 'bg-gray-50'}`}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`text-lg font-semibold ${warn ? 'text-amber-600' : 'text-gray-900'}`}>{value}</div>
      {sub && <div className={`text-xs mt-0.5 ${warn ? 'text-amber-400' : 'text-gray-400'}`}>{sub}</div>}
    </div>
  )
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
            <div className="text-xs text-gray-400">Örnek Firma · Ticaret Sektörü · 2024</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* 1. YÖNETİCİ ÖZETİ */}
          <section>
            <ST num="1" title="Yönetici Özeti" />
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-5 mb-5">
                <div className="w-24 h-24 rounded-full border-[3px] border-brand-400 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-4xl font-semibold text-brand-400 leading-none">77</span>
                  <span className="text-sm font-medium text-brand-400">AA</span>
                </div>
                <div className="flex-1">
                  <div className="text-base font-semibold text-gray-900 mb-1">Çok iyi — Finansal yapınız güçlüdür. Uygun koşullarda kredi kullanabilirsiniz.</div>
                  <div className="flex flex-wrap gap-4 text-sm mt-2">
                    <span>Tahmini limit: <strong className="text-brand-400">FAVÖK × 2.5x</strong></span>
                    <span className="text-gray-300">·</span>
                    <span>Teminat: <strong className="text-gray-700">Kişisel kefalet + POS blokesi veya alacak çeki temliki</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Sayin Firma Sahibi,</div>
                {[
                  { baslik: 'GENEL DEĞERLENDİRME', metin: 'Şirketinizin 77/100 kredi skoru AA bandında bulunması, finansal güvenilirliğinizin oldukça yüksek seviyede olduğunu gösteriyor. Bu skor, bankaların gözünde düşük riskli kategorisinde yer aldığınız ve kredi başvurularınızda avantajlı konumda bulunduğunuz anlamına geliyor. 15.5 milyon TL net satışlarınız ve 5.9 milyon TL net kârınızla sektörünüzde sağlam bir oyuncu olduğunuz görülüyor. 43.7 milyon TL toplam aktifle yönettiğiniz bu büyüklük, şirketinizin önemli bir işletme olduğunu ortaya koyuyor.' },
                  { baslik: 'VARLIK YAPISI YORUMU', metin: 'Varlık yapınıza bakıldığında, 4.4 milyon TL banka bakiyeniz aktiflerinizin %10.2sini oluşturuyor ki bu makul bir düzeyde nakit tuttuğunuzu gösteriyor. Ancak 10.1 milyon TL ticari alacaklarınız aktiflerinizin %23.1ini teşkil ediyor ve 237 günlük tahsil sürenizle birlikte düşünüldüğünde, müşterilerinizden para toplama konusunda sıkıntı yaşadığınız açık. Bu durum nakit akışınızı ciddi şekilde zorluyor. Stok tutarınız 9.1 milyon TL ile aktiflerinizin %20.8ini oluşturuyor ve stok devir hızınız sadece 0.67x olması, stoklarınızın çok yavaş hareket ettiğini gösteriyor — bu da nakit sıkışıklığına neden olan başka bir faktör. Maddi duran varlığınızın sıfır olması bankaların gözünde teminat yetersizliği olarak değerlendirilebilir.' },
                  { baslik: 'BORÇ VE ÖZKAYNAK YAPISI', metin: 'Borç yapınız incelendiğinde, toplam 8.7 milyon TL banka krediniz bulunuyor ve bunun 4.9 milyon TL si uzun vadeli. Kısa vadeli kredilerinizin toplam borcunuza oranı %72.4 seviyesinde olması, vade uyumsuzluğu riski taşıdığınızı gösteriyor. 357 bin TL ortaklara borcunuz var ki bu tutar nispeten düşük olduğu için bankalar açısından sorun teşkil etmeyecektir. 23.2 milyon TL özkaynaklarınız sağlam durumda ve borç/özkaynak oranınız 0.82x ile kabul edilebilir seviyede. Finansman giderleriniz 249 bin TL ile makul düzeyde kalıyor, faiz yükünüz şu an için kontrol altında.' },
                  { baslik: 'GÜÇLÜ VE ZAYIF YÖNLER', metin: 'En güçlü yanlarınız arasında 1.79x cari oranınız ve %49 FAVÖK marjınız öne çıkıyor — bu karlılık oranı sektörde oldukça başarılı olduğunuzu gösteriyor. Ayrıca 0.82x borç/özkaynak oranınız da finansal dengenizi koruduğunuzu ortaya koyuyor. Ancak en kritik zayıflığınız nakit dönüşüm sürenizin 299 gün olması — bu, paranızın neredeyse 10 ay boyunca stok ve alacaklarda bağlı kaldığı anlamına geliyor. Alacak tahsil süreniz 237 gün ile çok uzun, müşterilerinizden para toplama politikanızı gözden geçirmeniz şart. Stok devir hızınızın 0.67x olması da stoklarınızı nakde çevirme konusunda zorlandığınızı açıkça gösteriyor.' },
                  { baslik: 'KREDİ POTANSİYELİ VE ÖNERİLER', metin: 'Mevcut durumunuzla 10.3 milyon TL kullanılabilir krediniz var ve AA skorunuzla bankalardan uygun koşullarda finansman temin edebilirsiniz. Ancak öncelikle alacak tahsilat sürenizi kısaltmak için müşteri ödemelerinde vade indirimi gibi teşvikler uygulayın, vadesi geçen alacaklar için daha sıkı takip yapın. Stok devir hızınızı artırmak için ürün karmasını gözden geçirin, yavaş hareket eden stokları indirimli satışlarla eritin. Bu iyileştirmeleri yaptığınızda nakit akışınız güçlenecek ve kredi skorunuz daha da yükselecektir. Maddi duran varlık yatırımları yaparak teminat gücünüzü artırmanız, gelecekte daha büyük tutarlarda ve uygun koşullarda kredi kullanabilmenize olanak sağlayacaktır. Genel olarak finansal durumunuz sağlam, sadece işletme sermayesi yönetiminizi iyileştirmeniz gerekiyor.' },
                ].map(({ baslik, metin }) => (
                  <div key={baslik}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-1 h-4 bg-brand-400 rounded-full flex-shrink-0"/>
                      <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{baslik}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{metin}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-5 gap-2 text-center mt-5">
                {[{k:'Likidite',p:14.3,m:22},{k:'Sermaye',p:21.2,m:24},{k:'Kârlılık',p:25.3,m:26},{k:'Faaliyet',p:0,m:18},{k:'Borç öd.',p:16,m:16}].map(x => (
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
                'Nakit oranı: 0.32x — sektör ortalamasının (0.28x) üzerinde. Kasa ve banka bakiyeniz KV borçlarınızın %32sini karşılıyor.',
                'Borç / Özkaynak: 0.82x — sektör ortalamasının (1.80x) üzerinde. Her 1 TL özkaynağa karşı 0.82 TL borç taşıyorsunuz.',
                'Finansal kaldıraç: 1.88x — sektör ortalamasının (2.80x) üzerinde. Toplam varlıklarınızın %53ü özkaynaklardan geliyor.',
                'Ortaklar cari / Toplam pasif: %0.8 — sektör ortalamasının (%8.0) üzerinde. Ortaklara olan borç pasifinizin %0.8i.',
                'Brüt kâr marjı: %60.8 — sektör ortalamasının (%22.0) üzerinde. Her 100 TL satıştan 60.8 TL brüt kâr kalıyor.',
                'FAVÖK marjı: %49.0 — sektör ortalamasının (%9.0) üzerinde. Her 100 TL satıştan 49.0 TL FAVÖK üretiyorsunuz.',
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
                { seviye: 'kritik', mesaj: 'Stok devir hızı: 0.67x — kritik seviyede. Stoklarınız yılda yalnızca 0.7 kez dönüyor — ortalama 545 günde bir. Bu rasyo bankacılık değerlendirmesinde olumsuz etki yaratıyor.', iyilestir: ['Eski ve yavaş dönen stokları indirimli satın', "Stok sipariş miktarlarını düşürün, 'tam zamanında' tedarik modeline geçin", 'Hangi ürünlerin raflarda çürüdüğünü analiz edin, portföyü daraltın'] },
                { seviye: 'kritik', mesaj: 'Alacak tahsil süresi: 237 gün — kritik seviyede. Satışlarınızın bedeli ortalama 237 günde tahsil ediliyor — çok yüksek. Bu rasyo bankacılık değerlendirmesinde olumsuz etki yaratıyor.', iyilestir: ['Gecikmiş alacaklar için aktif takip ve hatırlatma kampanyası başlatın', 'Peşin veya kısa vadeli ödemelere %2–3 iskonto teklif edin', 'Yeni satışlarda vade politikasını sıkılaştırın'] },
                { seviye: 'kritik', mesaj: 'Nakit dönüşüm süresi: 299 gün — kritik seviyede. Nakit döngünüz 299 gün — çok uzun. Bu rasyo bankacılık değerlendirmesinde olumsuz etki yaratıyor.', iyilestir: ['Alacak tahsilini hızlandırın (yukarıdaki adımlar)', 'Stok devir hızını artırın', 'Tedarikçilerle vadeyi uzatın — aynı malı 30 yerine 60 günde ödemek döngüyü kısaltır'] },
                { seviye: 'uyari', mesaj: 'KV Borç / Toplam Borç: %72.4 — zayıf seviyede. Borçlarınızın %72si kısa vadeli. İyileştirme yapılması önerilir.', iyilestir: ['Kısa vadeli kredileri uzun vadeli krediye çevirmek için bankanızla müzakere edin', 'Rotatif (döner) krediyi uzun vadeli yatırım kredisine dönüştürün', 'Tedarikçi borçlarının vadesini uzatmak için ticari anlaşmalar yapın'] },
              ].map((z, i) => (
                <div key={i} className={`rounded-2xl p-4 border ${z.seviye === 'kritik' ? 'border-red-100 bg-red-50' : 'border-amber-100 bg-amber-50'}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${z.seviye === 'kritik' ? 'bg-red-400' : 'bg-amber-400'}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white"/>
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{z.mesaj}</span>
                  </div>
                  <div className="ml-7 space-y-1.5">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Nasıl düzeltilir:</div>
                    {z.iyilestir.map(adim => (
                      <div key={adim} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="text-brand-400 flex-shrink-0 font-semibold">·</span>{adim}
                      </div>
                    ))}
                  </div>
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
                ['AAA','85–100','FAVÖK × 3','Kişisel kefalet','Opsiyonel',false],
                ['AA','75–84','FAVÖK × 2.5','Kefalet + POS/çek','Opsiyonel',true],
                ['A','65–74','FAVÖK × 2','Kefalet + çek temliki','Önerilen',false],
                ['BBB','55–64','Teminat bazlı','KGF + kısmi ipotek','Zorunlu',false],
                ['BB','45–54','Teminat bazlı','1. derece ipotek','Zorunlu',false],
                ['B','35–44','Teminat bazlı','Tam ipotek + bloke','Zorunlu',false],
                ['D','0–34','—','Kredi verilmez','—',false],
              ].map(([b,s,l,t,k,a]) => (
                <div key={b as string} className={`grid grid-cols-4 text-xs px-4 py-3 border-t border-gray-50 ${a?'bg-brand-50':''}`}>
                  <span className={`font-semibold ${a?'text-brand-600':'text-gray-700'}`}>{b} {a&&'◄'} {s}</span>
                  <span className="text-gray-600">{l}</span>
                  <span className="text-gray-500">{t}</span>
                  <span className="text-gray-500">{k}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 5. KREDİ TÜRÜ */}
          <section>
            <ST num="5" title="Kredi Türü Önerisi" />
            <div className="card mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full">Finansman Aracı</span>
                <span className="text-sm font-semibold text-gray-900">Rotatif (Döner) Kredi</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">Rotatif kredi, ihtiyaç duydukça çekip geri ödeyebildiğiniz esnek bir kredi türüdür. Stok alımı, alacak finansmanı ve günlük işletme giderleri için idealdir.</p>
              <div className="text-sm">Tahmini ihtiyaç: <strong className="text-gray-900">4.150.603 – 6.225.905 TL</strong> <span className="text-xs text-gray-400">(KV borçlarınızın yaklaşık %30–50si)</span></div>
              <p className="text-xs text-gray-500 mt-2">Nakit dönüşüm süreniz 299 gün — paranız uzun süre stok ve alacakta bağlı kalıyor. Rotatif kredi bu döngüyü finanse eder.</p>
            </div>
            {[
              {tur:'Taksitli İşletme Kredisi (12–24 ay)', desc:'Duran varlıklarınız 18.918.385 TL. Makine, ekipman veya yapısal yatırımlar için 12–24 ay vadeli taksitli kredi uygundur. Sabit taksitlerle nakit akışı planlaması kolaylaşır. Not: Mevcut yüksek faiz ortamında 36 ay ve üzeri vadeyi tercih etmeyin.'},
              {tur:'Çek / Senet İskontosu', desc:'Alacak tahsil süreniz 237 gün. Müşterilerinizden aldığınız çek ve senetleri vadesi gelmeden bankaya iskonto ettirerek hızlıca nakde çevirebilirsiniz. Düşük maliyetli ve hızlı bir finansman yöntemi.'},
              {tur:'Stok / Emtia Kredisi', desc:'Stoklarınız 9.092.439 TL. Stokları teminat göstererek işletme kredisi kullanabilirsiniz. Stok rehni ile daha yüksek limit almanız mümkün olabilir.'},
              {tur:'Faktoring', desc:'Ticari alacaklarınız 10.084.233 TL ve tahsil süreniz 237 gün. Faktoring ile alacaklarınızı beklemeden nakde çevirebilirsiniz. Banka kredisine alternatif veya tamamlayıcı bir finansman yöntemidir.'},
              {tur:'KGF Destekli Kredi', desc:'Teminat yetersizliği durumunda KGF kefaleti ile banka limitinizi artırabilirsiniz. KGF başvurusu bankanız aracılığıyla yapılır, ek belge gerekmez.'},
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
                <M label="Aylık işletme kârı (FAVÖK/12)" value="634.127 TL" />
                <M label="Mevcut aylık borç servisi" value="428.360 TL" warn />
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <div className="text-sm font-semibold text-amber-600 mb-1">⚠ Yüksek borç servisi oranı</div>
                <div className="text-xs text-amber-600 leading-relaxed">Aylık işletme kârınızın %68i borç servisine gidecek. Bu yüksek bir oran. Satışlarda küçük bir düşüş ödeme güçlüğü yaratabilir. Kredi miktarını azaltmayı veya vadeyi uzatmayı düşünün.</div>
              </div>
            </div>
          </section>

          {/* 7. RASYO ANALİZLERİ */}
          <section>
            <ST num="7" title="Rasyo Analizleri — 19 Rasyo, Kategori Bazlı" />
            <div className="space-y-4">
              <KB baslik="Likidite" puan={14.3} max={22} rasyolar={[
                {ad:'Cari oran',deger:'1.79x',ort:'1.65x',bant:'iyi',desc:'Her 1 TL kısa vadeli borca karşı 1.79 TL dönen varlığınız var. Likidite durumunuz iyi, ancak beklenmedik ödemelere karşı tampon alanınız sınırlı.',iyilestir:['Vadesi geçmiş alacakları tahsil edin — nakit girişi cari oranı anında artırır','Yavaş dönen stokları eritip nakde çevirin']},
                {ad:'Asit-test oranı',deger:'1.14x',ort:'1.10x',bant:'iyi',desc:'Stok dışı dönen varlıklarınız KV borçlarınıza yakın (1.14x). Stoklar satılmasa bile büyük sıkıntı yaşanmaz ama tampon ince.',iyilestir:['Alacak tahsilatını hızlandırın — en doğrudan etki','Stok seviyesini düşürüp nakit tutun']},
                {ad:'Nakit oranı',deger:'0.32x',ort:'0.28x',bant:'iyi',desc:'Kasa ve banka bakiyeniz KV borçlarınızın %32sini karşılıyor. Nakit pozisyonunuz makul. Acil ödemeleri karşılayabilirsiniz.',iyilestir:['Vadesi gelen alacakları öncelikli tahsil edin','Gereksiz stok alımını durdurun, nakit biriktirin']},
              ]}/>
              <KB baslik="Sermaye Yapısı" puan={21.2} max={24} rasyolar={[
                {ad:'Borç / Özkaynak',deger:'0.82x',ort:'1.80x',bant:'mukemmel',desc:'Her 1 TL özkaynağa karşı 0.82 TL borç taşıyorsunuz. Şirketiniz büyük ölçüde özkaynaklarıyla finanse ediliyor. Finansal yapı çok sağlam.',iyilestir:['Ortaklar cari hesabını (331) sermayeye ekleyin — en hızlı ve maliyetsiz yöntem','Dönem kârını dağıtmayın, birikimli özkaynak büyüsün']},
                {ad:'Finansal kaldıraç',deger:'1.88x',ort:'2.80x',bant:'mukemmel',desc:'Toplam varlıklarınızın %53ü özkaynaklardan geliyor. Finansal yapınız sağlam ve kırılganlığa karşı dirençli.',iyilestir:['Borç/Özkaynak iyileştirme adımlarının tamamı burada da geçerli','Kullanılmayan duran varlıkları satıp borç kapatın']},
                {ad:'KV Borç / Toplam Borç',deger:'%72.4',ort:'%58.0',bant:'zayif',desc:'Borçlarınızın %72si kısa vadeli. Bu yüksek bir oran. Sürekli refinansman baskısı ve yüksek faiz riski taşıyor.',iyilestir:['Kısa vadeli kredileri uzun vadeli krediye çevirmek için bankanızla müzakere edin','Rotatif (döner) krediyi uzun vadeli yatırım kredisine dönüştürün']},
                {ad:'Ortaklar cari / Toplam pasif',deger:'%0.8',ort:'%8.0',bant:'mukemmel',desc:'Ortaklara olan borç pasifinizin %0.8i. Bankalar bu hesabı sorun olarak görmüyor.',iyilestir:['Ortaklar cari hesabını sermayeye ilave edin — hem bu oranı hem Borç/Özkaynagi aynı anda iyileştirir','Tutarı gerçekten borçsanız uzun vadeli ortaklar borç senedine bağlayın']},
              ]}/>
              <KB baslik="Kârlılık" puan={25.3} max={26} rasyolar={[
                {ad:'Brüt kâr marjı',deger:'%60.8',ort:'%22.0',bant:'mukemmel',desc:'Her 100 TL satıştan 60.8 TL brüt kâr kalıyor. Temel ticari verimliliğiniz güçlü. Fiyatlandırma ve maliyet yönetiminiz iyi.',iyilestir:['Satış fiyatlarını gözden geçirin — maliyet artışlarını fiyata yansıtın','Tedarikçilerle maliyet müzakeresi yapın']},
                {ad:'FAVÖK marjı',deger:'%49.0',ort:'%9.0',bant:'mukemmel',desc:'Her 100 TL satıştan 49.0 TL FAVÖK üretiyorsunuz. Bu, finansman ve amortisman öncesi operasyonel gücünüzü gösteriyor. Bankalar bunu kredi geri ödeme kapasitesinin en güvenilir göstergesi sayar.',iyilestir:['Satış fiyatlarını güncelleyin — enflasyon ortamında fiyat güncellemesi FAVÖKü hızla artırır','Sabit giderleri (kira, personel) optimize edin']},
                {ad:'Faaliyet gideri oranı',deger:'%11.7',ort:'%12.0',bant:'iyi',desc:'Satışlarınızın %11.7si faaliyet giderlerine gidiyor. Gider yapınız makul. Optimize edilebilecek kalemler olabilir.',iyilestir:['Kira maliyetlerini gözden geçirin — taşınma veya yeniden müzakere','Personel verimliliğini analiz edin, IT ve otomasyon ile destekleyin']},
                {ad:'Net kâr marjı',deger:'%38.1',ort:'%4.0',bant:'mukemmel',desc:'Her 100 TL satıştan 38.1 TL net kâr kalıyor. Güçlü kârlılık. Vergi ve finansman yükü kazancı aşırı eritmemiş.',iyilestir:['Finansman giderlerini düşürün — kredi faizlerini yeniden müzakere edin','Düşük maliyetli kamu destekli kredilere yönelin (KGF, KOSGEB, Eximbank)']},
                {ad:'ROE — Özkaynak kârlılığı',deger:'%25.5',ort:'%15.0',bant:'mukemmel',desc:"Ortakların koyduğu her 100 TL sermaye yılda 25.5 TL getiri üretiyor. Bu, bankaya 'şirket iyi yönetiliyor' mesajı verir.",iyilestir:['Net kâr marjını artırın — ROE doğrudan etkilenir','Verimsiz varlıkları satarak özkaynak tabanını şişirmeden kâr artırın']},
                {ad:'ROA — Varlık kârlılığı',deger:'%13.5',ort:'%6.0',bant:'mukemmel',desc:'Her 100 TL varlık 13.5 TL net kâr üretiyor. Varlıklarınız verimli çalışıyor.',iyilestir:['Kullanılmayan veya atıl varlıkları satın','Kârlılığı artırın (net kâr marjı adımları)']},
              ]}/>
              <KB baslik="Faaliyet Etkinliği" puan={0} max={18} rasyolar={[
                {ad:'Stok devir hızı',deger:'0.67x',ort:'9.00x',bant:'kotu',desc:'Stoklarınız yılda yalnızca 0.7 kez dönüyor — ortalama 545 günde bir. Stok birikimi tehlikeli boyuta ulaşmış. Bankalar bu stoku likit varlık olarak kabul etmez.',iyilestir:['Eski ve yavaş dönen stokları indirimli satın',"Stok sipariş miktarlarını düşürün, 'tam zamanında' tedarik modeline geçin"]},
                {ad:'Alacak tahsil süresi',deger:'237 gün',ort:'48 gün',bant:'kotu',desc:'Satışlarınızın bedeli ortalama 237 günde tahsil ediliyor — çok yüksek. Bu süre zarfında hem finansman maliyetiniz artıyor hem de alacak değer kaybı riski oluşuyor.',iyilestir:['Gecikmiş alacaklar için aktif takip ve hatırlatma kampanyası başlatın','Peşin veya kısa vadeli ödemelere %2–3 iskonto teklif edin']},
                {ad:'Nakit dönüşüm süresi',deger:'299 gün',ort:'55 gün',bant:'kotu',desc:'Nakit döngünüz 299 gün — çok uzun. Bu, bankadan sürekli kısa vadeli kredi istemek demektir. Hem maliyetlidir hem de kırılganlık yaratır.',iyilestir:['Alacak tahsilini hızlandırın (yukarıdaki adımlar)','Stok devir hızını artırın']},
              ]}/>
              <KB baslik="Borç Ödeme Kapasitesi" puan={16} max={16} rasyolar={[
                {ad:'Faiz karşılama oranı',deger:'30.53x',ort:'3.20x',bant:'mukemmel',desc:'FAVÖKünüz faiz giderlerinizin 30.5 katı. Faiz yükümlülüklerinizi rahatlıkla karşılayabiliyorsunuz. Bankalar bu oranı görünce kredi geri ödemesi konusunda rahatlar.',iyilestir:['Faiz oranlarını yeniden müzakere edin — özellikle ticari kredi faizlerinde','Yüksek faizli kredileri KGF destekli veya KOSGEB kredisiyle refinanse edin']},
                {ad:'Net Borç / FAVÖK',deger:'0.56x',ort:'2.80x',bant:'mukemmel',desc:'Mevcut nakit akışınızla finansal borçlarınızı 0.6 yılda kapatabilirsiniz. Bu bankacılıkta ideal profildir.',iyilestir:['FAVÖKü artırmak bu oranı hızla iyileştirir','Borç ana parasını düzenli ödeyin, refinansmandan kaçının']},
                {ad:'Finansman gideri / Net satış',deger:'%1.6',ort:'%4.0',bant:'mukemmel',desc:'Her 100 TL satıştan yalnızca 1.6 TL faize gidiyor. Finansman maliyeti rekabet gücünüzü zayıflatmıyor.',iyilestir:['Düşük maliyetli kamu destekli kredilere yönelin (KOSGEB, Eximbank, Kalkınma Bankası)','Yüksek faizli kredileri erken kapatın']},
              ]}/>
            </div>
          </section>

          {/* 8. SENARYO MOTORU */}
          <section>
            <ST num="8" title="Senaryo Motoru" />
            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 mb-4">
              <div className="text-center"><div className="text-xs text-gray-500 mb-1">Mevcut</div><div className="text-4xl font-semibold text-gray-400">77</div><div className="text-sm text-gray-400">AA</div></div>
              <div className="flex-1 flex items-center gap-2"><div className="h-px flex-1 bg-gray-200"/><span className="text-xs text-gray-400">aksiyonlar</span><div className="h-px flex-1 bg-brand-400"/></div>
              <div className="text-center"><div className="text-xs text-gray-500 mb-1">Potansiyel</div><div className="text-4xl font-semibold text-brand-400">86</div><div className="text-sm text-brand-400">AAA</div></div>
            </div>
            <div className="space-y-3">
              {[
                {s:1,desc:'Kısa vadeli banka kredisinin yarısını uzun vadeye çevir (1.877.814 TL)',limit:'FAVÖK × 2.5x − mevcut finansal borç',harf:'AA',d:6},
                {s:2,desc:"Stokların %30'unu erit, nakde çevir (2.727.732 TL nakde çevrilir)",limit:'FAVÖK × 2.5x − mevcut finansal borç',harf:'AA',d:4},
                {s:3,desc:'Sermaye artırımı (özkaynaklar kadar ek sermaye) (23.234.090 TL ek sermaye)',limit:'FAVÖK × 2.5x − mevcut finansal borç',harf:'AA',d:5},
                {s:4,desc:"Vadesi geçmiş alacakların %50'sini tahsil et (5.042.116 TL tahsil edilir)",limit:'FAVÖK × 2.5x − mevcut finansal borç',harf:'AA',d:2},
                {s:5,desc:'Tüm aksiyonları birlikte uygula (357.756 TL)',limit:'FAVÖK × 3x − mevcut finansal borç',harf:'AAA',d:9},
              ].map(x => (
                <div key={x.s} className={`flex items-center gap-4 p-4 rounded-xl border ${x.s===5?'border-brand-200 bg-brand-50':'border-gray-100'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${x.s===5?'bg-brand-400 text-white':'bg-brand-50 text-brand-600'}`}>{x.s}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-0.5">{x.desc}</div>
                    <div className="text-xs text-gray-400">Yeni limit: {x.limit}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-semibold text-brand-400">+{x.d}</div>
                    <div className="text-xs text-gray-400">{x.harf}</div>
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
                {kategori:'Bilanço Kalitesi',etki:'Stok 2.727.732 TL eritilirse stok devir hızı artar, nakit dönüşüm süresi kısalır → tahmini +3 ile +5 puan',soru:'Stok rakamınız 9.092.439 TL — ortalama 545 günde dönüyor. Yavaş hareket eden veya eskimiş ürün var mı?',amac:'Stokun gerçek piyasa değerini ve likidite edilebilirliğini sorguluyor. Banka stoku teminat olarak kabul ederse değerinin %40-50si kadar değer biçer.',cevap:'Stoklarımızın tamamı aktif satış döngüsündedir. Stok dönüş süremiz 545 gün olup sektör ortalamasının üzerindedir; bu durumu iyileştirmek için aktif önlemler alınmaktadır. Eskimiş veya değer düşüklüğüne uğramış ürün bulunmamaktadır. Stok listesi talep edilmesi halinde sunulabilir.'},
                {kategori:'Bilanço Kalitesi',etki:'Alacakların 3.025.270 TL si tahsil edilirse asit-test ve nakit dönüşüm süresi iyileşir → tahmini +3 ile +6 puan',soru:'Ticari alacaklarınız 10.084.233 TL ve ortalama tahsil süreniz 237 gün. Gecikmiş veya şüpheli alacak var mı?',amac:'Alacakların gerçekten tahsil edilebilir olup olmadığını ve müşteri konsantrasyonu riskini ölçüyor. Büyük bir müşteri riski varsa kredi limitini baskılar.',cevap:"Alacaklarımızın tamamı vadeli satışlardan kaynaklanmakta olup gecikmiş alacak oranımız %5in altındadır. En büyük 3 müşterimiz toplam alacağın yaklaşık %40ını oluşturmaktadır ve bunların tamamı düzenli ödeme geçmişine sahiptir. Müşteri bazında alacak tablosu talep halinde sunulabilir."},
                {kategori:'Bilanço Kalitesi',etki:'KV borcun 1.877.814 TL si UV ye çevrilirse cari oran ve KV borç oranı iyileşir → tahmini +5 ile +8 puan',soru:"Borçlarınızın %72si kısa vadeli. Bu kredileri uzun vadeye çevirme planınız var mı?",amac:'Refinansman riskini ölçüyor. KV borç yüksekse her yıl büyük bir borç yenileme ihtiyacı var demektir. Bu, şirketin faiz artışlarına ve banka politika değişikliklerine karşı kırılgan olduğunu gösterir.',cevap:'KV borçlarımızın 3.755.627 TL lik kısmı döner kredi niteliğinde olup işletme sermayesi ihtiyacımızı karşılamaktadır. Bu kredilerin bir kısmını yatırım kredisine dönüştürmek için görüşmelerimiz devam etmektedir. Mevcut nakit akışımız borç servisini karşılamaya yeterlilidir.'},
                {kategori:'Teminat',etki:'Likit teminat sunmak skoru değiştirmez ama kredi onay olasılığını ve limit büyüklüğünü doğrudan etkiler.',soru:'Teminat olarak ne gösterebilirsiniz?',amac:'Teminat havuzunu ölçüyor. Likit teminatlar (POS blokesi, çek, mevduat) bankacıya çekici gelir çünkü hızlı nakde çevrilebilir.',cevap:'Sunabileceğimiz teminatlar: (1) Kişisel kefalet — ortak/yönetici olarak şahsi kefalet verebiliriz. (2) Ticari alacak temliki — 10.084.233 TL alacağımız mevcut. (3) POS blokesi — aylık POS ciromuz [X] TL düzeyindedir. (4) KGF kefaleti — başvurmamız halinde ek limit imkânı sağlanabilir.'},
                {kategori:'Operasyonel',etki:'Skoru doğrudan etkilemez ama kredi onayını etkiler.',soru:"En büyük 3 müşteriniz toplam cironuzun yüzde kaçını oluşturuyor?",amac:'Müşteri konsantrasyon riskini ölçüyor. Tek bir müşteri cironun %40ını oluşturuyorsa o müşteri kaybı şirketi tehlikeye atar.',cevap:'En büyük 3 müşterimiz toplam ciromuzu %[X] oranında oluşturmaktadır. Müşteri tabanımız [geniş/orta ölçekli] olup belirli bir müşteriye bağımlılığımız bulunmamaktadır. Uzun vadeli sözleşme yapısımız sayesinde ciro öngörülebilirliğimiz yüksektir.'},
                {kategori:'Operasyonel',etki:'Skoru doğrudan etkilemez ama bankacı güvenini artırır.',soru:'Sektörünüzde önümüzdeki dönem için beklentiniz nedir?',amac:'Kredi geri ödeme kapasitesinin gelecekte sürdürülüp sürdürülemeyeceğini anlıyor. Daralan sektörde limit açmak risklidir.',cevap:'Sektörümüzde [büyüme / istikrar] bekliyoruz. Temel gerekçeler: [talep artışı / yeni proje / ihracat büyümesi]. Şirket olarak [yeni ürün / yeni müşteri / yeni pazar] ile büyüme hedefliyoruz. Önümüzdeki dönem tahmini ciromuz 17.844.819 TL dir.'},
                {kategori:'Operasyonel',etki:'İhracat varsa Eximbank kredisi ile daha düşük faizli finansmana erişim mümkün.',soru:'İhracat yapıyor musunuz veya planlıyor musunuz?',amac:'İhracat yapan firmalar Eximbank ve özel banka ihracat kredisi imkânlarından yararlanabilir. Döviz geliri de borç servisinde güvence sağlar.',cevap:'[İhracat yapıyoruz — yıllık X USD/EUR ihracat gelirimiz var.] veya [Henüz ihracat yapmıyoruz ancak [dönem] itibarıyla ihracat hedefliyoruz. Bu durumda Eximbank kaynaklarından yararlanmak isteyeceğiz.]'},
              ].map((s,i) => (
                <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50">
                    <div className="text-xs font-semibold text-gray-600 mb-0.5">{s.kategori}</div>
                    <div className="text-xs text-brand-500">{s.etki}</div>
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">{s.soru}</p>
                    <div className="bg-amber-50 rounded-xl p-3 mb-3">
                      <div className="text-xs font-medium text-amber-700 mb-1">Bankacının amacı:</div>
                      <p className="text-xs text-gray-600">{s.amac}</p>
                    </div>
                    <div className="bg-brand-50 rounded-xl p-3">
                      <div className="text-xs font-medium text-brand-600 mb-1">Örnek Yanıt Çerçevesi:</div>
                      <p className="text-xs text-gray-600">{s.cevap}</p>
                    </div>
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
                {['Son 2 yıl vergi levhası ve beyanname','Son dönem mizan veya bilanço','Son 3 ay banka hesap özeti (tüm bankalar)','Şirket imza sirküleri ve ticaret sicil gazetesi','Ortaklar ve yöneticilerin kimlik fotokopisi','SGK ve vergi borcu yoktur yazısı','Son dönem sipariş/sözleşme listesi (güçlü ciro kanıtı için)'].map(b => (
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
                {['Bankaya gitmeden önce Findeks kredi notunuzu kontrol edin','Tüm ortakların kişisel kredi sicilinin temiz olduğunu doğrulayın','Vergi ve SGK borcu varsa başvuru öncesinde kapatın','Birden fazla bankaya aynı anda başvurmak kredi notunuzu olumsuz etkileyebilir','Bu raporu destekleyici belge olarak bankaya sunabilirsiniz'].map(d => (
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
                {s:1,donem:'Hemen (1–4 hafta)',r:'bg-red-50 border-red-100',t:'text-red-600',
                  a:['Findeks raporu al, kişisel kredi sicilini kontrol et','Vergi ve SGK borcu varsa öde veya yapılandır'],
                  e:'Kırmızı bayrakların temizlenmesi, banka başvurusuna hazırlık'},
                {s:2,donem:'Kısa vadeli (1–3 ay)',r:'bg-amber-50 border-amber-100',t:'text-amber-600',
                  a:['Yavaş dönen stokları indirimli sat, nakde çevir','Alacak tahsilat sürecini sıkılaştır, vade politikasını güncelle','Tedarikçilerle ödeme vadesi uzatma müzakeresi yap','Banka başvurusu için gerekli belgeler toparla','Seçilen 1–2 bankaya ön görüşme talebi ilet'],
                  e:'Likidite iyileşmesi, banka görüşmelerine hazırlık'},
                {s:3,donem:'Orta vadeli (3–6 ay)',r:'bg-blue-50 border-blue-100',t:'text-blue-600',
                  a:['Kısa vadeli kredileri uzun vadeye çevirmek için banka müzakeresi','Kısa vadeli banka kredisinin yarısını uzun vadeye çevir (1.877.814 TL) → tahmini +6 puan, AA bandı'],
                  e:'Sermaye yapısı iyileşmesi, kredi limiti artışı'},
                {s:4,donem:'Uzun vadeli (6–12 ay)',r:'bg-brand-50 border-brand-100',t:'text-brand-600',
                  a:['Düzenli aylık finansal raporlama sistemi kur','Bir sonraki dönem için daha yüksek skor hedefi belirle','Banka ilişkisini aktif tut — limit artırım başvurusu değerlendir'],
                  e:'Sürdürülebilir finansal sağlık, düşük maliyetli kredi erişimi'},
              ].map(d => (
                <div key={d.s} className={`rounded-2xl p-4 border ${d.r}`}>
                  <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${d.t}`}>{d.s} — {d.donem}</div>
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

          {/* 12. MAKSİMUM SKORA NASIL ULAŞIRSINız */}
          <section>
            <ST num="12" title="Maksimum Skora Nasıl Ulaşırsınız?" />
            <div className="p-4 bg-brand-50 border border-brand-100 rounded-2xl mb-4">
              <div className="flex items-center gap-3">
                <div className="text-center"><div className="text-xs text-gray-500 mb-1">Mevcut</div><div className="text-2xl font-semibold text-gray-400">77</div></div>
                <div className="flex-1 h-px bg-gray-200"/>
                <div className="text-xs text-brand-500 px-2">operasyonel iyileştirme</div>
                <div className="flex-1 h-px bg-brand-400"/>
                <div className="text-center"><div className="text-xs text-gray-500 mb-1">Maksimum</div><div className="text-2xl font-semibold text-brand-400">100</div></div>
              </div>
            </div>
            <div className="text-sm text-gray-600 leading-relaxed mb-5">
              Sayın Ortağımız, 77/100 olan mevcut finansal skorunuzu 97.8e çıkarmak için toplam 20.8 puan kazanmanız gerekiyor. Bu artışın 14.8 puanı direkt bilanço optimizasyonuyla sağlanabilir. İşte detaylı yol haritanız:
            </div>
            <div className="space-y-4">
              {[
                {
                  baslik:'1. KV Borç / Toplam Borç Oranı: %72.4 → Hedef %40',
                  kazanc:'Kazanılacak Puan: 2.8/4',
                  durum:'Şirketinizin kısa vadeli borçları toplam borçlarının %72.4ünü oluşturuyor. Bu oran nakit akışınızda ciddi baskı yaratıyor ve bankaların risk algısını olumsuz etkiliyor. Sağlıklı bir firma için bu oran %40-50 bandında olmalı.',
                  hedef:'Mükemmel banda (4/4 puan) ulaşmak için KV Borç/Toplam Borç oranının %40a düşmesi gerekiyor.',
                  adimlar:[
                    'Mevcut KV borçların %30unu uzun vadeye dönüştürün (3-6 ay içinde) — tedarikçilerle 12-24 ay vadeli anlaşmalar yapın, banka kredilerini yeniden yapılandırın',
                    'Nakit akışı güçlendirme ile erken ödeme yapmayı durdurun (1 ay içinde) — sadece vade sonunda ödeme yapın, nakit fazlasını KV borç kapatmada kullanın',
                    'Yeni finansman ihtiyaçlarını uzun vadeli planlayın (sürekli) — yatırım kredilerini minimum 36 ay vadeli alın, işletme kredisi limitlerini artırıp KV borçları kapatın',
                  ],
                  sure:'6 ay içinde %50 seviyesine, 12 ay içinde %40 hedefine ulaşım',
                },
                {
                  baslik:'2. Stok Devir Hızı: 0.67x → Hedef 6x',
                  kazanc:'Kazanılacak Puan: 6.0/6',
                  durum:'9.092.439 TL stokunuz yıllık sadece 0.67 kez dönüyor. Bu demek oluyor ki stoklarınız ortalama 545 gün bekliyor. Sağlıklı bir işletmede bu süre 60 gün (6x devir) olmalı. Stoklarınız çok fazla sermaye bağlıyor.',
                  hedef:'6x devir hızı için stok tutarınızın 1.515.000 TL seviyesine düşmesi gerekiyor. (SMM 6.087.562 ÷ 6 = 1.014.594 TL optimum stok)',
                  adimlar:[
                    'Derhal stok envanteri ve ABC analizi yapın (2 hafta içinde) — hareket etmeyen stokları tespit edin, A grubu ürünlerde minimum stok politikası uygulayın',
                    'Stokların %60ını (5.455.463 TL) satışa dönüştürün (6 ay içinde) — eski stokları %10-20 indirimle satın, B2B müşterilere paket indirimleri yapın, online kanallarla stok eritme kampanyaları başlatın',
                    'Just-in-Time tedarik sistemine geçin (3 ay içinde) — tedarikçilerle haftalık teslimat anlaşmaları yapın, talep tahmin sistemi kurun, güvenlik stoklarını %50 azaltın',
                    'Stok yönetim sistemi kurun (1 ay içinde) — otomatik sipariş noktaları belirleyin, günlük stok raporlaması başlatın',
                  ],
                  sure:'3 ayda 3x devir hızına, 8 ayda 6x hedefine ulaşım',
                },
                {
                  baslik:'3. Alacak Tahsil Süresi: 237 gün → Hedef 30 gün',
                  kazanc:'Kazanılacak Puan: 6.0/6',
                  durum:'10.084.233 TL alacağınız 237 gün bekliyor. Bu süre çok uzun! Paranızın 8 ay müşterilerinizde kalması nakit akışınızı çok kötü etkiliyor. Sektör ortalaması 45-60 gün olmalı, mükemmel seviye 30 gün.',
                  hedef:'30 günlük tahsilat için alacak tutarınızın 1.279.364 TL ye düşmesi gerekiyor. (Günlük satış: 15.517.234 ÷ 365 = 42.645 TL × 30 gün = 1.279.364 TL)',
                  adimlar:[
                    'Mevcut alacakları derhal tahsil edin (3 ay içinde) — vadesi geçmiş alacaklar için %5-10 erken ödeme indirimi verin, ticari alacakların %60ını (6.050.540 TL) nakde dönüştürün, faktoring/alacak devri ile hızlı tahsilat yapın',
                    'Satış politikalarını radikal değiştirin (1 ay içinde) — yeni satışlarda maksimum 30 gün vade verin, peşin ödemelerde %8-12 indirim uygulayın, kredi limiti sistemi kurun ve sıkı takip edin',
                    'Tahsilat departmanını güçlendirin (2 hafta içinde) — günlük arama listeleri oluşturun, vade takip sistemi kurun, yasal takip sürecini hızlandırın',
                    'Nakit satışları artırın (sürekli) — e-ticaret kanalında sadece peşin satış yapın, bayilere nakit satış teşvikleri verin',
                  ],
                  sure:'3 ayda 120 güne, 6 ayda 30 gün hedefine ulaşım',
                },
                {
                  baslik:'4. Nakit Dönüşüm Süresi: 299 gün → Hedef 45 gün',
                  kazanc:'Kazanılacak Puan: 6.0/6',
                  durum:'Paranız 299 gün sonra geri geliyor. Bu süre çok uzun! Stok alıyorsunuz, 237 gün sonra tahsil ediyorsunuz. Bu döngü sermayenizi çok verimsiz kullanıyor. Sağlıklı firmalar bu süreyi 45-60 günde tamamlar.',
                  hedef:'Nakit dönüşüm süresi = Stok dönüş süresi + Alacak tahsil süresi - Borç ödeme süresi. Hedef: 60 gün (stok) + 30 gün (alacak) - 45 gün (borç) = 45 gün.',
                  adimlar:[
                    'Üstteki stok ve alacak planlarını eşzamanlı uygulayın (6 ay içinde) — stok süresini 545 günden 60 güne indirin, alacak tahsilini 237 günden 30 güne çekin',
                    'Tedarikçi ödemelerini optimize edin (1 ay içinde) — mevcut ortalama 30 günlük ödeme sürenizi 45 güne çıkarın, tedarikçilerle yeni vade anlaşmaları yapın, erken ödeme yapmayın vadeye kadar bekleyin',
                    'Sermaye yönetimini profesyonelleştirin (sürekli) — günlük nakit akış raporları hazırlayın, haftalık sermaye devir hızı takibi yapın, aylık döngü süresi hedefleri koyun',
                  ],
                  sure:'4 ayda 150 güne, 8 ayda 45 gün hedefine ulaşım',
                },
              ].map(m => (
                <div key={m.baslik} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                    <span className="text-sm font-semibold text-gray-900">{m.baslik}</span>
                    <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">{m.kazanc}</span>
                  </div>
                  <div className="px-4 py-4 space-y-3">
                    <div><div className="text-xs font-semibold text-gray-500 mb-1">Mevcut Durum Analizi</div><p className="text-xs text-gray-600 leading-relaxed">{m.durum}</p></div>
                    <div><div className="text-xs font-semibold text-gray-500 mb-1">Hedef Hesaplama</div><p className="text-xs text-gray-600 leading-relaxed">{m.hedef}</p></div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-2">Eylem Planı</div>
                      <div className="space-y-1.5">
                        {m.adimlar.map((a,i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="text-brand-400 font-semibold flex-shrink-0">{i+1}.</span>{a}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-brand-600 font-medium pt-1">Beklenen Süre: {m.sure}</div>
                  </div>
                </div>
              ))}

              <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4">
                <div className="text-xs font-semibold text-brand-600 mb-3">Genel Uygulama Takvimi ve Sonuç</div>
                {[
                  {donem:'1–3 ay', etki:'Acil aksiyonlar (stok eritme, alacak tahsilat, vade düzenlemeleri) → Beklenen skor artışı: 77 → 82'},
                  {donem:'3–6 ay', etki:'Sistemik değişiklikler (operasyonel süreçler, politika değişiklikleri) → Beklenen skor artışı: 82 → 90'},
                  {donem:'6–12 ay', etki:'Optimizasyon ve stabilizasyon → Hedef skor: 97.8/100'},
                ].map(t => (
                  <div key={t.donem} className="flex items-start gap-2 text-xs text-gray-600 mb-1.5">
                    <span className="text-brand-400 font-semibold flex-shrink-0">{t.donem}:</span>{t.etki}
                  </div>
                ))}
                <div className="mt-3 pt-3 border-t border-brand-100 space-y-1">
                  <div className="text-xs font-semibold text-brand-600 mb-1">Bu planı uyguladığınızda:</div>
                  {['Aylık 2-3 milyon TL ek nakit akışı sağlayacaksınız','Banka kredilerinde daha iyi koşullar alacaksınız','Operasyonel verimliliğiniz %300 artacak'].map(r => (
                    <div key={r} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-brand-400 flex-shrink-0">·</span>{r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 13. BİLANÇO ÖZETİ */}
          <section>
            <ST num="13" title="Bilanço Özeti" />
            <div className="grid grid-cols-3 gap-3">
              {[
                {k:'Toplam Aktif',v:'43.725.244 ₺'},{k:'Net Satışlar',v:'15.517.234 ₺'},
                {k:'FAVÖK',v:'7.609.526 ₺'},{k:'Net Kâr',v:'5.913.960 ₺'},
                {k:'Dönen Varlıklar',v:'24.806.859 ₺'},{k:'Duran Varlıklar',v:'18.918.385 ₺'},
                {k:'KV Borçlar',v:'13.835.344 ₺'},{k:'UV Borçlar',v:'5.266.650 ₺'},
                {k:'Özkaynaklar',v:'23.234.090 ₺'},{k:'Nakit',v:'4.455.080 ₺'},
              ].map(i => (
                <div key={i.k} className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-1">{i.k}</div>
                  <div className="text-sm font-semibold text-gray-900">{i.v}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 14. YASAL UYARI */}
          <section>
            <ST num="14" title="Yasal Uyarı" />
            <div className="bg-gray-50 rounded-2xl p-4 text-xs text-gray-400 leading-relaxed space-y-1.5">
              <p><strong className="text-gray-500">1. Değerleme faaliyeti değildir:</strong> Bu rapor, 6362 sayılı Sermaye Piyasası Kanunu ve ilgili mevzuat kapsamında SPK tarafından yetkilendirilmiş değerleme kuruluşlarınca gerçekleştirilen resmi değerleme faaliyeti niteliği taşımamaktadır. BilancoSkor, kullanıcı tarafından yüklenen mizan verilerini algoritmik olarak işleyen bir finansal analiz yazılımıdır; üretilen çıktılar tahmini nitelikte olup herhangi bir resmi değerleme, derecelendirme veya kredi kararının yerine geçmez.</p>
              <p><strong className="text-gray-500">2. Resmi derecelendirme değildir:</strong> Bu rapor, SPK veya BDDK tarafından yetkilendirilmiş resmi bir kredi derecelendirme kuruluşunun notu değildir. Bankalar ve finansal kuruluşlar tarafından resmi kredi süreçlerinde bağlayıcı belge olarak kullanılamaz.</p>
              <p><strong className="text-gray-500">3. Tahmini analiz:</strong> Rapordaki kredi skoru, limit tahminleri ve skor bandı hesaplamaları tamamen algoritmik ve tahmini niteliktedir; herhangi bir bankanın kredi kararını, onayını veya reddini temsil etmez.</p>
              <p><strong className="text-gray-500">4. Banka bağımsızlığı:</strong> Her bankanın kendi metodolojisi, risk iştahı ve değerlendirme kriterleri farklıdır. Bu rapordan elde edilen sonuçlar bankanın vereceği kararı öngörmez veya garanti etmez.</p>
              <p><strong className="text-gray-500">5. Veri sorumluluğu:</strong> Analizin doğruluğu ve kalitesi yüklenen mizanın eksiksizliğine ve doğruluğuna bağlıdır. Hatalı, eksik veya yanıltıcı veri girilmesi sonucu oluşan çıktılardan BilancoSkor sorumlu tutulamaz; veri doğruluğu tamamen kullanıcıya aittir.</p>
              <p><strong className="text-gray-500">6. Geçmiş veri sınırlılığı:</strong> Rapor yalnızca yüklenen döneme ait finansal veriler üzerinden üretilmektedir. Geçmiş finansal performans gelecekteki sonuçları garanti etmez.</p>
              <p><strong className="text-gray-500">7. Mali müşavir yerini tutmaz:</strong> Bu rapor, SMMM veya YMM tarafından düzenlenen resmi mali müşavirlik görüşünün, vergi beyanının veya bağımsız denetim raporunun yerini almaz.</p>
              <p><strong className="text-gray-500">8. Hukuki belge niteliği taşımaz:</strong> Bu rapor herhangi bir hukuki uyuşmazlıkta, idari süreçte veya resmi başvuruda delil ya da resmi belge olarak kullanılamaz.</p>
              <p><strong className="text-gray-500">9. Paylaşım sorumluluğu:</strong> Raporun üçüncü şahıslarla, kurumlarla veya bankalarla paylaşılması kullanıcının kendi sorumluluğundadır. BilancoSkor, raporun üçüncü taraflarca kullanımından doğabilecek sonuçlardan sorumlu tutulamaz.</p>
              <p><strong className="text-gray-500">10. Sorumluluk sınırı:</strong> BilancoSkor, bu rapordaki bilgilere, tahminlere veya önerilere dayanılarak alınan kararlar sonucunda doğabilecek doğrudan veya dolaylı zararlardan, kâr kaybından ya da üçüncü kişilere verilen zararlardan hiçbir koşulda sorumlu tutulamaz.</p>
              <p className="pt-1 border-t border-gray-200">Bu raporu kullanmaya devam etmekle yukarıdaki tüm koşulları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.</p>
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
