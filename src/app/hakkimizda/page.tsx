import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda — BilancoSkor',
  description: 'BilancoSkor nedir, ne yapar, nasıl çalışır.',
}

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Hakkımızda</h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-lg">
            Her yıl finansal tablolarınızı bankanızla paylaşıyorsunuz. Peki bu veriler, finansal açıdan nasıl değerlendiriliyor — bunu gerçekten biliyor musunuz?
          </p>
        </div>

        {/* Sorun */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sorun nerede?</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            Çoğu işletme için süreç aynıdır: Muhasebe kayıtları hazırlanır, bankaya iletilir, değerlendirme yapılır… Ama sonuç çoğu zaman beklendiği gibi olmaz.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2">
            {['Limit artmaz.', 'Faiz koşulları değişmez.', 'Teminat talepleri devam eder.'].map((m, i) => (
              <p key={i} className="text-gray-700 font-medium text-sm flex gap-2 items-center">
                <span className="text-red-400">—</span>{m}
              </p>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed mb-2">Ve en kritik soru cevapsız kalır: <strong>Neden?</strong></p>
          <p className="text-gray-600 leading-relaxed">
            Sorun çoğu zaman işletmede değil, finansal verilerin nasıl değerlendirildiğine dair yeterli içgörüye sahip olmamaktadır. Finansal tablolar farklı bakış açılarıyla farklı sonuçlar doğurabilir.
          </p>
        </div>

        {/* BilancoSkor ne yapar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">BilancoSkor ne yapar?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            BilancoSkor, finansal verilerinizi algoritmik olarak analiz eden bir değerlendirme aracıdır. Muhasebe mizanınızı yüklersiniz. Dakikalar içinde finansal tablolarınız:
          </p>
          <ul className="space-y-2 mb-4">
            {[
              'Bankacılıkta kullanılan analiz yaklaşımlarına benzer prensiplerle incelenir',
              'Finansal göstergeler hesaplanır',
              'Güçlü ve geliştirilmesi gereken alanlara ilişkin analiz sunulur',
            ].map((m, i) => (
              <li key={i} className="flex gap-2 text-gray-600 text-sm">
                <span className="text-brand-400 font-bold mt-0.5">→</span>{m}
              </li>
            ))}
          </ul>
          <p className="text-gray-600 leading-relaxed mb-4">
            Tüm süreç otomatik olarak gerçekleşir ve sonuçlar PDF rapor olarak sunulur.
          </p>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-700 font-medium text-sm mb-2">Rapor size ne sağlar?</p>
            <ul className="space-y-1">
              {[
                'Finansal yapınızı daha net anlamanıza',
                'Limit, teminat ve faiz gibi konulara etki edebilecek finansal faktörleri görmenize',
                'Bu alanlara ilişkin olası iyileştirme senaryolarını değerlendirmenize',
              ].map((m, i) => (
                <li key={i} className="flex gap-2 text-gray-600 text-sm">
                  <span className="text-brand-400">✓</span>{m}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-sm mt-3">Ayrıca farklı aksiyonların finansal göstergeler üzerindeki olası etkilerini analiz edebilirsiniz.</p>
          </div>
        </div>

        {/* Raporda neler var */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">Raporda neler var?</h2>
          <div className="space-y-3">
            {[
              { baslik: '19 finansal rasyo ve sektör karşılaştırması', aciklama: 'Likidite, sermaye yapısı, kârlılık, faaliyet etkinliği ve borç ödeme kapasitesi kategorilerinde detaylı analiz.' },
              { baslik: 'Finansal skor (BilancoSkor modeli) ve skor bandı', aciklama: 'Algoritmik model çıktısına dayalı skor ve bant analizi.' },
              { baslik: 'Güçlü ve geliştirilmesi gereken alanlar', aciklama: 'Hangi göstergenin güçlü olduğu, hangisinin kredilendirilme sürecini olumsuz etkileyebileceği.' },
              { baslik: 'Finansman araçlarına ilişkin genel bilgilendirme', aciklama: 'Rotatif, yatırım, faktoring, KGF gibi seçeneklere dair genel bilgi.' },
              { baslik: 'Senaryo motoru', aciklama: 'Farklı aksiyonların finansal göstergeler üzerindeki olası etkilerinin analizi.' },
              { baslik: 'Örnek değerlendirme soruları ve ifade kalıpları', aciklama: 'Finansal görüşmelerde kullanılabilecek örnek veri noktaları ve yanıt çerçeveleri.' },
              { baslik: 'Model bazlı iyileştirme senaryoları', aciklama: 'Kısa, orta ve uzun vadeli iyileştirme adımları.' },
              { baslik: 'PDF rapor çıktısı', aciklama: 'Tüm analizi tek belgede indirilebilir formatta sunar.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-brand-400 font-bold text-lg mt-0.5">✓</span>
                <div>
                  <span className="font-semibold text-gray-900 text-sm">{item.baslik}: </span>
                  <span className="text-gray-600 text-sm">{item.aciklama}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Neden değerli */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Neden değerli?</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            Muhasebe kayıtları işletmenizin geçmişini gösterir. Finansal analiz ise bu verilerin nasıl yorumlanabileceğini ortaya koyar.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Bu iki bakış açısı birlikte değerlendirildiğinde, finansal durumunuza ilişkin daha sağlıklı bir çerçeve oluşur. BilancoSkor, bu değerlendirme sürecini daha şeffaf ve anlaşılır hale getirmeyi amaçlar.
          </p>
          <a href="/#ornek-rapor" className="inline-flex items-center gap-2 bg-brand-400 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-500 transition text-sm">
            Örnek raporu inceleyin →
          </a>
        </div>

        {/* Ne değiliz */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ne değiliz?</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            {[
              'Banka veya finansal kuruluş değiliz',
              'Kredi aracılığı yapmıyoruz',
              'Mali müşavirlik hizmeti vermiyoruz',
              'Raporlarımız resmi belge niteliği taşımaz',
              'Kesin kredi onayı veya finansman sonucu garanti edilmez',
            ].map((m, i) => (
              <li key={i} className="flex gap-2"><span className="text-red-400 font-bold">✗</span>{m}</li>
            ))}
          </ul>
        </div>

        {/* Gizlilik */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Gizlilik yaklaşımımız</h2>
          <p className="text-gray-600 text-sm mb-3">Yüklediğiniz finansal veriler:</p>
          <ul className="space-y-2 text-gray-600 text-sm mb-4">
            {[
              'Yalnızca analiz süresi boyunca işlenir',
              'Sistem üzerinde saklanmaz',
              'Analiz tamamlandıktan sonra geri döndürülemez şekilde silinir',
            ].map((m, i) => (
              <li key={i} className="flex gap-2"><span className="text-brand-400">✓</span>{m}</li>
            ))}
          </ul>
          <p className="text-gray-700 font-medium text-sm">Verileriniz hiçbir şekilde paylaşılmaz.</p>
        </div>

        {/* İletişim */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">İletişim</h2>
          <p className="text-gray-600 text-sm mb-3">Her türlü soru ve görüş için:</p>
          <a href="mailto:destek@bilancoskor.com" className="text-brand-400 font-medium hover:underline">destek@bilancoskor.com</a>
        </div>

        <div className="text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition">← Ana sayfaya dön</Link>
        </div>

      </div>
    </div>
  )
}
