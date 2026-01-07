# Red Panda Creations

A modern, performant static portfolio and blog website showcasing diverse hobbies ranging from web development to physical crafting. Built with Next.js and featuring a markdown-based content management system.

## 🚀 Features

### Pages
- **Homepage**: Hero section with call-to-action and grid of latest articles
- **Blog Archive**: Complete listing of all blog posts
- **Single Post**: Individual blog post pages with syntax highlighting
- **Category Pages**: Filter posts by category (Web Dev, Crafts, Philosophy, etc.)
- **Search**: Advanced search with client-side filtering, category filters, and pagination
- **About**: Personal story and skills showcase
- **Contact**: Contact form and information

### Technical Features
- ⚡ **Static Site Generation (SSG)** with Next.js 14
- 📝 **Markdown-based Content** using gray-matter for frontmatter parsing
- 🎨 **Syntax Highlighting** for code blocks using rehype-highlight
- 🔍 **Client-side Search** with filtering and pagination
- 📱 **Fully Responsive** design with mobile-first approach
- 🎯 **Type-safe** with TypeScript
- 💅 **SCSS Modules** for component-scoped styling
- ♿ **Accessible** semantic HTML structure

## 🎨 Design System

### Colors
- **Primary Accent**: `#A83232` (Panda Red)
- **Background**: `#F8F8F8` (Off-white)
- **Primary Text**: `#222222` (Charcoal)
- **Secondary Text**: `#555555` (Medium Gray)
- **UI Black**: `#000000`
- **Border**: `#E5E5E5`

### Typography
- **Headers**: Montserrat (Bold 700, SemiBold 600)
- **Body**: Lato (Regular 400, Italic 400)

### Layout
- **Container Max Width**: 1200px
- **Content Max Width**: 800px (for readability)
- **Base Spacing Unit**: 8px
- **Section Padding**: 80px (desktop), 40px (mobile)

## 📁 Project Structure

```
red-panda-creations/
├── app/                          # Next.js App Router pages
│   ├── about/                   # About page
│   ├── api/search-index/        # Search index API route
│   ├── blog/                    # Blog archive page
│   ├── category/[category]/     # Dynamic category pages
│   ├── contact/                 # Contact page
│   ├── posts/[slug]/            # Dynamic blog post pages
│   ├── search/                  # Search page
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── ArticleCard.tsx          # Blog post card component
│   ├── Footer.tsx               # Global footer
│   └── Header.tsx               # Global header with navigation
├── content/posts/               # Markdown blog posts
│   ├── building-responsive-layouts.md
│   ├── crafting-in-code-and-clay.md
│   ├── leather-working-basics.md
│   └── react-hooks-deep-dive.md
├── lib/                         # Utility functions
│   └── posts.ts                 # Markdown processing utilities
├── public/images/               # Static assets
│   └── blog/                    # Blog post images
├── styles/                      # Global styles
│   └── globals.scss             # Design system & global CSS
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ChrisMacDee/red-panda-creations.git
cd red-panda-creations
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📝 Adding Blog Posts

Create a new markdown file in `content/posts/` with the following frontmatter:

```markdown
---
slug: "my-post-slug"
title: "My Post Title"
date: "2024-01-15"
excerpt: "A brief description of the post"
coverImage: "/images/blog/my-image.jpg"
category: "Web Dev"
tags: ["javascript", "react", "tutorial"]
---

Your markdown content here...
```

### Frontmatter Fields
- **slug**: URL-friendly identifier (required)
- **title**: Post title (required)
- **date**: Publication date in YYYY-MM-DD format (required)
- **excerpt**: Short description for cards (required)
- **coverImage**: Path to cover image (required)
- **category**: Category name (required)
- **tags**: Array of tags (optional)

## 🔍 Search Functionality

The search page features:
- **Text search**: Searches titles, excerpts, and tags
- **Category filters**: Multi-select category filtering
- **Sort options**: Newest first or oldest first
- **Pagination**: 12 posts per page
- **Client-side**: Fast, no backend required

The search index is generated at build time via `/api/search-index`.

## 🎯 Key Components

### ArticleCard
Reusable card component for displaying blog posts. Features:
- 16:9 aspect ratio image
- Title, excerpt, and metadata
- Hover effects
- Clickable with smooth transitions

### Header
Responsive navigation with:
- Logo and site name
- Desktop horizontal navigation
- Mobile hamburger menu
- Search icon link

### Footer
Minimalist footer with copyright information.

## 📦 Dependencies

### Core
- **next**: 14.0.4 - React framework
- **react**: 18.2.0 - UI library
- **react-dom**: 18.2.0 - React DOM rendering

### Content Processing
- **gray-matter**: 4.0.3 - Frontmatter parser
- **react-markdown**: 9.0.1 - Markdown renderer
- **remark-gfm**: 4.0.0 - GitHub Flavored Markdown
- **rehype-highlight**: 7.0.0 - Syntax highlighting
- **rehype-raw**: 7.0.0 - Raw HTML support

### Development
- **typescript**: 5.3.3 - Type safety
- **sass**: 1.69.7 - CSS preprocessing

## 🎨 Customization

### Updating Colors
Edit CSS variables in `styles/globals.scss`:
```scss
:root {
  --color-primary: #A83232;
  --color-background: #F8F8F8;
  // ... other colors
}
```

### Adding Categories
1. Create markdown posts with the new category
2. The category will automatically appear in navigation
3. Update `components/Header.tsx` to add to nav menu

### Changing Fonts
Update font imports and variables in `styles/globals.scss`:
```scss
@import url('your-google-font-url');

:root {
  --font-header: 'Your Header Font', sans-serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 968px
- **Desktop**: > 968px

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy

### Static Export
```bash
npm run build
# Deploy the .next folder
```

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspired by modern portfolio sites
- Fonts from Google Fonts (Montserrat, Lato)
- Icons and placeholder graphics created with SVG

## 📞 Contact

For questions or feedback, visit the [Contact page](http://localhost:3000/contact).

---

**Built with ❤️ using Next.js, React, and TypeScript**