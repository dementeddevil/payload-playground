import type { Metadata } from 'next/types'
import { BiSearch } from 'react-icons/bi'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

import Link from 'next/link'
import { getPayloadClient } from '@/payload/getPayloadClient'
import GlobalFooter from '@/globals/Footer/Component'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page({ params }: { params: { locale: string} }) {
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: 'artists',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      thumbnailImage: true,
    },
  })

  return (
    <>
    <section className="section">
      <div className="section__header">
        <div className="section__title section__title--top">
          <h2>Featured artists.</h2>
          <p>A small selection of our world class songriters.</p>
        </div>
      </div>
      <div className="section__content">
        <div className="section__search">
          <div className="search-bar">
            <input type="text" placeholder="Search artists" />
            <BiSearch />
          </div>
          <PageRange
            collection="artists"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div>
        <ul className="cards-list cards-list--square">
          {posts.docs.map((item: any) => (
            <li className="card" key={item.id}>
              <Link href={`/artists/${item.slug}`}>
                <div
                  className="card__bg"
                  style={{ ['backgroundImage' as any]: `url(${item.thumbnailImage.url})` }}
                ></div>
                <div className="card__content">
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <GlobalFooter lang={params.locale} />
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Artists`,
  }
}
