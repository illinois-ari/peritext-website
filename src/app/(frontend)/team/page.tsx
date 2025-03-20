export const dynamic = 'force-static'

import PageSkeleton from '@/components/PageSkeleton'
import TeamClient from '@/components/TeamClient'
import { teamData } from '@/static/team'
import { pageSettingsData } from '@/static/page-settings'
import { richTextToHtml } from '@/utils/richTextParser'

const accentColor = '#8E44AD'

// Helper function to update image URLs safely
const transformImageUrl = (url: string | null | undefined) => {
  if (!url) return null;
  return url.startsWith('/api/media/file/')
    ? url.replace('/api/media/file/', '/uploads/')
    : url;
};

// Fetch the title for the Team page
const pageTitle = pageSettingsData.find((p) => p.page === 'team')?.title || 'Meet the Team'

// Process and sort teams & members
const formattedTeams = teamData
  .map((team) => ({
    ...team,
    sortOrder: team.sortOrder ?? 999,
    members: (team.members ?? [])
      .map((member) => ({
        ...member,
        imageUrl: member.image?.url ? transformImageUrl(member.image.url) : null, // Transformed image URL safely
        description: member.description || '', // description already in HTML format
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder), // Sort members
  }))
  .sort((a, b) => a.sortOrder - b.sortOrder)

export default function Team() {
  console.log(teamData);
  return (
    <PageSkeleton title={pageTitle} showLine lineColor={accentColor}>
      <TeamClient teamData={formattedTeams} />
    </PageSkeleton>
  )
}