import Post from '@/components/medium/post'

export default async function PostPage({params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return <Post slug={slug} />
}