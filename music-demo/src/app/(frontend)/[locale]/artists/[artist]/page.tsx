import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import type { Artist } from '@/payload-types'
import Link from 'next/link'
import { BiChevronLeft } from 'react-icons/bi'
import { RenderBlocks } from '@/blocks'

export default async function Artist({ params }: { params: { artist: string } }) {
  const { artist } = params
  const payload = await getPayload({ config: configPromise })
  console.log(artist)

  const artists = await payload.find({
    collection: 'artists',
    where: {
      slug: { equals: artist },
    },
  })

  if (artists.docs.length === 0) {
    return notFound()
  }

  const artistData = artists.docs[0]
  console.log(artistData)

  return (
    <article className="article">
      <Link className="article-back" href="/artists/">
        <BiChevronLeft />
      </Link>
      <header className="article__header">
        <div className="article__header-media">
          <img src={artistData?.heroImage?.url} />
        </div>
        <div className="article__header-content">
          <h1>{artistData?.title}</h1>
          <p>{artistData?.intro}</p>
        </div>
      </header>
      <div className="article__content">
        <RenderBlocks blocks={artistData?.modules} />
        {/* <RichText data={artistData?.content} enableGutter={false} /> */}
      </div>
    </article>
  )
}
