'use client'

import { motion } from 'framer-motion'
import { FaEnvelope } from 'react-icons/fa'
import { richTextToHtml } from '@/utils/richTextParser' // Use your utility for rich text parsing

const accentColor = '#28a7db'

export default function ContactClient({ contactData }: { contactData: any[] }) {
  if (!contactData.length) {
    return <p className="text-gray-600 text-center">No contact information available.</p>
  }

  // Separate text blocks from contacts
  const textBlocks = contactData.filter((entry) => entry.type === 'text-block')
  const contacts = contactData.filter((entry) => entry.type === 'contact')

  return (
    <>
      {/* Render text blocks first */}
      {textBlocks.map((block) => (
        <motion.div
          key={block.id}
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.5, ease: 'easeOut' }}
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
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            // initial={{ opacity: 0, x: -10 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0.4, delay: 0.2 * index, ease: 'easeOut' }}
            className="border-l-4 border-[#28a7db] p-5 bg-white transition-shadow duration-300 ease-in-out flex items-start space-x-4"
          >
            {/* Contact Image */}
            {contact.contact?.imageUrl && (
              <img
                src={contact.contact.imageUrl}
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
        ))}
      </div>
    </>
  )
}