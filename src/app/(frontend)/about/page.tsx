import { getPayload } from 'payload';
import configPromise from '@payload-config';
import PageSkeleton from "@/components/PageSkeleton";
import AboutClient from "@/components/AboutClient";

const accentColor = "#36aa5d";

export default async function About() {
  const payload = await getPayload({ config: configPromise });

  // Fetch About page settings
  const pageSettings = await payload.find({
    collection: 'page-settings',
    pagination: false,
    where: {
      page: {
        equals: "about",
      },
    },
  });

  // Get the page title from settings, fallback to default
  const pageTitle = pageSettings.docs?.[0]?.title;

  // Fetch all about page sections, sorted by order
  const aboutData = await payload.find({
    collection: 'about',
    pagination: false,
    sort: 'order',
    depth: 2, // Fetch related media file details
  });

  if (!aboutData.docs || aboutData.docs.length === 0) {
    return <p>No about content available.</p>;
  }

  // Ensure all IDs are strings
  const formattedData = aboutData.docs.map((doc: any) => ({
    ...doc,
    id: String(doc.id), // Convert id to string
  }));

  return (
    <PageSkeleton title={pageTitle} showLine lineColor={accentColor}>
      <AboutClient aboutData={formattedData} />
    </PageSkeleton>
  );
}