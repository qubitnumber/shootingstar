import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

import { Button } from '@/components/ui/button'

import InputComment from '@/components/medium/comment/input-comment'
import Comment from '@/components/medium/comment/comment'


export default function Comments({ postId }: { postId: Id<'posts'>}) {
  const createComment = useMutation(api.comments.createComment)
  const comments = useQuery(api.comments.getParentCommentsByPostId, { postId })

  const [editable, setEditable] = useState(false)
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    if (commentInput) {
      const fetchCreateComment = async () => {
        try {
          const postComment = await createComment({
            content: commentInput,
            postId,
            commentDeep: 0,
            contentDeleted: false
          })

          if (!postComment) throw new Error('Failed to create comment')
          toast.success('Comment created!')
        } catch (error) {
          toast.error('Failed to create comment')
        }
      }
      fetchCreateComment()
      setCommentInput('')
    }
  }, [commentInput])

  return (
    <div className="mx-auto w-2xl space-y-8 py-8">
      <div className="space-y-4">
        <div className="grid gap-2">
          {editable ? (
            <InputComment
              setCommentInput={setCommentInput}
              setEditable={setEditable}
            />
          ) : (
            <Button
              variant="outline"
              className='gap-2 rounded-full justify-start font-semibold pl-7 h-14'
              onClick={() => setEditable(true)}
            >
              Join the conversation
            </Button>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {comments?.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            postId={postId}
          />
        ))}
      </div>
    </div>
  )
}