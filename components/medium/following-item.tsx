'use client'

import Link from 'next/link'
import { toast } from 'sonner'

import { User } from '@/lib/types'
import { combineName } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from "@/components/ui/separator"

import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '../ui/button'
import { useState } from 'react'


export default function FollowingItem({ following }: { following: User }) {
  const currentUser = useQuery(api.users.current)
  const upsertUser = useMutation(api.users.upsertFromClerk)

  const isFollowing = currentUser?.followings.includes(following?.clerkUserId!)

  async function addFollowing(clerkUserId: string, name: string) {
    await upsertUser({ following: clerkUserId})
    toast.success(`Success! You're now following ${name}`)
  }
  
  async function removeFollowing(clerkUserId: string, name: string) {
    await upsertUser({ unFollowing: clerkUserId})
    toast.success(`You unflooweded ${name}`)
  }

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
          <Button
            className={`border border-blue-500 ${isFollowing ? 'text-blue-500' : 'text-white'} rounded-full ml-3 mr-2 ${!isFollowing && 'bg-blue-700'}`}
            variant='outline'
            size='lg'
            onClick={() => isFollowing 
              ? removeFollowing(following?.clerkUserId!, combineName(following!))
              : addFollowing(following?.clerkUserId!, combineName(following!))
            }
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>
      </li>
      <Separator className="my-5" />
    </div>
  )
}