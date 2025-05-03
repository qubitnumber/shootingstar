import { v } from 'convex/values'
import { query, mutation } from './_generated/server'
import { getCurrentUserOrThrow } from './users'

export const generateUploadUrl = mutation(async ctx => {
  return await ctx.storage.generateUploadUrl()
})

export const getPosts = query({
  args: {},
  handler: async ctx => {
    const posts = await ctx.db.query('posts').order('desc').collect()
    return Promise.all(
      posts.map(async post => {
        const author = await ctx.db.get(post.authorId)

        return {
          ...post,
          author,
          ...(post.coverImageId
            ? {
                coverImageUrl:
                  (await ctx.storage.getUrl(post.coverImageId)) ?? ''
              }
            : {}),
          ...(post.attachImageId1
            ? {
              attachImageUrl1:
                  (await ctx.storage.getUrl(post.attachImageId1)) ?? ''
              }
            : {}),
          ...(post.attachImageId2
            ? {
              attachImageUrl2:
                  (await ctx.storage.getUrl(post.attachImageId2)) ?? ''
              }
            : {}),
          ...(post.attachImageId3
            ? {
              attachImageUrl3:
                  (await ctx.storage.getUrl(post.attachImageId3)) ?? ''
              }
            : {}),
          ...(post.attachImageId4
            ? {
              attachImageUrl4:
                  (await ctx.storage.getUrl(post.attachImageId4)) ?? ''
              }
            : {}),
          ...(post.attachImageId5
            ? {
              attachImageUrl5:
                  (await ctx.storage.getUrl(post.attachImageId5)) ?? ''
              }
            : {}),
        }
      })
    )
  }
})

export const getPosTags = query({
  args: {},
  handler: async ctx => {
    const posts = await ctx.db.query('posts').collect()
    const tags = posts.map((post) => post.tags?.map((tag: any) => tag.text))
    let mergedTags = []
    if ( tags && tags.length) {
      mergedTags = tags.reduce((accumulator, current) => [...accumulator, ...current]).sort()
    }
    return [...new Set(mergedTags)];
  }
})

export const getRecentPosts = query({
  args: {},
  handler: async ctx => {
    const posts = await ctx.db.query('posts').order('desc').take(4)
    return Promise.all(
      posts.map(async post => {
        const author = await ctx.db.get(post.authorId)

        return {
          ...post,
          author
        }
      })
    )
  }
})

export const getPostsByTag =  query({
  args: { tag: v.optional(v.string()) },
  handler: async (ctx, { tag }) => {
    const allPosts = await ctx.db.query("posts").collect();
    return Promise.all(
      allPosts
        .filter((post) => {
          const taged = post.tags.map((item: any) => item.text.toLowerCase() === tag?.toLowerCase())
          if (taged.includes(true)) {
            return post
          }
        })
        .map(async post => {
          const author = await ctx.db.get(post.authorId)

          return {
            ...post,
            author,
            ...(post.coverImageId
              ? {
                  coverImageUrl:
                    (await ctx.storage.getUrl(post.coverImageId)) ?? ''
                }
              : {}),
            ...(post.attachImageId1
              ? {
                attachImageUrl1:
                    (await ctx.storage.getUrl(post.attachImageId1)) ?? ''
                }
              : {}),
            ...(post.attachImageId2
              ? {
                attachImageUrl2:
                    (await ctx.storage.getUrl(post.attachImageId2)) ?? ''
                }
              : {}),
            ...(post.attachImageId3
              ? {
                attachImageUrl3:
                    (await ctx.storage.getUrl(post.attachImageId3)) ?? ''
                }
              : {}),
            ...(post.attachImageId4
              ? {
                attachImageUrl4:
                    (await ctx.storage.getUrl(post.attachImageId4)) ?? ''
                }
              : {}),
            ...(post.attachImageId5
              ? {
                attachImageUrl5:
                    (await ctx.storage.getUrl(post.attachImageId5)) ?? ''
                }
              : {}),
          }
      })
    )
  }
})

