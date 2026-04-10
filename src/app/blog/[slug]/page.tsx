import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = getPostBySlug(params.slug)
    return { title: `${post.title} — BilancoSkor`, description: post.description }
  } catch { return {} }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let post
  try { post = getPostBySlug(params.slug) } catch { notFound() }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-600 transition">← Bloga dön</Link>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-medium">{post.category}</span>
          <span className="text-xs text-gray-400">{post.readTime}</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">
            {new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
        <p className="text-lg text-gray-500 mb-10 leading-relaxed">{post.description}</p>
        <article className="prose prose-gray prose-sm max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-a:text-brand-500 prose-strong:text-gray-900 prose-table:text-sm">
          <MDXRemote source={post.content} />
        </article>
        <div className="mt-16 bg-brand-50 rounded-2xl p-6 border border-brand-100">
          <p className="font-semibold text-gray-900 mb-1">Bilanço skorunuzu öğrenmek ister misiniz?</p>
          <p className="text-sm text-gray-600 mb-4">Mizanınızı yükleyin, dakikalar içinde bankanın sizi nasıl gördüğünü öğrenin.</p>
          <Link href="/" className="btn-primary inline-block text-sm">Rapor oluştur →</Link>
        </div>
        <div className="mt-8 text-center">
          <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-600 transition">← Diğer yazılara bak</Link>
        </div>
      </div>
    </div>
  )
}
