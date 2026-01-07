'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './Header.module.scss'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Web Dev', href: '/category/web-dev' },
    { label: 'Crafts', href: '/category/crafts' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <svg
            className={styles.logoIcon}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-label="Red Panda Logo"
          >
            <circle cx="16" cy="16" r="14" fill="#A83232" />
            <circle cx="12" cy="13" r="2" fill="white" />
            <circle cx="20" cy="13" r="2" fill="white" />
            <path d="M12 20 Q16 23 20 20" stroke="white" strokeWidth="2" fill="none" />
          </svg>
          <span className={styles.logoText}>Red Panda Creations</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
          <Link href="/search" className={styles.searchIcon} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
              <path d="M14 14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {mobileMenuOpen ? (
              <>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </>
            ) : (
              <>
                <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/search"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Search
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
