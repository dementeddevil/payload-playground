import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Page } from '@/payload-types'

export default async function Page({ params }: { params: { locale: string, slug: string } }) {

  const { locale, slug } = await params;
  // Example of fetching localized data from Payload

const payload = await getPayload({ config: configPromise })

const page = await payload.find({
  collection: 'pages',
  where: {
    slug: {
      equals: slug,
    },
  },
  locale: locale, // Pass the locale here
  fallbackLocale: 'en', // Optional: specify fallback
});

const pageData = page.docs[0]

  return (
      <>
        <h1>{pageData?.test}</h1>
      </>
    )
  // ... fetch page data using locale
}
