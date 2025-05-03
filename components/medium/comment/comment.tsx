import React, { useState } from 'react'
import { formatDistance } from 'date-fns'
import Link from 'next/link'
import {
  MessageCircle,
  Dot,
  CirclePlus,
  CircleMinus
} from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import InputComment from '@/components/medium/comment/input-comment'
import DropdownComment from '@/components/medium/comment/dropbox-comment'

import { Button } from '@/components/ui/button'

import { combineName } from '@/lib/utils'
import { Comment as CommentType } from '@/lib/types'

import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

import styles from '@/components/medium/comment/styles.module.css'


export default function Comment({
  comment,
  postId,
  parentId,
}: {
  comment: CommentType,
  postId: Id<'posts'>,
  parentId?: Id<'comments'>,
}) {
  const [editComment, setEditComment] = useState(false)
  const [delComment, setDelComment] = useState(false)
  const [replyText, setReplyText] = useState('');
  const [newReplyText, setNewReplyText] =  useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const createComment = useMutation(api.comments.createComment)
  const upsertComment = useMutation(api.comments.upsertComment)
  const deleteComment = useMutation(api.comments.deleteComment)

  if (delComment) {
    deleteComment({ commentId: comment._id})
    setDelComment(false)
  }

  if (!editComment && replyText) {
    upsertComment({ id: comment._id, content: replyText})
    setReplyText('')
    setEditComment(false)
  }

  if (!showReplyBox && newReplyText) {
    createComment({
      content: newReplyText,
      postId,
      parentId: comment._id,
      commentDeep: comment.commentDeep + 1
    })
    setNewReplyText('')
    setShowReplyBox(false)
  }

  return (
    <div className="flex items-start gap-4">
      <div className="grid w-full gap-1.5">
        <div className="flex items-center border-b gap-2">
          {isHidden ? (
          <CirclePlus className='w-5 h-5' onClick={() => setIsHidden(prev => !prev)} />
          ) : (
          <Link href={`/author/${comment.author?.atTag}`} className='flex flex-row items-center gap-2'>
            <Avatar className='h-7 w-7 border'>
              <AvatarImage
                src={comment?.author?.imageUrl}
                alt={combineName(comment?.author!)}
              />
              <AvatarFallback>{comment?.author?.firstName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>)}
          <Link href={`/author/${comment.author?.atTag}`} className='flex flex-row items-center gap-2'>
            <div className="text-sm">{combineName(comment.author!)}</div>
          </Link>
          <div className="flex flex-row items-center text-xs text-muted-foreground text-opacity-80">
            <Dot />
            {formatDistance(Date.now(), comment._creationTime, {addSuffix: true})}
          </div>
        </div>
        <div className={`${isHidden ? 'hidden' : ''}`}>
          <CircleMinus className={`w-5 h-5 ${styles.circleMinus}`} onClick={() => setIsHidden(prev => !prev)} />
          <div className={`${styles.verticleLine}`}>
            <div>
              {editComment ? (
                <div className='ml-9'>
                  <InputComment
                    setCommentInput={setReplyText}
                    setEditable={setEditComment}
                    defaultValue={comment?.content ?? ''}
                  />
                </div>
                ) : (
                <div className="text-sm text-muted-foreground ml-9">{comment?.content}</div>
                )
              }
              <div className='flex flex-row justify-start items-center gap-3 ml-12 mb-2'>
                <Button
                  disabled={comment.commentDeep >= 10 }
                  className='h-5 w-5'
                  size='sm'
                  variant='ghost'
                  onClick={() => {
                    setShowReplyBox(true)
                  }}
                >
                  <MessageCircle />
                  <div className="text-sm text-muted-foreground">Reply</div>
                </Button>
                <div className={`ml-5 inline-flex items-center`}>
                  <DropdownComment
                    setEditComment={setEditComment}
                    setDelComment={setDelComment}
                  />
                </div>
              </div>
              {showReplyBox && (
              <div className='ml-8'>
                <InputComment
                  setCommentInput={setNewReplyText}
                  setEditable={setShowReplyBox}
                />
              </div>)}
            </div>
          </div>
          {comment.children && comment.children.length > 0 && (
            <div className="space-y-4 ml-6">
              {comment.children.map((childComment) => (
                  <Comment
                    key={childComment._id}
                    comment={childComment}
                    postId={postId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}