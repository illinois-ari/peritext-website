import { getPayload } from "payload";
import configPromise from "@payload-config";
import { cache } from "react";
import PageSkeleton from "@/components/PageSkeleton";
import TeamClient from "@/components/TeamClient";

export async function fetchTeams() {
  const payload = await getPayload({ config: configPromise });

  const teams = await payload.find({
    collection: "team",
    limit: 1000,
    pagination: false,
    sort: "sortOrder", // Sort teams by sortOrder
  });

  // Find the settings document (which contains the page title)
  const settingsDoc = teams.docs.find((team) => team.isPageSettings);
  const pageTitle = settingsDoc?.pageTitle || "Meet the Team"; // Default title

  // Filter out settings doc and ensure sorting is correct
  const filteredTeams = teams.docs
    .filter((team) => !team.isPageSettings) // Remove settings doc
    .map((team) => ({
      ...team,
      sortOrder: team.sortOrder ?? 999, // Default sortOrder if missing
      members: team.members.sort((a, b) => a.sortOrder - b.sortOrder), // Sort members
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder); // Sort teams

  return { pageTitle, teams: filteredTeams };
}

export default async function Team() {
  const { pageTitle, teams } = await fetchTeams();

  return (
    <PageSkeleton title={pageTitle} showLine lineColor="#8E44AD">
      <TeamClient teamData={teams} />
    </PageSkeleton>
  );
}