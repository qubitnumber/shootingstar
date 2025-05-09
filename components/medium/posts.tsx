import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

import PostItem from '@/components/medium/post-item'
import { Spinner } from '@/components/ui/spinner'
import { useSearch }  from '@/context/SearchContext'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useState } from 'react'


export default function Posts() {
  const posts = useQuery(api.posts.getPosts)
  const { searchTag } = useSearch()
  const searchPosts = useQuery(api.posts.getPostsByTag, { tag: searchTag })

  const [linked, setLicked] = useState('for')

  if (!searchTag && !posts) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  if (searchTag && !searchPosts) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  const data = searchPosts?.length ? searchPosts : posts

  return (
    <>
    <div className='inline-flex flex-row items-center font-light text-sm gap-10'>
      <Link
        href='/'
        onNavigate={() => setLicked('for')}
        className={`border-b ${linked === 'for' && 'border-b-black border-b-2'} pb-3`}
      >
        For you
      </Link>
      <Link
        href='/'
        onNavigate={() => setLicked('ui')}
        className={`border-b ${linked === 'ui' && 'border-b-black border-b-2'} pb-3`}
      >
        UI/UX
      </Link>
      <Link
        href='/'
        onNavigate={() => setLicked('get')}
        className={`border-b ${linked === 'get' && 'border-b-black border-b-2'} pb-3`}
      >
        Get Pro
      </Link>
    </div>
    <Separator className='mb-7 mt-0'/>
    <ul>
      {data && data.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </ul>
    </>
  )
}