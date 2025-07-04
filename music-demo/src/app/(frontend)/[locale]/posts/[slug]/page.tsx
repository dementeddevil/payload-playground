import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import type { Post } from '@/payload-types'
import Link from 'next/link'
import { BiChevronLeft } from 'react-icons/bi'
import { RenderBlocks } from '@/blocks'
import RichTextContent from '@/components/RichText'

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
    },
  })

  if (posts.docs.length === 0) {
    return notFound()
  }

  const post = posts.docs[0]
  console.log(post)

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
      </header>
      <section className="article__content rte">
        <RichTextContent data={post?.content} enableGutter={false} />
      </section>
    </article>
  )
}
