import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

import PostItem from '@/components/medium/post-item'
import { Spinner } from '@/components/ui/spinner'
import { useSearch }  from '@/context/SearchContext'


export default function Posts() {
  const posts = useQuery(api.posts.getPosts)
  const { searchTag } = useSearch()
  const searchPosts = useQuery(api.posts.getPostsByTag, { tag: searchTag })

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

  return (
    <ul>
      {searchPosts?.length ? 
        (searchPosts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))) :
        (posts && posts.map(post => (
          <PostItem key={post._id} post={post} />
        )))
      }
    </ul>
  )
}