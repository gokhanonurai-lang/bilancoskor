import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — BilancoSkor',
  description: 'KOBİler için finansal analiz, kredi skoru ve banka ilişkileri hakkında rehber yazılar.',
}

async function getPosts() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await supabase
    .from('blog_posts')
    .select('slug,title,description,category,read_time,created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
  return data || []
}

export default async function BlogPage() {
  const posts = await getPosts()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-gray-500">Finansal analiz, kredi skoru ve banka ilişkileri hakkında rehber yazılar.</p>
        </div>
        <div className="space-y-4">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="block bg-white rounded-2xl border border-gray-100 p-6 hover:border-brand-300 hover:shadow-sm transition">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-medium">{post.category}</span>
                <span className="text-xs text-gray-400">{post.read_time}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{post.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{post.description}</p>
              <div className="text-xs text-gray-400 mt-3">
                {new Date(post.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </Link>
          ))}
          {posts.length === 0 && (
            <div className="text-center text-gray-400 py-16">Henüz yazı yok.</div>
          )}
        </div>
      </div>
    </div>
  )
}
