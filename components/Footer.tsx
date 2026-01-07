import styles from './Footer.module.scss'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <p className={styles.copyright}>
            &copy; {currentYear} Red Panda Creations. All rights reserved.
          </p>
          <div className={styles.socialLinks}>
            {/* Optional: Add social media icons here */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
