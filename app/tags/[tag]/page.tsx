import TagPosts from '@/components/medium/tagPosts'
import RecentPosts from '@/components/medium/recent-posts'
import WhoToFollow from '@/components/medium/who-to-follow'
import RecommendedTopics from '@/components/medium/recommended-topics'

export default async function PostPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params

  return (
    <section className='mt-[65px]'>
      <div className='container'>
        <div className='flex flex-col gap-x-16 gap-y-6 xl:flex-row xl:items-start'>
          <main className='flex-1 pt-20 mr-20 xl:py-20'>
            <div className='font-sans text-3xl font-semibold mb-7'>#{tag.toUpperCase()}</div>
            <TagPosts tag={tag} />
          </main>

          <aside className='w-full flex-col justify-between gap-6 pb-10 md:flex-row xl:sticky xl:top-[65px] xl:w-[350px] xl:flex-col xl:py-20'>
            <RecentPosts />
            <RecommendedTopics />
            <WhoToFollow />
          </aside>
        </div>
      </div>
    </section>
  )
}