'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SSSPage() {
  const [sorular, setSorular] = useState<{soru:string,cevap:string}[]>([])

  useEffect(() => {
    supabase.from('settings').select('value').eq('key', 'sss_sorular').single()
      .then(({ data }) => {
        if (data?.value) {
          try { setSorular(JSON.parse(data.value)) } catch {}
        }
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sikca Sorulan Sorular</h1>
          <p className="text-gray-500">Aklinizdaki sorularin cevaplari burada.</p>
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
          <p className="text-sm text-gray-600 mb-3">Sorunuzu bulamadiniz mi?</p>
          <a href="mailto:destek@bilancoskor.com" className="btn-primary inline-block">destek@bilancoskor.com</a>
        </div>
        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition">Ana sayfaya don</Link>
        </div>
      </div>
    </div>
  )
}
