export const dynamic = 'force-static'

import PageSkeleton from '@/components/PageSkeleton'
import HomeClient from '@/components/HomeClient'
import { homeData } from '@/static/home'
import { blogData } from '@/static/blog'
import { richTextToHtml } from '@/utils/richTextParser'

const accentColor = '#FF3E30'
const secondaryColor = '#f4b700'

// Extract home page content safely
const homeContentRaw = homeData[0]?.content?.root ? JSON.stringify(homeData[0]?.content) : null
const maxUpdates = homeData[0]?.maxUpdates || 3

// Convert Lexical JSON to HTML (ensuring proper type)
const homeContent = homeContentRaw
  ? richTextToHtml(JSON.parse(homeContentRaw) as any, {
      underlineColor: secondaryColor,
      underlineThickness: '0.25rem',
      underlineOffset: '0.25rem',
    })
  : ''

// Get latest blog posts (up to maxUpdates)
const latestUpdates = blogData.slice(0, maxUpdates)

export default function Home() {
  return (
    <div>
      <HomeClient homeContent={homeContent} latestUpdates={latestUpdates} />
    </div>
  )
}
