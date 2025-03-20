import writeStaticData from '@/app/(payload)/hooks/writeStaticData'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/uploads', // Save files in the public folder
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'medium',
        width: 800,
        height: 600,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail', // Show thumbnail in admin panel
    mimeTypes: ['image/*'], // Only allow image uploads
  },
  access: {
    read: () => true, // Allows public access to images
  },
  hooks: {
    afterChange: [(args: any) => writeStaticData(args)],
    afterDelete: [(args: any) => writeStaticData(args)],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      admin: {
        description: 'Alternative text for accessibility.',
      },
    },
  ],
}
