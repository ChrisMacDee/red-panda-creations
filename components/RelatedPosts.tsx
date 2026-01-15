import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/posts'
import styles from './RelatedPosts.module.scss'

interface RelatedPostsProps {
  posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className={styles.relatedPosts}>
      <h2 className={styles.title}>Related Articles</h2>
      <div className={styles.postsGrid}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className={styles.postCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
            </div>
            <div className={styles.postContent}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              <div className={styles.postMeta}>
                <span className={styles.category}>{post.category}</span>
                <span className={styles.readTime}>{post.readingTime} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
