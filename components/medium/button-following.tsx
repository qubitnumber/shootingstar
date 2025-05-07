'use client'

import React, { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  BellOff,
  BellPlus,
  BellMinus
} from 'lucide-react' 


const FormSchema = z.object({
  follow: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
})

export default function ButtonFollowing({
  followings,
  clerkUserId,
  addFollowing,
  removeFollowing,
  disabled
} : {
  followings?: string[],
  clerkUserId?: string,
  addFollowing?: () => void,
  removeFollowing?: () => void,
  disabled:  boolean,
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const selctedText = form.watch('follow')
    useEffect(() => {
      if (selctedText) {
        const fetchData = async () => {
          if (selctedText === 'unfollow') {
            if (removeFollowing) removeFollowing()
            form.setValue('follow', '')
          }
        }
        fetchData()
      }
  }, [selctedText])

  return (
    <div>
      {followings && followings.includes(clerkUserId!) ? (
        <Form {...form} >
          <form className="space-y-6 w-full">
            <FormField
              control={form.control}
              name="follow"
              render={({ field }) => (
                <FormItem>
                  <Select disabled={disabled} onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={'border font-light rounded-full'}>
                        <SelectValue placeholder="Following" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="notificationsOn">
                        <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                          <BellPlus className='size-5'/>
                          <span>Email notifications on</span>
                        </div>
                      </SelectItem>
                      <Separator className="my-1" />
                      <SelectItem value="notificationsOff">
                        <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                          <BellMinus className='size-5'/>
                          <span>Email notifications off</span>
                        </div>
                      </SelectItem>
                      <Separator className="my-1" />
                      <SelectItem value="unfollow">
                        <div className='flex items-center gap-3 text-sm text-red-400 text-muted-foreground'>
                          <BellOff className='size-5'/>
                            <span>Unfollow</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <div className="space-y-6 w-full">
          <Button
            disabled={disabled}
            className={'border font-light rounded-full ml-3 mr-2'}
            variant='outline'
            size='lg'
            onClick={addFollowing}
          >
            Follow
          </Button>
        </div>
      )}
    </div>
  )
}
