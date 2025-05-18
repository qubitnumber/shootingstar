'use client'

import { useQuery } from 'convex/react'
import { formatDistance } from 'date-fns'
import { api } from '@/convex/_generated/api'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'
import { Spinner } from '@/components/ui/spinner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { combineName, formatDate } from '@/lib/utils'

export default function RecentPosts() {
  const posts = useQuery(api.posts.getRecentPosts)

  if (posts === null) {
    return null
  }

  return (
    <Card className='flex-1 mb-3'>
      <CardHeader>
        <CardTitle>Staff picks</CardTitle>
      </CardHeader>

      <CardContent>
        {!posts && <Spinner />}

        <ul className='flex flex-col'>
          {posts?.map(post => (
            <li key={post._id}>
              <Link href={`/author/${post.author?.atTag}`} className='block'>
                <div className='inline-flex items-center gap-3'>
                  <Avatar className='size-5'>
                    <AvatarImage
                      src={post.author?.imageUrl}
                      alt={combineName(post.author)}
                    />
                    <AvatarFallback>
                      {post.author?.firstName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className='text-sm'>{combineName(post.author)}</h2>
                  </div>
                </div>
              </Link>
              <Link href={`/posts/${post.slug}`} className='block'>
                <div className='text-sm font-semibold mt-1' >
                  <span>{post.title}</span>
                </div>
                <div className='text-xs text-muted-foreground mt-1 mb-3'>
                  <span className={'text-opacity-80'}>
                    {formatDistance(Date.now(), post._creationTime, {addSuffix: true})}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Link href='/' className='text-sm font-light text-emerald-600'>
          See the full list
        </Link>
      </CardFooter>
    </Card>
  )
}