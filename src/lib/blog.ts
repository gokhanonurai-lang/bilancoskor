import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogDir = path.join(process.cwd(), 'src/content/blog')

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  content: string
}

export function getAllPosts(): Omit<BlogPost, 'content'>[] {
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))
  return files
    .map(file => {
      const slug = file.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8')
      const { data } = matter(raw)
      return { slug, ...data } as Omit<BlogPost, 'content'>
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost {
  const raw = fs.readFileSync(path.join(blogDir, `${slug}.mdx`), 'utf-8')
  const { data, content } = matter(raw)
  return { slug, ...data, content } as BlogPost
}
