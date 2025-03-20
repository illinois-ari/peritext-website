export const dynamic = 'force-static';

import PageSkeleton from '@/components/PageSkeleton';
import BlogClient from '@/components/BlogClient';
import { blogData } from '@/static/blog';
import { pageSettingsData } from '@/static/page-settings';
import { richTextToHtml } from '@/utils/richTextParser';

const accentColor = "#1F7391";

export default function BlogPage() {
  // Get the page title dynamically from settings, fallback to default
  const pageTitle = pageSettingsData.find((p) => p.page === "blog")?.title || "Blog";

  if (!blogData || blogData.length === 0) {
    return <p>No blog posts available.</p>;
  }

  // Ensure Lexical JSON is properly formatted
  const formattedBlogPosts = blogData.map((post) => {
    let shortDesc = "";
    let longDesc = "";

    // Debugging: Check the Lexical JSON structure
    console.log("Processing post:", post.title, post.shortDescription, post.longDescription);

    try {
      if (post.shortDescription && typeof post.shortDescription === "object") {
        shortDesc = richTextToHtml(post.shortDescription as any);
      }
      if (post.longDescription && typeof post.longDescription === "object") {
        longDesc = richTextToHtml(post.longDescription as any);
      }
    } catch (error) {
      console.error("Error parsing Lexical JSON for post:", post.title, error);
    }

    return {
      ...post,
      id: String(post.id),
      shortDescription: shortDesc,
      longDescription: longDesc,
    };
  });

  return (
    <PageSkeleton title={pageTitle} showLine lineColor={accentColor}>
      <BlogClient blogPosts={formattedBlogPosts} />
    </PageSkeleton>
  );
}