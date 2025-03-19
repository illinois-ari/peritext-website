'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaUser, FaCalendarAlt, FaArrowLeft, FaRegClock } from 'react-icons/fa'
import PageSkeleton from '@/components/PageSkeleton'
import Bookshelf from '@/components/Bookshelf'
import Heading from '@/components/Heading'
import SubHeading from '@/components/SubHeading'
import { richTextToHtml } from '@/utils/richTextParser'

const accentColor = '#FF3E30'
const secondaryColor = '#f4b700'

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function HomeClient({
  homeContent,
  latestUpdates,
}: {
  homeContent: string
  latestUpdates: any[]
}) {
  const [selectedUpdate, setSelectedUpdate] = useState<any | null>(null)
  const router = useRouter()

  const handleReadMore = (update: any) => {
    router.push(`/blog/${update.slug}`)
  }

  const handleSeeAll = () => {
    router.push('/blog')
  }

  return (
    <PageSkeleton title="">
      {!selectedUpdate && <Bookshelf />}

      {selectedUpdate ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <button
            className="flex items-center justify-center text-xs font-bold text-white px-3 py-2 rounded-md"
            style={{ backgroundColor: secondaryColor }}
            onClick={() => setSelectedUpdate(null)}
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </button>

          <Heading text={selectedUpdate.title} color="black" />

          <motion.div
            className="flex items-center space-x-4 text-gray-600 mb-8 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-500" />
              <p>{selectedUpdate.author}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-gray-500" />
              <p>{formatDate(selectedUpdate.datePosted)}</p>
            </div>
          </motion.div>

          <div
            className="mb-6 text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: selectedUpdate.longDescription }}
          />
        </motion.div>
      ) : (
        <>
          {/* Home Body Content */}
          <motion.div
            className="text-xl font-openSans font-normal leading-relaxed text-gray-700 tracking-wide mb-8"
            dangerouslySetInnerHTML={{ __html: homeContent }}
          />

          {/* Latest Updates Header */}
          <div className="flex justify-between items-center mb-2 mt-12">
            <p className="text-2xl font-playfairDisplay text-gray-600 font-bold">Latest Updates</p>
            <button
              onClick={handleSeeAll}
              className="text-base font-semibold underline hover:opacity-80 transition"
              style={{ color: accentColor }}
            >
              See All
            </button>
          </div>

          {/* Latest Updates */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {latestUpdates.map((update: any, index: number) => (
              <motion.div
                key={update.slug}
                className="mb-6 p-6 rounded-md bg-[color:var(--card-bg-color)] shadow-lg hover:shadow-2xl transition-shadow duration-500 ease-in-out"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
              >
                <h3
                  className="text-lg font-bold cursor-pointer relative hover:underline"
                  onClick={() => handleReadMore(update)}
                  style={{
                    color: accentColor,
                    textDecorationColor: accentColor,
                    textUnderlineOffset: '0.2rem',
                    textDecorationThickness: '0.15rem',
                  }}
                >
                  {update.title}
                </h3>

                <div className="flex items-center space-x-6 text-gray-600 mt-2" style={{fontSize:'0.875rem'}}>
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-gray-500" />
                    <p>{update.author}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-gray-500" />
                    <p>{formatDate(update.datePosted)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaRegClock className="text-gray-500" />
                    <p>{update.readTime > 0 ? `${update.readTime} min read` : `<1 min read`}</p>
                  </div>
                </div>

                <div
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: richTextToHtml(update.shortDescription) }}
                />

                <button
                  className="mt-4 px-4 py-2 text-sm font-semibold rounded-md text-white hover:scale-105"
                  style={{
                    backgroundColor: secondaryColor,
                    textDecoration: 'none',
                  }}
                  onClick={() => handleReadMore(update)}
                >
                  Read More
                </button>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </PageSkeleton>
  )
}
