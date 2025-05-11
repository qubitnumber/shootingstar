'use client';

import { useSearchParams } from 'next/navigation'

import MediumPage from '@/components/medium/mediumPage'
import ShadcnPage from '@/components/shadcn/shadcnPage'
import { useTab } from '@/context/TabContext';
import { useEffect } from 'react';


export default function Home() {
  const searchParams = useSearchParams()
  const search = searchParams.get('tab')
  const { setSelectedTag } = useTab()

  useEffect(() => {
    setSelectedTag(search!)
  }, [search])

  if (search === 'shadcn') {
    return (
      <ShadcnPage />
    )
  }

  if (search === 'getpro') {
    return (
      <></>
    )
  }

  return (
    <MediumPage />
  )
}
