import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { calculateReadingTime } from './utils'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostMetadata {
  slug: string
  title: string
  date: string
  excerpt: string
  coverImage: string
  category: string
  tags: string[]
  readingTime: number
}

export interface Post extends PostMetadata {
  content: string
}

// Ensure posts directory exists
function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }
}

// Get all post slugs
export function getAllPostSlugs(): string[] {
  ensurePostsDirectory()

  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(fileName => fileName.replace(/\.mdx?$/, ''))
  } catch (error) {
    return []
  }
}

// Get post data by slug
export function getPostBySlug(slug: string): Post | null {
  ensurePostsDirectory()

  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '/images/blog/default.svg',
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      readingTime: calculateReadingTime(content),
      content,
    }
  } catch (error) {
    return null
  }
}

// Get all posts sorted by date (newest first)
export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs()
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))

  return posts
}

// Get posts metadata only (without content)
export function getAllPostsMetadata(): PostMetadata[] {
  return getAllPosts().map(({ content, ...metadata }) => metadata)
}

// Get posts by category
export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post =>
    post.category.toLowerCase() === category.toLowerCase()
  )
}

// Get all unique categories
export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map(post => post.category))
  return Array.from(categories).sort()
}

// Get latest N posts
export function getLatestPosts(count: number = 3): Post[] {
  const allPosts = getAllPosts()
  return allPosts.slice(0, count)
}

// Generate search index (for client-side search)
export function generateSearchIndex(): PostMetadata[] {
  return getAllPostsMetadata()
}

// Get related posts (same category, excluding current post)
export function getRelatedPosts(slug: string, count: number = 3): Post[] {
  const currentPost = getPostBySlug(slug)
  if (!currentPost) return []

  const categoryPosts = getPostsByCategory(currentPost.category)
  return categoryPosts
    .filter(post => post.slug !== slug)
    .slice(0, count)
}

// Get all unique tags
export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts()
  const tagCounts = new Map<string, number>()

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

// Get posts by tag
export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}