export const getPostsByAtTag =  query({
  args: { atTag: v.string() },
  handler: async (ctx, { atTag }) => {
    const author = await ctx.db
      .query("users")
      .withIndex("byAtTag", (q) => q.eq("atTag", atTag))
      .unique()

    const posts = await ctx.db
      .query("posts")
      .withIndex("byAuthorId", (q) => q.eq("authorId", author?._id!))
      .order('desc')
      .collect();

    return Promise.all(
      posts.map(async post => {
        return {
          ...post,
          author,
          ...(post.coverImageId
            ? {
                coverImageUrl:
                  (await ctx.storage.getUrl(post.coverImageId)) ?? ''
              }
            : {}),
          ...(post.attachImageId1
            ? {
              attachImageUrl1:
                  (await ctx.storage.getUrl(post.attachImageId1)) ?? ''
              }
            : {}),
          ...(post.attachImageId2
            ? {
              attachImageUrl2:
                  (await ctx.storage.getUrl(post.attachImageId2)) ?? ''
              }
            : {}),
          ...(post.attachImageId3
            ? {
              attachImageUrl3:
                  (await ctx.storage.getUrl(post.attachImageId3)) ?? ''
              }
            : {}),
          ...(post.attachImageId4
            ? {
              attachImageUrl4:
                  (await ctx.storage.getUrl(post.attachImageId4)) ?? ''
              }
            : {}),
          ...(post.attachImageId5
            ? {
              attachImageUrl5:
                  (await ctx.storage.getUrl(post.attachImageId5)) ?? ''
              }
            : {}),
        }
      })
    )
  }
})

export const getPostBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const post = await ctx.db
      .query('posts')
      .withIndex('bySlug', q => q.eq('slug', slug))
      .unique()

    if (!post) {
      return null
    }

    const author = await ctx.db.get(post.authorId)

    return {
      ...post,
      author,
      ...(post.coverImageId
        ? { coverImageUrl: (await ctx.storage.getUrl(post.coverImageId)) ?? '' }
        : {}),
      ...(post.attachImageId1
        ? {
          attachImageUrl1:
              (await ctx.storage.getUrl(post.attachImageId1)) ?? ''
          }
        : {}),
      ...(post.attachImageId2
        ? {
          attachImageUrl2:
              (await ctx.storage.getUrl(post.attachImageId2)) ?? ''
          }
        : {}),
      ...(post.attachImageId3
        ? {
          attachImageUrl3:
              (await ctx.storage.getUrl(post.attachImageId3)) ?? ''
          }
        : {}),
      ...(post.attachImageId4
        ? {
          attachImageUrl4:
              (await ctx.storage.getUrl(post.attachImageId4)) ?? ''
          }
        : {}),
      ...(post.attachImageId5
        ? {
          attachImageUrl5:
              (await ctx.storage.getUrl(post.attachImageId5)) ?? ''
          }
        : {})
    }
  }
})

export const createPost = mutation({
  args: {
    videoUrl: v.optional(v.string()),
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    tags: v.any(),
    coverImageId: v.optional(v.any()),
    attachImageId1: v.optional(v.any()),
    attachImageId2: v.optional(v.any()),
    attachImageId3: v.optional(v.any()),
    attachImageId4: v.optional(v.any()),
    attachImageId5: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx)

    if (!user || !user._id) {
      return null
    }

    const data = {
      ...args,
      authorId: user._id,
      likes: 0
    }

    await ctx.db.insert('posts', data)

    return data.slug
  }
})

export const upsertPost = mutation({
  args: {
    videoUrl: v.optional(v.string()),
    id: v.id('posts'),
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    tags: v.any(),
    coverImageId: v.optional(v.any()),
    attachImageId1: v.optional(v.any()),
    attachImageId2: v.optional(v.any()),
    attachImageId3: v.optional(v.any()),
    attachImageId4: v.optional(v.any()),
    attachImageId5: v.optional(v.any()),
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx)
    const post = await ctx.db.get(args.id)

    if (!post) {
      return null
    }

    if (!user._id || !post?.authorId || post.authorId !== user._id) {
      return null
    }

    const data = {
      videoUrl: args.videoUrl,
      title: args.title,
      slug: args.slug,
      excerpt: args.excerpt,
      content: args.content,
      tags: args.tags,
      coverImageId: args.coverImageId,
      attachImageId1: args.attachImageId1,
      attachImageId2: args.attachImageId2,
      attachImageId3: args.attachImageId3,
      attachImageId4: args.attachImageId4,
      attachImageId5: args.attachImageId5
    }

    await ctx.db.patch(args.id, data)

    return data.slug
  }
})

export const deletePost = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx)
    const post = await ctx.db
      .query('posts')
      .withIndex('bySlug', q => q.eq('slug', args.slug))
      .unique()

    if (!post) {
      return null
    }

    if (!user._id || !post?.authorId || post.authorId !== user._id) {
      return null
    }

    await ctx.db.delete(post._id);
  },
});

export const likePost = mutation({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const user = await getCurrentUserOrThrow(ctx)

    const post = await ctx.db
      .query('posts')
      .withIndex('bySlug', q => q.eq('slug', slug))
      .unique()

    if (!post) {
      return null
    }

    if (post.authorId === user._id) {
      return null
    }

    await ctx.db.patch(post._id, { likes: post.likes + 1 })
  }
})