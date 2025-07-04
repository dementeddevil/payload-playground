import type { Metadata } from 'next/types'
import { BiSearch } from 'react-icons/bi'
import Link from 'next/link'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { getPayloadClient } from '@/payload/getPayloadClient'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      thumbnailImage: true,
    },
  })

  return (
    <section className="section">
      <div className="section__header">
        <div className="section__title section__title--top">
          <h2>Latest News.</h2>
          <p>Our latest news from around the globe. </p>
        </div>
      </div>
      <div className="section__content">
        <div className="section__search">
          <div className="search-bar">
            <input type="text" placeholder="Search news" />
            <BiSearch />
          </div>
          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div>
        <ul className="cards-list">
          {posts.docs.map((item: any) => (
            <li className="card" key={item.id}>
              <Link href={`/posts/${item.slug}`}>
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
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
