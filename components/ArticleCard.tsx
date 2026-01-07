import Link from 'next/link'
import Image from 'next/image'
import styles from './ArticleCard.module.scss'

interface ArticleCardProps {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  category: string
}

const ArticleCard = ({ slug, title, excerpt, coverImage, date, category }: ArticleCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Link href={`/posts/${slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.metadata}>
          <span className={styles.date}>{formattedDate}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.category}>{category}</span>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
