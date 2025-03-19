'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaUser, FaCalendarAlt, FaClock, FaSearch, FaTimes, FaFilter } from 'react-icons/fa'
import Link from 'next/link'

const accentColor = '#1F7391';
const secondaryColor = '#D14F36';

interface BlogPost {
  id: string
  title: string
  author: string
  datePosted: string
  shortDescription: string
  slug: string
  keywords: { keyword: string }[]
  readTime: number
}

export default function BlogClient({ blogPosts }: { blogPosts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  const router = useRouter()

  const uniqueKeywords = useMemo(() => {
    const allKeywords = blogPosts.flatMap((post) =>
      post.keywords.map((kw) => kw.keyword.toLowerCase()),
    )
    return Array.from(new Set(allKeywords))
  }, [blogPosts])

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const combined = `${post.title} ${post.author}`.toLowerCase()
      if (searchQuery && !combined.includes(searchQuery.toLowerCase())) return false
      if (selectedKeywords.length > 0) {
        const postKeywordsLower = post.keywords.map((kw) => kw.keyword.toLowerCase())
        if (!selectedKeywords.some((kw) => postKeywordsLower.includes(kw))) return false
      }
      return true
    })
  }, [blogPosts, searchQuery, selectedKeywords])

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    return filteredPosts.slice(startIndex, startIndex + postsPerPage)
  }, [filteredPosts, currentPage])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  return (
    <>
      {/* Search & Filters */}
      <motion.div className="flex flex-col md:flex-row items-start justify-between mb-8 mt-4 gap-4">
        {/* Search Bar */}
        <div className="relative flex items-center w-full md:w-[60%] shadow-lg bg-white">
          <FaSearch className="absolute left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full pl-10 pr-10 py-2"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
          />
          {searchQuery && (
            <FaTimes
              className="absolute right-3 text-gray-500 cursor-pointer"
              onClick={() => setSearchQuery('')}
            />
          )}
        </div>

        {/* Keyword Filters */}
        <div className="relative">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2 shadow-lg bg-white cursor-pointer"
            onClick={() => setSelectedKeywords([])}
          >
            <FaFilter />
            Clear Filters
          </button>
        </div>
      </motion.div>

      {/* Blog Post List */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {paginatedPosts.map((post: BlogPost, index: number) => (
          <motion.div
            key={post.id}
            className="mb-6 p-6 rounded-md bg-[color:var(--card-bg-color)] shadow-lg hover:shadow-2xl transition-shadow duration-500 ease-in-out"
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
          >
            <h3
              className="text-lg font-bold cursor-pointer relative hover:underline"
              style={{
                color: accentColor,
                textDecorationColor: accentColor,
                textUnderlineOffset: '0.2rem',
                textDecorationThickness: '0.15rem',
              }}
            >
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>

            <div
              className="flex items-center space-x-6 text-gray-600 mt-2"
              style={{ fontSize: '0.875rem' }}
            >
              <div className="flex items-center space-x-2">
                <FaUser className="text-gray-500" />
                <p>{post.author}</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-500" />
                <p>
                  {new Date(post.datePosted).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-gray-500" />
                <p>{post.readTime > 0 ? `${post.readTime} min read` : '<1 min read'}</p>
              </div>
            </div>

            <div
              className="mt-2 text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.shortDescription }}
            />

            <button
              className="mt-4 px-4 py-2 text-sm font-semibold rounded-md text-white hover:scale-105"
              style={{
                backgroundColor: secondaryColor,
                textDecoration: 'none',
              }}
              onClick={() => router.push(`/blog/${post.slug}`)}
            >
              Read More
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <motion.div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, idx) => (
          <motion.button
            key={idx}
            className="px-4 py-2 mx-1 border"
            style={{
              backgroundColor: currentPage === idx + 1 ? secondaryColor : '#ffffff',
              color: currentPage === idx + 1 ? '#ffffff' : '#000000',
              borderColor: currentPage === idx + 1 ? secondaryColor : accentColor,
            }}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </motion.button>
        ))}
      </motion.div>
    </>
  )
}
