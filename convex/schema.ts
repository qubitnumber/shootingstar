import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    posts: v.optional(v.array(v.id('posts'))),
    atTag: v.optional(v.string()),
    followings: v.array(v.string()),
  }).index('byClerkUserId', ['clerkUserId'])
    .index('byAtTag', ['atTag']),
  posts: defineTable({
    videoUrl: v.optional(v.string()),
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    tags: v.any(),
    coverImageId: v.optional(v.any()),
    authorId: v.id('users'),
    likes: v.number(),
    attachImageId1: v.optional(v.any()),
    attachImageId2: v.optional(v.any()),
    attachImageId3: v.optional(v.any()),
    attachImageId4: v.optional(v.any()),
    attachImageId5: v.optional(v.any()),
  }).index('bySlug', ['slug'])
    .index('byTag', ['tags'])
    .index('byAuthorId', ['authorId']),
  comments: defineTable({
    postId: v.id('posts'),
    authorId: v.id('users'),
    content: v.string(),
    parentId: v.optional(v.union(v.id('comments'), v.string())),
    commentDeep: v.number()
  }).index('byPostId', ['postId'])
    .index('byParentId', ['parentId'])
},{
  schemaValidation: false,
})