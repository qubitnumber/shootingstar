'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

import PostItem from '@/components/medium/post-item'
import { Spinner } from '@/components/ui/spinner'

export default function TagPosts({ tag }: { tag: string}) {
  const posts = useQuery(api.posts.getPostsByTag, { tag  })

  if (!posts) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  return (
    <ul>
      {posts && posts.map(post => (
          <PostItem key={post._id} post={post} />
      ))}
    </ul>
  )
}