import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageSkeleton from '@/components/PageSkeleton'
import DataClient from '@/components/DataClient'

const accentColor = '#FF6347'

export async function fetchPageTitle() {
  const payload = await getPayload({ config: configPromise })

  // Fetch the page title for "Data" from PageSettings
  const settings = await payload.find({
    collection: 'page-settings',
    pagination: false,
    where: { page: { equals: 'data' } },
  })

  return settings.docs?.[0]?.title || 'Dataset, Exploration & Visualizations'
}

export default async function Data() {
  const pageTitle = await fetchPageTitle()

  return (
    <PageSkeleton title={pageTitle} showLine lineColor={accentColor}>
      <DataClient />
    </PageSkeleton>
  )
}