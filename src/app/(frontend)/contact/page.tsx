import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageSkeleton from "@/components/PageSkeleton";
import ContactClient from '@/components/ContactClient';

const accentColor = "#28a7db";

export default async function Contact() {
  const payload = await getPayload({ config: configPromise });

  const contactData = await payload.find({
    collection: 'contact',
    limit: 1, // Only one document
    pagination: false,
  });

  const contactPage = contactData.docs[0];

  if (!contactPage) {
    return <p>No contact information available.</p>;
  }

  // ✅ Transform data to ensure institution is never `null`
  const formattedContactPage = {
    ...contactPage,
    contacts: contactPage.contacts.map((contact: any) => ({
      ...contact,
      institution: contact.institution ?? undefined, // Convert null to undefined
    })),
  };

  return (
    <PageSkeleton title={formattedContactPage.title} showLine lineColor={accentColor}>
      <ContactClient contactPage={formattedContactPage} />
    </PageSkeleton>
  );
}