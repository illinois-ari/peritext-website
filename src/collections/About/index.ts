import type { CollectionConfig } from 'payload'
import { lexicalEditor, FixedToolbarFeature } from '@payloadcms/richtext-lexical'
import writeStaticData from '@/app/(payload)/hooks/writeStaticData'

export const About: CollectionConfig = {
  slug: 'about',
  labels: {
    singular: 'About Page Section',
    plural: 'About Page Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'type',
    defaultColumns: ['order', 'type'],
  },
  hooks: {
    afterChange: [(args: any) => writeStaticData(args)], // Ensure `id` exists
    afterDelete: [(args: any) => writeStaticData(args)], // Works without `id`
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      required: true,
      unique: true,
      admin: {
        description: 'Determines the order of sections. Lower numbers appear first.',
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Image', value: 'image' },
      ],
      required: true,
      admin: {
        description: 'Choose "Text" for paragraphs or "Image" to display an image.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
      admin: {
        condition: (data) => data?.type === 'text',
        description: 'Only applicable for text sections.',
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          FixedToolbarFeature(), // Keeps toolbar visible
          ...defaultFeatures, // Includes Bold, Italic, Underline, Lists, etc.
        ],
        admin: {
          placeholder: 'Type your content here...',
        },
      }),
    },
    {
      name: 'image',
      type: 'group',
      admin: {
        condition: (data) => data?.type === 'image',
      },
      fields: [
        {
          name: 'file',
          type: 'upload', // Use Upload Field
          relationTo: 'media', // References Media Collection
          required: true,
          admin: {
            description: 'Upload an image.',
          },
        },
        { name: 'alt', type: 'text', required: false, admin: { description: 'Alternative text' } },
        {
          name: 'align',
          type: 'select',
          required: true,
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            description: 'Choose how the image is aligned on the page.',
          },
        },
      ],
    },
  ],
}
