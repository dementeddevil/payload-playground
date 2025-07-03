import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import type { Artist } from '@/payload-types'
import RichText from '@/components/RichText'
import { BiChevronLeft } from 'react-icons/bi'
import Link from 'next/link'

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = await params;
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

  const postData = posts.docs[0]
  console.log(postData)

  return (
    <article className="article article--hero">
      <Link className="article-back" href="/posts/">
        <BiChevronLeft />
      </Link>
      <header className="article__header">
        <div className="article__header-media">
          <img src={postData?.heroImage?.url} />
        </div>
      </header>
      <section className="article__content rte">
        <RichText data={postData?.content} enableGutter={false} />
      </section>
    </article>
  )
}
