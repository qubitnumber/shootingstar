'use client'

import Link from 'next/link'

import { User } from '@/lib/types'
import { combineName } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from "@/components/ui/separator"

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '../ui/button'


export default function FollowingItem({ following }: { following: User }) {
  const currentUser = useQuery(api.users.current)

  return (
    <div>
      <li className='flex items-center justify-between'>
        <Link href={`/author/${following?.atTag}`} className='block'>
          {/* Author */}
          <div className='inline-flex items-center gap-2 pt-1'>
              <Avatar className='size-6'>
                <AvatarImage
                  src={following?.imageUrl}
                  alt={combineName(following!)}
                />
                <AvatarFallback>{following?.firstName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className='text-sm'>{combineName(following!)}</h2>
              </div>
          </div>
        </Link>

        <div className='text-sm'>
          {currentUser && currentUser.followings.includes(following?.clerkUserId!) ? (
            <Button
              className={'border font-light rounded-full ml-3 mr-2'}
              variant='outline'
              size='lg'
              // onClick={addFollowing}
            >
              Follow
            </Button>
          ) : (
            <Button
              className={'border font-light rounded-full ml-3 mr-2'}
              variant='outline'
              size='lg'
              // onClick={addFollowing}
            >
              Follow
            </Button>
          )}
        </div>
      </li>
      <Separator className="my-5" />
    </div>
  )
}