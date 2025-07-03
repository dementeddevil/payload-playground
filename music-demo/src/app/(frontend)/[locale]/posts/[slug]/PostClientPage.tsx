'use client'

import React from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Post as PostType } from '@/payload-types'
import RichText from '@/components/RichText'
import { BiChevronLeft } from 'react-icons/bi'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PostClientPageProps {
  post: PostType | null | undefined
}

export const PostClientPage: React.FC<PostClientPageProps> = ({ post: initialPost }) => {
  const { data: post } = useLivePreview<PostType>({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    depth: 2,
    initialData: initialPost,
  })

  if (!post) {
    // This can happen if the initial post is null or if live preview data is not yet available.
    // You might want to show a loading spinner or a "not found" message.
    return notFound()
  }

  return (
    <article className="article article--hero">
      <Link className="article-back" href="/posts/">
        <BiChevronLeft />
      </Link>
      <header className="article__header">
        <div className="article__header-media">
          {/* Using `post.heroImage.url` safely, assuming heroImage might not be populated */}
          <img src={typeof post.heroImage === 'object' ? post.heroImage.url : ''} alt={typeof post.heroImage === 'object' ? post.heroImage.alt : ''} />
        </div>
        <div className="article__header-content">
          <h1>{post?.title}</h1>
          <p>{post?.excerpt}</p>
        </div>
      </header>
      <section className="article__content rte">
        <RichText data={post?.content} enableGutter={false} />
      </section>
    </article>
  )
}
