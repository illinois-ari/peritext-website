import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import PageSkeleton from '@/components/PageSkeleton'
import TeamClient from '@/components/TeamClient'

export async function fetchTeams() {
  const payload = await getPayload({ config: configPromise })

  // Fetch all team sections, sorted by sortOrder
  const teams = await payload.find({
    collection: 'team',
    pagination: false,
    limit: 1000,
    sort: 'sortOrder',
    depth: 2, // Ensure we fetch related media file details
  })

  // Fetch the page title from PageSettings
  const settings = await payload.find({
    collection: 'page-settings',
    pagination: false,
    where: { page: { equals: 'team' } },
  })

  const pageTitle = settings.docs?.[0]?.title

  // Process and sort teams & members
  const formattedTeams = teams.docs
    .map((team) => ({
      ...team,
      sortOrder: team.sortOrder ?? 999, // Default sortOrder if missing
      members: (team.members ?? [])
        .map((member) => ({
          ...member,
          imageUrl: typeof member.image === 'object' && member.image.url ? member.image.url : null,
          description: member.description || null,
        }))
        .sort((a, b) => a.sortOrder - b.sortOrder), // Sort members
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder) // Sort teams

  return { pageTitle, teams: formattedTeams }
}

export default async function Team() {
  const { pageTitle, teams } = await fetchTeams()

  return (
    <PageSkeleton title={pageTitle} showLine lineColor="#8E44AD">
      <TeamClient teamData={teams} />
    </PageSkeleton>
  )
}
