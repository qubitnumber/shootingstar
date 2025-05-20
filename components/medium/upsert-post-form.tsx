'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { JSONContent } from 'novel'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Tag, TagInput } from 'tagmento';

import { newPostSchema } from '@/lib/schemas'

import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Editor from '@/components/medium/editor/editor'
import { Spinner } from '@/components/ui/spinner'
import ImageUploader from '@/components/medium/image-uploader'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

type Inputs = z.infer<typeof newPostSchema>

export default function UpsertPostForm({ slug }: { slug: string }) {
  const post = useQuery(api.posts.getPostBySlug, { slug })
  const upsertPost = useMutation(api.posts.upsertPost)
  const router = useRouter()
  
  const [filePickerIsOpen, setFilePickerIsOpen] = useState(false)
  const [attach1PickerIsOpen, setAttach1PickerIsOpen] = useState(false)
  const [attach2PickerIsOpen, setAttach2PickerIsOpen] = useState(false)
  const [attach3PickerIsOpen, setAttach3PickerIsOpen] = useState(false)
  const [attach4PickerIsOpen, setAttach4PickerIsOpen] = useState(false)
  const [attach5PickerIsOpen, setAttach5PickerIsOpen] = useState(false)

  const [tags, setTags] = useState<Tag[]>([])

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {}
  })

  function setCoverImageId(url: string) {
    setValue('coverImageId', url)
    setFilePickerIsOpen(false)
  }

  function setContent(content: JSONContent) {
    setValue('content', content, { shouldValidate: true })
  }

  function setAttachImageId1(url: string) {
    setValue('attachImageId1', url)
    setAttach1PickerIsOpen(false)
  }

  function setAttachImageId2(url: string) {
    setValue('attachImageId2', url)
    setAttach2PickerIsOpen(false)
  }

  function setAttachImageId3(url: string) {
    setValue('attachImageId3', url)
    setAttach3PickerIsOpen(false)
  }

  function setAttachImageId4(url: string) {
    setValue('attachImageId4', url)
    setAttach4PickerIsOpen(false)
  }

  function setAttachImageId5(url: string) {
    setValue('attachImageId5', url)
    setAttach5PickerIsOpen(false)
  }

  function handleCancelGoBack() {
    router.push(`/posts/${post?.slug}`)
  };

  useEffect(() => {
      if (post) {
        setValue('coverImageId', post.coverImageId)
        setValue('title', post.title)
        setValue('slug', post.slug)
        setValue('excerpt', post.excerpt)
        setValue('content', JSON.parse(post.content))
        setValue('tags', post.tags)
        setTags(post.tags)
        setValue('videoUrl', post.videoUrl)
        setValue('attachImageId1', post.attachImageId1)
        setValue('attachImageId2', post.attachImageId2)
        setValue('attachImageId3', post.attachImageId3)
        setValue('attachImageId4', post.attachImageId4)
        setValue('attachImageId5', post.attachImageId5)
      }
  }, [post])

  const processForm: SubmitHandler<Inputs> = async data => {
    const contentJson = data.content
    const hasContent = contentJson?.content?.some(
      c => c.content && c.content.length > 0
    )

    if (!hasContent) {
      toast.error('Please add some content to the post')
      return
    }

    try {
      const postSlug = await upsertPost({
        ...data,
        id: post?._id as Id<'posts'>,
        coverImageId: data.coverImageId as Id<'_storage'> | undefined,
        content: JSON.stringify(contentJson),
        attachImageId1: data.attachImageId1 as Id<'_storage'> | undefined,
        attachImageId2: data.attachImageId2 as Id<'_storage'> | undefined,
        attachImageId3: data.attachImageId3 as Id<'_storage'> | undefined,
        attachImageId4: data.attachImageId4 as Id<'_storage'> | undefined,
        attachImageId5: data.attachImageId5 as Id<'_storage'> | undefined
      })

      router.push(`/posts/${postSlug}`)
      toast.success('Post upserted!')
    } catch (error) {
      toast.error('Failed to upsert post')
    }
  }
  return (
    <form onSubmit={handleSubmit(processForm)}>
      <div className='flex flex-col gap-4'>
        {/* Cover image */}
        <div className='flex justify-between gap-4 relative w-full max-w-screen-lg' >
          <div className='w-full'>
            <Input
              disabled
              type='text'
              className='w-full'
              placeholder='Select a cover image'
              {...register('coverImageId')}
            />
            {errors.coverImageId?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.coverImageId.message}
              </p>
            )}
          </div>
          <Dialog open={filePickerIsOpen} onOpenChange={setFilePickerIsOpen}>
            <DialogTrigger asChild>
              <Button size='sm'>Select file</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className='hidden'></DialogTitle>
              <ImageUploader setImageId={setCoverImageId} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Video url */}
        <div className='relative w-full max-w-screen-lg'>
          <Input
            type='text'
            placeholder='Post video url'
            {...register('videoUrl')}
          />
          {errors.videoUrl?.message && (
            <p className='mt-1 px-2 text-xs text-red-400'>
              {errors.videoUrl.message}
            </p>
          )}
        </div>

        {/* Title and slug */}
        <div className='flex flex-col justify-between gap-4 sm:flex-row relative w-full max-w-screen-lg'>
          <div className='flex-1'>
            <Input
              type='text'
              placeholder='Post title'
              {...register('title')}
            />
            {errors.title?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.title.message}
              </p>
            )}
          </div>
          <div className='flex-1' hidden>
            <Input disabled type='text' placeholder='Post slug' {...register('slug')} />
            {errors.slug?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.slug.message}
              </p>
            )}
          </div>
        </div>

        {/* Excerpt */}
        <div className='relative w-full max-w-screen-lg'>
          <Input
            type='text'
            placeholder='Post excerpt'
            {...register('excerpt')}
          />
          {errors.excerpt?.message && (
            <p className='mt-1 px-2 text-xs text-red-400'>
              {errors.excerpt.message}
            </p>
          )}
        </div>

        {/* Content */}
        <div>
          <Editor post={post} editable={true} setContent={setContent} />
        </div>

        {/* Tag input */}
        <div className='relative w-full max-w-screen-lg'>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TagInput
                activeTagIndex={null}
                setActiveTagIndex={() => {}}
                {...field}
                placeholder="Enter a tag"
                tags={tags}
                className="sm:min-w-[450px]"
                setTags={(newTags) => {
                  setTags(newTags)
                  setValue('tags', newTags as [Tag, ...Tag[]])
                }}
              />
            )}
          />
        </div>

        {/* Attach files 1*/}
        <div className='flex justify-between gap-4 relative w-full max-w-screen-lg' >
          <div className='w-full'>
            <Input
              disabled
              type='text'
              className='w-full'
              placeholder='Attach image'
              {...register('attachImageId1')}
            />
            {errors.attachImageId1?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.attachImageId1.message}
              </p>
            )}
          </div>
          <Dialog open={attach1PickerIsOpen} onOpenChange={setAttach1PickerIsOpen}>
            <DialogTrigger asChild>
              <Button size='sm'>Attach file</Button>
            </DialogTrigger>
            <DialogContent>
              <ImageUploader setImageId={setAttachImageId1} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Attach files 2*/}
        <div className='flex justify-between gap-4 relative w-full max-w-screen-lg' >
          <div className='w-full'>
            <Input
              disabled
              type='text'
              className='w-full'
              placeholder='Attach image'
              {...register('attachImageId2')}
            />
            {errors.attachImageId2?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.attachImageId2.message}
              </p>
            )}
          </div>
          <Dialog open={attach2PickerIsOpen} onOpenChange={setAttach2PickerIsOpen}>
            <DialogTrigger asChild>
              <Button size='sm'>Attach file</Button>
            </DialogTrigger>
            <DialogContent>
              <ImageUploader setImageId={setAttachImageId2} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Attach files 3*/}
        <div className='flex justify-between gap-4 relative w-full max-w-screen-lg' >
          <div className='w-full'>
            <Input
              disabled
              type='text'
              className='w-full'
              placeholder='Attach image'
              {...register('attachImageId3')}
            />
            {errors.attachImageId3?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.attachImageId3.message}
              </p>
            )}
          </div>
          <Dialog open={attach3PickerIsOpen} onOpenChange={setAttach3PickerIsOpen}>
            <DialogTrigger asChild>
              <Button size='sm'>Attach file</Button>
            </DialogTrigger>
            <DialogContent>
              <ImageUploader setImageId={setAttachImageId3} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Attach files 4*/}
        <div className='flex justify-between gap-4 relative w-full max-w-screen-lg' >
          <div className='w-full'>
            <Input
              disabled
              type='text'
              className='w-full'
              placeholder='Attach image'
              {...register('attachImageId4')}
            />
            {errors.attachImageId4?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.attachImageId4.message}
              </p>
            )}
          </div>
          <Dialog open={attach4PickerIsOpen} onOpenChange={setAttach4PickerIsOpen}>
            <DialogTrigger asChild>
              <Button size='sm'>Attach file</Button>
            </DialogTrigger>
            <DialogContent>
              <ImageUploader setImageId={setAttachImageId4} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Attach files 5*/}
        <div className='flex justify-between gap-4 relative w-full max-w-screen-lg' >
          <div className='w-full'>
            <Input
              disabled
              type='text'
              className='w-full'
              placeholder='Attach image'
              {...register('attachImageId5')}
            />
            {errors.attachImageId5?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.attachImageId5.message}
              </p>
            )}
          </div>
          <Dialog open={attach5PickerIsOpen} onOpenChange={setAttach5PickerIsOpen}>
            <DialogTrigger asChild>
              <Button size='sm'>Attach file</Button>
            </DialogTrigger>
            <DialogContent>
              <ImageUploader setImageId={setAttachImageId5} />
            </DialogContent>
          </Dialog>
        </div>

        <div className='flex flex-row gap-3'>
          <Button
            disabled={isSubmitting}
            className='w-32'
          >
            {isSubmitting ? (
              <>
                <Spinner className='mr-2' />
                <span>Saving post...</span>
              </>
            ) : (
              'Upsert post'
            )}
          </Button>
          <Button
            variant="secondary"
            className='w-32'
            onClick={handleCancelGoBack}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  )
}