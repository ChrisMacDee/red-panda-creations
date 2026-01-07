'use client'

import { useState, useMemo, useEffect } from 'react'
import ArticleCard from '@/components/ArticleCard'
import styles from './page.module.scss'

interface PostMetadata {
  slug: string
  title: string
  date: string
  excerpt: string
  coverImage: string
  category: string
  tags: string[]
}

export default function SearchPage() {
  const [posts, setPosts] = useState<PostMetadata[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const postsPerPage = 12

  // Load posts on mount
  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/api/search-index')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Failed to load posts:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  // Get all unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(posts.map(post => post.category))
    return Array.from(uniqueCategories).sort()
  }, [posts])

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let results = posts

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      results = results.filter(post =>
        selectedCategories.includes(post.category)
      )
    }

    // Sort
    results = [...results].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    return results
  }, [posts, searchQuery, selectedCategories, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    return filteredPosts.slice(startIndex, startIndex + postsPerPage)
  }, [filteredPosts, currentPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategories, sortOrder])

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchHeader}>
        <div className="container">
          <h1 className={styles.searchTitle}>Search Articles</h1>
          <div className={styles.searchInputWrapper}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
              <path d="M14 14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      <section className={`section ${styles.searchContent}`}>
        <div className="container">
          <div className={styles.searchLayout}>
            {/* Sidebar Filters */}
            <aside className={styles.sidebar}>
              <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Filter by Category</h3>
                <div className={styles.categoryFilters}>
                  {categories.map(category => (
                    <label key={category} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className={styles.checkbox}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Sort By</h3>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                  className={styles.sortSelect}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </aside>

            {/* Results */}
            <div className={styles.results}>
              <div className={styles.resultsHeader}>
                <p className={styles.resultsCount}>
                  {loading ? 'Loading...' : `${filteredPosts.length} ${filteredPosts.length === 1 ? 'result' : 'results'} found`}
                </p>
              </div>

              {!loading && paginatedPosts.length === 0 ? (
                <div className={styles.noResults}>
                  <p>No articles found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategories([])
                    }}
                    className={styles.clearButton}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.resultsGrid}>
                    {paginatedPosts.map(post => (
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

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className={styles.pagination}>
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className={styles.paginationButton}
                      >
                        Previous
                      </button>
                      <div className={styles.pageNumbers}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className={styles.paginationButton}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
