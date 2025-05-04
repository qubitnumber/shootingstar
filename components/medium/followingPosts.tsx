'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

import { Spinner } from '@/components/ui/spinner'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import FollowingItem from '@/components/medium/following-item'
import Link from 'next/link'
import { combineName } from '@/lib/utils'


export default function FollowingPosts({ atTag }: { atTag: string}) {
  const user = useQuery(api.users.getUserByAtTag, { atTag })
  const followersList = useQuery(api.users.getUsersByClerkIds, { clerkIds: user?.followings ?? [] })

  if (!followersList) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      <Breadcrumb className='mb-5'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/author/${user?.atTag}`}>
              {combineName(user!)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Following</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='font-sans text-3xl font-semibold mb-10'>{`${followersList?.length} Following`}</div>
      <ul className='flex flex-col gap-3'>
        {followersList && followersList.map(following => (
            <FollowingItem key={following?._id} following={following} />
        ))}
      </ul>
    </div>
  )
}