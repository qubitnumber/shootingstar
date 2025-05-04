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


export default function Following({ atTag }: { atTag: string}) {
  const user = useQuery(api.users.getUserByAtTag, { atTag })
  const followersList = useQuery(api.users.getUsersByClerkIds, { clerkIds: user?.followings ?? [] })
  const currentUser = useQuery(api.users.current)
  const upsertUser = useMutation(api.users.upsertFromClerk)

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
        <CardTitle>Following</CardTitle>
      </CardHeader>

      <CardContent>
        {!followersList && <Spinner />}

        <ul className='flex flex-col gap-3'>
        {followersList && followersList.length ? (
          followersList?.slice(0, 4).map((follower) => {
            return (
              <li key={follower?._id} className='flex items-center justify-between'>
                <Link href={`/author/${follower?.atTag}`} className='block'>
                  <div className='inline-flex items-center gap-2 pt-1'>
                    <Avatar className='size-5'>
                      <AvatarImage src={follower?.imageUrl} alt={combineName(follower)} />
                      <AvatarFallback>{follower?.firstName?.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <h2 className='text-sm font-medium'>{combineName(follower)}</h2>
                  </div>
                </Link>

                <div className='text-sm'>
                  <ButtonFollowing
                    followings={currentUser?.followings!}
                    clerkUserId={follower?.clerkUserId!}
                    addFollowing={() =>
                      addFollowing(follower?.clerkUserId!, combineName(follower))
                    }
                    removeFollowing={() =>
                      removeFollowing(follower?.clerkUserId!, combineName(follower))
                    }
                  />
                </div>
              </li>
          )})) : (
            <div className="flex text-grey text-lg whitespace-pre-wrap">
              <span>has no following.</span>
            </div>
          )}
        </ul>
      </CardContent>

      {followersList && followersList.length > 1 && (<CardFooter>
        <Link href={`/following/${atTag}`} className='text-sm font-light text-emerald-600'>
          {`See all (${followersList.length})`}
        </Link>
      </CardFooter>
      )}
    </Card>
  )
}