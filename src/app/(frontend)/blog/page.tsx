import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageSkeleton from '@/components/PageSkeleton'
import BlogClient from '@/components/BlogClient'

import { richTextToHtml } from '@/utils/richTextParser' // Converts Lexical JSON to HTML

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise });

  // Fetch all blog posts
  const blogPosts = await payload.find({
    collection: 'blog',
    pagination: false,
    sort: '-datePosted', // Newest first
  });

  // Fetch page title from PageSettings
  const settings = await payload.find({
    collection: 'page-settings',
    pagination: false,
    where: { page: { equals: 'blog' } },
  });

  const pageTitle = settings.docs?.[0]?.title || 'Blog';

  // ✅ Convert `shortDescription` from Lexical JSON to HTML
  const formattedBlogPosts = blogPosts.docs.map((post) => ({
    ...post,
    id: String(post.id), // Ensure ID is a string
    shortDescription: richTextToHtml(post.shortDescription),
    longDescription: richTextToHtml(post.longDescription),
  }));

  return (
    <PageSkeleton title={pageTitle} showLine lineColor="#1F7391">
      <BlogClient blogPosts={formattedBlogPosts} />
    </PageSkeleton>
  );
}