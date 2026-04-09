import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular — BilancoSkor',
  description: 'BilancoSkor hakkında merak ettiğiniz her şey.',
}

const sorular = [
  { soru: 'BilancoSkor tam olarak ne yapar?', cevap: `Muhasebe mizanınızı yüklersiniz, dakikalar içinde bankanın gözünden finansal tablolarınızın nasıl göründüğünü öğrenirsiniz. 19 farklı rasyo hesaplanır, kredi skorunuz belirlenir, güçlü ve zayıf yönleriniz net olarak ortaya konur. Rapor aynı zamanda bankacıyla yazışmalarınızda ve belge süreçlerinde nasıl konumlanacağınızı da gösterir.

Önemli: Yüklediğiniz mizan yalnızca analiz sırasında işlenir — sisteme kaydedilmez, depolanmaz, dolayısıyla hiçbir şekilde paylaşılamaz. Analiz tamamlandıktan sonra mizan dosyası sistemden tamamen silinir.` },
  { soru: 'Bankamla zaten her yıl çalışıyorum, yenileme yapıyorum — bu rapor ne ekler?', cevap: 'Her yıl yenileme yapıyor olmanız, bankanın sizi nasıl değerlendirdiğini bildiğiniz anlamına gelmez. Limitinizin neden artmadığını, faiz teklifinin neden değişmediğini ya da teminat talebinin neden sürdüğünü bu rapor size gösterir. Bankanın dosyanıza bakarken ne gördüğünü önceden bilirseniz belge süreçlerinde ve yazışmalarda çok daha güçlü olursunuz.' },
  { soru: 'Limitimi artırmak istiyorum ama banka her yıl aynı rakamı veriyor — nedeni ne olabilir?', cevap: 'Genellikle bir veya birkaç rasyonun bankacılık standardının altında kalmasından kaynaklanır. Cari oran, FAVÖK marjı, alacak tahsil süresi veya borç/özkaynak dengesi gibi kriterler limit kararını doğrudan etkiler. Bu rasyoların hangisinin sorun çıkardığını bilmeden her yıl aynı sonuçla karşılaşmak kaçınılmazdır. Bilmediğinizi yönetemezsiniz.' },
  { soru: 'Banka "teminat yetersiz" veya "risk yüksek" diyor — ama rakamlarım iyi görünüyor, ne oluyor?', cevap: 'Bankacının "risk yüksek" dediği şey çoğu zaman belirli bir rasyonun sektör ortalamasının altında kalmasıdır. Sizin "iyi" gördüğünüz rakam, bankacılık metodolojisiyle değerlendirildiğinde farklı bir tablo ortaya çıkarabilir. Hangi kalemin nasıl yorumlandığını bilmeden itiraz etmek de mümkün değildir. BilancoSkor tam da bu noktada devreye girer — neyin sorun olduğunu ve nasıl düzeltileceğini net olarak gösterir.' },
  { soru: 'Cari bankamdan daha iyi faiz almak istiyorum — bu rapor nasıl yardımcı olur?', cevap: 'Faiz teklifini belirleyen şey büyük ölçüde risk profilinizdir. Hangi rasyolarınızın güçlü olduğunu bilmek ve bunları öne çıkarmak, yazışmalarınızda ve belge sunum sürecinizde elinizi güçlendirir. Rapordaki senaryo motoru, hangi finansal adımı attığınızda risk profilinizin nasıl değişeceğini de gösterir — yani daha iyi faiz için ne yapmanız gerektiğini somut olarak ortaya koyar.' },
  { soru: 'Mali müşavirim var, o zaten biliyor olmalı — neden ayrıca bakayım?', cevap: 'Mali müşaviriniz muhasebe kaydını doğru tutar. Ancak bankanın kredi değerlendirmesinde kullandığı metodoloji farklı bir uzmanlık alanıdır. Hangi rasyonun hangi skor bandına denk geldiğini, teminat yapısının nasıl yorumlandığını veya faiz karşılama oranının limit kararını nasıl etkilediğini çoğu muhasebeci müşterisine aktarmaz. Bu iki farklı perspektif birbirinin yerine geçmez.' },
  { soru: 'Raporda tam olarak ne var?', cevap: '19 finansal rasyo ve sektör ortalamasıyla karşılaştırmalı yorum, kredi skoru ve hangi bant olduğunuz, güçlü yönler ve uyarılar, kredi türü önerisi, senaryo motoru (hangi aksiyonu alırsanız skorunuz ne kadar değişir), bankacının soracağı sorular ve hazır cevaplar, aksiyon zaman çizelgesi ve PDF indirme.' },
  { soru: 'Bu analiz ne kadar doğru — gerçek banka analiziyle ne kadar örtüşüyor?', cevap: 'BilancoSkor, Türk bankacılık sektöründe kullanılan standart finansal analiz metodolojisine dayanmaktadır. Hesaplanan rasyolar ve skor bantları, bankaların kredi değerlendirme süreçleriyle yüksek ölçüde örtüşmektedir. Ancak her bankanın kendi iç kriterleri, sektör ağırlıklandırmaları ve risk iştahı farklıdır. Bu nedenle rapor kesin bir banka kararını değil, güçlü bir ön değerlendirmeyi temsil eder.' },
  { soru: 'Skorum düşük çıktı — ne kadar sürede iyileştirebilirim?', cevap: 'Raporun aksiyon zaman çizelgesi bölümü tam da bunun için tasarlandı. Bazı iyileştirmeler hızlıdır — vadesi geçmiş alacakların tahsili veya kısa vadeli kredilerin uzun vadeye çevrilmesi birkaç ay içinde skoru anlamlı ölçüde değiştirebilir. Yapısal değişiklikler (sermaye artırımı, kârlılık iyileştirmesi) daha uzun bir süreç gerektirir. Senaryo motoru hangi adımın kaç puanlık etki yaratacağını da gösterir.' },
  { soru: 'Raporu bankaya resmi belge olarak sunabilir miyim?', cevap: 'Evet, sunabilirsiniz. Birçok işletme sahibi raporu destekleyici belge olarak banka dosyasına eklemektedir. Ancak rapor BilancoSkor tarafından üretilen bağımsız bir analiz aracıdır — yetkili bir mali müşavir veya denetçi tarafından onaylanmış resmi bir finansal tablo niteliği taşımaz.' },
  { soru: 'Geçmiş yıl mizanını yüklesem olur mu?', cevap: 'Teknik olarak yükleyebilirsiniz, rapor oluşturulur. Ancak bankalar genellikle en güncel mali döneme ait verileri esas aldığından, geçmiş yıl mizanıyla oluşturulan rapor gerçek kredi sürecinizi tam yansıtmayabilir. En doğru sonuç için mevcut döneme ait mizanı kullanmanızı öneririz.' },
  { soru: 'Birden fazla şirketim var — her biri için ayrı rapor alabilir miyim?', cevap: 'Evet. Her şirket için ayrı mizan yükleyerek ayrı rapor oluşturabilirsiniz. Her rapor bağımsız olarak işlenir ve ücretlendirilir.' },
  { soru: 'Raporu aldıktan sonra ne yapmalıyım, nereden başlamalıyım?', cevap: 'Raporun son bölümündeki aksiyon zaman çizelgesi size adım adım yol gösterir. İlk adım olarak "Hemen" bölümüne bakın — bunlar genellikle kısa sürede skoru etkileyen ve banka süreçlerine hazırlık için kritik olan adımlardır. Senaryo motoru ise hangi aksiyonun kaç puanlık etki yaratacağını gösterir.' },
  { soru: 'Hangi dosya gerekiyor?', cevap: 'Muhasebe programınızdan (Logo, Mikro, Netsis, SAP vb.) alacağınız mizan dışa aktarımı. .xlsx veya .xls formatında olmalıdır. Mizanı nasıl alacağınızı bilmiyorsanız mali müşavirinizden isteyebilirsiniz.' },
  { soru: 'Ödeme nasıl yapılıyor?', cevap: 'Rapor hazırlandıktan sonra kredi kartı bilgilerinizi girerek ödeme yaparsınız ve raporunuzu anında indirebilirsiniz. Abonelik yoktur, her rapor için tek seferlik ödeme alınır.' },
  { soru: 'Rapor kaç gün erişilebilir kalır?', cevap: 'Oluşturulduktan itibaren 3 gün boyunca erişilebilir. Bu süre içinde PDF olarak indirip kaydetmenizi öneririz. 3 günün sonunda rapor sistemden otomatik silinir.' },
  { soru: 'Mali müşavirim müşterileri adına kullanabilir mi?', cevap: 'Evet. Muhasebeciler ve mali müşavirler, müşterileri adına mizan yükleyip raporu PDF olarak teslim edebilirler.' },
  { soru: 'Bu rapor gerçek bir banka kararı mı?', cevap: 'Hayır. Her bankanın kendi risk iştahı ve değerlendirme kriterleri farklıdır. BilancoSkor, bankaların kullandığı metodolojiye dayanan güçlü bir ön değerlendirme ve hazırlık aracıdır. Kesin kredi onayı garantisi vermez, ancak bankacıyla her türlü yazışma ve belge sürecinde çok daha hazırlıklı olmanızı sağlar.' },
]

export default function SSSPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</h1>
          <p className="text-gray-500">Aklınızdaki soruların cevapları burada.</p>
        </div>
        <div className="space-y-4">
          {sorular.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{item.soru}</h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{item.cevap}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-brand-50 rounded-2xl p-6 text-center border border-brand-100">
          <p className="text-sm text-gray-600 mb-3">Sorunuzu bulamadınız mı?</p>
          <a href="mailto:destek@bilancoskor.com" className="btn-primary inline-block">destek@bilancoskor.com</a>
        </div>
        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition">← Ana sayfaya dön</Link>
        </div>
      </div>
    </div>
  )
}
