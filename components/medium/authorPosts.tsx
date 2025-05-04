'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

import PostItem from '@/components/medium/post-item'
import { Spinner } from '@/components/ui/spinner'
import { combineName } from '@/lib/utils'

export default function AuthorPosts({ atTag }: { atTag: string}) {
  const posts = useQuery(api.posts.getPostsByAtTag, { atTag  })
  const author = useQuery(api.users.getUserByAtTag, { atTag })

  if (!posts) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      <div className='font-sans text-3xl font-semibold mb-7'>{combineName(author!)}</div>
      <ul>
        {posts && posts.map(post => (
            <PostItem key={post._id} post={post} />
        ))}
      </ul>
    </div>
  )
}