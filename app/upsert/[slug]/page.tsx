"use client"

import UpsertPostForm from '@/components/medium/upsert-post-form'

export default function Upsert({ params }: { params: { slug: string } }) {
  const { slug } = params

  return (
    <section className='pb-24 pt-32 sm:pt-40'>
      <div className='container'>
        <h1 className='text-2xl font-semibold'>Upsert Post</h1>

        <UpsertPostForm slug={slug} />
      </div>
    </section>
  )
}