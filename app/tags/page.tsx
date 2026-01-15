import { getAllTags } from '@/lib/posts'
import Link from 'next/link'
import styles from './page.module.scss'

export const metadata = {
  title: 'Tags',
  description: 'Browse all article tags',
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className={styles.tagsPage}>
      <div className={styles.tagsHeader}>
        <div className="container">
          <h1 className={styles.tagsTitle}>All Tags</h1>
          <p className={styles.tagsSubtitle}>
            Explore articles by topic
          </p>
        </div>
      </div>

      <section className={`section ${styles.tagsSection}`}>
        <div className="container">
          <div className={styles.tagsCloud}>
            {tags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className={styles.tagBadge}
                style={{
                  fontSize: `${Math.min(1 + (count * 0.2), 2)}rem`
                }}
              >
                {tag}
                <span className={styles.tagCount}>{count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
