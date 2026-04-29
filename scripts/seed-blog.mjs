import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// .env.local'ı manuel parse et
const envPath = join(__dirname, '..', '.env.local')
for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
  const idx = line.indexOf('=')
  if (idx === -1) continue
  const key = line.slice(0, idx).trim()
  const val = line.slice(idx + 1).trim()
  process.env[key] = val
}

const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, key)

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/m)
  if (!match) throw new Error('Frontmatter bulunamadı')
  const fmLines = match[1].split('\n')
  const meta = {}
  for (const line of fmLines) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const val = line.slice(idx + 1).trim().replace(/^"(.*)"$/, '$1')
    meta[key] = val
  }
  return { meta, content: match[2].trim() }
}

const FILES = [
  '/Users/gokhanonur/Downloads/makale_09_isletme_kredisi.md',
  '/Users/gokhanonur/Downloads/makale_10_stok_devir_hizi.md',
  '/Users/gokhanonur/Downloads/makale_11_alacak_tahsil_suresi.md',
  '/Users/gokhanonur/Downloads/makale_12_finansal_analiz_raporu.md',
  '/Users/gokhanonur/Downloads/makale_13_roe_ozsermaye_karliligi.md',
]

const posts = FILES.map(f => {
  const raw = readFileSync(f, 'utf-8')
  const { meta, content } = parseFrontmatter(raw)
  return {
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    category: meta.category,
    read_time: meta.readTime,
    content,
    published: true,
  }
})

console.log(`${posts.length} makale hazırlandı:`)
posts.forEach(p => console.log(` - ${p.slug}`))

const { data, error } = await supabase
  .from('blog_posts')
  .upsert(posts, { onConflict: 'slug' })
  .select('id, slug')

if (error) {
  console.error('HATA:', error.message)
  process.exit(1)
}

console.log('\nBaşarıyla eklendi:')
data?.forEach(r => console.log(` ✓ ${r.slug} (id: ${r.id})`))
