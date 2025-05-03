import { UserJSON } from '@clerk/backend'
import { v, Validator } from 'convex/values'
import { internalMutation, mutation, query, QueryCtx } from './_generated/server'
import {createAtTagFromName} from '@/lib/utils'

export const getUsers = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('users').collect()
  }
})

export const getRecentUsers = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('users').order('desc').take(5)
  }
})

export const current = query({
  args: {},
  handler: async ctx => {
    return await getCurrentUser(ctx)
  }
})

export const getUsersByClerkIds = query({
  args: { clerkIds: v.array(v.string()) },
  handler: async (ctx, { clerkIds }) => {
    if (clerkIds) {
      return Promise.all(
        clerkIds.map(async clerkId => {
          return await userByClerkUserId(ctx, clerkId)
      }))
    }
  }
})

export const getUserFollowingsByAtTag =  query({
  args: { atTag: v.string() },
  handler: async (ctx, { atTag }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byAtTag", (q) => q.eq("atTag", atTag))
      .unique()

    return user?.followings
  }
})

export const createFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON>},
  async handler(ctx, { data }) {
    const username = data.email_addresses[0].email_address.split('@')[0]
    const atTag = createAtTagFromName(username)
    const userAttributes = {
      email: data.email_addresses[0].email_address,
      clerkUserId: data.id,
      firstName: data.first_name ?? '',
      lastName: data.last_name ?? '',
      imageUrl: data.image_url ?? '',
      atTag,
      followings: []
    }

    const user = await userByClerkUserId(ctx, data.id)

    if (user === null) {
      await ctx.db.insert('users', userAttributes)
    } else {
      await ctx.db.patch(user._id, userAttributes)
    }
  }
})

export const upsertFromClerk = mutation({
  args: {
    following: v.optional(v.string()),
    unFollowing: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx)

    if (user !== null) {
      if (args.following) {
        const followings = [...new Set([...user.followings, args.following])];
        await ctx.db.patch(user._id, { followings });
        return await ctx.db.get(user._id)
      }
      if (args.unFollowing) {
        const followings = [...new Set([...user.followings].filter(following => following !== args.unFollowing))];
        await ctx.db.patch(user._id, { followings });
        return await ctx.db.get(user._id)
      }
    } else {
      console.warn(
        `There is no use`
      )
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByClerkUserId(ctx, clerkUserId)

    if (user !== null) {
      await ctx.db.delete(user._id)
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`
      )
    }
  }
})

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx)
  if (!userRecord) throw new Error("Can't get current user")
  return userRecord
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity()
  if (identity === null) {
    return null
  }
  return await userByClerkUserId(ctx, identity.subject)
}

export async function userByClerkUserId(ctx: QueryCtx, clerkUserId: string) {
  return await ctx.db
    .query('users')
    .withIndex('byClerkUserId', q => q.eq('clerkUserId', clerkUserId))
    .unique()
}