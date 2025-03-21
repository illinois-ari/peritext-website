'use client'

import SubHeading from '@/components/SubHeading'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { richTextToHtml } from '@/utils/richTextParser' // Utility function to parse Lexical JSON

const accentColor = '#8E44AD'
const secondaryColor = '#14532D'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function TeamClient({ teamData }: { teamData: any[] }) {
  return (
    <>
      {teamData?.map((section) => (
        <div key={section.id} className="mb-6">
          {/* Section Title */}
          <SubHeading text={section.title} color={secondaryColor} />

          {section.members.map((member: any, index: number) => {
            const isOddIndex = index % 2 === 0

            // Define animation variants
            const slideInVariants = {
              hidden: { x: isOddIndex ? '-100%' : '100%', opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: { type: 'spring', stiffness: 100, damping: 20, duration: 0.6 },
              },
            }

            // Ref and animation trigger
            const ref = useRef(null)
            const isInView = useInView(ref, { once: true })

            const getImagePath = (url: string) => {
              if (!url) return ''
              if (url.startsWith('http')) return url
              return url.startsWith(BASE_PATH) ? url : `${BASE_PATH}${url}`
            }

            const imagePath = getImagePath(member.imageUrl)

            return (
              <div
                ref={ref}
                key={member.id}
                className={`flex flex-col md:flex-row mb-12 w-full ${
                  isOddIndex ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start md:space-x-2`}
              >
                {/* Member Image */}
                {member.imageUrl && (
                  <motion.div
                    className={`flex-shrink-0 w-full md:w-48 ${isOddIndex ? 'md:mr-6' : 'md:ml-6'}`}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={slideInVariants}
                  >
                    <img src={imagePath} alt={member.name} className="w-full object-cover" />;
                  </motion.div>
                )}

                {/* Member Info */}
                <motion.div
                  className={`flex-grow flex flex-col ${
                    isOddIndex ? 'text-left md:pr-6' : 'text-right md:pl-6 md:items-end'
                  }`}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={slideInVariants}
                >
                  {/* Member Name & Social Link */}
                  <a
                    href={member.social}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-bold mb-4 relative hover:underline"
                    style={{
                      color: accentColor,
                      textDecorationThickness: '0.125rem',
                      textUnderlineOffset: '0.125rem',
                    }}
                  >
                    {member.name}
                  </a>

                  {/* Rich Text Description */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: richTextToHtml(member.description),
                    }}
                  />
                </motion.div>
              </div>
            )
          })}
        </div>
      ))}
    </>
  )
}
