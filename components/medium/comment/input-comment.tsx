"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CircleAlert } from 'lucide-react'
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'

import { newCommentSchema } from '@/lib/schemas'

import styles from '@/components/medium/comment/styles.module.css'
import { useEffect } from "react";

type Inputs = z.infer<typeof newCommentSchema>

export default function InputComment({
  setCommentInput,
  setEditable,
  defaultValue
}: {
  setCommentInput: Function,
  setEditable: Function,
  defaultValue?: string 
}) {

  const form = useForm<Inputs>({
    resolver: zodResolver(newCommentSchema),
  })

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = form

  const content = watch('content')
  useEffect(() => {
    if (defaultValue) {
      setValue('content', defaultValue)
    }
  }, [defaultValue])

  function onSubmit(values: Inputs) {
    setEditable(false)
    setCommentInput(values.content)
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-3">
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <TextareaAutosize
                    minRows={2}
                    className={`rounded-xl p-2 text-sm w-full ${styles.inputtextarea}`}
                    {...field}
                  />

                  <div className={`flex flex-row ${errors.content?.message ? 'justify-between' : 'justify-end'}`}>
                    {errors.content?.message && (
                    <div className='flex flex-row gap-2 items-center px-2 text-xs text-red-400'>
                      <CircleAlert />
                      <span className={'text-opacity-80'}>
                        {'The field is required and cannot be empty'}
                      </span>
                    </div>
                    )}
                    <div className="flex gap-3">
                      <Button
                        size='sm'
                        variant="secondary"
                        className={`text-sm border rounded-full`}
                        onClick={() => {
                          setEditable(false)
                          setCommentInput('')
                        }}
                        >
                          Cancel
                      </Button>
                      <Button
                        size='sm'
                        variant="secondary"
                        className={`text-sm border rounded-full mr-2`}
                        onClick={handleSubmit(onSubmit)}
                        >
                          Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
