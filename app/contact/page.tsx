import styles from './page.module.scss'

export const metadata = {
  title: 'Contact | Red Panda Creations',
  description: 'Get in touch with Red Panda Creations',
}

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <div className={styles.contactHeader}>
        <div className="container">
          <h1 className={styles.contactTitle}>Get In Touch</h1>
          <p className={styles.contactSubtitle}>
            Have a question or want to collaborate? I'd love to hear from you.
          </p>
        </div>
      </div>

      <section className={`section ${styles.contactSection}`}>
        <div className="container">
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <h2 className={styles.sectionHeading}>Let's Connect</h2>
              <p className={styles.infoText}>
                Whether you're interested in web development, crafting, or just want to chat
                about the creative process, feel free to reach out.
              </p>
              <div className={styles.contactMethods}>
                <div className={styles.contactMethod}>
                  <div className={styles.methodIcon}>📧</div>
                  <div>
                    <h3 className={styles.methodTitle}>Email</h3>
                    <a href="mailto:hello@redpandacreations.com" className={styles.methodLink}>
                      hello@redpandacreations.com
                    </a>
                  </div>
                </div>
                <div className={styles.contactMethod}>
                  <div className={styles.methodIcon}>💼</div>
                  <div>
                    <h3 className={styles.methodTitle}>LinkedIn</h3>
                    <p className={styles.methodText}>Connect professionally</p>
                  </div>
                </div>
                <div className={styles.contactMethod}>
                  <div className={styles.methodIcon}>🐙</div>
                  <div>
                    <h3 className={styles.methodTitle}>GitHub</h3>
                    <p className={styles.methodText}>View code projects</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formWrapper}>
              <form className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={styles.formInput}
                    placeholder="Your name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={styles.formInput}
                    placeholder="your@email.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className={styles.formInput}
                    placeholder="What's this about?"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className={styles.formTextarea}
                    placeholder="Your message..."
                  />
                </div>

                <button type="submit" className={styles.submitButton}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
