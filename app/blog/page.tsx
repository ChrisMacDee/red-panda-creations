import { getAllPosts } from '@/lib/posts'
import ArticleCard from '@/components/ArticleCard'
import styles from './page.module.scss'

export const metadata = {
  title: 'Blog | Red Panda Creations',
  description: 'Explore all articles on web development, crafts, and creative pursuits',
}

export default function BlogPage() {
  const allPosts = getAllPosts()

  return (
    <div className={styles.blogPage}>
      <div className={styles.blogHeader}>
        <div className="container">
          <h1 className={styles.blogTitle}>All Articles</h1>
          <p className={styles.blogSubtitle}>
            Exploring the intersection of digital and physical craftsmanship
          </p>
        </div>
      </div>

      <section className={`section ${styles.postsSection}`}>
        <div className="container">
          <div className={styles.postsGrid}>
            {allPosts.map((post) => (
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
