import type { Metadata } from 'next'
import '../styles/globals.scss'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import BackToTop from '@/components/BackToTop'
import { SITE_URL, BASE_PATH } from '@/lib/constants'

export const metadata: Metadata = {
  title: {
    default: 'Red Panda Creations',
    template: '%s | Red Panda Creations'
  },
  description: 'A personal portfolio and blog showcasing diverse hobbies from web development to physical crafting',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Red Panda Creations',
    description: 'A personal portfolio and blog showcasing diverse hobbies from web development to physical crafting',
    url: SITE_URL,
    siteName: 'Red Panda Creations',
    images: [
      {
        url: `${BASE_PATH}/logo.svg`,
        width: 200,
        height: 200,
        alt: 'Red Panda Creations Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Red Panda Creations',
    description: 'A personal portfolio and blog showcasing diverse hobbies from web development to physical crafting',
    images: [`${BASE_PATH}/logo.svg`],
  },
  icons: {
    icon: `${BASE_PATH}/favicon.svg`,
    shortcut: `${BASE_PATH}/favicon.svg`,
    apple: `${BASE_PATH}/logo.svg`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
