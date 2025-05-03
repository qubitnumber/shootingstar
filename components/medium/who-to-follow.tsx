'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { useMutation, useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { combineName } from '@/lib/utils'

import { Spinner } from '@/components/ui/spinner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ButtonFollowing from '@/components/medium/button-following'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '../ui/button'

export default function WhoToFollow() {
  const users = useQuery(api.users.getRecentUsers)
  const currentUser = useQuery(api.users.current)
  const upsertUser = useMutation(api.users.upsertFromClerk)

  if (users === null) {
    return null
  }

  async function addFollowing(clerkUserId: string, name: string) {
    await upsertUser({ following: clerkUserId})
    toast.success(`Success! You're now following ${name}`)
  }
  
  async function removeFollowing(clerkUserId: string, name: string) {
    await upsertUser({ unFollowing: clerkUserId})
    toast.success(`You unflooweded ${name}`)
  }

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle>Who to follow</CardTitle>
      </CardHeader>

      <CardContent>
        {!users && <Spinner />}

        <ul className='flex flex-col gap-3'>
          {users?.map(user => {
            if (user._id !== currentUser?._id) {
              return (
                <li key={user._id} className='flex items-center justify-between'>
                  <Link href={`/author/${user?.atTag}`} className='block'>
                    <div className='inline-flex items-center gap-2'>
                      <Avatar className='size-5'>
                        <AvatarImage src={user?.imageUrl} alt={combineName(user)} />
                        <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
                      </Avatar>
    
                      <h2 className='text-xs font-medium'>{combineName(user)}</h2>
                    </div>
                  </Link>

                  <div className='text-sm'>
                    <ButtonFollowing
                      followings={currentUser?.followings!}
                      clerkUserId={user?.clerkUserId!}
                      addFollowing={() =>
                        addFollowing(user?.clerkUserId!, combineName(user))
                      }
                      removeFollowing={() =>
                        removeFollowing(user?.clerkUserId!, combineName(user))
                      }
                    />
                  </div>
                </li>
              )
            }
          })}
        </ul>
      </CardContent>

      <CardFooter>
        <Link href='/' className='text-sm font-light text-emerald-600'>
          See more suggestions
        </Link>
      </CardFooter>
    </Card>
  )
}