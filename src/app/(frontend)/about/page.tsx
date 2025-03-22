export const dynamic = "force-static";

import PageSkeleton from "@/components/PageSkeleton";
import AboutClient from "@/components/AboutClient";
import { aboutData } from "@/static/about";
import { pageSettingsData } from "@/static/pageSettings";

const accentColor = "#36aa5d";

// Helper function to update image URLs
const transformImageUrl = (url: string | null) => {
  if (!url) return null;
  return url.startsWith("/api/media/file/")
    ? url.replace("/api/media/file/", "/uploads/")
    : url;
};

export default function About() {
  if (!aboutData || aboutData.length === 0) {
    return <p>No about content available.</p>;
  }

  // Get page title for "about" page from settings, fallback to default
  const pageTitle =
    pageSettingsData.find((p) => p.page === "about")?.title || "About";

  // Process and sort data
  const formattedData = aboutData
    .map((doc: any) => ({
      ...doc,
      id: String(doc.id),
      // Update image URLs if they exist
      image: doc.image?.file
        ? {
            ...doc.image,
            file: {
              ...doc.image.file,
              url: transformImageUrl(doc.image.file.url),
            },
          }
        : doc.image,
    }))
    .sort((a, b) => a.order - b.order);

  return (
    <PageSkeleton title={pageTitle} showLine lineColor={accentColor}>
      <AboutClient aboutData={formattedData} />
    </PageSkeleton>
  );
}