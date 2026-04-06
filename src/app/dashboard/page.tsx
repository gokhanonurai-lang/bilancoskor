'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ymjwtntlfioexudvacsj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltand0bnRsZmlvZXh1ZHZhY3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzODY5NTQsImV4cCI6MjA5MDk2Mjk1NH0.xW8XVjr0q7LQ_UStIf0s8q8MoYOsnJyg5ALkDAbT-CI'
)

type Report = { id: string; firma_adi: string; sektor: string; skor: number; harf: string; pdf_url: string; created_at: string; expires_at: string }
const HR: Record<string, string> = { AAA:'text-brand-400',AA:'text-brand-400',A:'text-brand-400',BBB:'text-amber-500',BB:'text-amber-500',B:'text-red-400',D:'text-red-500' }

export default function DashboardPage() {
  const router = useRouter()
  const [ad, setAd] = useState('')
  const [email, setEmail] = useState('')
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/auth'); return }
      setEmail(session.user.email!)
      const { data: p } = await supabase.from('profiles').select('ad').eq('id', session.user.id).single()
      setAd(p?.ad || session.user.email!.split('@')[0])
      const { data: r } = await supabase.from('reports').select('*').eq('user_id', session.user.id).gt('expires_at', new Date().toISOString()).order('created_at', { ascending: false })
      setReports(r || [])
      setLoading(false)
    }
    init()
  }, [router])

  const cikis = async () => { await supabase.auth.signOut(); router.push('/') }
  const gun = (e: string) => Math.ceil((new Date(e).getTime() - Date.now()) / 86400000)

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round"/></svg></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Merhaba, {ad}</h1>
            <p className="text-sm text-gray-500 mt-1">Raporlarınız aşağıda listelenmiştir.</p>
          </div>
          <Link href="/analyze" className="btn-primary">Yeni rapor oluştur</Link>
        </div>
        {reports.length > 0 ? (
          <div className="space-y-3 mb-8">
            {reports.map(r => (
              <div key={r.id} className="card flex items-center gap-5">
                <div className="w-14 h-14 rounded-full border-2 border-brand-400 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-lg font-semibold text-brand-400 leading-none">{r.skor}</span>
                  <span className={"text-xs font-medium " + (HR[r.harf] || 'text-gray-400')}>{r.harf}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{r.firma_adi || 'Rapor'}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{r.sektor} · {new Date(r.created_at).toLocaleDateString('tr-TR')}</div>
                </div>
                <div className="text-center flex-shrink-0">
                  <div className={"text-xs font-medium " + (gun(r.expires_at) <= 1 ? 'text-red-400' : 'text-amber-500')}>{gun(r.expires_at) > 0 ? gun(r.expires_at) + ' gün kaldı' : 'Son gün'}</div>
                  <div className="text-xs text-gray-400">erişim süresi</div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link href={"/report/" + r.id} className="btn-primary text-xs py-2 px-4">Görüntüle</Link>
                  {r.pdf_url && <a href={r.pdf_url} className="btn-outline text-xs py-2 px-4">PDF</a>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-base font-medium text-gray-900 mb-2">Henüz rapor yok</h3>
            <p className="text-sm text-gray-500 mb-6">Mizanınızı yükleyin ve ilk raporunuzu oluşturun.</p>
            <Link href="/analyze" className="btn-primary">Rapor oluştur</Link>
          </div>
        )}
        <div className="bg-brand-50 rounded-2xl p-5 flex gap-3">
          <div className="w-4 h-4 rounded-full bg-brand-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-brand-600 mb-1">Raporlar 3 gün saklanır</div>
            <div className="text-xs text-brand-600 opacity-80">Raporlarınız 3 gün boyunca erişilebilirdir.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
