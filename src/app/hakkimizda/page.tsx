import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda — BilancoSkor',
  description: 'BilancoSkor nedir, ne yapar, neden var oldu.',
}

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Hakkımızda</h1>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-lg">
            Her yıl bankanıza mali verilerinizi sunuyorsunuz. Peki bankanın o verilere bakarak ne düşündüğünü hiç merak ettiniz mi?
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Şöyle bir senaryo düşünün</h2>
          <p className="text-gray-600 leading-relaxed mb-3">Her yıl muhasebeciden bilançoyu alıyorsunuz, bankaya gönderiyorsunuz. Banka inceliyor, limit aynı kalıyor ya da teklif beklediğiniz gibi gelmiyor. Neden? Bilmiyorsunuz.</p>
          <p className="text-gray-600 leading-relaxed mb-3">Belki cironuz arttı. Belki borçlarınızı düzenli ödüyorsunuz. Ama banka yine de aynı rakamı veriyor.</p>
          <p className="text-gray-600 leading-relaxed font-medium">Sorun işinizde değil — sorun, bankanın finansal tablolarınıza nasıl baktığını bilmemekte.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">BilancoSkor ne yapar?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Muhasebe mizanınızı yüklersiniz. Birkaç dakika içinde bankanın sizin dosyanızı incelerken kullandığı yönteme göre hazırlanmış kapsamlı bir rapor alırsınız.</p>
          <p className="text-gray-600 leading-relaxed mb-3">Rapor size şunları gösterir:</p>
          <ul className="space-y-2 text-gray-600 text-sm mb-4">
            {['Limitinizin neden artmadığı', 'Teminat talebinin neden sürdüğü', 'Faiz teklifinin neden değişmediği', 'Bunları değiştirmek için ne yapmanız gerektiği'].map((m, i) => (
              <li key={i} className="flex gap-2"><span className="text-brand-400 font-bold">→</span>{m}</li>
            ))}
          </ul>
          <p className="text-gray-600 leading-relaxed">Hangi adımı attığınızda durumunuzun nasıl iyileşeceğini, bunun limitinizi ve faiz koşullarınızı nasıl etkileyeceğini somut olarak görürsünüz.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">Raporda neler var?</h2>
          <div className="space-y-4">
            {[
              { baslik: 'Kredi skoru ve bant', aciklama: "AAA'dan D'ye kadar hangi bantta olduğunuz, tahmini kredi limiti ve gereken teminat yapısı." },
              { baslik: '19 finansal rasyo', aciklama: 'Likidite, sermaye yapısı, kârlılık, faaliyet etkinliği ve borç ödeme kapasitesi kategorilerinde — sektör ortalamasıyla karşılaştırmalı, Türkçe yorumlu detaylı analiz.' },
              { baslik: 'Güçlü yönler ve uyarılar', aciklama: 'Hangi rasyonun güçlü olduğu, hangisinin bankacılık değerlendirmesinde olumsuz etki yarattığı ve her biri için somut iyileştirme önerileri.' },
              { baslik: 'Kredi türü önerisi', aciklama: 'Rotatif, yatırım, faktoring, KGF gibi seçenekler arasında sizin finansal profilinize en uygun olan.' },
              { baslik: 'Senaryo motoru', aciklama: 'Hangi aksiyonu alırsanız (alacak tahsili, stok eritme, kısa vadeyi uzun vadeye çevirme, sermaye artırımı vb.) skorunuzun kaç puan değişeceği.' },
              { baslik: 'Banka yazışmalarına hazırlık', aciklama: 'Bankacının soracağı sorular ve kendi finansal durumunuza özel olarak üretilmiş hazır cevaplar.' },
              { baslik: 'Aksiyon zaman çizelgesi', aciklama: 'Hemen, kısa vadeli ve uzun vadeli olarak önceliklendirilmiş iyileştirme adımları.' },
              { baslik: 'PDF indirme', aciklama: 'Raporu banka dosyanıza ekleyebileceğiniz formatta indirin.' },
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

        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Neden değer?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Mali müşaviriniz muhasebe kaydını tutar. Banka kendi kriterlerine göre değerlendirme yapar. İkisi arasında — yani sizin ne düşündüğünüz ile bankanın ne gördüğü arasında — büyük bir bilgi farkı vardır. BilancoSkor bu farkı kapatır.</p>
          <p className="text-gray-600 leading-relaxed mb-6">Aldığınız rapor, ödediğinizin çok ötesinde bir değer sunar. Doğru bilgiyle yapılan bir hazırlık, yıllarca aynı limitle çalışmak yerine işinizin ihtiyaç duyduğu finansman imkânına kavuşmanızı sağlayabilir.</p>
          <a href="/#ornek-rapor" className="inline-flex items-center gap-2 bg-brand-400 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-500 transition text-sm">
            Örnek raporu inceleyin →
          </a>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ne değiliz?</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            {['Banka veya finansal kuruluş değiliz', 'Kredi aracılığı yapmıyoruz', 'Mali müşavirlik hizmeti vermiyoruz', 'Raporumuz kesin kredi onayı garantisi vermez'].map((m, i) => (
              <li key={i} className="flex gap-2"><span className="text-red-400 font-bold">✗</span>{m}</li>
            ))}
          </ul>
        </div>

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
