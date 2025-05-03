'use client'

import { useQuery, useMutation } from 'convex/react'
import { formatDistance } from 'date-fns'
import { toast } from 'sonner'
import Link from 'next/link'
import { api } from '@/convex/_generated/api'

import { combineName } from '@/lib/utils'

import Editor from '@/components/medium/editor/editor'
import { Spinner } from '@/components/ui/spinner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import {
  Bookmark,
  Ellipsis,
  MessageCircle,
  Share,
  ThumbsUp,
  Hash,
  Pencil,
  Trash
} from 'lucide-react'
import { notFound, useRouter } from 'next/navigation'
import VideoPlayer from '@/components/medium/video-player'
import Comments from '@/components/medium/comment/comments'
import ButtonFollowing from '@/components/medium/button-following'

export default function Post({ slug }: { slug: string }) {
  const post = useQuery(api.posts.getPostBySlug, { slug })
  const likePost = useMutation(api.posts.likePost)
  const upsertUser = useMutation(api.users.upsertFromClerk)
  const user = useQuery(api.users.current)
  const deletePost = useMutation(api.posts.deletePost)
  const comments = useQuery(api.comments.getCommentsByPostId, { postId: post?._id})
  const router = useRouter()
  

  if (post === null) {
    notFound()
  }

  if (!post) {
    return (
      <section className='pb-24 pt-32 sm:pt-40'>
        <div className='container flex max-w-3xl items-center justify-center'>
          <Spinner size='lg' />
        </div>
      </section>
    )
  }

  async function removePost() {
    router.push('/')
    await deletePost({ slug })
  }

  async function addFollowing() {
    await upsertUser({ following: post?.author?.clerkUserId})
    toast.success(`Success! You're now following ${combineName(post?.author!)}`)
  }

  async function removeFollowing() {
    await upsertUser({ unFollowing: post?.author?.clerkUserId})
    toast.success(`You unflooweded ${combineName(post?.author!)}`)
  }

  return (
    <>
    <section className='pb-24 pt-32 sm:pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='font-serif text-3xl font-bold'>{post.title}</h1>
        <p className='mt-3 text-muted-foreground'>{post.excerpt}</p>

        {/* Author */}
        <div className='mt-6 inline-flex items-center gap-3'>
          <Link href={`/author/${post.author?.atTag}`} className='block'>
            <div className='flex flex-row gap-3'>
              <Avatar>
                <AvatarImage
                  src={post.author?.imageUrl}
                  alt={combineName(post.author)}
                />
                <AvatarFallback>{post.author?.firstName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className='font-light mt-2'>{combineName(post.author)}</h2>
            </div>
          </Link>
          <div className='flex items-center font-light text-muted-foreground gap-1'>
            {user && user?._id !== post.authorId && (
              <ButtonFollowing
                followings={user.followings}
                clerkUserId={post.author?.clerkUserId!}
                addFollowing={addFollowing}
                removeFollowing={removeFollowing}
              />)}
              <div className='text-sm w-full ml-2'>
                <span className={'text-opacity-80'}>
                  {formatDistance(Date.now(), post._creationTime, {addSuffix: true})}
                </span>
              </div>
          </div>
        </div>

        {/* Metadata */}
        <div className='mt-6 flex w-full items-center justify-between border-b border-t px-4 py-3'>
          <div className='flex items-center space-x-6'>
            <button
              className='flex items-center gap-2 font-light text-muted-foreground hover:text-foreground'
              onClick={async () => await likePost({ slug: post.slug })}
            >
              <ThumbsUp className='size-5' strokeWidth={1.5} />
              <span>{post.likes}</span>
            </button>

            <button className='flex items-center gap-2 font-light text-muted-foreground hover:text-foreground'>
              <MessageCircle className='size-5' strokeWidth={1.5} />
              <span>{comments?.length}</span>
            </button>
          </div>

          <div className='flex items-center space-x-4'>
            <button className='font-light text-muted-foreground hover:text-foreground'>
              <Bookmark className='size-5' strokeWidth={1.5} />
            </button>

            <button className='font-light text-muted-foreground hover:text-foreground'>
              <Share className='size-5' strokeWidth={1.5} />
            </button>
            <button className='font-light text-muted-foreground hover:text-foreground'>
              <Ellipsis className='size-5' strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Video Player */}
        {post.videoUrl && (
          <div className='mt-16'>
            <VideoPlayer url={post.videoUrl} />
          </div>
        )}

        {/* Cover image */}
        {!post.videoUrl && post.coverImageUrl && (
          <div className='mt-16'>
            <img src={post.coverImageUrl} alt={post.title} />
          </div>
        )}

        {/* Content */}
        <div className='mt-10'>
          <Editor post={post} editable={false} />
        </div>

        {/* Attach file1 */}
        {post.attachImageUrl1 && (
          <div className='mt-16'>
            <img src={post.attachImageUrl1} width="100%" />
          </div>
        )}

        {/* Attach file2 */}
        {post.attachImageUrl2 && (
          <div className='mt-16'>
            <img src={post.attachImageUrl2} width="100%" />
          </div>
        )}

        {/* Attach file3 */}
        {post.attachImageUrl3 && (
          <div className='mt-16'>
            <img src={post.attachImageUrl3} width="100%" />
          </div>
        )}

        {/* Attach file4 */}
        {post.attachImageUrl4 && (
          <div className='mt-16'>
            <img src={post.attachImageUrl4} width="100%" />
          </div>
        )}

        {/* Attach file4 */}
        {post.attachImageUrl5 && (
          <div className='mt-16'>
            <img src={post.attachImageUrl5} width="100%" />
          </div>
        )}

        {/* Tags */}
        <div className='mt-7 flex items-center justify-between text-sm text-muted-foreground'>
          <div className='flex items-center gap-2'>
            {post.tags && post.tags.length > 0 && post.tags.map((tag: any, i: number) => (
              <Link key={i} href={`/tags/${tag.text}`} className='block'>
                <div key={i} className='flex items-center'>
                  <Hash className='h-4 w-4' />
                  <span>{tag.text}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Button */}
        {post.authorId === user?._id && (<div className='flex items-center flex-start gap-6 mt-10'>
          {/* Update post */}
          <div>
            <Button size='lg' variant='secondary' asChild>
              <Link href={`/upsert/${post.slug}`} >
                <Pencil className='h-6 w-6' />
                <p>Edit</p>
              </Link>
            </Button>
          </div>

          {/* Delete post */}
          <div>
            <Button
              className='flex items-center gap-2 font-light'
              onClick={removePost}
            >
              <Trash className='h-6 w-6'/>
              <p>Delete</p>
            </Button>
          </div>
        </div>)}

        {/* Comment */}
        <div className='mt-6 border-t'>
          <Comments postId={post._id} />
        </div>
      </div>
    </section>
    </>
  )
}