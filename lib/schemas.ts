import { JSONContent } from 'novel'
import { z } from 'zod'
import { Tag } from 'tagmento';

export const newPostSchema = z.object({
  title: z.string().min(1, 'Please enter a title.'),
  slug: z.string().min(1, 'Slug is required.'),
  excerpt: z.string().min(1, 'Please enter an excerpt.'),
  coverImageId: z.string().nullable().optional(),
  content: z.custom<JSONContent>().optional(),
  tags: z.custom<Tag[]>(),
  videoUrl: z.string().optional(), 
  attachImageId1: z.string().nullable().optional(),
  attachImageId2: z.string().nullable().optional(),
  attachImageId3: z.string().nullable().optional(),
  attachImageId4: z.string().nullable().optional(),
  attachImageId5: z.string().nullable().optional(),
})

export const newCommentSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: "The field is required and cannot be empty",
    }),
})