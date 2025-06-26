import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Homepage } from '@/payload-types'
import Hero from './components/Hero'
import LatestNews from './components/LatestNews'
import ShowReel from './components/ShowReel'
import FeaturedArtists from './components/FeaturedArtists'

export default async function Homepage({ params }: { params: { locale: string} }) {
  const { locale } = await params;
  const payload = await getPayload({ config: configPromise })
  const homepage = await payload.find({
    collection: 'homepage',
    populate: {
      // Select only `text` from populated docs in the "pages" collection
      // Now, no matter what the `defaultPopulate` is set to on the "pages" collection,
      // it will be overridden, and the `text` field will be returned instead.
      artists: {
        title: true,
        thumbnailImage: true,
        slug: true,
      },
      posts: {
        title: true,
        excerpt: true,
        thumbnailImage: true,
        slug: true,
      },
    },
    locale: locale, // Pass the locale here
  fallbackLocale: 'en', // Optional: specify fallback
  })
  console.log(homepage)
  const slides: any = homepage.docs[0]?.hero
  const posts: any = homepage.docs[0]?.newsSection
  const video: any = homepage.docs[0]?.videoSection
  const artists: any = homepage.docs[0]?.artistsSection

  return (
    <>
      <Hero slides={slides} />
      <LatestNews posts={posts} />
      <ShowReel video={video}/>
      <FeaturedArtists artists={artists} />
    </>
  )
}
