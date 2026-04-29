import { createClient } from '@supabase/supabase-js'

const POSTS = [
  {
    slug: 'isletme-kredisi-nedir-kobi-turleri',
    title: "İşletme Kredisi Nedir? KOBİ'ler İçin Türleri ve Faiz Karşılaştırması",
    description: "İşletme kredisi nedir, hangi türleri var? Spot kredi, rotatif kredi ve taksitli işletme kredisi arasındaki farklar, KOBİ'ler için hangisi daha uygun?",
    category: 'Finansal Analiz',
    read_time: '7 dk okuma',
    published: true,
    content: `İşletme kredisi, bir şirketin günlük nakit ihtiyaçlarını, stok alımlarını, personel maaşlarını veya kısa vadeli giderlerini karşılamak için bankalardan aldığı finansman aracıdır.

Sabit varlık almak için değil, işi döndürmek için kullanılır. Bu yüzden "çalışma sermayesi kredisi" de denir.

KOBİ sahiplerinin en sık sorduğu sorulardan biri şudur: "Hangi kredi türünü almalıyım?" Bu yazıda türleri karşılaştırıyoruz.

---

## İşletme Kredisi Türleri

### 1. Spot Kredi

Tek seferde çekilen, sabit faizli, belirli vadeli kredidir.

- Vade: Genellikle 1–12 ay
- Faiz: Başta belirlenir, değişmez
- Kullanım: Tek seferlik büyük ödeme gereken durumlarda idealdir (örneğin toplu hammadde alımı)
- Avantajı: Maliyet nettir, sürpriz olmaz

**Örnek:** 500.000 TL'lik hammadde alımı için 3 ay vadeli spot kredi çekiyorsunuz. Faiz sabit, geri ödeme tek seferde.

---

### 2. Rotatif Kredi (Döner Kredi)

Limit tanımlanır, ihtiyaç duydukça kullanılır ve geri ödenince limit yenilenir.

- Vade: Limit yıllık yenilenir
- Faiz: Kullandığınız gün kadar ödersiniz
- Kullanım: Düzensiz nakit ihtiyacı olan işletmeler için idealdir
- Avantajı: Kullanmadığınız paraya faiz ödemezsiniz

**Örnek:** 1.000.000 TL rotatif limitiniz var. Bu ay 300.000 TL kullandınız, 15 günde geri ödediyseniz sadece 15 günlük faiz ödersiniz.

---

### 3. Taksitli İşletme Kredisi

Belirli vadeye bölünmüş, eşit taksitlerle geri ödenen kredidir.

- Vade: 6–36 ay
- Faiz: Sabit veya değişken olabilir
- Kullanım: Yatırım gerektirmeyen ama uzun vadeli nakit akışı planlamak isteyen işletmeler
- Avantajı: Nakit akışını öngörmek kolaydır

---

### 4. Çek/Senet İskontosu

Elinizde vadeli çek veya senet varsa, bankaya iskonto ettirip peşin nakit alabilirsiniz.

- Maliyet: Kalan vadeye göre faiz kesilir
- Risk: Çekin karşılıksız çıkması durumunda sorumluluk sizde
- Kullanım: Tahsilat süresi uzun olan sektörler için (inşaat, üretim, toptan ticaret)

---

## Faiz Karşılaştırması

| Kredi Türü | Faiz Yapısı | Esneklik | Kimin İçin? |
|---|---|---|---|
| Spot | Sabit, net | Düşük | Tek seferlik büyük ödeme |
| Rotatif | Kullanım bazlı | Yüksek | Düzensiz nakit ihtiyacı |
| Taksitli | Sabit taksit | Orta | Uzun vadeli planlama |
| İskonto | Vadeye göre | Orta | Elinde çek/senet olan |

---

## Bankalar Başvuruda Neye Bakar?

İşletme kredisi başvurusunda bankalar şu 5 faktörü ağırlıklı olarak değerlendirir:

1. **Cari Oran:** Kısa vadeli borçları ödeyebilir misiniz?
2. **FAVÖK:** İşletme ne kadar nakit üretiyor?
3. **Borç/Özkaynak:** Zaten çok borçlu musunuz?
4. **Ödeme Geçmişi:** Daha önce gecikme var mı?
5. **Sektör Riski:** Bulunduğunuz sektör bankaca nasıl değerlendiriliyor?

---

## KOBİ'ler İçin Pratik Tavsiyeler

**Rotatif mi, Spot mu?**
Nakit akışınız dalgalıysa rotatif daha mantıklıdır. Sabit ve büyük bir ödemeniz varsa spot daha ucuza gelebilir.

**Vadeyi uzun tutmak pahalıya gelir.**
Taksit küçülür ama toplam faiz artar. Kısa vadede daha fazla ödeyip toplam maliyeti düşürmek genellikle daha akıllıcadır.

**Finansal tablolarınız hazır mı?**
Bankalar bilanço ve gelir tablosu ister. Finansal oranlarınız —özellikle cari oran ve borç/özkaynak— iyi görünmüyorsa kredi alma olasılığınız düşer ya da faiz yükselir.

---

## Sonuç

İşletme kredisi türü seçimi, işletmenizin nakit akış yapısına ve ihtiyacınızın süresine göre değişir:

- **Düzenli, öngörülemeyen nakit ihtiyacı → Rotatif**
- **Tek seferlik büyük ödeme → Spot**
- **Uzun vadeli planlama → Taksitli**
- **Elinde çek var → İskonto**

Kredi başvurusuna gitmeden önce finansal oranlarınızı gözden geçirin. Bankalar sizi sadece talepnamenizden değil, rakamlarınızdan değerlendirir.`,
  },
  {
    slug: 'stok-devir-hizi-nedir-kobi-rehberi',
    title: "Stok Devir Hızı Nedir? Yavaş Stok KOBİ'yi Nasıl Batırır?",
    description: 'Stok devir hızı nedir, nasıl hesaplanır? Düşük stok devir hızının nakit akışına ve banka kredi değerlendirmesine etkisi, KOBİ\'ler için pratik rehber.',
    category: 'Finansal Analiz',
    read_time: '6 dk okuma',
    published: true,
    content: `Depoda duran mal, donmuş paradır.

Stok devir hızı, bir işletmenin stoklarını ne kadar hızlı satıp nakde çevirdiğini gösteren temel finansal göstergedir. Bu oran düşükse işletme kasasız bile olsa "zengin" görünebilir — ama aslında nakit açığı içindedir.

---

## Stok Devir Hızı Nedir?

Stok devir hızı, bir hesap döneminde stokların kaç kez "döndüğünü" gösterir.

**Formül:**

> **Stok Devir Hızı = Satışların Maliyeti ÷ Ortalama Stok**

**Ortalama Stok = (Dönem Başı Stok + Dönem Sonu Stok) ÷ 2**

---

## Hesaplama Örneği

Bir tekstil toptancısını ele alalım:

- Yıllık satışların maliyeti: 6.000.000 TL
- Dönem başı stok: 800.000 TL
- Dönem sonu stok: 1.200.000 TL
- Ortalama stok: 1.000.000 TL

**Stok Devir Hızı = 6.000.000 ÷ 1.000.000 = 6**

Bu, yıl içinde stokların 6 kez devrettiği anlamına gelir. Yani ortalama her **61 günde bir** stok tamamen yenileniyor.

**Stokta Bekleme Süresi (Gün) = 365 ÷ Stok Devir Hızı**
→ 365 ÷ 6 = **~61 gün**

---

## İyi Stok Devir Hızı Nedir?

| Sektör | Sağlıklı Stok Devir Hızı |
|---|---|
| Market / Gıda perakende | 12–52 |
| Tekstil toptan | 4–8 |
| İnşaat malzemeleri | 3–6 |
| Makine / Ekipman | 2–4 |
| Mobilya | 3–5 |

---

## Düşük Stok Devir Hızı Neden Tehlikelidir?

### 1. Nakit Kilitleniyor
Stok satılmadıkça nakit geri dönmez. Tedarikçiye ödeme yapmanız gerekiyor, personel maaşı var, kira var — ama para depoda duruyor.

### 2. Bozulma ve Değer Kaybı Riski
Özellikle gıda, tekstil ve teknoloji ürünlerinde uzun süre depoda kalan mal değer kaybeder veya tamamen kullanılamaz hale gelir.

### 3. Depolama Maliyeti Artar
Ne kadar çok stok tutarsanız, depolama, sigorta ve yönetim maliyetleri o kadar yükselir.

### 4. Banka Kredi Değerlendirmesini Olumsuz Etkiler
Bankalar cari oranınıza bakarken stokun kalitesine de dikkat eder. Yavaş dönen stok, cari oranı şişirir ama gerçekte likit değildir. Deneyimli kredi analistleri bunu fark eder.

---

## Yüksek Stok Devir Hızı Her Zaman İyi midir?

Hayır. Çok yüksek stok devir hızı da sorun yaratabilir:

- Sürekli stok tükenmesi (müşteri kaybı)
- Acele alım zorunluluğu (yüksek birim maliyet)
- Tedarik zinciri kırılganlığı

Hedef, sektörünüze uygun dengeli bir hız tutturmaktır.

---

## Stok Devir Hızını Artırmanın Yolları

**1. ABC Analizi Yapın**
Stoklarınızı üç gruba ayırın:
- A: En çok satılan → Devamlı stokta tutun
- B: Orta satış hızı → İzleyin
- C: Yavaş dönen → Minimuma indirin veya tasfiye edin

**2. Sipariş Bazlı Çalışmaya Geçin**
Mümkünse önceden tahsilat alıp sonra sipariş verin.

**3. Fiyat İndirimiyle Yavaş Stoku Eritin**
Değer kaybetmeden önce indirimle elden çıkarmak, depolama maliyetinden ve bozulmadan iyidir.

**4. Tedarikçiyle Küçük-Sık Sipariş Anlaşması Yapın**
Büyük partiler yerine küçük ve sık alım yaparak stok miktarını düşürün.

---

## Bankaya Nasıl Görünürsünüz?

Kredi başvurusunda banka finansal tablolarınızı incelerken şunu sorar: "Bu stok gerçekten satılabilir mi?"

Stok devir hızınız sektör ortalamasının altındaysa, banka aktiflerinizi olduğundan düşük değerlendirebilir. Bu da kredi limitini veya onay olasılığını düşürür.

---

## Sonuç

Stok devir hızı, işletmenizin sağlığını ölçen en pratik göstergelerden biridir. Depodaki malı "varlık" olarak görmeyin — ancak satıldığında varlığa dönüşür.

Yavaş dönen stok, görünmez bir nakit sızıntısıdır. Zamanında fark etmek için bu oranı düzenli takip edin.`,
  },
  {
    slug: 'alacak-tahsil-suresi-nedir-kobi',
    title: 'Alacak Tahsil Süresi Nedir? Müşterileriniz Sizi Finanse mi Ediyor?',
    description: 'Alacak tahsil süresi (ATS) nedir, nasıl hesaplanır? Uzun tahsilat süresinin KOBİ nakit akışına etkisi ve banka kredi değerlendirmesindeki yeri.',
    category: 'Finansal Analiz',
    read_time: '6 dk okuma',
    published: true,
    content: `Satış yaptınız ama parayı alamadınız. Bu arada tedarikçiye ödeme, personele maaş, vergi var. İşte bu "aradaki boşluk", birçok KOBİ'nin asıl sorunu olan alacak tahsil süresidir.

---

## Alacak Tahsil Süresi (ATS) Nedir?

Alacak Tahsil Süresi (ATS), bir işletmenin yaptığı vadeli satışları tahsil etmek için ortalama kaç gün beklediğini gösterir.

Kısaca: Fatura kestinizden parayı aldığınıza kadar geçen ortalama gün sayısı.

**Formül:**

> **ATS = (Ticari Alacaklar ÷ Net Satışlar) × 365**

---

## Hesaplama Örneği

Bir metal işleme firmasını ele alalım:

- Yıllık net satışlar: 12.000.000 TL
- Dönem sonu ticari alacaklar: 2.400.000 TL

**ATS = (2.400.000 ÷ 12.000.000) × 365 = 73 gün**

Bu firma, sattığı malın parasını ortalama 73 gün sonra tahsil ediyor.

---

## İyi ATS Nedir?

| Sektör | Makul ATS |
|---|---|
| Perakende (nakit satış) | 0–15 gün |
| Toptan ticaret | 30–60 gün |
| İnşaat / Müteahhitlik | 60–120 gün |
| İhracat | 30–90 gün |
| Kamu ihaleleri | 90–180 gün |

---

## Uzun ATS Neden Tehlikelidir?

### 1. Gerçek Nakit Açığı Yaratır
Gelir tablosunda kâr görünür, ama kasa boştur. "Kâr ettim ama param yok" diyorsanız, bunun birinci nedeni genellikle uzun alacak tahsil süresidir.

### 2. Kredi İhtiyacını Zorunlu Kılar
Müşteri size 90 gün vade verirken tedarikçi 30 gün içinde ödeme istiyor. Bu 60 günlük açığı işletme kredisiyle kapatıyorsunuz — faiz maliyeti doğrudan kârınızı yiyor.

### 3. Bankanın Şüphesiyle Karşılaşırsınız
Bilanço incelemesinde alacaklar yüksek ve yaşlıysa banka şunu sorar: "Bu alacaklar gerçekten tahsil edilebilir mi?" Şüpheli alacak varsa kredi değerlendirmeniz olumsuz etkilenir.

### 4. Müşteri Riski Birikir
Tek bir büyük müşteri ödeme yapmazsa işletme sarsılır.

---

## ATS vs. Borç Ödeme Süresi: Kritik Denge

> **ATS > Borç Ödeme Süresi → Siz Müşteriyi Finanse Ediyorsunuz**
> **ATS < Borç Ödeme Süresi → Müşteri Sizi Finanse Ediyor**

**İdeal durum:** Tedarikçiye ödeme süreniz, müşteriden tahsilat sürenizden uzun olmalı.

**Örnek:**
- Müşteriden tahsilat: 73 gün
- Tedarikçiye ödeme: 45 gün
- **Fark: 28 gün** → Siz müşteriyi 28 gün boyunca bedelsiz finanse ediyorsunuz.

---

## ATS'yi Kısaltmanın Yolları

**1. Fatura Tarihini Öne Çekin**
Teslimatta değil, siparişte fatura kesin.

**2. Erken Ödeme İndirimi Teklif Edin**
"10 günde öderseniz %2 indirim" gibi teklifler nakit akışını hızlandırır.

**3. Vade Politikasını Gözden Geçirin**
Riskli müşterilere daha kısa vade veya peşinat uygulayın.

**4. Tahsilat Takibini Otomatize Edin**
Vade dolmadan hatırlatma gönderin. Çoğu gecikmeli ödeme kasıtlı değil, unutkanlıktan kaynaklanır.

**5. Faktoring Kullanın**
Vadeli alacaklarınızı bir finansman şirketine satarak peşin nakit alabilirsiniz.

---

## Bankaya Nasıl Görünürsünüz?

Banka kredi analistleri ATS'nize baktığında şunları değerlendirir:

- **ATS makul mü?** Sektör normunun üçte ikisi kabul edilebilir.
- **Alacaklar yaşlandırılmış mı?** 90 gün üzeri alacak değersiz sayılabilir.
- **Konsantrasyon riski var mı?** Tek müşteri alacakların %40'ını oluşturuyorsa bu kötü bir işaret.

---

## Sonuç

Alacak tahsil süresi, işletmenizin görünmez nakit musluğudur. Ne kadar uzunsa o kadar fazla para "havada" bekliyor demektir.

73 gün bekleyerek tahsil ettiğiniz her 1.000.000 TL için banka faizi ödüyorsanız, aslında müşteriniz sizin kâr marjınızı eritiyor. Bu döngüyü kırmak, işletme kredisine olan bağımlılığınızı da azaltır.`,
  },
  {
    slug: 'kobi-finansal-analiz-raporu-bankaya-nasil-sunulur',
    title: 'KOBİ İçin Finansal Analiz Raporu Nedir? Bankaya Nasıl Sunulur?',
    description: 'Finansal analiz raporu nedir, KOBİ\'ler için neden kritiktir? Bankaya kredi başvurusunda finansal raporu nasıl hazırlamalı ve nasıl sunmalısınız?',
    category: 'Finansal Analiz',
    read_time: '7 dk okuma',
    published: true,
    content: `Bankaya giriyorsunuz. Kredi istiyorsunuz. Banka müdürü "bilançonuzu getirin" diyor.

Bilançoyu getirdiniz. Ama banka analistinin gözünde bilanço tek başına yeterli değil. Asıl mesele, o bilançonun ne anlama geldiğini anlatabilmek.

İşte burada finansal analiz raporu devreye giriyor.

---

## Finansal Analiz Raporu Nedir?

Finansal analiz raporu; bir işletmenin bilanço, gelir tablosu ve nakit akış verilerini yorumlayan, güçlü ve zayıf yönleri ortaya koyan, kredi riskini ve işletme sağlığını sayısal olarak değerlendiren belgedir.

Banka içinde kredi analistleri bu raporu hazırlar. Ama bunu siz önceden kendiniz yaparsanız:

- Masaya güçlü gelirsiniz
- Zayıf noktalarınızı önceden görüp açıklarsınız
- Kredi onay olasılığınız artar

---

## Finansal Analiz Raporunda Neler Olur?

### 1. Temel Finansal Oranlar

| Oran | Ne Gösterir? |
|---|---|
| Cari Oran | Kısa vadeli borç ödeme gücü |
| Asit Test Oranı | Stok hariç likidite |
| Borç/Özkaynak | Finansal kaldıraç ve risk |
| FAVÖK Marjı | Operasyonel kârlılık |
| Stok Devir Hızı | Stok yönetimi etkinliği |
| Alacak Tahsil Süresi | Nakit dönüşüm hızı |
| Özsermaye Karlılığı (ROE) | Özkaynak getirisi |

### 2. Güçlü Yönler
Rakamların iyi göründüğü alanlar açıkça belirtilmeli. Örneğin: "Cari oranımız 2,4 ile sektör ortalaması olan 1,8'in üzerindedir."

### 3. Zayıf Yönler ve Açıklamaları
Olumsuz görünen rakamlar için mutlaka bağlam sunun. Örneğin: "Alacak tahsil süremiz 85 gün görünmektedir; bunun 40 günü kamu ihalelerinden kaynaklanan yapısal gecikmedir."

### 4. Senaryo Analizi
"Satışlar %20 düşerse ne olur?" gibi sorulara hazır cevabınız olmalı.

### 5. Kredi Geri Ödeme Kapasitesi
FAVÖK'e dayanarak aylık taksit yükünü kaldırıp kaldıramayacağınızı gösterin.

---

## Bankaya Sunarken Dikkat Edilecekler

**Hikayeyi Rakamlarla Destekleyin**
"Geçen yıl büyüdük" yetmez. "Ciromuzu %34 artırdık, FAVÖK'ümüz 1,2 milyon TL'ye ulaştı" deyin.

**Olumsuz Oranları Saklamayın**
Banka zaten görüyor. Siz önceden açıklarsanız güven kazanırsınız. Saklamaya çalışırsanız güven kaybedersiniz.

**Karşılaştırmalı Gösterin**
İki yıllık veriyi yan yana koyun. Trend, tek dönem verisinden çok daha anlamlıdır.

**Sektör Ortalamasıyla Kıyaslayın**
"Cari oranım 1,5" demek yerine "Sektör ortalaması 1,3, bizim oranımız 1,5" demek çok daha güçlüdür.

---

## Hangi Belgeleri Götürmelisiniz?

1. **Son 2 yıl bilanço ve gelir tablosu** (bağımsız denetimli veya SMMM onaylı)
2. **Mizan dökümü** (detaylı hesap bazlı)
3. **Vergi levhası ve imza sirküleri**
4. **Son 3–6 ay banka ekstreleri**
5. **Finansal analiz raporu** (oranlar + yorumlar)
6. **İş planı veya sipariş/sözleşme bilgisi** (büyük tutarlarda)

---

## BilancoSkor Ne İşe Yarar?

BilancoSkor, mizan Excel dosyanızı yükleyerek otomatik finansal analiz raporu oluşturur.

- 19 finansal oran otomatik hesaplanır
- Güçlü ve zayıf yönler yapay zeka destekli yorumlanır
- Kredi skoru (A–D arası) üretilir
- Bankaya sunmaya hazır rapor PDF olarak indirilebilir

Bankaya gitmeden önce kendi raporunuzu görmek, hazırlıklı gitmenizi sağlar.

---

## Sonuç

Finansal analiz raporu, sadece banka için değil, işletmenizin nabzını kendiniz tutmak için de kritiktir. Yılda en az bir kez —tercihen her çeyrekte— finansal oranlarınızı gözden geçirin.

Bankaya hazırlıksız gitmeyin. Rakamlarınızı siz anlatın; banka analistine bırakmayın.`,
  },
  {
    slug: 'oz-sermaye-karliligi-roe-nedir-kobi',
    title: 'Özsermaye Karlılığı (ROE) Nedir? Yatırımcılar ve Bankalar Neden Önemsiyor?',
    description: 'Özsermaye karlılığı (ROE) nedir, nasıl hesaplanır? ROE\'nin KOBİ değerlemesinde ve banka kredi kararlarındaki yeri, iyi ROE değeri nedir?',
    category: 'Finansal Analiz',
    read_time: '6 dk okuma',
    published: true,
    content: `İşletmenize koyduğunuz her 100 liranın size kaç lira geri döndürdüğünü hiç hesapladınız mı?

Bu sorunun cevabı Özsermaye Karlılığı (ROE) ile ölçülür. Yatırımcılar için vazgeçilmez, bankalar içinse giderek daha önemli hale gelen bu oran, işletmenizin gerçek verimliliğini gösterir.

---

## Özsermaye Karlılığı (ROE) Nedir?

ROE (Return on Equity), bir işletmenin özsermayesini ne kadar verimli kullandığını gösteren kârlılık oranıdır.

Kısaca: **Ortakların koyduğu para ne kadar kâr üretiyor?**

**Formül:**

> **ROE = Net Kâr ÷ Özsermaye × 100**

---

## Hesaplama Örneği

Bir gıda üreticisini ele alalım:

- Yıllık net kâr: 1.800.000 TL
- Özsermaye: 9.000.000 TL

**ROE = 1.800.000 ÷ 9.000.000 × 100 = %20**

Bu işletme, her 100 TL özsermaye için 20 TL net kâr üretiyor.

---

## İyi ROE Değeri Nedir?

| ROE Değeri | Değerlendirme |
|---|---|
| %5 altı | Zayıf — Enflasyonu bile geçemiyor olabilir |
| %5 – %15 | Kabul edilebilir |
| %15 – %25 | İyi |
| %25 üzeri | Güçlü (sürdürülebilirliği sorgulanmalı) |

> **Önemli not:** Yüksek borçlanmayla şişirilmiş ROE yanıltıcı olabilir. Borç/Özkaynak oranıyla birlikte değerlendirin.

---

## ROE Neden Yanıltıcı Olabilir?

### Borç Kullanımı ROE'yi Yapay Şişirir

**Örnek:**
- Şirket A: 10M TL özsermaye, 0 borç, 1M TL net kâr → ROE = %10
- Şirket B: 3M TL özsermaye, 7M TL borç, 1M TL net kâr → ROE = %33

Şirket B'nin ROE'si yüksek görünüyor ama aslında çok kırılgan bir yapı var. Bankalar bunu Borç/Özkaynak oranıyla birlikte değerlendirir.

### Geçici Kâr Artışları
Tek seferlik gelirler (gayrimenkul satışı, teşvik geliri) net kârı ve ROE'yi geçici olarak şişirebilir.

---

## ROE'nin Bileşenleri: DuPont Analizi

> **ROE = Net Kâr Marjı × Aktif Devir Hızı × Finansal Kaldıraç**

| Bileşen | Ne Gösterir? |
|---|---|
| Net Kâr Marjı | Satışlardan ne kadar kâr kalıyor? |
| Aktif Devir Hızı | Varlıklar ne kadar verimli kullanılıyor? |
| Finansal Kaldıraç | Borç kullanım oranı nedir? |

ROE düşükse hangi bileşen sorunlu, bunu görmek için DuPont analizi yapın.

---

## Bankalar ROE'ye Neden Bakar?

**1. Geri ödeme kapasitesi göstergesi**
Yüksek ROE, işletmenin sermayesini verimli kullandığını ve kâr ürettiğini gösterir. Kârlı işletme borç öder.

**2. Yönetim kalitesi sinyali**
Uzun dönem istikrarlı ROE, iyi yönetimi işaret eder.

**3. Kriz direnci**
Özsermayesi güçlü işletmeler kriz dönemlerinde daha dayanıklıdır.

---

## KOBİ'ler İçin ROE İyileştirme Yolları

**1. Net Kâr Marjını Artırın**
- Gereksiz giderleri kısın
- Fiyatlandırma stratejinizi gözden geçirin
- Düşük marjlı ürün/hizmetleri eleyın

**2. Aktif Verimliliğini Artırın**
- Stok devir hızını yükseltin
- Alacak tahsilat süresini kısaltın
- Atıl varlıkları satın veya kiraya verin

---

## ROE ile ROA Farkı

| | ROE | ROA |
|---|---|---|
| Açılım | Özsermaye Karlılığı | Aktif Karlılığı |
| Formül | Net Kâr / Özsermaye | Net Kâr / Toplam Aktif |
| Ne gösterir? | Ortakların parasının getirisi | Tüm varlıkların getirisi |
| Borç etkisi | Yüksek borçla şişebilir | Borçtan daha az etkilenir |

---

## Sonuç

Özsermaye karlılığı (ROE), işletmenizin "paranızı ne kadar çalıştırdığını" ölçen temel göstergedir. Düşük ROE, büyüme sorununun değil çoğunlukla verimlilik sorununun işaretidir.

Bankaya gitmeden önce ROE'nizi hesaplayın, borç/özkaynak oranıyla birlikte değerlendirin ve sektör ortalamasıyla karşılaştırın. Bu üçlü tablo, kredi görüşmelerinizde güçlü bir başlangıç noktası oluşturur.`,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.SEED_SECRET && secret !== 'bilancoskor-seed-2026') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('blog_posts')
    .upsert(POSTS, { onConflict: 'slug' })
    .select('id, slug')

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true, inserted: data?.length, posts: data })
}
