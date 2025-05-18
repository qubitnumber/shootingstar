"use client"

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Link from 'next/link'
import { Hash } from "lucide-react"

export default function RecommendedTopics() {
  const tags = useQuery(api.posts.getPosTags)

  return (
    <Card className='flex-1 mb-3'>
      <CardHeader>
        <CardTitle>Recommended Tags</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='flex flex-wrap gap-2'>
          {tags?.map((tag: any, i) => (
            <Link key={i} href={`/tags/${tag}`} className='block'>
              <div className='flex items-center text-sm text-muted-foreground'>
                <Hash className='h-4 w-4' />
                <span>{tag.toUpperCase()}</span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Link href='/' className='text-sm font-light text-emerald-600'>
          See more tags
        </Link>
      </CardFooter>
    </Card>
  )
}