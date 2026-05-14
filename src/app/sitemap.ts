import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('published', true)

  const blogUrls = (posts || []).map(p => ({
    url: `https://www.bilancoskor.com/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: 'https://www.bilancoskor.com', changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://www.bilancoskor.com/blog', changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://www.bilancoskor.com/sss', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.bilancoskor.com/hakkimizda', changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://www.bilancoskor.com/auth', changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://www.bilancoskor.com/sozlesmeler/kullanici-sozlesmesi', changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://www.bilancoskor.com/sozlesmeler/gizlilik-politikasi', changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://www.bilancoskor.com/sozlesmeler/mesafeli-satis', changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://www.bilancoskor.com/sozlesmeler/aydinlatma-metni', changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://www.bilancoskor.com/sozlesmeler/cerez-politikasi', changeFrequency: 'yearly', priority: 0.3 },
    ...blogUrls,
  ]
}
