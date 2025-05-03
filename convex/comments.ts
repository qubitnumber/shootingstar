import { v } from 'convex/values'
import { query, mutation, QueryCtx } from './_generated/server'
import { getCurrentUserOrThrow } from './users'
import { Id } from './_generated/dataModel';

export const getCommentById = query({
  args: { commentId: v.id("comments") },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      return null
    }
    const author = await ctx.db.get(comment?.authorId!)
    return {
      ...comment,
      author
    }
  },
});

export const getCommentsByPostId = query({
  args: { postId: v.optional(v.id('posts')) },
  handler: async (ctx, { postId }) => {
    if (!postId) return null

    const comments = await ctx.db
      .query('comments')
      .withIndex('byPostId', q => q.eq('postId', postId))
      .order("desc")
      .collect()
  

    if (!comments) return null

    return Promise.all(
      comments.map(async comment => {
        const author = await ctx.db.get(comment.authorId!)
        const post = await ctx.db.get(comment.postId!)

        const data = {
          ...comment,
          author,
          post,
        }

        return data
      })
    )
  }
})

export const getParentCommentsByPostId = query({
  args: { postId: v.id('posts') },
  handler: async (ctx, { postId }) => {
    const comments = await ctx.db
      .query('comments')
      .withIndex('byPostId', q => q.eq('postId', postId))
      .order("desc")
      .collect()
    
    const parentComments = comments.filter(comment => comment.parentId === '')

    if (!parentComments) {
      return null
    }

    return Promise.all(
      parentComments.map(async comment => {
        const children = await commentsByParentId(ctx, comment._id)
        const author = await ctx.db.get(comment.authorId!)
        const post = await ctx.db.get(comment.postId!)

        const data = {
          ...comment,
          author,
          post,
          children
        }

        return data
      })
    )
  }
})

export const createComment = mutation({
  args: {
    postId: v.id("posts"),
    content: v.string(),
    parentId: v.optional(v.union(v.id("comments"), v.string())),
    commentDeep: v.number()
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx)
    const data = {
      content: args.content,
      authorId: user._id,
      postId: args.postId,
      parentId: args.parentId ? args.parentId : '',
      commentDeep: args.commentDeep ? args.commentDeep : 0
    }

    const comment = await ctx.db.insert('comments', data)
    return await ctx.db.get(comment)
  }
})

export const upsertComment = mutation({
  args: {
    id: v.id('comments'),
    content: v.string()
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx)
    const comment = await ctx.db.get(args.id)

    if (!comment) {
      return null
    }

    const data = {
      ...comment,
      content: args.content
    }

    await ctx.db.patch(args.id, data)

    return data
  }
})

export const deleteComment = mutation({
  args: { commentId: v.id('comments') },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx)
    const comment = await ctx.db.get(args.commentId)

    if (!comment) {
      return null
    }

    await ctx.db.delete(args.commentId);
  },
});

async function commentsByParentId(ctx: QueryCtx, parentId: Id<'comments'>): Promise<any> {
  const comments = await ctx.db
    .query('comments')
    .withIndex('byParentId', q => q.eq('parentId', parentId))
    .order("desc")
    .collect()

  return Promise.all(
    comments.map(async (comment) => {
      const children = await commentsByParentId(ctx, comment._id)
      const author = await ctx.db.get(comment.authorId!)
      const post = await ctx.db.get(comment.postId!)

      return {
        ...comment,
        author,
        post,
        children
      }
    })
  )
}