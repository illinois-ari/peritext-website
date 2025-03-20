export const dynamic = "force-static";

import PageSkeleton from "@/components/PageSkeleton";
import ContactClient from "@/components/ContactClient";
import { contactData } from "@/static/contact";
import { pageSettingsData } from "@/static/page-settings";
import { richTextToHtml } from "@/utils/richTextParser";

const accentColor = "#28a7db";

// Helper function to update image URLs safely
const transformImageUrl = (url: string | null | undefined) => {
  if (!url) return null;
  return url.startsWith("/api/media/file/")
    ? url.replace("/api/media/file/", "/uploads/")
    : url;
};

export default function Contact() {
  // Get the page title from pageSettingsData
  const pageSettings = pageSettingsData.find(
    (setting) => setting.page === "contact"
  );
  const pageTitle = pageSettings?.title || "Contact";

  if (!contactData || contactData.length === 0) {
    return <p>No contact information available.</p>;
  }

  // Format contacts, sorting by sortOrder
  const formattedContacts = contactData
    .map((entry) => ({
      id: String(entry.id),
      type: entry.type,
      sortOrder: entry.sortOrder ?? 999, // Default sortOrder if missing
      body:
        entry.type === "text-block" && entry.body
          ? richTextToHtml(entry.body as any) // Ensure proper parsing for rich text
          : null,
      contact:
        entry.type === "contact" && entry.contact
          ? {
              name: entry.contact.name,
              position: entry.contact.position,
              institution: entry.contact.institution || null,
              email: entry.contact.email,
              imageUrl:
                entry.contact.image && entry.contact.image.url // Added extra null check
                  ? transformImageUrl(entry.contact.image.url)
                  : null, // Transformed image URL safely
            }
          : null,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <PageSkeleton title={pageTitle} showLine lineColor={accentColor}>
      <ContactClient contactData={formattedContacts} />
    </PageSkeleton>
  );
}