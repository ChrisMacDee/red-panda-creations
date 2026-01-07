import styles from './page.module.scss'
import Image from 'next/image'

export const metadata = {
  title: 'About | Red Panda Creations',
  description: 'Learn about the creator behind Red Panda Creations and the diverse hobbies that inspire this portfolio',
}

export default function AboutPage() {
  const skills = [
    { icon: '💻', label: 'Web Development' },
    { icon: '🏺', label: 'Pottery & Ceramics' },
    { icon: '🎨', label: 'Digital Art' },
    { icon: '🧵', label: 'Leather Working' },
    { icon: '🔨', label: 'Woodworking' },
    { icon: '📸', label: 'Photography' },
  ]

  return (
    <div className={styles.aboutPage}>
      <div className={styles.aboutHeader}>
        <div className="container">
          <h1 className={styles.aboutTitle}>
            About <span className={styles.highlight}>Red Panda Creations</span>
          </h1>
        </div>
      </div>

      <section className={`section ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.imageColumn}>
              <div className={styles.profileImageWrapper}>
                <svg viewBox="0 0 400 400" fill="none">
                  <circle cx="200" cy="200" r="180" fill="#A83232" opacity="0.1"/>
                  <circle cx="200" cy="200" r="120" fill="#A83232" opacity="0.2"/>
                  <circle cx="200" cy="200" r="80" fill="#A83232"/>
                  <circle cx="175" cy="180" r="15" fill="white"/>
                  <circle cx="225" cy="180" r="15" fill="white"/>
                  <path d="M160 220 Q200 250 240 220" stroke="white" strokeWidth="6" fill="none"/>
                </svg>
              </div>
            </div>
            <div className={styles.textColumn}>
              <h2 className={styles.sectionHeading}>The Journey</h2>
              <div className={styles.bioText}>
                <p>
                  Welcome to Red Panda Creations, where digital craftsmanship meets physical artistry.
                  This space is a celebration of the creative process in all its forms.
                </p>
                <p>
                  By day, I architect web applications, solving complex problems with elegant code.
                  By night (and weekends), you'll find me at the pottery wheel, working leather,
                  or building something in the workshop.
                </p>
                <p>
                  What started as separate hobbies has evolved into an understanding that all forms
                  of making share common threads: patience, iteration, attention to detail, and the
                  willingness to embrace both success and failure as teachers.
                </p>
                <p>
                  This blog documents that journey - from debugging React components to burnishing
                  leather edges, from optimizing database queries to centering clay on the wheel.
                  Each craft informs the others, creating a richer understanding of what it means to create.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.skillsSection}`}>
        <div className="container">
          <h2 className={styles.skillsTitle}>Skills &amp; Interests</h2>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <div key={index} className={styles.skillCard}>
                <div className={styles.skillIcon}>{skill.icon}</div>
                <div className={styles.skillLabel}>{skill.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.philosophySection}`}>
        <div className="container">
          <div className={styles.philosophyContent}>
            <blockquote className={styles.philosophy}>
              "The craft is not in achieving perfection, but in the persistent pursuit of
              understanding through making. Whether in code or clay, the journey is the destination."
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  )
}
