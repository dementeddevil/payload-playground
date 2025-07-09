import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import type { User } from '@/payload-types'
import { cookies } from 'next/headers'
import { PostClientPage } from './PostClientPage'
import { getPayloadClient } from '@/payload/getPayloadClient'
import GlobalFooter from '@/globals/Footer/Component'

export const dynamic = 'force-dynamic'

export default async function Post({ params }: { params: { slug: string; locale: string } }) {
  const { slug, locale } = params
  const payload = await getPayloadClient()
  const token = cookies().get('payload-token')?.value
  let user: User | null = null

  // When in preview mode, the `payload-token` cookie is set.
  // We can use this token to make an authenticated request to get the logged-in user.
  if (token) {
    try {
      const meUserReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })

      if (meUserReq.ok) {
        const { user: meUser } = await meUserReq.json()
        user = meUser
      }
    } catch (error) {
      // Log the error and continue as a non-authenticated user
      console.error('Error fetching user for preview:', error) // eslint-disable-line no-console
    }
  }

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
    },
    locale,
    fallbackLocale: 'en',
    depth: 2,
    // If a user is logged in, we can fetch drafts
    draft: !!user,
    // The user object is passed to Payload so that it can perform access control checks
    user,
  })

  if (posts.docs.length === 0) {
    return notFound()
  }

  const post = posts.docs[0]

  return (
    <>
    <PostClientPage post={post} />
    <GlobalFooter lang={locale} />
    </>
    
  )
}
