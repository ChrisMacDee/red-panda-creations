import { getLatestPosts } from '@/lib/posts'
import ArticleCard from '@/components/ArticleCard'
import styles from './page.module.scss'
import Link from 'next/link'

export default function Home() {
  const latestPosts = getLatestPosts(3)

  return (
    <div className={styles.homepage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Crafting in <span className={styles.highlight}>Code &amp; Clay</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Crafting in Code &amp; Clay - realms simfineattofknow Montserrat and Lato Regular
            </p>
            <Link href="/blog" className={styles.heroCta}>
              Learn More
            </Link>
          </div>
          <div className={styles.heroImage}>
            {/* Placeholder for hero image */}
            <div className={styles.heroImagePlaceholder}>
              <svg viewBox="0 0 400 400" fill="none">
                <circle cx="200" cy="200" r="150" fill="#A83232" opacity="0.1"/>
                <circle cx="200" cy="200" r="100" fill="#A83232" opacity="0.2"/>
                <circle cx="200" cy="200" r="50" fill="#A83232"/>
                <circle cx="180" cy="180" r="10" fill="white"/>
                <circle cx="220" cy="180" r="10" fill="white"/>
                <path d="M170 220 Q200 240 230 220" stroke="white" strokeWidth="4" fill="none"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className={`section ${styles.latestArticles}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Latest Articles</h2>
          <div className={styles.articlesGrid}>
            {latestPosts.map((post) => (
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
