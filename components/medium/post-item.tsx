'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatDistance } from 'date-fns'

import { Post } from '@/lib/types'
import { combineName } from '@/lib/utils'

import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { MessageCircle, Sparkle, ThumbsUp, Hash } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function PostItem({ post }: { post: Post }) {
  const comments = useQuery(api.comments.getCommentsByPostId, { postId: post._id})

  return (
    <li className='mb-4 pb-10 pt-5 sm:border-b'>
      <Link href={`/author/${post?.author?.atTag}`} className='block'>
        {/* Author */}
        <div className='inline-flex items-center gap-3'>
            <Avatar className='size-6'>
              <AvatarImage
                src={post.author?.imageUrl}
                alt={combineName(post.author!)}
              />
              <AvatarFallback>{post.author?.firstName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className='text-sm'>{combineName(post.author!)}</h2>
            </div>
        </div>
      </Link>

      <div className='mt-2 flex flex-col-reverse gap-x-10 sm:mt-4 sm:flex-row sm:items-center'>
        {/* Post details */}
        <div className='mt-4 w-full sm:mt-0 sm:w-3/4'>
          <Link href={`/posts/${post.slug}`} className='block'>
            <div className='space-y-1'>
              <h3 className='font-serif text-xl font-bold'>{post.title}</h3>
              <p className='text-sm text-muted-foreground'>{post.excerpt}</p>
            </div>
          </Link>

            <div className='mt-7 flex items-center justify-between text-sm text-muted-foreground'>
              <div className='flex items-center gap-4'>
                <Sparkle className='h-4 w-4 fill-yellow-500 text-yellow-500' />
                <span className={'text-opacity-80'}>
                  {formatDistance(Date.now(), post._creationTime, {addSuffix: true})}
                </span>
                <Separator orientation='vertical' className='h-4' />
                <div className='flex items-center gap-2'>
                  <ThumbsUp className='h-4 w-4' />
                  <span>{post.likes}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <MessageCircle className='h-4 w-4' />
                  <span>{comments?.length}</span>
                </div>
              </div>
            </div>

          {/* Tag */}
          <div className='mt-7 flex items-center justify-between text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              {post.tags && post.tags.length > 0 && post.tags.map((tag: any, i) =>(
                <Link key={i} href={`/tags/${tag.text}`} className='block'>
                  <div className='flex items-center'>
                    <Hash className='h-4 w-4' />
                    <span>{tag.text}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className='relative aspect-video w-full sm:w-1/4'>
          {post.coverImageUrl && (
            <Image
              alt=''
              src={post.coverImageUrl}
              className='h-full w-full rounded-md object-cover'
              fill
            />
          )}
        </div>
      </div>
    </li>
  )
}