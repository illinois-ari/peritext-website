'use client'

import { motion } from 'framer-motion'
import { FaEnvelope } from 'react-icons/fa'
import { richTextToHtml } from '@/utils/richTextParser'

const accentColor = '#28a7db'
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function ContactClient({ contactData }: { contactData: any[] }) {
  if (!contactData.length) {
    return <p className="text-gray-600 text-center">No contact information available.</p>
  }

  // Function to resolve image paths
  const getImagePath = (url: string | null) => {
    if (!url) return '';
    if (url.startsWith('http')) return url; // Handle absolute URLs
    return url.startsWith(BASE_PATH) ? url : `${BASE_PATH}${url}`;
  };

  // Separate text blocks from contacts
  const textBlocks = contactData.filter((entry) => entry.type === 'text-block')
  const contacts = contactData.filter((entry) => entry.type === 'contact')

  return (
    <>
      {/* Render text blocks first */}
      {textBlocks.map((block) => (
        <motion.div
          key={block.id}
          className="mb-8"
        >
          <div
            className="text-base leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: richTextToHtml(block.body) }}
          />
        </motion.div>
      ))}

      {/* Render contacts */}
      <div className="space-y-6">
        {contacts.map((contact, index) => {
          const imagePath = getImagePath(contact.contact?.imageUrl);

          return (
            <motion.div
              key={contact.id}
              className="border-l-4 border-[#28a7db] p-5 bg-white transition-shadow duration-300 ease-in-out flex items-start space-x-4"
            >
              {/* Contact Image */}
              {imagePath && (
                <img
                  src={imagePath}
                  alt={`${contact.contact.name}'s avatar`}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 self-center"
                />
              )}

              {/* Contact Info */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{contact.contact?.name}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  {contact.contact?.position}
                  {contact.contact?.institution && `, ${contact.contact.institution}`}
                </p>
                {contact.contact?.email && (
                  <div className="flex items-center text-blue-600 space-x-2">
                    <FaEnvelope />
                    <a href={`mailto:${contact.contact.email}`} className="hover:underline text-base">
                      {contact.contact.email}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}