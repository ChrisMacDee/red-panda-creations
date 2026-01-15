import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import ShareButtons from '@/components/ShareButtons'
import RelatedPosts from '@/components/RelatedPosts'
import styles from './page.module.scss'
import 'highlight.js/styles/atom-one-dark.css'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Red Panda Creations`,
    description: post.excerpt,
  }
}

export default function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug, 3)

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <article className={styles.postPage}>
      {/* Post Hero */}
      <div className={styles.postHero}>
        <div className="container">
          <div className={styles.postHeader}>
            <h1 className={styles.postTitle}>{post.title}</h1>
            <div className={styles.postMetadata}>
              <span className={styles.postDate}>{formattedDate}</span>
              <span className={styles.separator}>|</span>
              <Link href={`/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`} className={styles.postCategory}>
                {post.category}
              </Link>
              <span className={styles.separator}>|</span>
              <span className={styles.readTime}>{post.readingTime} min read</span>
            </div>
          </div>
          {post.coverImage && (
            <div className={styles.postCoverImage}>
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={675}
                priority
                className={styles.coverImage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className={styles.postContent}>
        <div className="content-container">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ node, ...props }) => <h1 className={styles.contentH1} {...props} />,
              h2: ({ node, ...props }) => <h2 className={styles.contentH2} {...props} />,
              h3: ({ node, ...props }) => <h3 className={styles.contentH3} {...props} />,
              h4: ({ node, ...props }) => <h4 className={styles.contentH4} {...props} />,
              h5: ({ node, ...props }) => <h5 className={styles.contentH5} {...props} />,
              h6: ({ node, ...props }) => <h6 className={styles.contentH6} {...props} />,
              p: ({ node, ...props }) => <p className={styles.contentP} {...props} />,
              ul: ({ node, ...props }) => <ul className={styles.contentUl} {...props} />,
              ol: ({ node, ...props }) => <ol className={styles.contentOl} {...props} />,
              li: ({ node, ...props }) => <li className={styles.contentLi} {...props} />,
              blockquote: ({ node, ...props }) => <blockquote className={styles.contentBlockquote} {...props} />,
              a: ({ node, ...props }) => <a className={styles.contentLink} {...props} />,
              code: ({ node, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <code className={className} {...props}>
                    {children}
                  </code>
                ) : (
                  <code className={styles.inlineCode} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="container">
        <ShareButtons slug={params.slug} title={post.title} />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="container">
          <RelatedPosts posts={relatedPosts} />
        </div>
      )}
    </article>
  )
}
