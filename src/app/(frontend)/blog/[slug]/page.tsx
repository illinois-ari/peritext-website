import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageSkeleton from '@/components/PageSkeleton'
import { notFound } from 'next/navigation'
import { richTextToHtml } from '@/utils/richTextParser'
import Link from 'next/link'
import { FaUser, FaCalendarAlt, FaClock, FaArrowLeft } from 'react-icons/fa'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config: configPromise })

  // Fetch blog post by slug
  const blogPost = await payload.find({
    collection: 'blog',
    pagination: false,
    where: { slug: { equals: params.slug } },
  })

  if (!blogPost.docs.length) {
    return notFound()
  }

  const post = blogPost.docs[0]

  // Colors  the blog post page
  const accentColor = '#1F7391'
  const secondaryColor = '#E55B3C'

  return (
    <PageSkeleton 
      title={post.title} 
      showLine 
      lineColor={accentColor}
      headerContent={(
        <Link
          href="/blog"
          className="inline-flex items-center px-4 py-2 text-white font-semibold rounded-md hover:scale-105 transition"
          style={{ backgroundColor: secondaryColor }}
        >
          <FaArrowLeft className="mr-2" />
          Back to Blog Posts
        </Link>
      )}
    >
      {/* Blog Post Meta */}
      <div className="flex items-center text-base mb-8 text-gray-700">
        <div className="flex items-center mr-4">
          <FaUser className="mr-2 text-gray-500" />
          {post.author}
        </div>
        <div className="flex items-center mr-4">
          <FaCalendarAlt className="mr-2 text-gray-500" />
          {new Date(post.datePosted).toLocaleDateString()}
        </div>
        <div className="flex items-center">
          <FaClock className="mr-2 text-gray-500" />
          {post.readTime > 0 ? `${post.readTime} min read` : '<1 min read'}
        </div>
      </div>

      {/* Blog Post Content */}
      <div dangerouslySetInnerHTML={{ __html: richTextToHtml(post.longDescription) }} />
    </PageSkeleton>
  )
}