import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import PageSkeleton from '@/components/PageSkeleton'
import ContactClient from '@/components/ContactClient'

export async function fetchContactData() {
  const payload = await getPayload({ config: configPromise })

  // Fetch all contact page entries, sorted by sortOrder
  const contacts = await payload.find({
    collection: 'contact',
    pagination: false,
    limit: 1000,
    sort: 'sortOrder',
    depth: 2, // Ensures related media file details are fetched
  })

  // Fetch the page title from PageSettings
  const settings = await payload.find({
    collection: 'page-settings',
    pagination: false,
    where: { page: { equals: 'contact' } },
  })

  const pageTitle = settings.docs?.[0]?.title;

  // Process contacts
  const formattedContacts = contacts.docs.map((entry) => ({
    id: entry.id,
    type: entry.type,
    sortOrder: entry.sortOrder ?? 999, // Default sortOrder if missing
    body: entry.type === 'text-block' ? entry.body : null,
    contact:
      entry.type === 'contact' && entry.contact
        ? {
            name: entry.contact.name,
            position: entry.contact.position,
            institution: entry.contact.institution || null,
            email: entry.contact.email,
            imageUrl:
              typeof entry.contact.image === 'object' && entry.contact.image.url
                ? entry.contact.image.url
                : null,
          }
        : null,
  }))

  return { pageTitle, contacts: formattedContacts }
}

export default async function Contact() {
  const { pageTitle, contacts } = await fetchContactData()

  return (
    <PageSkeleton title={pageTitle} showLine lineColor="#28a7db">
      <ContactClient contactData={contacts} />
    </PageSkeleton>
  )
}