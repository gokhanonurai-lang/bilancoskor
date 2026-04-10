'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ADMIN_EMAIL = 'gokhanonur.ai@icloud.com'

type Tab = 'ayarlar' | 'icerik' | 'kullanicilar' | 'istatistikler' | 'blog'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('istatistikler')
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [users, setUsers] = useState<any[]>([])
  const [stats, setStats] = useState({ total_users: 0, total_reports: 0, total_revenue: 0, today_reports: 0 })
  const [saving, setSaving] = useState(false)
  const [icerikTab, setIcerikTab] = useState<'hero'|'hakkimizda'|'sss'>('hero')
  const [sssEdit, setSssEdit] = useState<{soru:string,cevap:string}[]>([])
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [blogEdit, setBlogEdit] = useState<any>({ title:'', description:'', category:'Finansal Analiz', read_time:'5 dk okuma', content:'', published:false, slug:'' })
  const [blogMode, setBlogMode] = useState<'list'|'edit'>('list')
  const [blogSaving, setBlogSaving] = useState(false)
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

    // Blog
    const { data: blogData } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
    if (blogData) setBlogPosts(blogData)

    // SSS
    const { data: sssData } = await supabase.from('settings').select('value').eq('key', 'sss_sorular').single()
    if (sssData?.value) { try { setSssEdit(JSON.parse(sssData.value)) } catch(e) {} }

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
          {(['istatistikler', 'kullanicilar', 'blog', 'ayarlar', 'icerik'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition capitalize ${tab === t ? 'border-brand-400 text-brand-400' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {t === 'istatistikler' ? 'İstatistikler' : t === 'kullanicilar' ? 'Kullanıcılar' : t === 'blog' ? 'Blog' : t === 'ayarlar' ? 'Ayarlar' : 'İçerik'}
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

        {/* BLOG */}
        {tab === 'blog' && (
          <div className="space-y-4">
            {blogMode === 'list' ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-gray-900">Blog Yazıları ({blogPosts.length})</h2>
                  <button onClick={() => { setBlogEdit({ title:'', description:'', category:'Finansal Analiz', read_time:'5 dk okuma', content:'', published:false, slug:'' }); setBlogMode('edit') }}
                    className="btn-primary text-sm py-2 px-4">+ Yeni Yazı</button>
                </div>
                <div className="space-y-3">
                  {blogPosts.map(p => (
                    <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.published ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                            {p.published ? 'Yayında' : 'Taslak'}
                          </span>
                          <span className="text-xs text-gray-400">{p.category}</span>
                        </div>
                        <div className="font-medium text-gray-900 text-sm">{p.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">/blog/{p.slug}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setBlogEdit(p); setBlogMode('edit') }}
                          className="text-sm text-brand-500 hover:text-brand-700 border border-brand-200 rounded-xl px-3 py-1.5">Düzenle</button>
                        <button onClick={async () => {
                          if (!confirm('Silmek istediğinize emin misiniz?')) return
                          await supabase.from('blog_posts').delete().eq('id', p.id)
                          setBlogPosts(prev => prev.filter(x => x.id !== p.id))
                        }} className="text-sm text-red-400 hover:text-red-600 border border-red-100 rounded-xl px-3 py-1.5">Sil</button>
                      </div>
                    </div>
                  ))}
                  {blogPosts.length === 0 && <div className="text-center text-gray-400 py-8">Henüz yazı yok.</div>}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button onClick={() => setBlogMode('list')} className="text-sm text-gray-400 hover:text-gray-600">← Listeye dön</button>
                  <div className="flex gap-2">
                    <button onClick={async () => {
                      setBlogSaving(true)
                      const data = { ...blogEdit, updated_at: new Date().toISOString() }
                      if (blogEdit.id) {
                        await supabase.from('blog_posts').update(data).eq('id', blogEdit.id)
                        setBlogPosts(prev => prev.map(p => p.id === blogEdit.id ? { ...p, ...data } : p))
                      } else {
                        const { data: ins } = await supabase.from('blog_posts').insert(data).select().single()
                        if (ins) setBlogPosts(prev => [ins, ...prev])
                      }
                      setBlogSaving(false)
                      setMsg('Kaydedildi')
                      setTimeout(() => setMsg(''), 2000)
                      setBlogMode('list')
                    }} disabled={blogSaving} className="text-sm border border-gray-200 rounded-xl px-4 py-2 text-gray-600 hover:bg-gray-50">
                      {blogEdit.published ? 'Kaydet' : 'Taslak Kaydet'}
                    </button>
                    <button onClick={async () => {
                      setBlogSaving(true)
                      const data = { ...blogEdit, published: true, updated_at: new Date().toISOString() }
                      if (blogEdit.id) {
                        await supabase.from('blog_posts').update(data).eq('id', blogEdit.id)
                        setBlogPosts(prev => prev.map(p => p.id === blogEdit.id ? { ...p, ...data } : p))
                      } else {
                        const { data: ins } = await supabase.from('blog_posts').insert(data).select().single()
                        if (ins) setBlogPosts(prev => [ins, ...prev])
                      }
                      setBlogSaving(false)
                      setMsg('Yayınlandı!')
                      setTimeout(() => setMsg(''), 2000)
                      setBlogMode('list')
                    }} disabled={blogSaving} className="btn-primary text-sm py-2 px-4">Yayınla</button>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Başlık</label>
                    <input value={blogEdit.title} onChange={e => setBlogEdit((p:any) => ({...p, title:e.target.value}))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" placeholder="Makale başlığı" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Slug (URL)</label>
                    <input value={blogEdit.slug} onChange={e => setBlogEdit((p:any) => ({...p, slug:e.target.value}))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-mono" placeholder="favok-nedir-bankalar-neden-onem-verir" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Açıklama (SEO)</label>
                    <textarea rows={2} value={blogEdit.description} onChange={e => setBlogEdit((p:any) => ({...p, description:e.target.value}))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none" placeholder="Makale özeti, Google'da görünür" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Kategori</label>
                      <input value={blogEdit.category} onChange={e => setBlogEdit((p:any) => ({...p, category:e.target.value}))}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" placeholder="Finansal Analiz" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Okuma Süresi</label>
                      <input value={blogEdit.read_time} onChange={e => setBlogEdit((p:any) => ({...p, read_time:e.target.value}))}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" placeholder="5 dk okuma" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">İçerik (Markdown)</label>
                    <textarea rows={20} value={blogEdit.content} onChange={e => setBlogEdit((p:any) => ({...p, content:e.target.value}))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none font-mono"
                      placeholder="## Başlık&#10;&#10;Paragraf metni...&#10;&#10;**Kalın**, *italik*&#10;&#10;- Madde 1&#10;- Madde 2" />
                    <div className="text-xs text-gray-400 mt-1">Markdown formatı: ## başlık, **kalın**, *italik*, - liste, | tablo</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* İÇERİK */}
        {tab === 'icerik' && (
          <div className="space-y-6">
            <div className="flex gap-2 border-b border-gray-100 pb-2">
              {([['hero','Hero Metinler'],['hakkimizda','Hakkımızda'],['sss','SSS']] as [string,string][]).map(([k,l]) => (
                <button key={k} onClick={() => setIcerikTab(k as any)}
                  className={`px-4 py-1.5 text-sm rounded-lg font-medium transition ${icerikTab===k ? 'bg-brand-50 text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}>
                  {l}
                </button>
              ))}
            </div>

            {icerikTab === 'hero' && (
              <div className="space-y-4">
                {([
                  ['hero_badge','Badge Yazısı','Yeşil rozetteki küçük yazı'],
                  ['hero_baslik','Ana Başlık','H1 başlığı'],
                  ['hero_alt_baslik','Alt Başlık','Açıklama metni (\\n ile satır kır)'],
                  ['hero_aciklama','İtalik Açıklama','Küçük italic yazı'],
                ] as [string,string,string][]).map(([key,label,desc]) => (
                  <div key={key} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="font-medium text-gray-900 mb-0.5">{label}</div>
                    <div className="text-xs text-gray-400 mb-3">{desc}</div>
                    <textarea rows={2} value={settings[key] || ''}
                      onChange={e => setSettings(s => ({...s, [key]: e.target.value}))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none" />
                    <button onClick={() => saveSetting(key, settings[key])} disabled={saving}
                      className="btn-primary text-sm py-1.5 px-4 mt-2">Kaydet</button>
                  </div>
                ))}
              </div>
            )}

            {icerikTab === 'hakkimizda' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="font-medium text-gray-900 mb-0.5">Hakkımızda Metni</div>
                <div className="text-xs text-gray-400 mb-3">Hakkımızda sayfasında gösterilen açıklama</div>
                <textarea rows={6} value={settings['hakkimizda_metin'] || ''}
                  onChange={e => setSettings(s => ({...s, hakkimizda_metin: e.target.value}))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none" />
                <button onClick={() => saveSetting('hakkimizda_metin', settings['hakkimizda_metin'])} disabled={saving}
                  className="btn-primary text-sm py-1.5 px-4 mt-2">Kaydet</button>
              </div>
            )}

            {icerikTab === 'sss' && (
              <div className="space-y-3">
                {sssEdit.map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-medium">#{i+1}</span>
                      <button onClick={() => {
                        const next = sssEdit.filter((_,j) => j !== i)
                        setSssEdit(next)
                        saveSetting('sss_sorular', JSON.stringify(next))
                      }} className="text-xs text-red-400 hover:text-red-600">Sil</button>
                    </div>
                    <input value={item.soru} placeholder="Soru"
                      onChange={e => setSssEdit(prev => prev.map((x,j) => j===i ? {...x,soru:e.target.value} : x))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" />
                    <textarea rows={3} value={item.cevap} placeholder="Cevap"
                      onChange={e => setSssEdit(prev => prev.map((x,j) => j===i ? {...x,cevap:e.target.value} : x))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none" />
                    <button onClick={() => saveSetting('sss_sorular', JSON.stringify(sssEdit))} disabled={saving}
                      className="btn-primary text-sm py-1.5 px-4">Kaydet</button>
                  </div>
                ))}
                <button onClick={() => setSssEdit(prev => [...prev, {soru:'',cevap:''}])}
                  className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-400 hover:border-brand-400 hover:text-brand-400 transition">
                  + Yeni Soru Ekle
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
