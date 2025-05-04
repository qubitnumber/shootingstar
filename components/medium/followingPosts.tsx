'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

import { Spinner } from '@/components/ui/spinner'

import FollowingItem from '@/components/medium/following-item'


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
      <div className='font-sans text-3xl font-semibold mb-10'>{`${followersList?.length} Following`}</div>
      <ul className='flex flex-col gap-3'>
        {followersList && followersList.map(following => (
            <FollowingItem key={following?._id} following={following} />
        ))}
      </ul>
    </div>
  )
}