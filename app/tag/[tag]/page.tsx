import { getAllTags, getPostsByTag } from '@/lib/posts'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import styles from './page.module.scss'

interface PageProps {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map(({ tag }) => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const tagName = params.tag.replace(/-/g, ' ')
  const formattedTag = tagName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${formattedTag} Articles`,
    description: `Browse all articles tagged with ${formattedTag}`,
  }
}

export default function TagPage({ params }: PageProps) {
  const tagSlug = params.tag
  const tagName = tagSlug.replace(/-/g, ' ')

  const tagPosts = getPostsByTag(tagName)

  if (tagPosts.length === 0) {
    notFound()
  }

  const formattedTag = tagName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className={styles.tagPage}>
      <div className={styles.tagHeader}>
        <div className="container">
          <h1 className={styles.tagTitle}>
            <span className={styles.tagLabel}>Tag:</span> <span className={styles.highlight}>{formattedTag}</span>
          </h1>
          <p className={styles.tagCount}>
            {tagPosts.length} {tagPosts.length === 1 ? 'article' : 'articles'}
          </p>
        </div>
      </div>

      <section className={`section ${styles.postsSection}`}>
        <div className="container">
          <div className={styles.postsGrid}>
            {tagPosts.map((post) => (
              <ArticleCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                coverImage={post.coverImage}
                date={post.date}
                category={post.category}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
