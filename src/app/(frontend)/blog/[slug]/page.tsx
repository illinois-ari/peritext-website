export const dynamic = 'force-static';

import PageSkeleton from '@/components/PageSkeleton';
import { notFound } from 'next/navigation';
import { richTextToHtml } from '@/utils/richTextParser';
import Link from 'next/link';
import { FaUser, FaCalendarAlt, FaClock, FaArrowLeft } from 'react-icons/fa';
import { blogData } from '@/static/blog';

// Define static paths for pre-rendering
export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug, // Ensure each blog post is statically generated
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Find the matching blog post by slug
  const post = blogData.find((p) => p.slug === params.slug);

  if (!post) {
    return notFound();
  }

  // Colors for the blog post page
  const accentColor = '#1F7391';
  const secondaryColor = '#E55B3C';

  let formattedLongDescription = "";
  
  // Ensure Lexical JSON is properly formatted
  try {
    if (post.longDescription && typeof post.longDescription === "object") {
      formattedLongDescription = richTextToHtml(post.longDescription as any);
    }
  } catch (error) {
    console.error("Error parsing Lexical JSON for post:", post.title, error);
  }

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
      <div dangerouslySetInnerHTML={{ __html: formattedLongDescription }} />
    </PageSkeleton>
  );
}