import Link from 'next/link'
import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <img src="/logo.svg" alt="Red Panda" className={styles.logo} />
          </div>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Page Not Found</h2>
          <p className={styles.message}>
            Looks like this red panda wandered off the beaten path.
            The page you're looking for doesn't exist.
          </p>
          <div className={styles.actions}>
            <Link href="/" className={styles.homeButton}>
              Go Home
            </Link>
            <Link href="/blog" className={styles.blogButton}>
              View Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
