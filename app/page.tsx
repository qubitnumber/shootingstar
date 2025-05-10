'use client';

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import MediumPage from '@/components/medium/mediumPage'
import ShadcnPage from '@/components/shadcn/shadcnPage'


export default function Home() {
  const searchParams = useSearchParams()
  const search = searchParams.get('tab')
  
  if (!search || search === 'medium') {
    return (
      <Suspense>
        <MediumPage />
      </Suspense>
    )
  }

  if (search === 'shadcn') {
    return (
      <Suspense>
        <ShadcnPage />
      </Suspense>
    )
  }
}
