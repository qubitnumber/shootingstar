"use client"

import UpsertPostForm from '@/components/medium/upsert-post-form'

export default async function Upsert({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return (
    <section className='pb-24 pt-32 sm:pt-40'>
      <div className='container'>
        <h1 className='text-2xl font-semibold'>Upsert Post</h1>

        <UpsertPostForm slug={slug} />
      </div>
    </section>
  )
}