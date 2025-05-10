'use client';

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import MediumPage from '@/components/medium/mediumPage'
import ShadcnPage from '@/components/shadcn/shadcnPage'


export default function Home() {
  const searchParams = useSearchParams()
  const search = searchParams.get('tab')
  
  if (!search) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <MediumPage />
      </Suspense>
    )
  }

  if (search === 'shadcn') {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ShadcnPage />
      </Suspense>
    )
  }
}
