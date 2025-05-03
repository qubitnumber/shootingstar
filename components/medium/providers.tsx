'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { ConvexClientProvider } from '@/components/medium/convex-client-provider'
import { SearchProvider } from '@/context/SearchContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      <ThemeProvider
        enableSystem
        attribute='class'
        defaultTheme='dark'
        disableTransitionOnChange
      >
        <SearchProvider>
          {children}
          <ToasterProvider />
        </SearchProvider>
      </ThemeProvider>
    </ConvexClientProvider>
  )
}

function ToasterProvider() {
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      richColors
      closeButton
      position='top-center'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}
