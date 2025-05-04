
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter, Playfair_Display } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'

import Providers from '@/components/medium/providers'
import Header from '@/components/medium/header'
import Footer from '@/components/medium/footer'

import './globals.css'
import './prosemirror.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: 'Bridge AI',
  description: 'NextJs Convex Project'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <ClerkProvider>
        <body
          className={cn(
            'flex h-screen flex-col',
            geistSans.variable,
            geistMono.variable,
            inter.variable,
            playfair.variable
          )}
        >
          <Providers>
            <Header />
            <main className='grow'>{children}</main>
            <Footer />
          </Providers>
        </body>
      </ClerkProvider>
    </html>
  )
}