import type { Metadata } from 'next'
import '../styles/globals.scss'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Red Panda Creations',
  description: 'A personal portfolio and blog showcasing diverse hobbies from web development to physical crafting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
