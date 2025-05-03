import { Id } from '@/convex/_generated/dataModel'

export type Post = {
  _id: Id<'posts'>
  _creationTime: number
  coverImageId?: string
  authorId: Id<'users'>
  attachImageId1?: string
  attachImageId2?: string
  attachImageId3?: string
  attachImageId4?: string
  attachImageId5?: string
  videoUrl?: string
  coverImageUrl?: string
  attachImageUrl1?: string
  attachImageUrl2?: string
  attachImageUrl3?: string
  attachImageUrl4?: string
  attachImageUrl5?: string
  title: string
  slug: string
  excerpt: string
  content: string
  tags: Array<{id: string, text: string}[]>
  author?: User
  likes: number
}

export type Comment = {
  _id: Id<'comments'>
  _creationTime: number
  content: string
  author: User
  post?: Post | null
  authorId: Id<'users'>
  postId: Id<'posts'>
  parentId?: Id<'comments'> | string
  children?: Array<Comment>
  commentDeep: number
  contentDeleted: boolean
}

export type User = {
  _id: Id<'users'>
  _creationTime: number
  firstName?: string
  lastName?: string
  imageUrl?: string
  email: string
  clerkUserId: string
  atTag?: string
  followings: Array<string>
  posts?: Array<Id<'posts'>>
} | null | undefined