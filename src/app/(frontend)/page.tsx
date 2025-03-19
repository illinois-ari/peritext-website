import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageSkeleton from '@/components/PageSkeleton'
import HomeClient from '@/components/HomeClient'
import { richTextToHtml } from '@/utils/richTextParser'

const accentColor = '#FF3E30';
const secondaryColor = "#f4b700";

export async function fetchHomeData() {
  const payload = await getPayload({ config: configPromise })

  // Fetch home page content
  const homeData = await payload.find({
    collection: 'home',
    pagination: false,
    limit: 1,
  })

  const homeContent = homeData.docs?.[0] || null
  console.log(homeContent.content)
  const homeBodyHtml = homeContent?.content
    ? richTextToHtml(homeContent.content, {
        underlineColor: secondaryColor, // Set underline color
        underlineThickness: '0.25rem', // Set underline thickness
        underlineOffset: '0.25rem' // Set underline offset
      })
    : ''

  // Fetch latest blog posts (limited by `maxUpdates` field from home collection)
  const maxUpdates = homeContent?.maxUpdates || 3
  const blogs = await payload.find({
    collection: 'blog',
    pagination: false,
    limit: maxUpdates,
    sort: '-datePosted', // Sort by latest posts first
  })

  return {
    homeContent: homeBodyHtml,
    latestUpdates: blogs.docs || [],
  }
}

export default async function Home() {
  const { homeContent, latestUpdates } = await fetchHomeData()

  return (
    <div>
      <HomeClient homeContent={homeContent} latestUpdates={latestUpdates} />
    </div>
  )
}
