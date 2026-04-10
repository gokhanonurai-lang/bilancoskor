'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ADMIN_EMAIL = 'gokhanonur.ai@icloud.com'

type Tab = 'ayarlar' | 'icerik' | 'kullanicilar' | 'istatistikler'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('istatistikler')
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [users, setUsers] = useState<any[]>([])
  const [stats, setStats] = useState({ total_users: 0, total_reports: 0, total_revenue: 0, today_reports: 0 })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session || session.user.email !== ADMIN_EMAIL) {
        router.replace('/')
        return
      }
      setLoading(false)
      loadAll()
    })
  }, [])

  const loadAll = async () => {
    // Settings
    const { data: settingsData } = await supabase.from('settings').select('*')
    if (settingsData) {
      const map: Record<string, string> = {}
      settingsData.forEach((s: any) => { map[s.key] = s.value })
      setSettings(map)
    }

    // Stats
    const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
    const { count: reportCount } = await supabase.from('reports').select('*', { count: 'exact', head: true })
    const today = new Date().toISOString().split('T')[0]
    const { count: todayCount } = await supabase.from('reports').select('*', { count: 'exact', head: true }).gte('created_at', today)
    const { data: payments } = await supabase.from('payments').select('amount').eq('status', 'paid')
    const revenue = payments?.reduce((sum: number, p: any) => sum + (p.amount || 0), 0) || 0
    setStats({ total_users: userCount || 0, total_reports: reportCount || 0, total_revenue: revenue, today_reports: todayCount || 0 })

    // Users
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('id, email, ad, soyad, created_at')
      .order('created_at', { ascending: false })
      .limit(100)

    if (profilesData) {
      const enriched = await Promise.all(profilesData.map(async (p: any) => {
        const { count } = await supabase.from('reports').select('*', { count: 'exact', head: true }).eq('user_id', p.id)
        const { data: pays } = await supabase.from('payments').select('amount').eq('user_id', p.id).eq('status', 'paid')
        const total = pays?.reduce((s: number, x: any) => s + (x.amount || 0), 0) || 0
        return { ...p, report_count: count || 0, total_paid: total }
      }))
      setUsers(enriched)
    }
  }

  const saveSetting = async (key: string, value: string) => {
    setSaving(true)
    await supabase.from('settings').upsert({ key, value, updated_at: new Date().toISOString() })
    setMsg(`${key} kaydedildi`)
    setTimeout(() => setMsg(''), 2000)
    setSaving(false)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-gray-400">Yükleniyor...</div></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Başlık */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Yönetici Paneli</h1>
            <p className="text-sm text-gray-400 mt-1">BilancoSkor — Admin</p>
          </div>
          {msg && <div className="bg-green-50 text-green-700 text-sm px-4 py-2 rounded-xl border border-green-200">{msg}</div>}
        </div>

        {/* Sekmeler */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {(['istatistikler', 'kullanicilar', 'ayarlar', 'icerik'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition capitalize ${tab === t ? 'border-brand-400 text-brand-400' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {t === 'istatistikler' ? 'İstatistikler' : t === 'kullanicilar' ? 'Kullanıcılar' : t === 'ayarlar' ? 'Ayarlar' : 'İçerik'}
            </button>
          ))}
        </div>

        {/* İSTATİSTİKLER */}
        {tab === 'istatistikler' && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Toplam Kullanıcı', value: stats.total_users, icon: '👥' },
                { label: 'Toplam Rapor', value: stats.total_reports, icon: '📄' },
                { label: 'Bugün Rapor', value: stats.today_reports, icon: '📅' },
                { label: 'Toplam Gelir', value: `${stats.total_revenue.toLocaleString('tr-TR')} ₺`, icon: '💰' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KULLANICILAR */}
        {tab === 'kullanicilar' && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Email', 'İsim', 'Kayıt Tarihi', 'Rapor', 'Ödeme'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">{u.email}</td>
                    <td className="px-4 py-3 text-gray-600">{[u.ad, u.soyad].filter(Boolean).join(' ') || '—'}</td>
                    <td className="px-4 py-3 text-gray-500">{new Date(u.created_at).toLocaleDateString('tr-TR')}</td>
                    <td className="px-4 py-3">
                      <span className="bg-brand-50 text-brand-400 text-xs font-medium px-2 py-0.5 rounded-full">{u.report_count} rapor</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{u.total_paid ? `${u.total_paid.toLocaleString('tr-TR')} ₺` : '—'}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Henüz kullanıcı yok</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* AYARLAR */}
        {tab === 'ayarlar' && (
          <div className="space-y-4">
            {[
              { key: 'rapor_fiyati', label: 'Rapor Fiyatı (₺)', type: 'number', desc: 'KDV dahil fiyat' },
              { key: 'rapor_erisim_gun', label: 'Rapor Erişim Süresi (gün)', type: 'number', desc: 'Rapor kaç gün erişilebilir' },
              { key: 'dosya_limit_mb', label: 'Dosya Boyut Limiti (MB)', type: 'number', desc: 'Max yüklenebilir dosya boyutu' },
              { key: 'bakim_modu', label: 'Bakım Modu', type: 'toggle', desc: 'Aktifse site kapalı görünür' },
            ].map(({ key, label, type, desc }) => (
              <div key={key} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium text-gray-900">{label}</div>
                    <div className="text-sm text-gray-400 mt-0.5">{desc}</div>
                  </div>
                  {type === 'toggle' ? (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{settings[key] === 'true' ? 'Açık' : 'Kapalı'}</span>
                      <button
                        onClick={() => {
                          const newVal = settings[key] === 'true' ? 'false' : 'true'
                          setSettings(s => ({ ...s, [key]: newVal }))
                          saveSetting(key, newVal)
                        }}
                        className={`w-12 h-6 rounded-full transition ${settings[key] === 'true' ? 'bg-red-400' : 'bg-gray-200'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transition mx-0.5 ${settings[key] === 'true' ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type={type}
                        value={settings[key] || ''}
                        onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                        className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-32 text-right"
                      />
                      <button
                        onClick={() => saveSetting(key, settings[key])}
                        disabled={saving}
                        className="btn-primary text-sm py-2 px-4"
                      >
                        Kaydet
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* İÇERİK */}
        {tab === 'icerik' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400">
            <div className="text-4xl mb-3">🚧</div>
            <div className="font-medium text-gray-600">İçerik yönetimi yakında</div>
            <div className="text-sm mt-1">SSS ve Hakkımızda içerikleri buradan düzenlenebilecek</div>
          </div>
        )}

      </div>
    </div>
  )
}
