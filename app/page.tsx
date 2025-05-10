'use client';

import { useSearchParams } from 'next/navigation'

import MediumPage from '@/components/medium/mediumPage'
import ShadcnPage from '@/components/shadcn/shadcnPage'


export default function Home() {
  const searchParams = useSearchParams()
  const search = searchParams.get('tab')
  
  if (!search) {
    return (
      <MediumPage />
    )
  }

  if (search === 'shadcn') {
    return (
      <ShadcnPage />
    )
  }
}
