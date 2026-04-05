'use client'
import Link from 'next/link'

const belgeler = [
  { slug: 'kullanici-sozlesmesi', title: 'Kullanıcı Sözleşmesi' },
  { slug: 'gizlilik-politikasi', title: 'Gizlilik Politikası' },
  { slug: 'aydinlatma-metni', title: 'KVKK Aydınlatma Metni' },
  { slug: 'mesafeli-satis', title: 'Mesafeli Satış Sözleşmesi' },
  { slug: 'cerez-politikasi', title: 'Çerez Politikası' },
]

export default function SozlesmelerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center">
          <Link href="/" className="font-semibold text-xl tracking-tight">
            Bilanco<span className="text-brand-400">Skor</span>
          </Link>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Yasal Belgeler</h1>
        <p className="text-gray-500 mb-8 text-sm">BilancoSkor platformuna ilişkin tüm yasal belgelerimize aşağıdan ulaşabilirsiniz.</p>
        <div className="space-y-3">
          {belgeler.map(b => (
            <Link key={b.slug} href={`/sozlesmeler/${b.slug}`}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-brand-200 transition group">
              <span className="text-sm font-medium text-gray-800">{b.title}</span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-400 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
