import AuthorPosts from '@/components/medium/authorPosts'
import Following from '@/components/medium/following'

export default function PostPage({ params }: { params: { atTag: string } }) {
  const { atTag } = params

  return (
    <section className='mt-[65px]'>
      <div className='container'>
        <div className='flex flex-col gap-x-16 gap-y-6 xl:flex-row xl:items-start'>
          <main className='flex-1 pt-20 xl:py-20'>
            <AuthorPosts atTag={decodeURIComponent(atTag)} />
          </main>

          <aside className='w-full flex-col justify-between gap-6 pb-10 md:flex-row xl:sticky xl:top-[65px] xl:w-[350px] xl:flex-col xl:py-20'>
            <Following atTag={decodeURIComponent(atTag)} />
          </aside>
        </div>
      </div>
    </section>
  )
}