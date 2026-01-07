import { getAllCategories, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import styles from './page.module.scss'

interface PageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const categoryName = params.category.replace(/-/g, ' ')
  const formattedCategory = categoryName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${formattedCategory} | Red Panda Creations`,
    description: `Browse all ${formattedCategory} articles`,
  }
}

export default function CategoryPage({ params }: PageProps) {
  const categorySlug = params.category
  const categoryName = categorySlug.replace(/-/g, ' ')

  const allPosts = getAllPosts()
  const categoryPosts = allPosts.filter(post =>
    post.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
  )

  if (categoryPosts.length === 0) {
    notFound()
  }

  const formattedCategory = categoryName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className={styles.categoryPage}>
      <div className={styles.categoryHeader}>
        <div className="container">
          <h1 className={styles.categoryTitle}>
            Exploring: <span className={styles.highlight}>{formattedCategory}</span>
          </h1>
          <p className={styles.categoryCount}>
            {categoryPosts.length} {categoryPosts.length === 1 ? 'article' : 'articles'}
          </p>
        </div>
      </div>

      <section className={`section ${styles.postsSection}`}>
        <div className="container">
          <div className={styles.postsGrid}>
            {categoryPosts.map((post) => (
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
