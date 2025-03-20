import type { CollectionConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const Blog: CollectionConfig = {
  slug: 'blog',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  access: {
    read: () => true, // Publicly accessible
    create: () => true, // Allow creation
    update: () => true, // Allow updates
    delete: () => true, // Allow deletion
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'datePosted', 'readTime'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The title of the blog post.',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      admin: {
        description: 'Author of the blog post.',
      },
    },
    {
      name: 'datePosted',
      type: 'date',
      required: true,
      admin: {
        description: 'Date the blog post was published.',
      },
    },
    {
      name: 'shortDescription',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [FixedToolbarFeature(), ...defaultFeatures], // Keep all standard features
        admin: {
          placeholder: 'Write a short description for the blog post...',
        },
      }),
      admin: {
        description: 'A brief summary of the blog post.',
      },
    },
    {
      name: 'longDescription',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures], // Includes Bold, Italic, Links, etc.
        admin: {
          placeholder: 'Write the full content of the blog post...',
        },
      }),
      admin: {
        description: 'The full content of the blog post.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'SEO-friendly slug for the blog post URL.',
      },
    },
    {
      name: 'keywords',
      type: 'array',
      labels: {
        singular: 'Keyword',
        plural: 'Keywords',
      },
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'keyword',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Keywords for search optimization and categorization.',
      },
    },
    {
      name: 'readTime',
      type: 'number',
      required: true,
      admin: {
        description: 'Estimated reading time in minutes.',
      },
    },
  ],
}
